<?php

namespace App\Http\Controllers;

use App\Models\Teacher;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;

class TeacherController extends Controller
{
    public function index()
    {
        $tenantId = Auth::user()->tenant_id;
        $teachers = Teacher::where( 'tenant_id', $tenantId)->get();
        return Inertia::render('teachers/index', [
            'tenant_id' => $tenantId,
            'teachers' => $teachers,
        ]);
    }
    public function store(Request $request)
    {
        $tenantId = Auth::user()->tenant_id;

        $validated =$request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'subject' => 'required|string|max:50',
        ]);
        $validated['tenant_id'] = $tenantId;

        Teacher::create( $validated );

        return Redirect::route('teachers.index');
    }

    public function update(Request $request, $id)
    {
        $tenantId = Auth::user()->tenant_id;
        $teacher = Teacher::where( 'tenant_id', $tenantId)->findOrFail($id);

        $validated = $request->validate([
            'first_name' => 'required|string|max:50',
            'last_name' => 'required|string|max:50',
            'subject' => 'required|string|max:50',
        ]);

        $teacher->update($validated);

        return Redirect::route('teachers.index');
    }
    public function destroy($id)
    {
        $tenantId = Auth::user()->tenant_id;
        $teacher = Teacher::where( 'tenant_id', $tenantId)->findOrFail($id);
        $teacher->delete();

        return Redirect::route('teachers.index');
    }
}
