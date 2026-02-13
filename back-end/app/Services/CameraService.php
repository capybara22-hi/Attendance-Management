<?php

namespace App\Services;

use App\Models\Attendance;
use App\Models\User;
use App\Models\UserLogEvent;
use Carbon\Carbon;
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
                    "startTime" => "2026-02-12T00:00:00+07:00",
                    "endTime" => "2026-02-12T23:59:59+07:00",
                ]
            ];

            $response = Http::withDigestAuth(env('API_USERNAME'), env('API_PASSWORD'))
                ->withHeaders([
                    'Content-Type' => 'application/json',
                    'Accept' => 'application/json'
                ])
                ->post($url, $body);

            $data = $response->json();

            $users = $data['AcsEvent']['InfoList'];

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

        $user = User::where('employeeNo', $employee['employeeNoString'])->first();

        // Check nhân viên có tồn tại hay không
        if (!$user) {
            return [
                'success' => false,
                'message' => "Không tồn tại nhân viên!",
                'status_code' => 404
            ];
        }

        // Kiểm tra xem đã tồn tại trong bảng chấm công chưa
        $checked = Attendance::where('user_id', $employee['employeeNoString'])
            ->whereDate('check_time', today())
            ->latest()
            ->first();

        if (!$checked) {
            $attendance = Attendance::create([
                'user_id' => $user->employeeNo,
                'check_time' => $employee['time'], // Phải lấy thời gian từ camera
                'type' => 'in',
                'image' => $employee['pictureURL']
            ]);

            return [
                'success' => true,
                'message' => 'Check in thành công!',
                'data' => $attendance,
                'status_code' => 200
            ];
        }

        if ($checked->type == 'in') {
            $attendance = Attendance::create([
                'user_id' => $user->employeeNo,
                'check_time' => $employee['time'],
                'type' => 'out',
                'image' => $employee['pictureURL']
            ]);

            return [
                'success' => true,
                'message' => 'Check out thành công!',
                'data' => $attendance,
                'status_code' => 200
            ];
        }

        return [
            'success' => false,
            'message' => 'Hết lượt chấm công hôm nay!',
            'status_code' => 400
        ];
    }
}
