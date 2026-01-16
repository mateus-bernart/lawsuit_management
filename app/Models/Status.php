<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Status extends Model
{
  protected $fillable = [
    'description',
    'status',
    'created_at',
    'updated_at',
  ];

  public function process()
  {
    return $this->belongsTo(Process::class, 'status', 'id');
  }

  public function financialRecord()
  {
    return $this->belongsTo(FinancialRecord::class, 'status', 'id');
  }
}
