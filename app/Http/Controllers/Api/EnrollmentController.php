<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Student;
use App\Models\Course;
use Illuminate\Http\Request;

class EnrollmentController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $enrollments = Enrollment::where('tenant_id', $tenantId)->get();
        $students = Student::where('tenant_id', $tenantId)->get();
        $courses = Course::where('tenant_id', $tenantId)->get();

        return response()->json([
            'success' => true,
            'data' => [
                'enrollments' => $enrollments,
                'students' => $students,
                'courses' => $courses
            ]
        ], 200);
    }

    public function store(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $validated = $request->validate([
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            'enrollment_date' => 'required|date',
        ]);

        $validated['tenant_id'] = $tenantId;

        $enrollment = Enrollment::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Enrollment created successfully.',
            'data' => $enrollment
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $enrollment = Enrollment::where('tenant_id', $tenantId)->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $enrollment,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $enrollment = Enrollment::where('tenant_id', $tenantId)->findOrFail($id);

        $validated = $request->validate([
            'student_id' => 'required|integer',
            'course_id' => 'required|integer',
            'enrollment_date' => 'required|date',
        ]);

        $enrollment->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Enrollment updated successfully.',
            'data' => $enrollment,
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $enrollment = Enrollment::where('tenant_id', $tenantId)->findOrFail($id);

        $enrollment->delete();

        return response()->json([
            'success' => true,
            'message' => 'Enrollment deleted successfully.',
        ], 200);
    }
}
