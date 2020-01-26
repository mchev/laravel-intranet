<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DocItem extends Model
{

    public function doc()
    {
        return $this->belongsTo('App\Doc');
    }

}
