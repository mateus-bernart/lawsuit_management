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
        Schema::create("processes", function (Blueprint $table) {
            $table->id();
            $table->string("number");
            $table->string("description");
            $table->foreignId("status")->constrained("status")->default(1)->onDelete('no action');
            $table->integer("active")->default(1);
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
