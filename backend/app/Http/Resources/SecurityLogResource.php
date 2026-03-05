<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SecurityLogResource extends JsonResource
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
            'action' => $this->action,
            'description' => $this->description,
            'user' => $this->user_identity,
            'ip' => $this->ip_address,
            'metadata' => $this->metadata,
            'timestamp' => $this->created_at->format('Y-m-d H:i:s'),
            'relative_time' => $this->created_at->diffForHumans(),
        ];
    }
}
