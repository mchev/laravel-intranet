<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class Tag extends Model
{

	protected $guarded = [];
	
    public function tasks() {
        return $this->belongsToMany(Task::class, 'task_tags')->withTimestamps();
    }
}
