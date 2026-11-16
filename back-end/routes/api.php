<?php

use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\Employee\AttendanceEController;
use App\Http\Controllers\Api\LeaveRequestController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

// API đăng ký, đăng nhập
Route::post('/dangnhap', [LoginController::class, 'login'])->name('login');
Route::post('/dangky', [LoginController::class, 'register']);

// API quản lý nhân viên
Route::get('users', [UserController::class, 'index']);
Route::put('users/{employeeNo}', [UserController::class, 'update']);
Route::delete('users/{employeeNo}', [UserController::class, 'destroy']);

// API xử lý chấm công từ camera
Route::get('attendances', [AttendanceController::class, 'index']);
Route::get('attendances/viewall', [AttendanceController::class, 'viewAll']);
Route::get('attendances/{id}', [AttendanceController::class, 'show']);
Route::post('attendance/check', [AttendanceController::class, 'processAttendance']);

// API xử lý đơn xin nghỉ phép
Route::get('donnghiphep', [LeaveRequestController::class, 'index']);
Route::get('donnghiphep/so-ngay-nghi-con-lai', [LeaveRequestController::class, 'days_of_leave']);
Route::get('donnghiphep/danh-sach-chi-tiet', [LeaveRequestController::class, 'list_leave_request']);
Route::put('donnghiphep', [LeaveRequestController::class, 'update']);
Route::get('leave-requests-log', [LeaveRequestController::class, 'show_log']);
Route::post('leave-requests-log', [LeaveRequestController::class, 'create_log']);

// API phía nhân viên
Route::get('chamcong/{id}', [AttendanceEController::class, 'index']);

