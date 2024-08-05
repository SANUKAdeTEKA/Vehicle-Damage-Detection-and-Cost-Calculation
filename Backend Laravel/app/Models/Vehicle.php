<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Vehicle extends Model
{
    use HasFactory;
    protected $fillable = ['brand', 'model', 'make_year'];

    public function repairCosts()
    {
        return $this->hasMany(RepairCost::class);
    }
}
