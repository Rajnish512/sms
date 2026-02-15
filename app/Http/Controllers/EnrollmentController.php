<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class EnrollmentController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;
        $enrollments = Enrollment::where( 'tenant_id', $tenantId)->get();
        $students = Student::where( 'tenant_id', $tenantId)->get();
        $course = Course::where( 'tenant_id', $tenantId)->get();
        return Inertia::render('enrollments/index', [
            'tenant_id' => $tenantId,
            'enrollments' => $enrollments,
            'students'=> $students,
            'course'=> $course,
        ]);
    }
    public function store(Request $request)
    {
        $tenantId = Auth::user()->tenant_id;

        $validated =$request->validate([
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            'enrollment_date' => 'required|date',
        ]);
        $validated['tenant_id'] = $tenantId;

        Enrollment::create( $validated );

        return Redirect::route('enrollments.index');
    }

    public function update(Request $request, $id)
    {
        $tenantId = Auth::user()->tenant_id;
        $enrollment = Enrollment::where( 'tenant_id', $tenantId)->findOrFail($id);

        $validated =$request->validate([
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            'enrollment_date' => 'required|date',
        ]);

        $enrollment->update($validated);


        return Redirect::route('enrollments.index');
    }
    public function destroy($id)
    {
        $tenantId = Auth::user()->tenant_id;
        $enrollment = Enrollment::where( 'tenant_id', $tenantId)->findOrFail($id);
        $enrollment->delete();

        return Redirect::route('enrollments.index');
    }
}
