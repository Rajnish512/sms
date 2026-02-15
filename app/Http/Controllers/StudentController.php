<?php

namespace App\Http\Controllers;

use App\Models\Student;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class StudentController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;
        $students = Student::where( 'tenant_id', $tenantId)->get();
        return Inertia::render('students/index', [
            'tenant_id' => $tenantId,
            'students' => $students,
        ]);
    }
    public function store(Request $request)
    {
        $tenantId = Auth::user()->tenant_id;

        $validated =$request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'grade' => 'required|string|max:50',
        ]);
        $validated['tenant_id'] = $tenantId;

        Student::create( $validated );

        return Redirect::route('students.index');
    }

    public function update(Request $request, $id)
    {
        $tenantId = Auth::user()->tenant_id;
        $student = Student::where( 'tenant_id', $tenantId)->findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'grade' => 'required|string|max:50',
        ]);

        $student->update($validated);

        return Redirect::route('students.index');
    }
    public function destroy($id)
    {
        $tenantId = Auth::user()->tenant_id;
        $student = Student::where( 'tenant_id', $tenantId)->findOrFail($id);
        $student->delete();

        return Redirect::route('students.index');
    }
}
