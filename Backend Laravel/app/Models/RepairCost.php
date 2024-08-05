<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class RepairCost extends Model
{
    use HasFactory;
    protected $fillable = ['vehicle_id', 'damage_id', 'cost'];

    public function vehicle()
    {
        return $this->belongsTo(Vehicle::class);
    }

    public function damage()
    {
        return $this->belongsTo(Damage::class);
    }
}
