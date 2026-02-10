<?php

namespace App\Providers;

use App\Services\CameraService;
use Dba\Connection;
use Illuminate\Support\ServiceProvider;

class CameraServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     *
     * @return void
     */
    public function register()
    {
        $this->app->singleton('thong-bao', function () {
            return new CameraService();
        });
    }

    /**
     * Bootstrap services.
     *
     * @return void
     */
    public function boot()
    {
        //
    }
}
