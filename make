#!/usr/bin/env coffee
require 'shelljs/make'
fs = require 'fs'

version   = '1.1.6'
paint_js  = 'dist/paint.js'
paint_min = 'dist/paint.min.js'
paint_gz  = 'dist/paint.min.gz'

port = 3999
root = __dirname + '/'

target.all = ->
  target[paint_js]()
  target.test()

## TASKS ##

target.test = ->
  test_app = require './test/server'
  server = test_app.listen port
  exec "phantomjs --disk-cache=true test/runner.coffee 'http://localhost:#{port}/'", (code) ->
    server.close -> exit(code)

target[paint_js] = ->
  target.build() unless test('-e', paint_js)

target[paint_min] = ->
  target.minify() if stale(paint_min, paint_js)

target[paint_gz] = ->
  target.compress() if stale(paint_gz, paint_min)

target.dist = ->
  target.build()
  target.minify()
  target.compress()

target.build = ->
  cd __dirname
  mkdir '-p', 'dist'
  modules = (env['MODULES'] || 'paint').split(' ')
  module_files = ( "src/#{module}.js" for module in modules )
  intro = "/* Paint v0.1.0 (c) MIT License Kabir Shah*/\n"
  dist = (intro + cat(module_files).replace(/^\/[\/*].*$/mg, '')).replace(/\n{3,}/g, "\n\n")
  dist.to(paint_js)
  report_size(paint_js)

target.minify = ->
  target.build() unless test('-e', paint_js)
  paint_code = cat(paint_js)
  intro = paint_code.slice(0, paint_code.indexOf("\n") + 1)
  (intro + minify(paint_code)).to(paint_min)
  report_size(paint_min)

target.compress = ->
  gzip = require('zlib').createGzip()
  inp = fs.createReadStream(paint_min)
  out = fs.createWriteStream(paint_gz)
  inp.pipe(gzip).pipe(out)
  out.on 'close', ->
    report_size(paint_gz)
    factor = fsize(paint_js) / fsize(paint_gz)
    echo "compression factor: #{format_number(factor)}"

## HELPERS ##

stale = (file, source) ->
  target[source]()
  !test('-e', file) || mtime(file) < mtime(source)

mtime = (file) ->
  fs.statSync(file).mtime.getTime()

fsize = (file) ->
  fs.statSync(file).size

format_number = (size, precision = 1) ->
  factor = Math.pow(10, precision)
  decimal = Math.round(size * factor) % factor
  parseInt(size) + "." + decimal

report_size = (file) ->
  echo "#{file}: #{format_number(fsize(file) / 1024)} KiB"

describe_version = ->
  desc = exec "git --git-dir='#{root + '.git'}' describe --tags HEAD", silent: true
  if desc.code is 0 then desc.output.replace(/\s+$/, '') else version

minify = (source_code) ->
  uglify = require('uglify-js')
  compressor = uglify.Compressor()
  ast = uglify.parse(source_code)
  ast.figure_out_scope()
  ast.compute_char_frequency();
  ast.mangle_names();
  ast = ast.transform(compressor)
  return ast.print_to_string()
