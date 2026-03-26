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
                'message' => "Do not find employeeNo!"
            ]);
        }

        if (!Hash::check($request->password, $user->password)) {
            return response()->json([
                'message' => "Password is not true!"
            ]);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    public function register(RequestUser $request)
    {
        $user = User::where('employeeNo', $request->employeeNo)->first();

        if (!$user) {
            return response()->json([
                'message' => "Do not find employeeNo!"
            ]);
        }

        if ($user->password) {
            return response()->json([
                'message' => 'Tài khoản đã được đăng ký!'
            ], 400);
        }

        $user->update([
            'password' => Hash::make($request->password),
        ]);

        return response()->json([
            'message' => 'Đăng ký thành công',
            'user' => $user
        ], 201);
    }
}
