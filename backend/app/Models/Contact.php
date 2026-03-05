<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

use Illuminate\Database\Eloquent\Attributes\ObservedBy;
use App\Observers\SecurityObserver;

#[ObservedBy([SecurityObserver::class])]
class Contact extends Model
{
    use HasFactory;

    protected $fillable = ['name', 'email', 'phone', 'company', 'status'];
}
