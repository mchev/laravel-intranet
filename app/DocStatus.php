<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DocStatus extends Model
{

	protected $guarded = [];

    public function docs()
    {
        return $this->belongsToMany('App\Doc');
    }

}