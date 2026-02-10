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
        Schema::table('log_user_event', function (Blueprint $table) {
            $table->dropUnique('log_user_event_employeeno_unique');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('log_user_event', function (Blueprint $table) {
            $table->unique('employeeNo', 'log_user_event_employeeno_unique');
        });
    }
};
