<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class FinancialRecord extends Model
{
  protected $fillable = [
    'id_type',
    'id_category',
    'id_process',
    'value',
    'description',
    'status',
    'created_at',
    'updated_at',
  ];

  public function process()
  {
    return $this->belongsTo(Process::class, 'id_process', 'id');
  }

  public function status()
  {
    return $this->belongsTo(Status::class, 'status', 'id');
  }

  public function category()
  {
    return $this->belongsTo(Category::class, 'id_category', 'id');
  }

  public function type()
  {
    return $this->belongsTo(Type::class, 'id_type', 'id');
  }
}
