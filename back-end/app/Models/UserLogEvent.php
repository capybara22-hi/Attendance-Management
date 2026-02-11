<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserLogEvent extends Model
{
    use HasFactory;

    protected $table = 'log_user_event';

    protected $fillable = [
        'employeeNo',
        'name',
        'time',
        'image'
    ];

    protected $casts = [
        'check_time' => 'datetime',
    ];
}
