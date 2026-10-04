<?php

use App\Http\Controllers\Api\AttendanceController;
use App\Http\Controllers\Api\LeaveRequestController;
use App\Http\Controllers\Api\LoginController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/dangnhap', [LoginController::class, 'login']);
Route::get('/dangky', [LoginController::class, 'register']);

Route::get('testdata', [LeaveRequestController::class, 'list_leave_request']);


// Route::get('/', [AttendanceController::class, 'processAttendance']);
// Route::get('/', [AttendanceController::class, 'viewAll']);
// Route::get('/employee', [UserController::class, 'index'])->name('users.index');
// Route::put('/employee/{employeeNo}', [UserController::class, 'update']);
 