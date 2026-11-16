<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestFillter;
use App\Http\Resources\AttendanceResource;
use App\Models\Attendance;
use App\Models\User;
use App\Services\CameraService;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Cache;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\CssSelector\Node\FunctionNode;
use Symfony\Component\HttpKernel\Event\ViewEvent;

class AttendanceController extends Controller
{
    protected $get_data;

    public function __construct(CameraService $cameraService)
    {
        $this->get_data = $cameraService;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(RequestFillter $request)
    {
        // try {
        //     $this->get_data->test_attendance();
        // } catch (\Exception $e) {
        //     Log::warning('Lỗi đồng bộ dữ liệu: ' . $e->getMessage());
        // }
        $list_attendance = Attendance::query()
            ->join('users', 'users.employeeNo', '=', 'attendance.user_id')
            ->select(
                'attendance.user_id as employeeNo',
                'users.name',
                'users.department_id',
                'attendance.date',
                'attendance.check_in',
                'attendance.check_out',
                'attendance.image_in',
                'attendance.image_out'
            );

        // Điều kiện lọc 
        if ($request->date) {
            $list_attendance->whereDate('date', $request->date);
        }

        if ($request->employeeNo) {
            $list_attendance->where('employeeNo', $request->employeeNo);
        }

        if ($request->search) {
            $list_attendance->where(function ($query) use ($request) {
                $query->where('users.name', 'like', '%' . $request->search . '%')
                    ->orWhere('users.employeeNo', 'like', '%' . $request->search . '%');
            });
        }

        $recordInPage = $request->recordInPage ?? 20;

        $data = $list_attendance->orderBy('date', 'desc')->orderBy('check_in', 'desc')->paginate($recordInPage);

        $list_attendance->whereDate('date', '2026-03-26'); // Đếm số nhân viên đã chấm công trong ngày

        return response()->json([
            'success' => true,
            'message' => 'Lấy dữ liệu thành công!',
            'data' => AttendanceResource::collection($data->items()),
            'current_page' => $data->currentPage(),
            'last_page' => $data->lastPage(),
            'per_page' => $data->perPage(),
            'total' => $data->total(),
            'checked_in' => $list_attendance->count()
        ]);
    }

    function viewAll(Request $request)
    {
        $month = $request->input('inputMonth');

        // Nếu không có inputMonth từ request, dùng tháng hiện tại
        if (!$month) {
            $month = date('Y-m');
        }

        $show_all_in_month = Attendance::query()
            ->join('users', 'users.employeeNo', '=', 'attendance.user_id')
            ->select(
                'users.name',
                'attendance.user_id',
                'attendance.date',
                'attendance.check_in',
                'attendance.check_out'
            )
            ->where('date', 'like', $month . '%')
            ->get();

        return response()->json([
            'success' => true,
            'message' => 'Lấy dữ liệu chấm công thành công!',
            'date' => $month,
            'data' => $show_all_in_month
        ]);
    }


    /**
     * Process attendance check-in/check-out from camera
     *
     * @return \Illuminate\Http\Response
     */
    public function processAttendance()
    {
        $result = $this->get_data->test_attendance();

        return response()->json([
            'success' => true,
            'message' => 'Thêm dữ liệu thành công!',
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $find_employee = Attendance::where('user_id', $id)->get();

        if ($find_employee->isEmpty()) {
            return response()->json(false);
        }

        return response()->json([
            'success' => 'Lấy dữ liệu thành công!',
            'data' => $find_employee
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response 
     */
    public function destroy($id) {}
}
