<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Hour extends Model
{

	protected $dates = ['date'];

    public function project()
    {
        return $this->belongsTo('App\Project')->select('id', 'customer_id', 'name')->with('customer')->withTrashed();
    }

    public function user()
    {
        return $this->belongsTo('App\User')->select('id', 'name');
    }
    
}
