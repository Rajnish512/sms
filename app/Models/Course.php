<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class Course extends Model
{
    use HasFactory;
    public $primaryKey = 'course_id';

    protected $fillable = [
        'tenant_id',
        'course_name',
        'teacher_id',
    ];
}
