<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestUser extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        // Request này khá hay, nếu không thỏa mãn điều kiện thì nó tự redirect về trang trước, trang hợp lệ.
        // Còn đối với API thì nó trả về JSON lỗi 422
        return [
            'name' => 'sometimes|string|max:255',
            'department_id' => 'nullable|integer',
            'image' => 'nullable|string',
            'employeeNo' => 'nullable|string|max:50|exists:users,employeeNo', // |exists:users,employeeNo nên thêm dòng này vào
            'gender' => 'nullable',
            'email' => 'nullable|email',
            'phone_number' => 'nullable|string|max:11',
            'bank_name' => 'nullable|string',
            'bank_account_number' => 'nullable|string',
            'status' => 'integer',
            'password' => 'string|min:6',
            'name_login' => 'string|exists: users, name_login'
        ];
    }

    public function messages()
    {
        return [
            'employeeNo.exists' => "Không tìm thấy mã nhân viên!",
            'password.min' => "Mật khẩu phải từ 6 kí tự trở lên!"
        ];
    }
}
