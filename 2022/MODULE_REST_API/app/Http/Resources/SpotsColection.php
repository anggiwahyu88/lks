<?php

namespace App\Http\Resources;

use App\Models\Spot_vaccines;
use App\Models\Vaccines;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class SpotsColection extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $vaccines_response = [];
        Vaccines::all()->map(function ($value) use (&$vaccines_response) {
            $vaccines_response[$value->name] = false;
        });
        $vaccines = Spot_vaccinesColection::collection(Spot_vaccines::where('spot_id', $this->id)->get());
        $vaccines->map(function($value) use (&$vaccines_response){
            $vaccines_response[$value->vaccines->name] = true;
        });
        return [
            "id" => $this->id,
            "name" => $this->name,
            "address" => $this->address,
            "serve" => $this->serve,
            "capacity" => $this->capacity,
            "available_vaccines" => $vaccines_response
        ];
    }
}
