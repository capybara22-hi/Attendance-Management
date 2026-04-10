<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    use HasFactory;

    protected $fillable = [
        'employeeNo',
        'start_date',
        'end_date',
        'number_date',
        'reason',
        'approved_by',
        'approval_date',
        'status'
    ];
}
