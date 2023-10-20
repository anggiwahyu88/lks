<?php

namespace App\Http\Controllers;

use App\Http\Resources\SpotsColection;
use App\Models\Spots;
use App\Models\Vaccinations;
use App\Models\Vaccines;
use Carbon\Carbon;
use Illuminate\Http\Request;

class SpotController extends Controller
{
    public function index(Request $request)
    {
        $data_spots = SpotsColection::collection(Spots::where("regional_id", $request->input("user")->regional_id)->get());

        return $data_spots;
    }
    public function show(Request $request, $id)
    {
        if(!$request->query("date")){
            $date = Carbon::now()->format('Y-m-d');
        }else{
            $date=$request->query("date");
        }
        // dd($date);
        $data = Spots::findorfail($id);
        $count = Vaccinations::where('date', $date)->where('spot_id',$id)->count();
        return response()->json([
            "date"=> (new Carbon($date))->format('F j, Y'),
            "spot" => $data,
            "vaccinations_count"=>$count
        ], 200);
    }
}
