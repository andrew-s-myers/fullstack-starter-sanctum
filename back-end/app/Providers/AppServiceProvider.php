<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;
use Illuminate\Foundation\Testing\TestCommand;

class AppServiceProvider extends ServiceProvider
{
	/**
	 * Register any application services.
	 */
	public function register(): void
	{
		if ($this->app->runningInConsole()) {
			$this->commands([
				TestCommand::class,
			]);
		}
	}

	/**
	 * Bootstrap any application services.
	 */
	public function boot(): void
	{
		// nothing needed here
	}
}
