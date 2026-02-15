<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Teacher;
use App\Models\User;
use App\Models\Tenant;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
    $tenantId = Auth::user()->tenant_id;
    $schoolName = Tenant::where('tenant_id', $tenantId)->value('school_name');
    $totalStudents = Student::where('tenant_id', $tenantId)->count();
    $totalTeachers = Teacher::where('tenant_id', $tenantId)->count();
    $totalSubjects = Teacher::where('tenant_id', $tenantId)->distinct('subject')->count('subject');
    $totalCourses = Course::where('tenant_id', $tenantId)->count();
    $totalEnrollments = Enrollment::where('tenant_id', $tenantId)->count();

    return Inertia::render('dashboard', [
        'schoolName' => $schoolName,
        'totalStudents' => $totalStudents,
        'totalTeachers' => $totalTeachers,
        'totalCourses' => $totalCourses,
        'totalEnrollments' => $totalEnrollments,
        'totalSubjects'=> $totalSubjects,
    ]);
    }
}
