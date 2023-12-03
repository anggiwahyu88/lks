<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Societies extends Model
{
    use HasFactory;
    protected $guarded = ["id"];

    protected $hidden = [
        'id_card_number',
        'password',
        'id',
    ];
    public $timestamps = false;

//     /**
//      * Get the user that owns the Societies
//      *
//      * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
//      */
//     public function getRegion(): BelongsTo
//     {
//         return $this->belongsTo(Regionals::class, 'regional_id', 'id');
//     }
 }
