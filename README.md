<p align="center">
    <img width="500" src="preview/kirbykit.png" alt="kirbyKit cover">
</p>

<h3 align="center">Minimal Kirby 3 starterkit</h3>

<div align="center">
  <a href="https://github.com/th_km/kirbykit/releases"><img src="https://img.shields.io/badge/version-0.1.0-yellow.svg" alt="Version"/></a>
  <a href="https://github.com/th_km/kirbykit/master/LICENSE"><img src="https://img.shields.io/badge/license-MIT-blue.svg" alt="License" /></a>
</div>

<br/>

## Technologies

-   [Kirby CMS](https://getkirby.com/)
-   [Laravel Mix](https://laravel-mix.com/)
-   [Tailwind CSS](https://tailwindcss.com/docs/what-is-tailwind/)

## Requirements

Make sure to have **Node**, and **Composer** installed

1. Install or update [Homebrew](https://brew.sh/) to the latest version `brew update`
2. Install PHP `brew install php`
3. Install [Composer](https://getcomposer.org/)

## Installation

1. Install npm dependencies `npm install`
2. `cd` into the `www` folder
3. Install composer dependencies `composer install`. It will install the Kirby core package
4. Run `composer update` to update Kirby to the latest version
5. Update `user.config.js`
6. Run `npm run watch` to start a dev server

Note: To serve your site on a local environment you might want to use [Laravel valet](https://laravel.com/docs/5.8/valet) which supports Kirby out of the box

## Project structure

**KirbyKit** uses a [custom folder structure](https://getkirby.com/docs/guide/configuration) where private folders remain outside of the document root

```
kirbykit/
│
├── resources/
│
├── www/
│   │
│   ├── content/
│   ├── kirby/
│   ├── public/
│   │   ├── assets/
│   │   ├── media/
│   │   ├── .htaccess
│   │   └── index.php/
│   ├── site/
│   ├── storage/
│   │   ├── accounts/
│   │   ├── cache/
│   │   └── sessions/
│   └── ...
│
├── user.config.json
├── webpack.mix.js
└── package.json
```

## Deployment

1. Run `npm run prod` to minify and bundle your assets
2. Deploy the `www` folder to your server
