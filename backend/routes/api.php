<?php

use App\Http\Controllers\ContactController;
use App\Http\Controllers\SecurityLogController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::apiResource('contacts', ContactController::class);

Route::prefix('security')->group(function () {
    Route::get('/logs', [SecurityLogController::class, 'index']);
    Route::get('/stats', [SecurityLogController::class, 'stats']);
});

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
