<?php

namespace App\Http\Controllers;

use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Http\Request;

use App\Http\Requests;

use Symfony\Component\Process\Process;
use Symfony\Component\Process\Exception\ProcessFailedException;

class UpdateController extends Controller
{

    public function pull(){
        $pull = new Process("git pull origin master");

        $pull->setWorkingDirectory(base_path());

        $pull->run();

        if($pull->isSuccessful()){
            return redirect('/');
        } else {
            throw new ProcessFailedException($pull);
        }
    }

    public function cache(){
        $cache = new Process("php artisan cache:clear");

        $cache->setWorkingDirectory(base_path());

        $cache->run();

        if($cache->isSuccessful()){
            return redirect('/');
        } else {
            throw new ProcessFailedException($cache);
        }
    }

}
