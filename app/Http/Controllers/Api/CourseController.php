<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $courses = Course::where('tenant_id', $tenantId)->get();

        return response()->json([
            'success' => true,
            'data' => $courses,
        ], 200);
    }

    public function store(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $validated = $request->validate([
            'course_name' => 'required|string|max:50',
            'teacher_id' => 'required|integer',
        ]);

        $validated['tenant_id'] = $tenantId;

        $course = Course::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Course created successfully.',
            'data' => $course,
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $course = Course::where('tenant_id', $tenantId)->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $course,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $course = Course::where('tenant_id', $tenantId)->findOrFail($id);

        $validated = $request->validate([
            'course_name' => 'required|string|max:50',
            'teacher_id' => 'required|integer',
        ]);

        $course->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Course updated successfully.',
            'data' => $course,
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $course = Course::where('tenant_id', $tenantId)->findOrFail($id);

        $course->delete();

        return response()->json([
            'success' => true,
            'message' => 'Course deleted successfully.',
        ], 200);
    }
}
