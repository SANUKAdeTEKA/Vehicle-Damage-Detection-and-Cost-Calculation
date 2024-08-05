<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Vehicle;
use App\Models\Damage;
use App\Models\RepairCost;

class RepairCostController extends Controller
{
    public function getCosts(Request $request)
    {
        $request->validate([
            'brand' => 'required|string',
            'model' => 'required|string',
            'make_year' => 'required|integer',
            'damage_type' => 'required|string',
        ]);

        $vehicle = Vehicle::where('brand', $request->brand)
                          ->where('model', $request->model)
                          ->where('make_year', $request->make_year)
                          ->first();

        if (!$vehicle) {
            return response()->json(['error' => 'Vehicle not found'], 404);
        }

        $damage = Damage::where('type', $request->damage_type)->first();

        if (!$damage) {
            return response()->json(['error' => 'Damage type not found'], 404);
        }

        $repairCost = RepairCost::where('vehicle_id', $vehicle->id)
                                ->where('damage_id', $damage->id)
                                ->first();

        if (!$repairCost) {
            return response()->json(['error' => 'Repair cost not found'], 404);
        }

        return response()->json(['cost' => $repairCost->cost]);
    }
}
