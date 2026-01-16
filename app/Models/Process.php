<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
  protected $fillable = [
    'number',
    'description',
    'status',
    'active',
    'created_at',
    'updated_at',
  ];

  public function financialRecord()
  {
    return $this->hasMany(FinancialRecord::class, 'id_process', 'id');
  }

  public function status()
  {
    return $this->belongsTo(Status::class, 'status', 'id');
  }
}
