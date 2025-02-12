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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->cascadeOnDelete()->comment('task added by');
            $table->text('title')->nullable();
            $table->text('description')->nullable();
            $table->enum('status', ['pending', 'completed'])->default('pending');
            $table->enum('priority', ['highest', 'high', 'medium', 'low', 'lowest']);
            $table->unsignedBigInteger('assign_to');
            $table->foreign('assign_to')->references('id')->on('users')->onDelete('cascade');
            $table->tinyInteger('is_active')->default(true)->comment('1->active 0->inactive');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
