<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\ResourceCollection;

class SocietiesCollection extends ResourceCollection
{
    /**
     * Transform the resource collection into an array.
     *
     * @return array<int|string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            "name" => '$this->name',
            "born_date" => $this->born_date,
            "gender" => $this->gender,
            "address" => $this->address,
            "token" => $this->login_tokens,
            "regional" => $this->getRegion
        ];
    }
}
