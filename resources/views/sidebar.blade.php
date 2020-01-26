<ul class="list-group nav flex-column">

    <a href="/" class="list-group-item @if(Route::is('dashboard.*')) active @endif @if(Route::is('admin.*')) active @endif"><i class="fas fa-tachometer-alt"></i> Dashboard</a>

    <a href="{{ route('customers.index') }}" class="list-group-item @if(Route::is('customers.*')) active @endif"><i class="fas fa-user-tie"></i> Clients</a>

    <a href="{{ route('projects.index') }}" class="list-group-item @if(Route::is('projects.*')) active @endif"><i class="fas fa-folder-open"></i> Projets</a>

    <a href="{{ route('hours.index') }}" class="list-group-item @if(Route::is('hours.*')) active @endif"><i class="far fa-clock"></i> Heures</a>

    <a href="{{ route('boards.index') }}" class="list-group-item @if(Route::is('boards.*')) active @endif"><i class="fas fa-tasks"></i> Tâches</a>

  @admin

      <a href="{{ route('accounts.index') }}" class="list-group-item @if(Route::is('accounts.*')) active @endif"><i class="fas fa-file-invoice"></i> Comptabilité</a>

      <a href="{{ route('passwords.index') }}" class="list-group-item @if(Route::is('passwords.*')) active @endif"><i class="fas fa-unlock-alt"></i> Mots de passe</a>

      <a href="{{ route('users.index') }}" class="list-group-item @if(Route::is('users.*')) active @endif"><i class="fas fa-users-cog"></i> Utilisateurs</a>

      <a href="{{ route('settings.index') }}" class="list-group-item @if(Route::is('settings.*')) active @endif"><i class="fas fa-sliders-h"></i> Paramètres</a>

  @endadmin

</ul>