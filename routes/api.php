<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'registration']);
Route::post('login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('users-list/{type}', [UserController::class, 'getUsersList']);
    Route::get('role-list', [UserController::class, 'getRoleList']);
    Route::post('create-user', [UserController::class, 'createUser']);
    Route::post('logout', [AuthController::class, 'logout']);
});
