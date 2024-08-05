<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Damage extends Model
{
    use HasFactory;
    protected $fillable = ['type'];

    public function repairCosts()
    {
        return $this->hasMany(RepairCost::class);
    }
}
