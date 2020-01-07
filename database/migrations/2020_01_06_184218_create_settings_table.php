<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateSettingsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('settings', function (Blueprint $table) {
            $table->bigIncrements('id');
            $table->string('company_name');
            $table->string('company_phone');
            $table->string('company_email');
            $table->string('company_street');
            $table->string('company_zip_code');
            $table->string('company_city');
            $table->string('company_siret');
            $table->string('company_iban');
            $table->string('company_tva');
            $table->string('company_logo_url');
            $table->string('background_color');
            $table->string('lang');

            $table->timestamps();
        });

        // Create the setting row
        DB::table('settings')->insert(
            array(
                'company_name' => 'Intranet',
                'lang' => 'fr',
                'background_color' => '#b04632'
            )
        );

    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('settings');
    }
}
