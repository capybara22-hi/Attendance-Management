<?php

namespace App\Http\Resources;

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
        // return parent::toArray($request);

        return [
            // 'id' => $this->id,
            // 'user_id' => $this->user_id,
            // 'check_time' => $this->check_time->format('d/m/Y'),
            'created_at' => $this->created_at->format('d/m/Y')
        ];
    }
}
