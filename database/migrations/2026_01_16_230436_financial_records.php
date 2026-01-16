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
        Schema::create("financial_records", function (Blueprint $table) {
            $table->id();
            $table->foreignId("id_type")->constrained("types")->noActionOnDelete();
            $table->foreignId("id_category")->constrained("categories")->noActionOnDelete();
            $table->foreignId("id_process")->constrained("processes")->noActionOnDelete();
            $table->foreignId("id_status")->constrained("status")->default(1)->onDelete('no action');
            $table->float("value");
            $table->string("description");
            $table->timestamps();
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
