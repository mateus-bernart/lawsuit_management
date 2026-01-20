<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FinancialRecordStatusSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('financial_record_statuses')->insert([
      "description" => "Pendente",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('financial_record_statuses')->insert([
      "description" => "Pago",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('financial_record_statuses')->insert([
      "description" => "Cancelado",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
  }
}
