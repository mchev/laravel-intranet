<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class TaskComment extends Model
{
    public function task() {
        return $this->belongsTo(Task::class);
    }
}
