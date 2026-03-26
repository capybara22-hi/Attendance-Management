<?php

use App\Http\Controllers\Api\AttendanceController;
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
