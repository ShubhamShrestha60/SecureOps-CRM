<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ContactResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id' => $this->id,
            'name' => $this->name,
            'email' => $this->email,
            'phone' => $this->phone,
            'company' => $this->company,
            'status' => $this->status,
            'initials' => collect(explode(' ', $this->name))->map(fn($n) => mb_substr($n, 0, 1))->take(2)->join(''),
            'created_at' => $this->created_at->format('M d, Y'),
            'updated_at' => $this->updated_at->diffForHumans(),
        ];
    }
}
