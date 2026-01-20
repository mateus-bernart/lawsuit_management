<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
  public $timestamps = true;

  protected $fillable = [
    "id",
    "description",
    "status",
  ];

  public function financialRecords()
  {
    return $this->hasMany(FinancialRecord::class, "id_category", "id");
  }

  public function processes()
  {
    return $this->hasMany(Process::class, "id_category", "id");
  }
}
