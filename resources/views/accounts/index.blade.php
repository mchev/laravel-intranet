@extends('layouts.app')

@section('content')
<div class="container-fluid">

    <div class="card mb-3">
        <div class="card-header">
            <h5>Actions rapides</h5>
        </div>
        <div class="card-body">
            <div class="btn-group" role="group" aria-label="Basic example">
                <a type="button" class="btn btn-secondary" href="{{ route('customers.create') }}"><i class="fas fa-user-tie"></i> Ajouter un client</a>
                <button type="button" class="btn btn-secondary"><i class="fas fa-file"></i> Créer un devis</button>
                <button type="button" class="btn btn-secondary"><i class="fas fa-file-alt"></i> Créer une facture</button>
                <button type="button" class="btn btn-secondary"><i class="far fa-credit-card"></i> Saisir un paiement</button>
            </div>
        </div>
    </div>

    <div class="row mb-3">


        <div class="col-xl-6">
            <div class="card">
                <div class="card-header">
                    <h5>Devis</h5>
                </div>
                <div class="card-body">
                    <quotes-list></quotes-list>
                </div>
            </div>
        </div>

        <div class="col-xl-6">
            <div class="card">
                <div class="card-header">
                    <h5>Factures</h5>
                </div>
                <div class="card-body">
                    <invoices-list></invoices-list>
                </div>
            </div>
        </div>

    </div>

</div>

@endsection
