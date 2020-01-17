<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class Project extends Model
{

    use SoftDeletes;

    protected $appends = ['total_seconds'];

    public function user()
    {
        return $this->belongsTo('App\User');
    }

    public function customer()
    {
        return $this->belongsTo('App\Customer')->select('id', 'name')->orderBy('name');
    }

    public function type()
    {
        return $this->belongsTo('App\Type')->select('id', 'label');
    }

    public function state()
    {
        return $this->belongsTo('App\State')->select('id', 'label');
    }

	public function parent()
	{
		return $this->belongsTo('App\Project', 'parent_id')->select('id', 'name');
	}

    public function children()
    {
        return $this->hasMany('App\Project', 'parent_id');
    }

    public function hours()
    {
        return $this->hasMany('App\Hour');
    }

    public function getTotalSecondsAttribute()
    {
        $hours = $this->hasMany('App\Hour')
            ->selectRaw('hours.project_id, SUM(TIME_TO_SEC(hours.time)) as total')
            ->groupBy('hours.project_id')
            ->first();

        return $hours['total'];
    }

    public function files()
    {
        return $this->hasMany('App\ProjectFile')->with('state');
    }

}