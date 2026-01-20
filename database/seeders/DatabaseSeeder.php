<?php

namespace Database\Seeders;

use App\Models\ProcessType;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            ProcessTypeSeeder::class,
            FinancialRecordTypeSeeder::class,
            CategorySeeder::class,
            FinancialRecordStatusSeeder::class,
            ProcessStatusSeeder::class,
            ProcessSeeder::class,
            FinancialRecordSeeder::class
        ]);
    }
}
