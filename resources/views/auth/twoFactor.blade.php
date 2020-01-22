@extends('layouts.guest')

@section('content')

    <div class="card">

        <div class="card-header">
            <h5>Vérification à deux facteurs</h5>
        </div>

        <div class="card-body"> 

            @if(session()->has('message'))
                <p class="alert alert-info">
                    {{ session()->get('message') }}
                </p>
            @endif

            <form method="POST" action="{{ route('verify.store') }}">

                {{ csrf_field() }}
                
                <p class="text-muted">
                    Vous avez reçu un courriel qui contient un code de connexion à deux facteurs.<br>
                    Si vous ne l'avez pas reçu, <a href="{{ route('verify.resend') }}">cliquez ici</a>.
                </p>

                <div class="input-group mb-3">
                    <div class="input-group-prepend">
                        <span class="input-group-text">
                            <i class="fa fa-lock"></i>
                        </span>
                    </div>
                    <input name="two_factor_code" type="text" 
                        class="form-control{{ $errors->has('two_factor_code') ? ' is-invalid' : '' }}" 
                        required autofocus placeholder="Code de vérification" value="{{ $code }}">
                    @if($errors->has('two_factor_code'))
                        <div class="invalid-feedback">
                            {{ $errors->first('two_factor_code') }}
                        </div>
                    @endif
                </div>

                <div class="row">
                    <div class="col-6">
                        <button type="submit" class="btn btn-primary px-4">
                            Vérifier
                        </button>
                    </div>
                </div>
            </form>

        </div>

    </div>

@endsection