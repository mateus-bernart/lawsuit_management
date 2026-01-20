<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcessType extends Model
{
  public $timestamps = true;

  protected $fillable = [
    "description",
    "status",
  ];

  public function processes()
  {
    return $this->hasMany(Process::class, "id_type", "id");
  }
}
