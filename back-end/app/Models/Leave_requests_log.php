<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Leave_requests_log extends Model
{
    use HasFactory;

    protected $table = 'Leave_requests_log';

    protected $fillable = [
        'id_leave_request',
        'employeeNo',
        'date',
        'action'
    ];
}
