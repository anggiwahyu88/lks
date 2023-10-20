<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Spot_vaccines extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    /**
     * Get the user that owns the Spots_vaccines
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vaccines(): BelongsTo
    {
        return $this->belongsTo(Vaccines::class, 'vaccine_id', 'id');
    }
}
