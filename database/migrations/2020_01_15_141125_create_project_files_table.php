<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateProjectFilesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('project_files', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->unsignedBigInteger('project_id');
            $table->foreign('project_id')->references('id')->on('projects')->onDelete('cascade');
            $table->string('title');
            $table->text('comment')->nullable();
            $table->datetime('opened_at');
            $table->datetime('closed_at')->nullable();
            $table->date('estimated_facturation_date')->nullable();
            $table->boolean('is_quoted')->nullable();
            $table->date('facturation_date')->nullable();
            $table->string('invoice_number')->nullable();
            $table->string('invoice_total_ht')->nullable();
            $table->string('invoice_total_purchases')->nullable();
            $table->unsignedBigInteger('state_id');
            $table->foreign('state_id')->references('id')->on('states');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('project_files');
    }
}
