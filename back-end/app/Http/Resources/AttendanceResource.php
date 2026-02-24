<?php

namespace App\Http\Resources;

use Carbon\Carbon;
use Illuminate\Http\Resources\Json\JsonResource;

class AttendanceResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return array|\Illuminate\Contracts\Support\Arrayable|\JsonSerializable
     */
    public function toArray($request)
    {
        return [
            'employeeNo' => $this->employeeNo,
            'name' => $this->name,
            'department_id' => $this->department_id,
            'date' => Carbon::parse($this->date)->format('d/m/Y'),
            'check_in' => $this->check_in ? Carbon::parse($this->check_in)->format('H:i:s') : null,
            'check_out' => $this->check_out ? Carbon::parse($this->check_out)->format('H:i:s') : null,
        ];
    }
}
