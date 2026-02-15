<?php

namespace App\Http\Controllers;

use App\Models\Course;
use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class CourseController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;
        $teachers = Teacher::where( 'tenant_id', $tenantId)->get();
        $courses = Course::where( 'tenant_id', $tenantId)->get();
        return Inertia::render('courses/index', [
            'tenant_id' => $tenantId,
            'courses' => $courses,
            'teachers'=> $teachers,
        ]);
    }
    public function store(Request $request)
    {
        $tenantId = Auth::user()->tenant_id;

        $validated =$request->validate([
            'course_name' => 'required|string|max:50',
            'teacher_id' => 'required|integer',
        ]);
        $validated['tenant_id'] = $tenantId;

        Course::create( $validated );

        return Redirect::route('courses.index');
    }

    public function update(Request $request, $id)
    {
        $tenantId = Auth::user()->tenant_id;
        $course = Course::where( 'tenant_id', $tenantId)->findOrFail($id);

        $validated = $request->validate([
            'course_name' => 'required|string|max:50',
            'teacher_id' => 'required|integer',
        ]);

        $course->update($validated);


        return Redirect::route('courses.index');
    }
    public function destroy($id)
    {
        $tenantId = Auth::user()->tenant_id;
        $course = Course::where( 'tenant_id', $tenantId)->findOrFail($id);
        $course->delete();

        return Redirect::route('courses.index');
    }
}
