<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class FinancialRecordSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('financial_records')->insert([
      "id_type" => 1,
      "id_category" => 2,
      "id_process" => 1,
      "id_status" => 1,
      "id_user" => 1,
      "value" => 134.652,
      "description" => "Processo da Janete",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('financial_records')->insert([
      "id_type" => 2,
      "id_category" => 3,
      "id_process" => 2,
      "id_status" => 2,
      "id_user" => 1,
      "value" => 134.652,
      "description" => "Processo da Margarete",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
  }
}
