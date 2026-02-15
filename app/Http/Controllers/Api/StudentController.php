<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $students = Student::where('tenant_id', $tenantId)->get();

        return response()->json([
            'success' => true,
            'data' => $students,
        ], 200);
    }

    public function store(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'grade' => 'required|string|max:50',
        ]);

        $validated['tenant_id'] = $tenantId;

        $student = Student::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Student created successfully.',
            'data' => $student,
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $student = Student::where('tenant_id', $tenantId)->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $student,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $student = Student::where('tenant_id', $tenantId)->findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'grade' => 'required|string|max:50',
        ]);

        $student->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Student updated successfully.',
            'data' => $student,
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $student = Student::where('tenant_id', $tenantId)->findOrFail($id);

        $student->delete();

        return response()->json([
            'success' => true,
            'message' => 'Student deleted successfully.',
        ], 200);
    }
}
