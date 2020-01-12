<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Task extends Model
{
	
    use SoftDeletes;

    protected $fillable = ['name', 'description', 'due_date', 'board_id', 'project_id', 'user_id', 'order'];

    public function category() {
        return $this->hasOne(Category::class);
    }

    public function user() {
        return $this->belongsTo(User::class);
    }

    public function comments() {
        return $this->hasMany(TaskComment::class)->orderBy('created_at', 'DESC');
    }

    public function checklists() {
        return $this->hasMany(TaskChecklist::class)->orderBy('created_at', 'DESC');
    }

    public function tags() {
        return $this->belongsToMany(Tag::class, 'task_tags')->withTimestamps();
    }

    public function project() {
        return $this->belongsTo(Project::class)->select('id', 'customer_id', 'name')->with('customer');
    }

    public function checklist_checked() {
        return $this->hasMany(TaskChecklist::class)->where('checked', true);
    }

    public function checklist_total() {
        return $this->hasMany(TaskChecklist::class);
    }


}