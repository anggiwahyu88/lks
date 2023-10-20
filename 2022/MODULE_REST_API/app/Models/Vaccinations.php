<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Vaccinations extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    public $timestamps = false;

    /**
     * Get the user that owns the Vaccinations
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function spot(): BelongsTo
    {
        return $this->belongsTo(Spots::class, 'spot_id', 'id');
    }

    /**
     * Get the user that owns the Vaccinations
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vaccine(): BelongsTo
    {
        return $this->belongsTo(Vaccines::class, 'vaccine_id', 'id');
    }

    /**
     * Get the user that owns the Vaccinations
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function vaccinator(): BelongsTo
    {
        return $this->belongsTo(Medicals::class, 'doctor_id', 'id');
    }
}
