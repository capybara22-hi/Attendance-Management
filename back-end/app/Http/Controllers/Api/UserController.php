<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\RequestFillter;
use App\Http\Requests\RequestUser;
use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    /**
     * Display a listing of users.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(RequestFillter $request)
    {
        $users = User::query();

        if ($request->search) {
            $users->where(function ($query) use ($request) {
                $query->where('users.name', 'like', '%' . $request->search . '%')
                    ->orWhere('users.employeeNo', 'like', '%' . $request->search . '%');
            });
        }

        // Nếu không kiểm tra $request->status thì giả sử k có request nào, status sẽ có gtri là null, và null != 0 nên code vẫn có thể chạy
        if ($request->status && $request->status != 0) {
            $users->where('status', $request->status);
        }

        if ($request->department && $request->department != 0) {
            $users->where('department_id', $request->department);
        }

        $data = $users->get();

        return response()->json([
            'success' => true,
            'data' => $data
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
    public function update(RequestUser $request, $employeeNo)
    {
        $user = User::where('employeeNo', $employeeNo)->first();

        if (!$user) {
            return response()->json([
                'success' => false,
                'message' => 'Không tìm thấy nhân viên!'
            ], 404);
        }

        try {
            $user->update($request->validated());

            return response()->json([
                'success' => true,
                'message' => "Cập nhật thành công!",
                'data' => $user
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'success' => false,
                'message' => 'Đã xảy ra lỗi khi cập nhật: ' . $e->getMessage()
            ], 500);
        }
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
