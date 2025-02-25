<?php

use App\Http\Controllers\Api\AdminController;
use App\Http\Controllers\Api\AnalysisController;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\RoleController;
use App\Http\Controllers\Api\TaskController;
use App\Http\Controllers\Api\UserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::post('register', [AuthController::class, 'registration']);
Route::post('login', [AuthController::class, 'login']);


Route::middleware(['auth:sanctum'])->group(function () {

    Route::get('users-list', [AdminController::class, 'getUsersList']);
    Route::post('create-user', [AdminController::class, 'createUser']);
    Route::post('user/delete', [AdminController::class, 'deleteUser']);
    Route::get('logs', [AdminController::class, 'getLogs']);
    Route::get('logs/{id}', [AdminController::class, 'getLog']);
    Route::post('logs/delete', [AdminController::class, 'deleteLogs']);

    Route::get('roles', [RoleController::class, 'index']);
    Route::get('roles/{id}', [RoleController::class, 'show']);
    Route::post('role/create', [RoleController::class, 'store']);
    Route::post('role/update', [RoleController::class, 'update']);
    Route::post('role/delete', [RoleController::class, 'delete']);

    Route::post('profile/update', [UserController::class, 'updateProfile']);
    Route::get('user/{id?}', [UserController::class, 'getUserData']);

    Route::get('tasks', [TaskController::class, 'index']);
    Route::post('task/create', [TaskController::class, 'store']);
    Route::post('task/update', [TaskController::class, 'update']);
    Route::get('task/{id}', [TaskController::class, 'show']);
    Route::post('task/delete', [TaskController::class, 'delete']);
    Route::post('task/update/priority', [TaskController::class, 'updatePriority']);
    Route::post('task/update/status', [TaskController::class, 'updateStatus']);

    Route::post('logout', [AuthController::class, 'logout']);

    Route::post('upload-file', [AnalysisController::class, 'upload']);
    
    Route::post('data-analysis', [AnalysisController::class, 'analysis']);

    Route::post('data-forecasting', [AnalysisController::class, 'index']);

    Route::post('v1/data-forecasting', [AnalysisController::class, 'forecastingVersion1']);
    Route::post('sentiment-analysis', [AnalysisController::class, 'sentimentAnalysis']);
});



