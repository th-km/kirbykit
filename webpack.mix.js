/* eslint-disable */
const mix = require('laravel-mix')
const atImport = require('postcss-import')
const nested = require('postcss-nested')
const glob = require('glob-all')
const purgecss = require('purgecss-webpack-plugin')
const tailwindcss = require('tailwindcss')

/*
 |--------------------------------------------------------------------------
 | Mix Asset Management
 |--------------------------------------------------------------------------
 |
 | Mix provides a clean, fluent API for defining some Webpack build steps
 | for your Laravel application. By default, we are compiling the Sass
 | file for your application, as well as bundling up your JS files.
 |
 */

// Load user config
const config = require('./user.config.js')

mix.setPublicPath(`${config.outputDir}/public/assets`).sourceMaps()

mix
  .js(`${config.inputDir}/js/index.js`, 'js')
  .postCss(`${config.inputDir}/css/index.css`, 'css', [
    atImport(),
    nested(),
    tailwindcss()
  ])

class TailwindExtractor {
  static extract(content) {
    return content.match(/[A-Za-z0-9-_:\/]+/g) || []
  }
}

if (mix.inProduction()) {
  mix.webpackConfig({
    plugins: [
      new purgecss({
        paths: glob.sync([
          path.join(__dirname, `${config.outputDir}/site/snippets/**/*.php`),
          path.join(__dirname, `${config.outputDir}/site/templates/**/*.php`)
        ]),
        folders: [`${config.inputDir}`],
        extractors: [
          {
            extractor: TailwindExtractor,
            extensions: ['html', 'js', 'php']
          }
        ]
      })
    ]
  })
}

mix.browserSync({
  proxy: config.browserSyncProxy,
  files: [
    `${config.outputDir}/content/**/*`,
    `${config.outputDir}/public/assets/css/**/*.css`,
    `${config.outputDir}/public/assets/js/**/*.js`,
    `${config.outputDir}/site/snippets/**/*.php`,
    `${config.outputDir}/site/templates/**/*.php`
  ]
})

// Full API
// mix.js(src, output);
// mix.react(src, output); <-- Identical to mix.js(), but registers React Babel compilation.
// mix.preact(src, output); <-- Identical to mix.js(), but registers Preact compilation.
// mix.coffee(src, output); <-- Identical to mix.js(), but registers CoffeeScript compilation.
// mix.ts(src, output); <-- TypeScript support. Requires tsconfig.json to exist in the same folder as webpack.mix.js
// mix.extract(vendorLibs);
// mix.sass(src, output);
// mix.less(src, output);
// mix.stylus(src, output);
// mix.postCss(src, output, [require('postcss-some-plugin')()]);
// mix.browserSync('my-site.test');
// mix.combine(files, destination);
// mix.babel(files, destination); <-- Identical to mix.combine(), but also includes Babel compilation.
// mix.copy(from, to);
// mix.copyDirectory(fromDir, toDir);
// mix.minify(file);
// mix.sourceMaps(); // Enable sourcemaps
// mix.version(); // Enable versioning.
// mix.disableNotifications();
// mix.setPublicPath('path/to/public');
// mix.setResourceRoot('prefix/for/resource/locators');
// mix.autoload({}); <-- Will be passed to Webpack's ProvidePlugin.
// mix.webpackConfig({}); <-- Override webpack.config.js, without editing the file directly.
// mix.babelConfig({}); <-- Merge extra Babel configuration (plugins, etc.) with Mix's default.
// mix.then(function () {}) <-- Will be triggered each time Webpack finishes building.
// mix.dump(); <-- Dump the generated webpack config object t the console.
// mix.extend(name, handler) <-- Extend Mix's API with your own components.
// mix.options({
//   extractVueStyles: false, // Extract .vue component styling to file, rather than inline.
//   globalVueStyles: file, // Variables file to be imported in every component.
//   processCssUrls: true, // Process/optimize relative stylesheet url()'s. Set to false, if you don't want them touched.
//   purifyCss: false, // Remove unused CSS selectors.
//   terser: {}, // Terser-specific options. https://github.com/webpack-contrib/terser-webpack-plugin#options
//   postCss: [] // Post-CSS options: https://github.com/postcss/postcss/blob/master/docs/plugins.md
// });
