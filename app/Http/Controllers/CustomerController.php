<?php

namespace App\Http\Controllers;

use App\Customer;
use Illuminate\Http\Request;

class CustomerController extends Controller
{


    /**
     * Instantiate a new controller instance.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth');
    }


    /**       
    * Display a listing of the resource.
    *
    * @param  Illuminate\Http\Request $request
    * @return Response
    */
    public function index(Request $request)
    {
        if($request->ajax()){

            $request->order = (isset($request->order)) ? $request->order : 'name';

            if ($request->q) {
                $customers = Customer::where('name', 'like', '%' . $request->q . '%')->orderBy($request->order)->paginate($request->paginate);
            } else {
                $customers = Customer::orderBy($request->order)->paginate($request->paginate);
            }

            return response()->json($customers);

        } else {

            return view('customers.index');

        }
    }

    public function list()
    {
        $customers = Customer::select('id', 'name')->get();
        return response()->json($customers);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        return view('customers.create');
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {

        $request->validate([
            'name' => 'required|unique:customers|max:255',
        ]);

        $customer = Customer::create($request->all());

        return response()->json([
            'status' => (bool) $customer,
            'data'   => $customer,
            'message' => $customer ? 'Client ajouté!' : 'Erreur lors de la création du client.'
        ]);

        //return view('customers.index');
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function show(Customer $customer)
    {
        return redirect()->route('customers.edit', $customer);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function edit(Customer $customer)
    {
        return view('customers.edit', compact('customer'));
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Customer $customer)
    {
        $customer->update($request->all());

        return redirect()->route('customers.index');
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Customer  $customer
     * @return \Illuminate\Http\Response
     */
    public function destroy(Customer $customer)
    {
        $customer->delete();
        return redirect()->route('customers.index');
    }
}
