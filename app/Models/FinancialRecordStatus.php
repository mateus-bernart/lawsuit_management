<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialRecordStatus extends Model
{
  public $timestamps = true;

  protected $fillable = [
    'description',
    'status',
  ];

  public function financialRecord()
  {
    return $this->belongsTo(FinancialRecord::class, 'id_status', 'id');
  }
}
