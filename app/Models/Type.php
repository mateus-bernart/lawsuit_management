<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Type extends Model
{
  protected $fillable = [
    "id",
    "description",
    "status",
    "created_at",
    "updated_at"
  ];

  public function financialRecords()
  {
    return $this->hasMany(FinancialRecord::class, "id_type", "id");
  }
}
