<?php

namespace App\Http\Controllers;

use App\Http\Resources\VaccinationsCollections;
use App\Models\Consultations;
use App\Models\Vaccinations;
use Carbon\Carbon;
use Illuminate\Http\Request;

class VaccinationsController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            "spot_id" => "required",
            "date" => "required",
        ]);



        $consultations = Consultations::where("society_id", $request->input("user")->id)->first();
        if ($consultations->status != "accepted") {
            return response()->json(
                [
                    "message" => "Your consultation must be accepted by doctor before"
                ],
                401
            );
        }
        $vacsinations = Vaccinations::where('society_id',  $request->input("user")->id)->get();
        if ($vacsinations->count() >= 2) {
            return response()->json(
                [
                    "message" => "Society has been 2x vaccinated"
                ],
                401
            );
        }
        if ($vacsinations->count() == 0) {
            Vaccinations::create([
                "dose" => $vacsinations->count() + 1,
                "date" => $request->date,
                "society_id" => $request->input("user")->id,
                "spot_id" => $request->spot_id,
            ]);
            if ($vacsinations->count() + 1 == 2) {
                return response()->json(
                    [
                        "message" => "Second vaccination registered successful"
                    ],
                    200
                );
            } else {
                return response()->json(
                    [
                        "message" => "First vaccination registered successful"
                    ],
                    200
                );
            }
        };

        $givenDate = Carbon::parse($vacsinations[0]->date);
        $currentDate = Carbon::now();
        if ($currentDate->diffInDays($givenDate) <= 30) {
            return response()->json(
                [
                    "message" => "Wait at least +30 days from 1st Vaccination"
                ],
                401
            );
        }

        Vaccinations::create([
            "dose" => $vacsinations->count() + 1,
            "date" => $request->date,
            "society_id" => $request->input("user")->id,
            "spot_id" => $request->spot_id,
        ]);

        if ($vacsinations->count() + 1 == 2) {
            return response()->json(
                [
                    "message" => "Second vaccination registered successful"
                ],
                200
            );
        } else {
            return response()->json(
                [
                    "message" => "First vaccination registered successful"
                ],
                200
            );
        }
    }

    public function show(Request $request)
    {
        $data = VaccinationsCollections::collection(Vaccinations::where("society_id", $request->input("user")->id)->get());

        $obj_response = [
            "first" => null,
            "second" => null,
        ];
        if ($data->count() - 1 >= 0) {
            $obj_response["first"] = $data[0];
        }
        if ($data->count() - 2 == 0) {
            $obj_response["second"] = $data[1];

        }
        return response()->json($obj_response);
    }
}
