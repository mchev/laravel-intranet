<div class="bg-light border-right" id="sidebar-wrapper">
  <div class="sidebar-heading"><a href="/">{{ config('app.name', 'Laravel') }}</a></div>
  <div class="list-group list-group-flush">
    <a href="/" class="list-group-item list-group-item-action bg-light @if(Route::is('dashboard.*')) active @endif"><i class="fas fa-tachometer-alt"></i> Dashboard</a>
    <a href="{{ route('customers.index') }}" class="list-group-item list-group-item-action bg-light @if(Route::is('customers.*')) active @endif"><i class="fas fa-user-tie"></i> Clients</a>
    <a href="{{ route('projects.index') }}" class="list-group-item list-group-item-action bg-light @if(Route::is('projects.*')) active @endif"><i class="fas fa-folder-open"></i> Projets</a>
    <a href="{{ route('hours.index') }}" class="list-group-item list-group-item-action bg-light @if(Route::is('hours.*')) active @endif"><i class="far fa-clock"></i> Heures</a>
    <a href="{{ route('boards.index') }}" class="list-group-item list-group-item-action bg-light @if(Route::is('boards.*')) active @endif"><i class="fas fa-tasks"></i> Tâches</a>
    <a href="{{ route('passwords.index') }}" class="list-group-item list-group-item-action bg-light @if(Route::is('passwords.*')) active @endif"><i class="fas fa-unlock-alt"></i> Mots de passe</a>
    <a href="{{ route('users.index') }}" class="list-group-item list-group-item-action bg-light @if(Route::is('users.*')) active @endif"><i class="fas fa-users-cog"></i> Utilisateurs</a>
  </div>
</div>