<?php

namespace App\Http\Controllers\Api\Employee;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\LeaveRequest;
use Carbon\Carbon;

class LeaveRequestEController extends Controller
{
    public function index(Request $request, $id) {
        $list_leaveDays = LeaveRequest::with('reasonDetail')->where('employeeNo', $id)->get();

        // Tổng số ngày nghỉ đã được duyệt
        $leaveDays = LeaveRequest::where('employeeNo', $id)
            ->where('status', '1')
            ->sum('number_date');

        return response()->json([
            'list_leaveDay' => $list_leaveDays,
            'count_leave' => $leaveDays
        ], 200);
    }

    public function createLeaveRequest(Request $request, $id){
        $validated = $request->validate([
            'employeeNo' => 'required|string',
            'start_date' => 'required|date',
            'end_date' => 'required|date|after_or_equal:start_date',
            'reason' => 'required|exists:reason,id',
        ]);

        $startDate = Carbon::parse($validated['start_date']);
        $endDate = Carbon::parse($validated['end_date']);

        $numberDate = $startDate->diffInDays($endDate) + 1;

        // 3. Tạo đơn nghỉ phép
        $data = LeaveRequest::create([
            'employeeNo' => $id,
            'start_date' => $validated['start_date'],
            'end_date' => $validated['end_date'],
            'number_date' => $numberDate,
            'reason' => $validated['reason'],
            'status' => null,
        ]);

        // 4. Trả kết quả về React
        return response()->json([
            'message' => 'Tạo đơn nghỉ phép thành công!',
            'kq' => $data,
        ], 201);
    }
}
