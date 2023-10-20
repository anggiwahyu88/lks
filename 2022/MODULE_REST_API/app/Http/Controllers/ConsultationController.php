<?php

namespace App\Http\Controllers;

use App\Models\Consultations;
use Illuminate\Http\Request;

class ConsultationController extends Controller
{
    public function create(Request $request)
    {
        $request->validate([
            "current_symptoms" => "required"
        ]);
        Consultations::create([
            "society_id" => $request->input("user")->id,
            "disease_history" => $request->disease_history,
            "current_symptoms" => $request->current_symptoms,
        ]);
        return response()->json(
            [
                "message" => "Request consultation sent successful"
            ],
            200
        );
    }
    public function get(Request $request)
    {
        $data = Consultations::where("society_id", $request->input("user")->id)->first();
        if ($data) {
            $data->doctor;
        }

        return response()->json(
            $data,
            200
        );
    }
}
