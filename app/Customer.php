<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{

    protected $guarded = [];

    public function projects()
    {
        return $this->hasMany('App\Project')
        			->orderBy('updated_at', 'DESC')
        			->with('type', 'state');
    }

}
