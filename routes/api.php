<?php

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\CourseController;
use App\Http\Controllers\Api\EnrollmentController;
use App\Http\Controllers\Api\StudentController;
use App\Http\Controllers\Api\TeacherController;
use App\Http\Controllers\DashboardController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);
Route::middleware(['auth:sanctum'])->group(function () {
    Route::post('/logout', [AuthController::class, 'logOut']);
    Route::get('/teachers',[TeacherController::class, 'index']);
    Route::post('/teachers',[TeacherController::class, 'store']);
    Route::put('/teachers/{id}',[TeacherController::class, 'update']);
    Route::delete('/teachers/{id}',[TeacherController::class, 'destroy']);
    Route::resource('/student', StudentController::class);
    Route::resource('/course', CourseController::class);
    Route::resource('/enrollment', EnrollmentController::class);
    Route::get('/dashboard',[DashboardController::class, 'index']);
});
