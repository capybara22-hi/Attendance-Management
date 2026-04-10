<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestUser;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class LoginController extends Controller
{
    public function login(RequestUser $request)
    {
        $user = User::where('employeeNo', $request->employeeNo)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => "Do not find employeeNo!"
            ], 404);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'success' => false,
                'message' => "Mật khẩu không chính xác!"
            ], 401);
        }

        return response()->json([
            'success' => true,
            'message' => 'Đăng nhập thành công',
            'data' => $user
        ]);
    }

    public function register(RequestUser $request)
    {
        $user = User::where('employeeNo', $request->employeeNo)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => "Do not find employeeNo!"
            ], 404);
        }

        if ($user->password) {
            return response()->json([
                'success' => false,
                'message' => 'Tài khoản đã được đăng ký!'
            ], 400);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'success' => true,
            'message' => 'Đăng ký thành công',
            'user' => $user
        ], 201);
    }
}
