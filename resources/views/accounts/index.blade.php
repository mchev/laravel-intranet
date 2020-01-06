@extends('layouts.app')

@section('content')
<div class="container-fluid">

    <div class="alert alert-warning">
        Page en cours de construction. Ne pas prendre en compte les valeurs ci-desous.
    </div>

    <div class="card mb-3">
        <div class="card-header">
            <h5>Actions rapides</h5>
        </div>
        <div class="card-body">
            <div class="btn-group" role="group" aria-label="Basic example">
                <a type="button" class="btn btn-secondary" href="{{ route('customers.create') }}"><i class="fas fa-user-tie"></i> Ajouter un client</a>
                <button type="button" class="btn btn-secondary"><i class="fas fa-file"></i> Créer un devis</button>
                <button type="button" class="btn btn-secondary" data-toggle="modal" data-target=".invoice-modal-lg"><i class="fas fa-file-alt"></i> Créer une facture</button>
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



<div class="modal fade invoice-modal-lg" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-lg">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title">Facture</h5>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body">
                <invoice></invoice>
            </div>
        </div>
    </div>
</div>

@endsection
