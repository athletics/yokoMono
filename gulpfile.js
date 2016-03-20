var assign = require( 'lodash.assign' ),
	browserify = require( 'browserify' ),
	buffer = require( 'vinyl-buffer' ),
	gulp = require( 'gulp' ),
	gutil = require( 'gulp-util' ),
	source = require( 'vinyl-source-stream' ),
	sourcemaps = require( 'gulp-sourcemaps' ),
	watch = require( 'gulp-watch' ),
	watchify = require( 'watchify' )
;

// Custom browserify options
var customOpts = {
		entries: ['./js/main.js'],
		debug: true
	},
	opts = assign( {}, watchify.args, customOpts ),
	b = watchify( browserify( opts ) )
; 

gulp.task( 'browserify', function() {

	return b.bundle()
	// log errors if they happen
	.on( 'error', gutil.log.bind( gutil, 'Browserify Error' ) )
	.pipe( source( 'bundle.js' ) )
	// optional, remove if you don't need to buffer file contents
	.pipe( buffer() )
	// optional, remove if you dont want sourcemaps
	.pipe( sourcemaps.init( { loadMaps: true } ) ) // loads map from browserify file
	// Add transformation tasks to the pipeline here.
	.pipe( sourcemaps.write( './' ) ) // writes .map file
	.pipe( gulp.dest( './assets' ) );

} );

gulp.task( 'watch', function () {
	gulp.watch( 'js/**/*.js', [ 'browserify' ] );
} );

gulp.task( 'default', [ 'browserify', 'watch' ] );