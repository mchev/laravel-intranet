<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/app.js') }}" defer></script>

    <script>
        window.settings = {!! json_encode($settings) !!};
    </script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Nunito" rel="stylesheet">

    <!-- Styles -->
    <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    
</head>
<body style="background-color: {{ $settings->background_color }}">

    <div id="app">

        <div class="d-flex" id="wrapper">

            <!-- Sidebar -->
            @auth
                @include('sidebar')
            @endauth
            <!-- /#sidebar-wrapper -->

            <!-- Page Content -->
            <div id="page-content-wrapper">

                @include('navbar')

                <div class="container-fluid h-100 pt-4">
                    @yield('content')
                </div>

            </div>
            <!-- /#page-content-wrapper -->

        </div>
        <!-- /#wrapper -->

    </div>
    <!-- app -->

</body>
</html>
