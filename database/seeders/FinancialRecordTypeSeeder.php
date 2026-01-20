<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FinancialRecordTypeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('financial_record_types')->insert([
      "description" => "Receita",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('financial_record_types')->insert([
      "description" => "Despesa",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
  }
}
