<?php

namespace App\Http\Controllers\Api\Employee;

use App\Models\Attendance;
use App\Models\LeaveRequest;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;

class AttendanceEController extends Controller
{
    public function index(Request $request, $id) {
        $attendance_Employee = Attendance::where('user_id', $id);

        if($request->start_date && $request->end_date){
            $attendance_Employee->whereBetween('date', [$request->start_date, $request->end_date]);
        }
        elseif($request->start_date){
            $attendance_Employee->where('date', '=', $request->start_date);
        }
        elseif($request->end_date){
            $attendance_Employee->where('date', '=', $request->end_date);
        }

        $data = $attendance_Employee->get();

        // if($data->isEmpty()) {
        //     return response()->json([ 'message' => "Khong tim thay du lieu!" ], 404);
        // }

        $workingDays = Attendance::where('user_id', $id)->count('date');

        $leaveDays = LeaveRequest::where('employeeNo', $id)
            ->where('status', '1')
            ->sum('number_date');

        return response()->json([
            'kq' =>  $data,
            'count_attendance' => $workingDays,
            'leaveDay' => $leaveDays
        ], 200);
    }
}


