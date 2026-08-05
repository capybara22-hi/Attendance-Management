<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class RequestFillter extends FormRequest
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
        return [
            'name' => 'nullable',
            'date' => 'nullable',
            'department_id' => 'nullable|string|max:100',
            'employeeNo' => 'nullable|string|max:50|exists:users,employeeNo',
            'recordInPage' => 'nullable|integer|min:1|max:100'
        ];
    }

    /**
     * Get custom validation messages
     *
     * @return array
     */
    public function messages()
    {
        return [
            'employeeNo.exists' => 'Mã nhân viên không tồn tại',
            'recordInPage.integer' => 'Số bản ghi phải là số nguyên',
            'recordInPage.min' => 'Số bản ghi tối thiểu là 1',
            'recordInPage.max' => 'Số bản ghi tối đa là 100',
        ];
    }
}
