<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class VaccinationsCollections extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        $spot = $this->spot;
        $spot["regional"] = $this->spot->regional;
        if ($this->vaccinator) {
            $status = "done";
        } else {
            $status = "panding";
        }
        return [
            "queue" => 1,
            "dose" => $this->dose,
            "vaccination_date" => $this->date,
            "spot" => $spot,
            "status" => $status,
            "vaccine" => $this->vaccine,
            "vaccinator" => $this->vaccinator
        ];
    }
}
