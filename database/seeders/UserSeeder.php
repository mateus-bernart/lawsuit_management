<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;

class UserSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    User::factory()->create([
      'name' => 'Mateus Bernart',
      'email' => 'mateusbernart14@gmail.com',
      'password' => 'mateus2004@',
    ]);
  }
}
