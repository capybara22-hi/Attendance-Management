<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $table = 'attendance';

    protected $fillable = [
        'user_id',
        'date',
        'check_in',
        'check_out',
    ];

    // Không cast để tránh timezone conversion

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'employeeNo');
    }
}
