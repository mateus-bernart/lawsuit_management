<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class ProcessTypeSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('process_types')->insert([
      "description" => "Cível",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('process_types')->insert([
      "description" => "Trabalhista",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('process_types')->insert([
      "description" => "Criminal",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('process_types')->insert([
      "description" => "Família",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('process_types')->insert([
      "description" => "Tributário",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
  }
}
