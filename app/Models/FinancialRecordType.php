<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialRecordType extends Model
{
  public $timestamps = true;

  protected $fillable = [
    "description",
    "status",
  ];

  public function financialRecords()
  {
    return $this->hasMany(FinancialRecord::class, "id_type", "id");
  }
}
