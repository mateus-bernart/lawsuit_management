<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Process extends Model
{
  public $timestamps = true;

  protected $fillable = [
    'id_type',
    'id_status',
    'id_user',
    'number',
    'description',
    'active',
    'initial_cause_value',
    'final_cause_value',
    'initial_fee_value',
    'final_fee_value',
  ];

  public function financialRecord()
  {
    return $this->hasMany(FinancialRecord::class, 'id_process', 'id');
  }

  public function statuses()
  {
    return $this->belongsTo(ProcessStatus::class, 'id_status', 'id');
  }

  public function type()
  {
    return $this->belongsTo(ProcessType::class, 'id_type', 'id');
  }

  public function user()
  {
    return $this->belongsTo(User::class, 'id_user', 'id');
  }
}
