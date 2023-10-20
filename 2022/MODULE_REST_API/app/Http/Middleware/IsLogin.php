<?php

namespace App\Http\Middleware;

use App\Models\Societies;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class IsLogin
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        $user = Societies::where("login_tokens", $request->query("token"))->first();
        if ($user->count() == 0) {
            return response()->json([
                "message" => "Unauthorized user"
            ], 401);
        };
        $request->merge(['user' => $user]);
        return $next($request);
    }
}
