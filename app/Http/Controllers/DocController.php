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
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function list(Request $request)
    {
        $request->order = (isset($request->order)) ? $request->order : 'updated_at';

        if ($request->q) {
            $docs = Doc::where('type', $request->type)
                        ->where('ref', 'like', '%' . $request->q . '%')
                        ->orderBy($request->order, 'DESC')
                        ->paginate($request->paginate);
        } else {
            $docs = Doc::where('type', $request->type)
                        ->orderBy($request->order, 'DESC')
                        ->with(['status', 'customer'])
                        ->paginate($request->paginate);
        }

        return response()->json($docs);
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
        $doc_ref = $this->nextref($request->type);

        return view('accounts.docs.create', compact('type', 'file', 'doc_ref'));
    }

    public function from()
    {
        $from = app('settings')->company_name . '<br>' . app('settings')->company_street . '<br>' . app('settings')->company_zip_code . ' ' . app('settings')->company_city;

        return $from;
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $to = $request->customer['name'] . '<br>' . $request->customer['street'] . '<br>' . $request->customer['zip_code'] . ' ' . $request->customer['city'];

        $doc = new Doc;

        $doc->user_id = auth()->user()->id;

        $doc->title = $request->title;

        $doc->customer_id = $request->customer['id'];
        $doc->project_id = $request->project_id;
        $doc->project_ref = $request->project_ref;
        $doc->project_file_id = $request->project_file_id;
        $doc->status_id = 1;

        $doc->from = $this->from();
        $doc->to = $to;

        $doc->type = $request->type;
        $doc->ref = $this->nextref($request->type);
        $doc->comments = $request->comments;
        $doc->date = $request->date;
        $doc->expire_at = $request->expire_at;

        $doc->total = $request->total;
        $doc->discount = $request->discount;
        $doc->tva = $request->tva;

        $doc->save();

        foreach ($request->items as $item) {
            if ($item['ref']) {
                $docItem = new DocItem;
                $docItem->doc_id = $doc->id;
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


        return response()->json($doc);
        
    }

    /**
     * Display the specified resource.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Doc  $doc
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, Doc $doc)
    {
        
        $doc->items;
        $doc->customer;

        if($request->ajax()){
            return response()->json($doc);
        } else {
            return view('accounts.docs.show', compact('doc'));
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Doc  $doc
     * @return \Illuminate\Http\Response
     */
    public function edit(Doc $doc)
    {
        return view('accounts.docs.edit', compact('doc'));
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

        $to = $request->customer['name'] . '<br>' . $request->customer['street'] . '<br>' . $request->customer['zip_code'] . ' ' . $request->customer['city'];

        $doc->user_id = auth()->user()->id;

        $doc->title = $request->title;

        $doc->customer_id = $request->customer['id'];
        $doc->project_id = $request->project_id;
        $doc->project_ref = $request->project_ref;
        $doc->project_file_id = $request->project_file_id;
        $doc->status_id = $request->status_id;

        $doc->from = $this->from();
        $doc->to = $to;

        $doc->type = $request->type;
        $doc->ref = $this->nextref($request->type);
        $doc->comments = $request->comments;
        $doc->date = $request->date;
        $doc->expire_at = $request->expire_at;

        $doc->total = $request->total;
        $doc->discount = $request->discount;
        $doc->tva = $request->tva;

        $doc->update();

        $doc->items()->delete();

        foreach ($request->items as $item) {
            if ($item['ref']) {
                $docItem = new DocItem;
                $docItem->doc_id = $doc->id;
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

        $doc->items;

        return response()->json($doc);
    }

    /**
     * Get next doc ref
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Doc  $doc
     * @return \Illuminate\Http\Response
     */
    public function nextref($type) {

        $record = Doc::where('type', $type)->orderBy('ref', 'DESC')->first();
        $suffix = (app('settings')->business_year) ? app('settings')->business_year : date('Y');
        $prefix = ($type == 'invoice') ? 'F' : 'D';

        if ($record) {

            $exp = explode('-', $record->ref);

            if(intval($exp[2]) == intval($suffix)) {
                $number = sprintf("%03d", $exp[1] + 1);
                $ref = $prefix . '-' . $number . '-' . $suffix;
            } else {
                $ref = $prefix . '-001-' . $suffix;
            }

        } else {

            $ref = $prefix . '-001-' . $suffix;

        }

        return strval($ref);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Doc  $doc
     * @return \Illuminate\Http\Response
     */
    public function destroy(Doc $doc)
    {
        $doc->delete();
        
    }
}
