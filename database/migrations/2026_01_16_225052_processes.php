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
            $table->foreignId("id_type")->constrained("process_types")->default(1)->onDelete('no action');
            $table->foreignId("id_status")->constrained("process_statuses")->default(1)->onDelete('no action');
            $table->foreignId('id_user')->constrained("users")->onDelete('no action');
            $table->string("number");
            $table->string("description");
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
