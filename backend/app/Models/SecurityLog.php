<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class SecurityLog extends Model
{
    public $timestamps = false;

    protected $fillable = [
        'action',
        'model_type',
        'model_id',
        'user_identity',
        'description',
        'ip_address',
        'metadata',
        'created_at',
    ];

    protected $casts = [
        'metadata' => 'array',
        'created_at' => 'datetime',
    ];
}
