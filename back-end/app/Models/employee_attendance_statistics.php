<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class employee_attendance_statistics extends Model
{
    use HasFactory;

    protected $table = 'employee_attendance_statistics';

    protected $fillable = [
        'user_id',
        'monthly_working_days',
        'yearly_working_days',
        'monthly_leave_days',
        'yearly_leave_days',
        'on_time_days',
        'late_days'
    ];
}
