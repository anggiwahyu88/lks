<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Spots extends Model
{
    use HasFactory;
    protected $guarded = ["id"];
    protected $hidden =["regional_id"];

    /**
     * Get the user that owns the Spots
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function regional(): BelongsTo
    {
        return $this->belongsTo(Regionals::class, 'regional_id', 'id');
    }
}
