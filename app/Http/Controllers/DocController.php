<?php

namespace App\Http\Controllers;

use App\Doc;
use App\DocItem;
use App\ProjectFile;
use Illuminate\Http\Request;

class DocController extends Controller
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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function create(Request $request)
    {

        $file = ProjectFile::with('project')->find($request->file);
        $type = $request->type;

        return view('accounts.docs.create', compact('type', 'file'));
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $from = app('settings')->company_name . '<br>' . app('settings')->company_street . '<br>' . app('settings')->company_zip_code . ' ' . app('settings')->company_city;
        $to = $request->invoice['customer']['name'] . '<br>' . $request->invoice['customer']['street'] . '<br>' . $request->invoice['customer']['zip_code'] . ' ' . $request->invoice['customer']['city'];

        $invoice = new Doc;

        $invoice->user_id = auth()->user()->id;

        $invoice->title = $request->invoice['title'];

        $invoice->customer_id = $request->invoice['customer']['id'];
        $invoice->project_id = $request->invoice['project_id'];
        $invoice->project_file_id = $request->invoice['project_file_id'];
        $invoice->status_id = $request->invoice['status_id'];

        $invoice->from = $from;
        $invoice->to = $to;

        $invoice->type = $request->invoice['type'];
        $invoice->ref = $request->invoice['ref'];
        $invoice->comments = $request->invoice['comments'];
        $invoice->created_at = $request->invoice['created_at'];
        $invoice->expire_at = $request->invoice['expire_at'];

        $invoice->save();

        foreach ($request->items as $item) {
            if ($item['ref']) {
                $docItem = new DocItem;
                $docItem->doc_id = $invoice->id;
                $docItem->ref = $item['ref'];
                $docItem->description = $item['description'];
                $docItem->unit = $item['unit'];
                $docItem->quantity = $item['quantity'];
                $docItem->price = $item['price'];
                $docItem->tva = $item['tva'];
                $docItem->discount = $item['discount'];
                $docItem->save();
            }
        }

        $invoice->items;

        return response()->json($invoice);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Doc  $doc
     * @return \Illuminate\Http\Response
     */
    public function show(Doc $doc)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Doc  $doc
     * @return \Illuminate\Http\Response
     */
    public function edit(Doc $doc)
    {
        return view('accounts.docs.edit', comptact('doc'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Doc  $doc
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Doc $doc)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Doc  $doc
     * @return \Illuminate\Http\Response
     */
    public function destroy(Doc $doc)
    {
        //
    }
}
