<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Teacher;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function index(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $teachers = Teacher::where('tenant_id', $tenantId)->get();

        return response()->json([
            'success' => true,
            'data' => $teachers,
        ], 200);
    }

    public function store(Request $request)
    {
        $tenantId = $request->user()->tenant_id;

        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'subject' => 'required|string|max:50',
        ]);

        $validated['tenant_id'] = $tenantId;

        $teacher = Teacher::create($validated);

        return response()->json([
            'success' => true,
            'message' => 'Teacher created successfully.',
            'data' => $teacher,
        ], 201);
    }

    public function show(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $teacher = Teacher::where('tenant_id', $tenantId)->findOrFail($id);

        return response()->json([
            'success' => true,
            'data' => $teacher,
        ], 200);
    }

    public function update(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $teacher = Teacher::where('tenant_id', $tenantId)->findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'subject' => 'required|string|max:50',
        ]);

        $teacher->update($validated);

        return response()->json([
            'success' => true,
            'message' => 'Teacher updated successfully.',
            'data' => $teacher,
        ], 200);
    }

    public function destroy(Request $request, $id)
    {
        $tenantId = $request->user()->tenant_id;

        $teacher = Teacher::where('tenant_id', $tenantId)->findOrFail($id);

        $teacher->delete();

        return response()->json([
            'success' => true,
            'message' => 'Teacher deleted successfully.',
        ], 200);
    }
}
