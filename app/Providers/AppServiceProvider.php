<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Support\Facades\Auth;    // Must Must use
use Illuminate\Support\Facades\Blade;   // Must Must use

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     *
     * @return void
     */
    public function register()
    {
        //
    }

    /**
     * Bootstrap any application services.
     *
     * @return void
     */
    public function boot()
    {
        View()->composer('*', function ($view){
            $settings = \App\Setting::first(); 
            $view->with(['settings'=>$settings]);
        });

        Blade::if('admin', function () {
            return auth()->check() && auth()->user()->is_admin == 1;
        });

    }
}
