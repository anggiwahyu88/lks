<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ConsultationController;
use App\Http\Controllers\SpotController;
use App\Http\Controllers\VaccinationsController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::prefix('v1')->group(function () {
    Route::prefix('auth')->group(function () {
        Route::post("/login", [AuthController::class, "login"]);
        Route::post("/logout", [AuthController::class, "logout"]);
    });
    Route::middleware(['IsLogin'])->group(function () {
        Route::post("/consultations", [ConsultationController::class, "create"]);
        Route::get("/consultations", [ConsultationController::class, "get"]);
        Route::get("/spots", [SpotController::class, "index"]);
        Route::get("/spots/{id}", [SpotController::class, "show"]);
        Route::post("/vaccinations", [VaccinationsController::class, "create"]);
        Route::get("/vaccinations", [VaccinationsController::class, "show"]);
    });
    
});
