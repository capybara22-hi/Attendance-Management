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
        return [
            'name' => 'sometimes|required|string|max:255',
            'department_id' => 'nullable|integer',
            'image' => 'nullable|string',
            'employeeNo' => 'nullable|string|max:50|exists:users,employeeNo',
            'gender' => 'nullable',
            'email' => 'nullable|email',
            'phone_number' => 'nullable|string|max:11',
            'bank_name' => 'nullable|string',
            'bank_account_number' => 'nullable|string',
            'status' => 'integer'
        ];
    }
}
