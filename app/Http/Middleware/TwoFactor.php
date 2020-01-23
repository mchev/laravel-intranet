<?php

namespace App\Http\Middleware;

use Closure;

class TwoFactor
{

    public function handle($request, Closure $next)
    {
        $user = auth()->user();

        $settings = app('settings');

        if (empty($settings->company_ip) || ($request->ip() != $settings->company_ip) ) {

            if(auth()->check() && $user->two_factor_code)
            {
                if($user->two_factor_expires_at->lt(now()))
                {
                    $user->resetTwoFactorCode();
                    auth()->logout();

                    return redirect()->route('login')
                        ->withMessage('Le code à deux facteurs a expiré. Veuillez vous connecter à nouveau.');
                }

                if(!$request->is('verify*'))
                {
                    return redirect()->route('verify.index');
                }
            }

        }

        return $next($request);
    }

}
