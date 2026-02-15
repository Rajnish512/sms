<?php

use App\Http\Controllers\CourseController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\EnrollmentController;
use App\Http\Controllers\StudentController;
use App\Http\Controllers\TeacherController;
use App\Http\Controllers\UserController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Laravel\Fortify\Features;

Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {

    Route::get('/teachers',[TeacherController::class, 'index'])->name('teachers.index');
    Route::post('/teachers',[TeacherController::class, 'store'])->name('teachers.store');
    Route::put('/teachers/{id}',[TeacherController::class, 'update'])->name('teachers.update');
    Route::delete('/teachers/{id}',[TeacherController::class, 'destroy'])->name('teachers.destroy');
    Route::resource('/students', StudentController::class);
    Route::resource('/courses', CourseController::class);
    Route::resource('/enrollments', EnrollmentController::class);
    Route::get('/dashboard',[DashboardController::class, 'index'])->name('dashboard.index');
    Route::resource('/users', UserController::class);
});

require __DIR__.'/settings.php';
