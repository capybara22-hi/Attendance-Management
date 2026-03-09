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

        $today = now('Asia/Ho_Chi_Minh')->format('Y-m-d');

        do {
            $body = [
                "AcsEventCond" => [
                    "searchID" => "1",
                    "searchResultPosition" => $start,
                    "maxResults" => $limit,
                    "major" => 5,
                    "minor" => 75,
                    // 'startTime' => $today . 'T00:00:00+07:00',
                    // 'endTime'   => $today . 'T23:59:59+07:00',
                    "startTime" => "2026-02-28T00:00:00+07:00",
                    "endTime" => "2026-03-08T23:59:59+07:00",
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

        // return view('welcome', compact('users'));
        return $list_users_event;
    }

    public function processAttendance()
    {
        $get_data = Storage::get("file_test/event.json");

        $employee = json_decode($get_data, true);

        // Lấy dữ liệu chấm công từ API thứ 2
        // $employee_data = $this->get_user();

        // $employee = end($employee_data);
        // dd($employee_data);
    }

    // Viết hàm thực hiện lấy dữ liệu chấm công từ tháng 1 cho đến hiện tại
    public function test_attendance()
    {
        // Lấy danh sách employeeNo có tồn tại trong bảng users
        $existingEmployeeNos = User::pluck('employeeNo')->toArray();

        $attendanceData = UserLogEvent::selectRaw('
            employeeNo,
            name,
            DATE(time) as date,
            MIN(time) as check_in,
            MAX(time) as check_out
        ')
            ->whereIn('employeeNo', $existingEmployeeNos)
            ->groupBy('employeeNo', DB::raw('DATE(time)'), 'name')
            ->orderBy('date', 'desc')
            ->get();

        foreach ($attendanceData as $data) {
            $checkInImage = UserLogEvent::where('employeeNo', $data->employeeNo)
                ->whereDate('time', $data->date)
                ->orderBy('time', 'asc')
                ->value('image');

            $checkOutImage = UserLogEvent::where('employeeNo', $data->employeeNo)
                ->whereDate('time', $data->date)
                ->orderBy('time', 'desc')
                ->value('image');

            Attendance::updateOrCreate(
                [
                    'user_id' => $data->employeeNo,
                    'date' => $data->date,
                ],
                [
                    'check_in' => $data->check_in,
                    'check_out' => $data->check_out,
                    'image_in' => $checkInImage,
                    'image_out' => $checkOutImage,
                ]
            );
        }
    }
}
