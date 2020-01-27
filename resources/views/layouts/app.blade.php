<!doctype html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">

    <!-- CSRF Token -->
    <meta name="csrf-token" content="{{ csrf_token() }}">
    @if(Auth::check())
        <meta name="user-id" content="{{ Auth::user()->id }}">
    @endif

    <title>{{ config('app.name', 'Laravel') }}</title>

    <!-- Scripts -->
    <script src="{{ asset('js/manifest.js') }}" defer></script>
    <script src="{{ asset('js/vendor.js') }}" defer></script>
    <script src="{{ asset('js/app.js') }}" defer></script>

    <script>
        window.settings = {!! json_encode($settings) !!};
    </script>

    <!-- Fonts -->
    <link rel="dns-prefetch" href="//fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">

    <!-- Styles -->
    <link href="//cdnjs.cloudflare.com/ajax/libs/font-awesome/5.11.2/css/all.min.css" rel="stylesheet">
    <link href="{{ asset('css/app.css') }}" rel="stylesheet">
    
</head>
<body style="background-color: {{ $settings->background_color }}">

    <div id="app">

        @include('navbar')

        <div class="container-fluid">

            <div class="row">

                <!-- Sidebar -->
                @auth
                <nav class="d-none d-md-block col-md-2 bg-light sidebar d-print-none">
                    <div class="sidebar-sticky">
                        @include('sidebar')
                    </div>
                </nav>
                @endauth
                <!-- /#sidebar-wrapper -->

            <!-- Page Content -->
                <main role="main" class="col-md-9 col-sm-10 ml-sm-auto col-lg-10 px-4">
                    <div class="py-4">
                        @yield('content')
                    </div>
                </main>

            </div>
            <!-- /row -->

        </div>
        <!-- /container -->

    </div>
    <!-- app -->

</body>
</html>
