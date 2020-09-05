# Laravel Intranet

## About Laravel Intranet

Laravel Intranet is a web application for small companies how wants to manage customers, projects, tasks (trello like) and hours.

## Installation instructions

Clone the repository to your host.

In the directory :

```
composer install
```

```
cp .env.example .env
```
Edit your database informations in .env file


```
php artisan key:generate
```

```
php artisan migrate
```

```
php artisan db:seed
```

## First connexion

User : admin@demo.com
Password : admin
