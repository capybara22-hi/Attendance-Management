<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Leave_requests_log;
use App\Models\LeaveRequest;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;

class LeaveRequestController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {
        $ds_don_nghi_phep = LeaveRequest::query();

        $ds_don_dong_y = LeaveRequest::where('status', '1');
        $ds_don_tu_choi = LeaveRequest::where('status', '0');

        $ds_don_cho_duyet = LeaveRequest::query()
            ->join('users', 'users.employeeNo', '=', 'leave_requests.employeeNo')
            ->join('department', 'department.id', '=', 'users.department_id')
            ->join('reason', 'reason.id', '=', 'leave_requests.reason')
            ->whereNull('leave_requests.status')
            ->select(
                'leave_requests.*',
                'users.name as name',
                'users.department_id as department_id',
                'reason.reason as reason',
                'department.name_department as name_department'
            )
            ->orderBy('created_at', 'desc')
            ->get();

        $ds_don_da_duyet = LeaveRequest::query()
            ->join('users', 'users.employeeNo', '=', 'leave_requests.employeeNo')
            ->join('department', 'department.id', '=', 'users.department_id')
            ->join('status', 'status.id', '=', 'leave_requests.status')
            ->join('reason', 'reason.id', '=', 'leave_requests.reason')
            ->whereNotNull('leave_requests.status')
            ->select(
                'leave_requests.*',
                'users.name as name',
                'department.name_department as name_department',
                'status.name_status as name_status',
                'reason.reason as reason'
            )
            ->orderBy('updated_at', 'desc');

        $search = trim((string) $request->search);

        if ($search !== '') {
            $ds_don_da_duyet->where(function ($query) use ($search) {
                $query->where('users.name', 'like', '%' . $search . '%')
                    ->orWhere('leave_requests.employeeNo', 'like', '%' . $search . '%');
            });
        }

        if ($request->date) {
            $ds_don_da_duyet->whereDate('leave_requests.start_date', $request->date);
        }

        if ($request->reason) {
            $ds_don_da_duyet->where('leave_requests.reason', $request->reason);
        }

        if ($request->status != "") {
            $ds_don_da_duyet->where('leave_requests.status', $request->status);
        }

        $data = $ds_don_da_duyet->get();

        return response()->json([
            'ds_don_cho_duyet' => $ds_don_cho_duyet,
            'ds_don_da_duyet' => $data,
            'tong_don' => $ds_don_nghi_phep->count(),
            'so_don_dong_y' => $ds_don_dong_y->count(),
            'so_don_tu_choi' => $ds_don_tu_choi->count(),
            'so_don_cho_duyet' => $ds_don_cho_duyet->count(),
            'so_don_da_duyet' => $ds_don_da_duyet->count()
        ]);
    }

    public function update(Request $request)
    {
        $employee = LeaveRequest::where('id', $request->id)->first();

        try {
            $employee->update([
                'status' => $request->status,
                'approval_date' => $request->today,
                'approved_by' => $request->approved_by
            ]);

            return response()->json([
                'message' => "Đã duyệt"
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Đã xảy ra lỗi khi cập nhật: ' . $e->getMessage()
            ], 500);
        }
    }

    // Hàm log lịch sử hoạt động
    public function show_log()
    {
        $data = Leave_requests_log::query()
            ->join('users', 'users.employeeNo', '=', 'leave_requests_log.employeeNo')
            ->select(
                'leave_requests_log.*',
                'users.name as name'
            )
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json([
            'data' => $data
        ]);
    }

    public function create_log(Request $request)
    {
        Leave_requests_log::create([
            'id_leave_request' => $request->id,
            'employeeNo' => $request->employeeNo,
            'action' => $request->status,
            'date' => $request->today
        ]);

        return response()->json([
            'message' => "Lưu lịch sử thành công!"
        ]);
    }

    public function days_of_leave(Request $request)
    {
        $defaultLeaveDays = 12;
        $totalDays = (int) $request->input('total_days', $defaultLeaveDays);

        $query = DB::table('users')
            ->leftJoin('leave_requests', function ($join) {
                $join->on('users.employeeNo', '=', 'leave_requests.employeeNo')
                    ->where('leave_requests.status', '=', '1');
            })
            ->select(
                'users.employeeNo as employeeNo',
                'users.name as name',
                DB::raw('COALESCE(SUM(leave_requests.number_date), 0) as so_ngay_da_nghi')
            );

        $search = trim((string) $request->search);

        if ($search !== '') {
            $query->where(function ($query) use ($search) {
                $query->where('users.name', 'like', '%' . $search . '%')
                    ->orWhere('leave_requests.employeeNo', 'like', '%' . $search . '%');
            });
        }

        $data = $query->selectRaw('COUNT(leave_requests.employeeNo) as total')
            ->groupBy('users.employeeNo', 'users.name')
            ->orderBy('users.employeeNo')
            ->get()
            ->map(function ($item) use ($totalDays) {
                $usedDays = (float) $item->so_ngay_da_nghi;

                return [
                    'employeeNo' => $item->employeeNo,
                    'name' => $item->name,
                    'total' => $item->total,
                    'so_ngay_da_nghi' => $usedDays,
                    'so_ngay_con_lai' => max(0, $totalDays - $usedDays),
                ];
            });

        return response()->json([
            'total_days' => $totalDays,
            'data' => $data,
        ]);
    }

    public function list_leave_request(Request $request)
    {
        // $employeeNo = 'NV0025';
        $data = LeaveRequest::query()
            ->join('reason', 'reason.id', '=', 'leave_requests.reason')
            ->join('status', 'status.id', '=', 'leave_requests.status')
            ->select(
                'leave_requests.employeeNo',
                DB::raw('CONCAT(leave_requests.start_date, " -> ", leave_requests.end_date) AS date_range'),
                'leave_requests.number_date',
                'leave_requests.reason',
                'leave_requests.created_at',
                'reason.reason',
                'status.name_status'
            )
            ->where('leave_requests.employeeNo', '=', $request->employeeNo)
            ->get();

        return response()->json([
            'total' => $data->count(),
            'data' => $data
        ]);
    }
}
