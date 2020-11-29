<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Illuminate\Contracts\Auth\CanResetPassword;
use Laravel\Passport\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name', 'email', 'password', 'is_admin', 'email_verified_at', 'two_factor_code', 'two_factor_expires_at',
    ];

    protected $dates = [
        'updated_at', 'created_at', 'email_verified_at', 'two_factor_expires_at'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'password', 'remember_token',
    ];

    /**
     * The attributes that should be cast to native types.
     *
     * @var array
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function generateTwoFactorCode()
    {
        $this->timestamps = false;
        $this->two_factor_code = rand(100000, 999999);
        $this->two_factor_expires_at = now()->addMinutes(10);
        $this->save();
    }

    public function resetTwoFactorCode()
    {
        $this->timestamps = false;
        $this->two_factor_code = null;
        $this->two_factor_expires_at = null;
        $this->save();
    }

    public function tasks() {
        return $this->hasMany(Task::class, 'board_id')
                    ->orderBy('order', 'ASC')
                    ->orderBy('updated_at', 'DESC')
                    ->with('project')
                    ->with('tags')
                    ->withCount('checklist_total')
                    ->withCount('checklist_checked');
    }

    public function weekHours() {
        return $this->hasMany(Hour::class)
                    ->whereBetween('date', [Carbon::now()->startOfWeek(), Carbon::now()->endOfWeek()])
                    ->sum(DB::raw("TIME_TO_SEC(time)"));
    }

    public function monthHours() {
        return $this->hasMany(Hour::class)
                    ->whereBetween('date', [Carbon::now()->startOfMonth(), Carbon::now()->endOfMonth()])
                    ->sum(DB::raw("TIME_TO_SEC(time)"));
    }
    
}
