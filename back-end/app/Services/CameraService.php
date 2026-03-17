<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\User;
use App\Models\UserLogEvent;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

class CameraService
{
    public function get_list_user()
    {
        $url = 'http://192.168.1.30/ISAPI/AccessControl/UserInfo/Search?format=json';

        $start = 0;
        $limit = 30;
        $list_users = [];

        do {
            $body = [
                'UserInfoSearchCond' => [
                    'searchID' => '1',
                    'searchResultPosition' => $start,
                    'maxResults' => $limit,
                ]
            ];

            $response = Http::timeout(5)
                ->withDigestAuth(env('API_USERNAME'), env('API_PASSWORD'))
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json'
                ])
                ->post($url, $body);

            $data = $response->json();

            $users = $data['UserInfoSearch']['UserInfo'] ?? [];

            $list_users = array_merge($list_users, $users);

            $start += $limit;
        } while (count($users) === $limit);


        // dd($list_users);
        // return view('welcome', compact('users'));
        return $list_users;
    }

    public function get_user()
    {
        $url = 'http://192.168.1.30/ISAPI/AccessControl/AcsEvent?format=json';

        $start = 0;
        $limit = 30;
        $list_users_event = [];

        $lastTime = DB::table('log_user_event')->max('time');

        if (!$lastTime) {
            $from = Carbon::now('Asia/Ho_Chi_Minh')->subDay();
        } else {
            // +1 giây để tránh trùng dữ liệu
            $from = Carbon::parse($lastTime)->addSecond();
        }

        // Thời điểm hiện tại
        $to = Carbon::now('Asia/Ho_Chi_Minh');

        do {
            $body = [
                "AcsEventCond" => [
                    "searchID" => "1",
                    "searchResultPosition" => $start,
                    "maxResults" => $limit,
                    "major" => 5,
                    "minor" => 75,
                    // "startTime" => "2026-03-15T00:00:00+07:00",
                    // "endTime" => "2026-03-16T23:59:59+07:00",
                    "startTime" => $from->format('Y-m-d\TH:i:sP'),
                    "endTime"   => $to->format('Y-m-d\TH:i:sP'),
                ]
            ];

            $response = Http::withDigestAuth(env('API_USERNAME'), env('API_PASSWORD'))
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json'
                ])
                ->post($url, $body);

            $data = $response->json();

            $users = $data['AcsEvent']['InfoList'] ?? [];

            $list_users_event = array_merge($list_users_event, $users);

            $start += $limit;
        } while (count($users) === $limit);

        $data = [];

        foreach ($list_users_event as $user) {
            $data[] = [
                'employeeNo' => $user['employeeNoString'],
                'name' => $user['name'],
                'image' => $user['pictureURL'] ?? null,
                'time' => $user['time'],
                'created_at' => now(),
                'updated_at' => now(),
            ];
        }

        if (!empty($data)) {
            DB::table('log_user_event')->insertOrIgnore($data);
        }
    }

    public function test_attendance()
    {
        $this->get_user();

        $existingEmployeeNos = User::pluck('employeeNo')->toArray();

        $lastProcessedAt = Attendance::max('date');

        $attendanceData = UserLogEvent::selectRaw('
            employeeNo,
            name,
            DATE(time) as date,
            MIN(time) as check_in,
            MAX(time) as check_out,
            SUBSTRING_INDEX(GROUP_CONCAT(image ORDER BY time ASC), ",", 1) as check_in_image,
            SUBSTRING_INDEX(GROUP_CONCAT(image ORDER BY time DESC), ",", 1) as check_out_image
        ')
            ->whereIn('employeeNo', $existingEmployeeNos)
            ->whereDate('time', '>=', $lastProcessedAt)
            ->groupBy('employeeNo', DB::raw('DATE(time)'), 'name')
            ->orderBy('date', 'desc')
            ->get();

        foreach ($attendanceData as $data) {
            Attendance::updateOrCreate(
                [
                    'user_id' => $data->employeeNo,
                    'date' => $data->date,
                ],
                [
                    'check_in' => $data->check_in,
                    'check_out' => $data->check_out,
                    'image_in' => $data->check_in_image,
                    'image_out' => $data->check_out_image
                ]
            );
        }

        // foreach ($attendanceData as $data) {
        //     $checkInImage = UserLogEvent::where('employeeNo', $data->employeeNo)
        //         ->whereDate('time', $data->date)
        //         ->orderBy('time', 'asc')
        //         ->value('image');

        //     $checkOutImage = UserLogEvent::where('employeeNo', $data->employeeNo)
        //         ->whereDate('time', $data->date)
        //         ->orderBy('time', 'desc')
        //         ->value('image');

        //     Attendance::updateOrCreate(
        //         [
        //             'user_id' => $data->employeeNo,
        //             'date' => $data->date,
        //         ],
        //         [
        //             'check_in' => $data->check_in,
        //             'check_out' => $data->check_out,
        //             'image_in' => $checkInImage,
        //             'image_out' => $checkOutImage,
        //         ]
        //     );
        // }
    }
}
