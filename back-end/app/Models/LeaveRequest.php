<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class LeaveRequest extends Model
{
    use HasFactory;

    protected $table = 'leave_requests';

    protected $fillable = [
        'id',
        'employeeNo',
        'start_date',
        'end_date',
        'number_date',
        'reason',
        'approved_by',
        'approval_date',
        'status',
        'created_at',
        'updated_at'
    ];

    public function reasonDetail()
    {
        return $this->belongsTo(Reason::class, 'reason', 'id');
    }
}
