<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up(): void
  {
    Schema::table("processes", function (Blueprint $table) {
      $table->float("initial_cause_value")->nullable();
      $table->float("final_cause_value")->nullable();
      $table->float("initial_fee_value")->nullable();
      $table->float("final_fee_value")->nullable();
    });
  }

  /**
   * Reverse the migrations.
   */
  public function down(): void
  {
    //
  }
};
