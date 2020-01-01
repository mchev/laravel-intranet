<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Password extends Model
{
	protected $guarded = [];

    public function customer()
    {
        return $this->belongsTo('App\Customer')->select('id', 'name');
    }
}
