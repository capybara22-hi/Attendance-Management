<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $users = User::with('attendances')->get();

        return response()->json([
            'success' => true,
            'data' => $users
        ]);
    }

    /**
     * Store a newly created user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'employeeNo' => 'required|unique:users,employeeNo',
            'name' => 'required|string|max:255',
            'department_id' => 'nullable|integer',
            'image' => 'nullable|string'
        ]);

        $user = User::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Tạo nhân viên thành công!',
            'data' => $user
        ], 201);
    }

    /**
     * Display the specified user.
     *
     * @param  string  $employeeNo
     * @return \Illuminate\Http\Response
     */
    public function show($employeeNo)
    {
        $user = User::where('employeeNo', $employeeNo)
            ->with('attendances')
            ->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy nhân viên!'
            ], 404);
        }

        return response()->json([
            'success' => true,
            'data' => $user
        ]);
    }

    /**
     * Update the specified user.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  string  $employeeNo
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $employeeNo)
    {
        $user = User::where('employeeNo', $employeeNo)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy nhân viên!'
            ], 404);
        }

        $validated = $request->validate([
            'name' => 'sometimes|required|string|max:255',
            'department_id' => 'nullable|integer',
            'image' => 'nullable|string'
        ]);

        $user->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Cập nhật nhân viên thành công!',
            'data' => $user
        ]);
    }

    /**
     * Remove the specified user.
     *
     * @param  string  $employeeNo
     * @return \Illuminate\Http\Response
     */
    public function destroy($employeeNo)
    {
        $user = User::where('employeeNo', $employeeNo)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy nhân viên!'
            ], 404);
        }

        $user->delete();

        return response()->json([
            'success' => true,
            'message' => 'Xóa nhân viên thành công!'
        ]);
    }
}
