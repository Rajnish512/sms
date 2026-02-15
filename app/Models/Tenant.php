<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tenant extends Model
{
    use HasFactory;
    public $primaryKey = 'tenant_id';

    protected $fillable = [
        'school_name',
        'address',
    ];
}
