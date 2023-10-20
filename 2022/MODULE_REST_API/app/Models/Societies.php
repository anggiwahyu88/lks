<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Societies extends Model
{
    use HasFactory;

    protected $guarded = ["id"];
    public $timestamps = false;

    protected $hidden = ["password", "id_card_number", "id", "regional_id"];


    /**
     * Get the regionals that owns the Societies
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function regional(): BelongsTo
    {
        return $this->belongsTo(Regionals::class, 'regional_id', 'id');
    }
}
