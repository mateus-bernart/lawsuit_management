<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProcessStatusSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('process_statuses')->insert([
      "description" => "Em andamento",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('process_statuses')->insert([
      "description" => "Aguardando",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('process_statuses')->insert([
      "description" => "Suspenso",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('process_statuses')->insert([
      "description" => "Arquivado",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('process_statuses')->insert([
      "description" => "Finalizado",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
  }
}
