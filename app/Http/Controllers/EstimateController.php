<?php

namespace App\Http\Controllers;

use App\Doc;
use App\DocItem;
use Illuminate\Http\Request;

class EstimateController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('accounts.estimates.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\DocItem  $docItem
     * @return \Illuminate\Http\Response
     */
    public function show(DocItem $docItem)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\DocItem  $docItem
     * @return \Illuminate\Http\Response
     */
    public function edit(DocItem $docItem)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\DocItem  $docItem
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, DocItem $docItem)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\DocItem  $docItem
     * @return \Illuminate\Http\Response
     */
    public function destroy(DocItem $docItem)
    {
        //
    }
}
