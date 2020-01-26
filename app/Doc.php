<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Doc extends Model
{

	protected $guarded = [];

    protected $casts = [
        'total' => 'float',
        'discount' => 'float',
        'tva' => 'float',
    ];

    public function status()
    {
        return $this->belongsTo('App\DocStatus');
    }

    public function project()
    {
    	return $this->hasOne('App\Project');
    }

    public function customer()
    {
        return $this->belongsTo('App\Customer');
    }

    public function user()
    {
        return $this->hasOne('App\User');
    }

    public function items()
    {
        return $this->hasMany('App\DocItem');
    }

    public function nextref($type)
    {

        // (D-001-YYYY) - (F-001-YYYY)

        // if new exercice Y + 1; if (Y)

        //get last record
        $record = Doc::where('type', $type)->latest()->first();
        $expNum = explode('-', $record->ref);

        $business_year_month = app('settings')->business_year_month;
        $business_year_day = app('settings')->business_year_day;

        //Check and of exercise (15/07)
        if ( date('l',strtotime(date('Y-07-15'))) ){
            $next = date('Y').'-0001';
        } else {
            //increase 1 with last invoice number
            $next = $expNum[0].'-'. $expNum[1]+1;
        }

        return $this->hasMany('App\DocItem');
    }

}
