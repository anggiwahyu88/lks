<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Medicals extends Model
{
    use HasFactory;
    protected $guarded=["id"];
    protected $hidden = ["user_id", "spot_id"];

}
