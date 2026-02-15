<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class UserController extends Controller
{
    public function index(Request $request)
    {
        $perPage = $request->input('per_page', 15);
        $search = $request->input('search', '');
        $sortBy = $request->input('sort_by', 'name');
        $sortOrder = $request->input('sort_order', 'asc');
        $users = User::query()
            ->when($search, fn($query) => $query->where('name', 'like', "%{$search}%")->orWhere('email', 'like', "%{$search}%"))
            ->orderBy($sortBy, $sortOrder)
            ->paginate($perPage);
        return Inertia::render('users/index', [
            'users'=> $users,
            'filters' => [
                'per_page' => $perPage,
                'search' => $search,
                'sort_by' => $sortBy,
                'sort_order' => $sortOrder,
            ],
            'can' => [
                'createUser' => $request->user()->can('create', User::class),
                'editUser' => $request->user()->can('update', User::class),
                'deleteUser' => $request->user()->can('delete', User::class),
            ],
        ]);
    }
}
