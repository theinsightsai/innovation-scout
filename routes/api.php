<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AnalysisController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'registration']);
Route::post('login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('users-list', [AdminController::class, 'getUsersList']);
    Route::get('role-list', [AdminController::class, 'getRoleList']);
    Route::post('create-user', [AdminController::class, 'createUser']);
    Route::post('user/delete', [AdminController::class, 'deleteUser']);

    Route::post('logout', [AuthController::class, 'logout']);

    Route::get('logs', [AdminController::class, 'getLogs']);
    Route::get('logs/{id}', [AdminController::class, 'getLog']);

    Route::post('profile/update', [UserController::class, 'updateProfile']);
    Route::get('user/{id?}', [UserController::class, 'getUserData']);
});


Route::post('upload/csv', [AnalysisController::class, 'index']);
