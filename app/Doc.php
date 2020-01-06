<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Doc extends Model
{

	protected $guarded = [];

    public function status()
    {
        return $this->hasOne('App\DocStatus');
    }

    public function project()
    {
    	return $this->hasOne('App\Project');
    }

    public function customer()
    {
    	return $this->hasOne('App\Customer');
    }

}
