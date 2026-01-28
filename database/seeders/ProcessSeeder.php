<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProcessSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('processes')->insert([
      "number" => '0001234-56.2024.8.26.0100',
      "description" => "Processo Judicial Exemplo",
      "id_type" => 1,
      "id_status" => 1,
      "id_user" => 1,
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('processes')->insert([
      "number" => '0005678-90.2024.8.26.0100',
      "description" => "Processo Judicial Exemplo 2",
      "id_type" => 2,
      "id_status" => 2,
      "id_user" => 1,
      'created_at' => now(),
      'updated_at' => now(),
    ]);
  }
}
