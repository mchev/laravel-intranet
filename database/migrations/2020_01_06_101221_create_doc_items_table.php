<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDocItemsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('doc_items', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('doc_id');
            $table->foreign('doc_id')->references('id')->on('docs')->onDelete('cascade');
            $table->string('ref');
            $table->text('description')->nullable();
            $table->string('unit');
            $table->decimal('quantity', 5, 2)->nullable();
            $table->decimal('price', 8, 2)->nullable();
            $table->decimal('tva', 5, 2)->nullable();
            $table->decimal('discount', 5, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('doc_items');
    }
}
