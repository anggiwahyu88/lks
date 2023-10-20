<?php

namespace App\Http\Controllers;

use App\Models\Societies;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            "id_card_number" => "required",
            "password" => "required"
        ]);

        $data = Societies::where("id_card_number", $request->id_card_number)->first();
        if (!$data || $data->password != $request->password) {
            return response()->json([
                "message" => "ID Card Number or Password incorrect"
            ], 401);
        };
        $data->update([
            "login_tokens" => md5($data->id_card_number)
        ]);
        $data->regional;
        return response()->json(
            $data,
            200
        );
    }

    public function logout(Request $request)
    {
        $data = Societies::where("login_tokens", $request->query("token"));
        if ($data->count() == 0) {
            return response()->json(
                [
                    "message" => "Invalid token"
                ],
                401
            );
        }
        $data->first()->update(["login_tokens" => null]);
        return response()->json(
            [
                "message" => "Logout success"
            ],
            200
        );
    }
}
