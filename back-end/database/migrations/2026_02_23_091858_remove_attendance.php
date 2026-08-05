<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::dropIfExists('attendance');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        // Tạo lại bảng khi rollback
        Schema::create('attendance', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->dateTime('check_in')->nullable();
            $table->dateTime('check_out')->nullable();
            $table->string('image');
            $table->timestamps();

            $table->foreign('user_id')->references('employeeNo')->on('users')->onDelete('cascade');
        });
    }
};
