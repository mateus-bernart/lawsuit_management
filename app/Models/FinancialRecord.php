<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialRecord extends Model
{
  public $timestamps = true;

  protected $fillable = [
    'id_type',
    'id_category',
    'id_process',
    'id_status',
    'value',
    'description',
  ];

  public function process()
  {
    return $this->belongsTo(Process::class, 'id_process', 'id');
  }

  public function statuses()
  {
    return $this->belongsTo(FinancialRecordStatus::class, 'id_status', 'id');
  }

  public function category()
  {
    return $this->belongsTo(Category::class, 'id_category', 'id');
  }

  public function type()
  {
    return $this->belongsTo(FinancialRecordType::class, 'id_type', 'id');
  }
}
