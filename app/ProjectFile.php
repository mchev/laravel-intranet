<?php

namespace App;

use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;


class ProjectFile extends Model
{
    use SoftDeletes;

    protected $appends = ['hours'];

    protected $guarded = [];

    protected $casts = [
        'invoice_total' => 'float',
        'invoice_estimated' => 'float'
    ];

    public function project()
    {
        return $this->belongsTo('App\Project')->with('customer');
    }

    public function state()
    {
        return $this->belongsTo('App\State');
    }

    public function estimate()
    {
        return $this->hasOne('App\Doc')->where('type', 'estimate');
    }

    public function invoice()
    {
        return $this->hasOne('App\Doc')->where('type', 'invoice');
    }

    public function getHoursAttribute() {

    	$start = Carbon::parse($this->opened_at)->startOfDay();
    	$end = ($this->closed_at) ? Carbon::parse($this->closed_at)->endOfDay() : Carbon::now();

      	return \App\Hour::where('project_id', $this->project_id)
      						->whereBetween('date', [$start, $end])
      						->sum(DB::raw("TIME_TO_SEC(time)"));

    }

}
