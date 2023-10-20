<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Consultations extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public $timestamps = false;

    protected $hidden = ["doctor_id", "society_id"];

    /**
     * Get the user that owns the Consultations
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function doctor(): BelongsTo
    {
        return $this->belongsTo(Medicals::class, 'doctor_id', 'id');
    }
}
