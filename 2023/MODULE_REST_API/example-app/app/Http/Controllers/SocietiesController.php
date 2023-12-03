<?php

namespace App\Http\Controllers;

use App\Http\Resources\SocieCollection;
use App\Http\Resources\SocietiesCollection;
use App\Models\Societies;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class SocietiesController extends Controller
{
    public function login(Request $request)
    {
        // $societies = new SocieCollection(Societies::where('id_card_number', $request->id_card_number)->first());
        // if ($societies->count() <= 0 || $request->password != $societies->password) return response()->json([
        //     "message" => "ID Card Number or Password incorrect"
        // ], 401);
        // $societies->update([
        //     "login_tokens" => md5($societies->id_card_number)
        // ]);
        // $societies->getRegion;
        $user = [
            "p"=>"1",
        ];
        return SocieCollection::collection(User::all());
        
        // return  $societies;
    }

    public function logout(Request $request)
    {
        $societies = Societies::where('login_tokens', $request->query('token'))->first();
        if ($societies == null  || !$request->query('token')) {
            return response()->json([
                "message" => "ID Card Number or Password incorrect"
            ], 401);
        }
        $societies->update([
            'login_tokens' => null
        ]);
        return response()->json([
            "message" => "Logout success"
        ]);
    }
}
