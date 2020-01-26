<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddTotalsToDocs extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('docs', function (Blueprint $table) {
            $table->decimal('total', 8, 2)->nullable();
            $table->decimal('discount', 8, 2)->nullable();
            $table->decimal('tva', 8, 2)->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('docs', function (Blueprint $table) {
            $table->dropColumn('total');
            $table->dropColumn('discount');
            $table->dropColumn('tva');
        });
    }
}
