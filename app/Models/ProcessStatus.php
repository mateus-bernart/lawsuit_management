<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class ProcessStatus extends Model
{
  public $timestamps = true;

  protected $fillable = [
    'description',
    'status',
  ];

  public function process()
  {
    return $this->belongsTo(Process::class, 'id_status', 'id');
  }
}
