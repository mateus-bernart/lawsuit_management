<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CategorySeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    DB::table('categories')->insert([
      "description" => "Honorários",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('categories')->insert([
      "description" => "Custas Processuais",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('categories')->insert([
      "description" => "Perícia",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('categories')->insert([
      "description" => "Diligência",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('categories')->insert([
      "description" => "Cartório",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
    DB::table('categories')->insert([
      "description" => "Outros",
      'created_at' => now(),
      'updated_at' => now(),
    ]);
  }
}
