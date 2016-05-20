(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Require modules
var WebAudio = require( './modules/web-audio' );
var Panel = require( './modules/panel' );
var Oscillator = require( './modules/oscillator' );
var Modulator = require( './modules/modulator' );
var Filter = require( './modules/filter' );
var Envelope = require( './modules/envelope' );
var Keyboard = require( './modules/keyboard' );
var Logo = require( './modules/logo' );

// Initialize modules 
WebAudio.init();
Panel.init();
Oscillator.init();
Modulator.init();
Filter.init();
Envelope.init();
Keyboard.init();
Logo.init();
},{"./modules/envelope":2,"./modules/filter":3,"./modules/keyboard":4,"./modules/logo":5,"./modules/modulator":6,"./modules/oscillator":8,"./modules/panel":9,"./modules/web-audio":10}],2:[function(require,module,exports){
/**
 * envelope.js
 * @description The envelope controls for the yokoMono
 */

/**
 * Module Dependencies
 */
var Interface = require( 'interface' );
var Panel = require( './panel' );
var WebAudio = require( './web-audio' );

/**
 * Module Vars
 */

/**
 * Initializes Module
 */
function init() {	

	var widgets = [];
	var dict = {
	  'border-radius': '0px',
	  'font-family': 'Courier',
	  'text-transform': 'capitalize'
	};

	var l_01 = new Interface.Label( {
		bounds:[.375,.025,.125,.05],
		font: 'Courier',
		size:16,
		style: 'Bold',
		value:'Envelope'
	} );

	var l_02 = new Interface.Label( {
		bounds:[.354,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'Att'
	} );

	var s_01 = new Interface.Slider({
		bounds:[.4,.1,.03,.3],
		min:.05, max:2,
		value:.05,
		onvaluechange: function() { WebAudio.envelopeAttack( this.value ); }
	} );

	var l_03 = new Interface.Label( {
		bounds:[.39,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'Rel'
	} );

	var s_02 = new Interface.Slider({
		bounds:[.44375,.1,.03,.3],
		min:.05, max:2,
		value:.05,
		onvaluechange: function() { WebAudio.envelopeRelease( this.value ); }
	} );

	widgets.push( l_01, l_02, l_03, s_01, s_02 );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};
},{"./panel":9,"./web-audio":10,"interface":11}],3:[function(require,module,exports){
/**
 * filter.js
 * @description The filter controls for the yokoMono
 */

/**
 * Module Dependencies
 */
var Interface = require( 'interface' );
var Panel = require( './panel' );
var WebAudio = require( './web-audio' );

/**
 * Module Vars
 */

/**
 * Initializes Module
 */
function init() {	

	var widgets = [];
	var dict = {
	  'border-radius': '0px',
	  'font-family': 'Courier',
	  'text-transform': 'capitalize',
	  'outline': 'none'
	};

	var l_01 = new Interface.Label( {
		bounds:[.25,.025,.125,.05],
		font: 'Courier',
		size:16,
		style: 'Bold',
		value:'Filter'
	} );

	var l_02 = new Interface.Label( {
		bounds:[.229,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'Res'
	} );

	var s_01 = new Interface.Slider({
		bounds:[.275,.1,.03,.3],
		min:0, max:20,
		value:0,
		onvaluechange: function() { WebAudio.filterQ( 'dcf', this.value ); }
	} );

	var l_03 = new Interface.Label( {
		bounds:[.2725,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'Freq'
	} );

	var s_02 = new Interface.Slider({
		bounds:[.31875,.1,.03,.3],
		min:0, max:1000,
		value:0,
		onvaluechange: function() { WebAudio.filterFrequency( 'dcf', this.value ); }
	} );

	var m_01 = new Interface.Menu( { 
		bounds:[.275,.425,.075,.05],
		css: dict,
		options:['lowpass','highpass'],
		stroke:"#666",
		onvaluechange: function() { WebAudio.filterType( this.value ); }
	} );

	widgets.push( l_01, l_02, l_03, s_01, s_02, m_01 );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};
},{"./panel":9,"./web-audio":10,"interface":11}],4:[function(require,module,exports){
/**
 * keyboard.js
 * @description The lfo controls for the yokoMono
 */

/**
 * Module Dependencies
 */
var Interface = require( 'interface' );
var Panel = require( './panel' );
var WebAudio = require( './web-audio' );

/**
 * Module Vars
 */

/**
 * Initializes Module
 */
function init() {

	var widgets = [];

	var kb = new Interface.Piano( { 
		bounds:[.05,.55,.9,.4],
		startletter : "C",
		endletter : "C",
		startoctave : 3,
		endoctave : 5,
		onvaluechange : function() { 
			WebAudio.envelopeTrigger(); 
			WebAudio.oscillatorFrequency( 'dco01', this.frequency); 
			WebAudio.oscillatorFrequency( 'dco02', this.frequency);
		}
	} ); 

	widgets.push( kb );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};
},{"./panel":9,"./web-audio":10,"interface":11}],5:[function(require,module,exports){
/**
 * logo.js
 * @description Draws the yokoMono logo
 */

/**
 * Initializes Module
 */
function init() {

	var context = $( 'canvas' ).get( 0 ).getContext( '2d' );

	base_image = new Image();
	base_image.src = 'assets/yokomono.svg';
	base_image.onload = function(){
		context.drawImage(base_image, 933, 21);
	}

}

/**
 * Module Exports
 */
module.exports = {
	init: init,
};
},{}],6:[function(require,module,exports){
/**
 * modulator.js
 * @description The modulator controls for the yokoMono
 */

/**
 * Module Dependencies
 */
var Interface = require( 'interface' );
var Panel = require( './panel' );
var WebAudio = require( './web-audio' );

/**
 * Module Vars
 */

/**
 * Initializes Module
 */
function init() {	

	var widgets = [];
	var dict = {
	  'border-radius': '0px',
	  'font-family': 'Courier',
	  'text-transform': 'capitalize',
	  'outline': 'none'
	};

	// Labels
	var l_01 = new Interface.Label( {
		bounds:[.125,.025,.125,.05],
		font: 'Courier',
		size:16,
		style: 'Bold',
		value:'Modulator'
	} );

	var l_02 = new Interface.Label( {
		bounds:[.125,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'Rate'
	} );

	var l_03 = new Interface.Label( {
		bounds:[.1425,.245,.040,.05],
		font: 'Courier',
		size:12,
		value:'VCA/VCF'
	} );

	var l_04 = new Interface.Label( {
		bounds:[.145,.325,.035,.05],
		font: 'Courier',
		size:12,
		value:'Off/On'
	} );

	// Sliders
	var s_01 = new Interface.Slider({
		bounds:[.195,.1,.03,.3],
		min:0, max:20,
		value:0,
		onvaluechange: function() { WebAudio.oscillatorFrequency( 'lfo', this.value ); }
	} );

	// Menus
	var m_01 = new Interface.Menu( { 
		bounds:[.150,.425,.075,.05],
		css: dict,
		options:['square','triangle'],
		stroke:"#666",
		onvaluechange: function() { WebAudio.oscillatorType( 'lfo', this.value ); }
	} );

	// Buttons
	var b_01 = new Interface.Button( { 
	  bounds:[.150,.2725,.025,.05], 
	  mode:'toggle', 
	  onvaluechange: function() {
	    if ( this.value == 1) {
	    	// WebAudio.modulatorDisconnect();
	    	// WebAudio.modulatorConnect();
	    } else {
	    	// WebAudio.modulatorDisconnect();
	    }
	  }
	} ); 

	// Buttons
	var b_02 = new Interface.Button( { 
	  bounds:[.150,.3525,.025,.05], 
	  mode:'toggle', 
	  onvaluechange: function() {
	    if ( this.value == 1) {
	    	WebAudio.modulatorConnect( 'dca02.gain' );
	    } else {
	    	WebAudio.modulatorDisconnect();
	    }
	  }
	} ); 

	widgets.push( l_01, l_02, l_04, s_01, m_01, b_02 );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};
},{"./panel":9,"./web-audio":10,"interface":11}],7:[function(require,module,exports){
/**
 * noise.js
 * @description Noise generators
 */

/**
 * Module Dependencies
 */

/**
 * Module Vars
 */
var debugEnabled = false,
	debug = debugEnabled ? Util.debug : function () {};

/**
 * Initializes Module
 */
function init( audioContext) {

	var bufferSize = 2 * audioContext.sampleRate,
	    noiseBuffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate),
	    output = noiseBuffer.getChannelData(0);
	for (var i = 0; i < bufferSize; i++) {
	    output[i] = Math.random() * 2 - 1;
	}

	var whiteNoise = audioContext.createBufferSource();
	whiteNoise.buffer = noiseBuffer;
	whiteNoise.loop = true;
	whiteNoise.start(0);

	return	whiteNoise;

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};
},{}],8:[function(require,module,exports){
/**
 * oscillator.js
 * @description The oscillator controls for the yokoMono
 */

/**
 * Module Dependencies
 */
var Interface = require( 'interface' );
var Panel = require( './panel' );
var WebAudio = require( './web-audio' );

/**
 * Module Vars
 */

/**
 * Initializes Module
 */
function init() {	

	var widgets = [];
	var dict = {
	  'border-radius': '0px',
	  'font-family': 'Courier',
	  'text-transform': 'capitalize',
	  'outline': 'none'
	};

	var l_01 = new Interface.Label( {
		bounds:[0,.025,.125,.05],
		font: 'Courier',
		size:16,
		style: 'Bold',
		value:'Oscillators'
	} );

	var l_02 = new Interface.Label( {
		bounds:[0,.0625,.125,.05],
		font: 'Courier',
		size:14,
		value:'DCO 1'
	} );

	var m_01 = new Interface.Menu( { 
		bounds:[.025,.1,.075,.05],
		css: dict,
		options:['sine','square','sawtooth','triangle'],
		stroke:"#666",
		onvaluechange: function() { WebAudio.oscillatorType( 'dco01', this.value ); }
	} );

	var s_01 = new Interface.Slider({
		bounds:[.025,.175,.075,.05],
		isVertical: false,
		label:'Detune',
		min:0, max:100,
		value:0,
		onvaluechange: function() { WebAudio.oscillatorDetune( 'dco01', this.value ); }
	});

	var l_03 = new Interface.Label( {
		bounds:[0,.2375,.125,.05],
		font: 'Courier',
		size:14,
		value:'DCO 2'
	} );

	var m_02 = new Interface.Menu( { 
		bounds:[.025,.275,.075,.05],
		css: dict,
		options:['sine','square','sawtooth','triangle'],
		stroke:"#666",
		onvaluechange: function() { WebAudio.oscillatorType( 'dco02', this.value ); }
	} );

	var s_02 = new Interface.Slider( {
	 	bounds:[.025,.35,.075,.05],
	 	isVertical: false,
	 	label:'Detune',
	 	min:0, max:100,
	  	value:0,
	  	onvaluechange: function() { WebAudio.oscillatorDetune( 'dco02', this.value ); }
	} );

	var s_03 = new Interface.Slider({
		bounds:[.025,.425,.075,.05],
		isVertical: false,
		label:'Amount',
		min:0, max:1,
	  	value:1,
		onvaluechange: function() { WebAudio.amplifierGain( 'mix02', this.value ); }
	} );

	widgets.push( l_01, l_02, l_03, m_01, m_02, s_01,s_02, s_03 );

	Panel.addWidget( widgets );

}

/**
 * Module Exports
 */
module.exports = {
	init: init
};
},{"./panel":9,"./web-audio":10,"interface":11}],9:[function(require,module,exports){
/**
 * panel.js
 * @description Sets up the Interface.js panel
 */

/**
 * Module Dependencies
 */
var Interface = require( 'interface' );

/**
 * Module Vars
 */
var panel;

/**
 * Initializes Module
 */
function init() {

	panel = new Interface.Panel( {
	  container:document.querySelector( '.synth ' ),
	  // font: 'Courier',
	} );

	panel.background = 'black';

}

/**
 * addWidget
 *
 * @param string widget name
 */
function addWidget( widgets ) {

	var i;

	for ( i = 0; i < widgets.length; ++i ) {

	    panel.add( widgets[i] );

	}

}

/**
 * Module Exports
 */
module.exports = {
	init: init,
	addWidget: addWidget
};
},{"interface":11}],10:[function(require,module,exports){
/**
 * web-audio.js
 * @description The web audio API components for yokoMono
 */

/**
 * Module Dependencies
 */
var WhiteNoise = require( './noise' );

/**
 * Module Vars
 */
var audioContext,
	dca01,
	dca02,
	lfo,
	dcf,
	dco01,
	dco02,
	env,
	attackTime,
	releaseTime
;

/**
 * Initializes Module
 */
function init() {

	// Instantiate new AudioContext
	audioContext = new ( window.AudioContext || window.webkitAudioContext )();

	// Define Modules
	dco01 = audioContext.createOscillator();
	dco02 = audioContext.createOscillator();
	lfo = audioContext.createOscillator();
	dcf = audioContext.createBiquadFilter();
	dca01 = audioContext.createGain();
	dca02 = audioContext.createGain();
	mix01 = audioContext.createGain();
	mix02 = audioContext.createGain();
	whiteNoise = WhiteNoise.init( audioContext );


	// Connections
	dco01.connect( mix01 );
	dco02.connect( mix02 );
	mix01.connect( dca01 );
	mix02.connect( dca01 );
	dca01.connect( dca02 );
	dca02.connect( dcf );
	// whiteNoise.connect( dca01 );
	dcf.connect( audioContext.destination );	

	// Settings
	lfo.frequency.value = 0;
	lfo.type = 'square';
	dcf.type = 'lowpass';
	dcf.gain = .5;
	dca01.gain.value = 0;
	attackTime = .05;
	releaseTime = .05;

	// Start Oscillators
	lfo.start( 0 );
	dco01.start( 0 );
	dco02.start( 0 );

}

/**
 * oscillatorDetune
 *
 * @param string name
 * @param string value 
 */
function oscillatorDetune( name, value ) {
	
	eval( name ).detune.value = value;

}

/**
 * oscillatorFrequency
 *
 * @param string name
 * @param string value 
 */
function oscillatorFrequency( name, value ) {
	
	eval( name ).frequency.value = value;

}

/**
 * oscillatorType
 *
 * @param string name
 * @param string type - sine, square, sawtooth, triangle
 */
function oscillatorType( name, type ) {
	
	eval( name ).type = type;

}

/**
 * modulatorConnect
 *
 * @param string name
 */
function modulatorConnect( name ) {
	
	lfo.connect( eval( name ) );

}

/**
 * modulatorDisconnect
 */
function modulatorDisconnect() {
	
	lfo.disconnect();

}

/**
 * amplifierGain
 *
 * @param string name
 * @param string value
 */
function amplifierGain( name, value ) {
	
	eval( name ).gain.value = value;

}

/**
 * filterFrequency
 *
 * @param string name
 * @param string value
 */
function filterFrequency( name, value ) {
	
	eval( name ).frequency.value = value;

}

/**
 * filterQ
 *
 * @param string name
 * @param string value
 */
function filterQ( name, value ) {
	
	eval( name ).Q.value = value;

}

/**
 * filterQ
 *
 * @param string name
 * @param string value
 */
function filterType( value ) {
	
	dcf.type = value;

}

/**
 * envelopeTrigger
 */
function envelopeTrigger() {
	
	now = audioContext.currentTime;
	dca01.gain.cancelScheduledValues( now );
	dca01.gain.setValueAtTime( 0, now );
	dca01.gain.linearRampToValueAtTime( 1, now + attackTime );
	dca01.gain.linearRampToValueAtTime( 0, now + attackTime + releaseTime );

}

/**
 * envelopeAttack
 * 
 * @param string value
 */
function envelopeAttack( value ) {
	
	attackTime = value;

}

/**
 * envelopeRelease
 *
 * @param string value
 */
function envelopeRelease( value ) {
	
	releaseTime = value;

}

/**
 * Private Method
 *
 * @return integer
 */
function privateMethod() {
	return 0;
}

/**
 * Module Exports
 */
module.exports = {
	init: init,
	oscillatorDetune: oscillatorDetune,
	oscillatorFrequency: oscillatorFrequency,
	oscillatorType: oscillatorType,
	modulatorConnect: modulatorConnect,
	modulatorDisconnect: modulatorDisconnect,
	amplifierGain: amplifierGain,
	filterFrequency: filterFrequency,
	filterQ: filterQ,
	filterType: filterType,
	envelopeTrigger: envelopeTrigger,
	envelopeAttack: envelopeAttack,
	envelopeRelease: envelopeRelease
};

},{"./noise":7}],11:[function(require,module,exports){
(function (global){
!function(t){if("object"==typeof exports)module.exports=t();else if("function"==typeof define&&define.amd)define(t);else{var e;"undefined"!=typeof window?e=window:"undefined"!=typeof global?e=global:"undefined"!=typeof self&&(e=self),e.Interface=t()}}(function(){var t;return function e(t,i,n){function s(r,h){if(!i[r]){if(!t[r]){var a="function"==typeof require&&require;if(!h&&a)return a(r,!0);if(o)return o(r,!0);throw new Error("Cannot find module '"+r+"'")}var u=i[r]={exports:{}};t[r][0].call(u.exports,function(e){var i=t[r][1][e];return s(i?i:e)},u,u.exports,e,t,i,n)}return i[r].exports}for(var o="function"==typeof require&&require,r=0;r<n.length;r++)s(n[r]);return s}({1:[function(t,e){!function(){function i(t){return 0>t?-1:1}var n=t("jquery"),s={extend:function(t,e){for(var i in e){{i.split(".")}t[i]=e[i]instanceof Array&&e[i].length<100?e[i].slice(0):e[i]}return t},get$:function(){return n},isAndroid:function(){var t=navigator.userAgent.toLowerCase();return t.indexOf("android")>-1}(),keyCodeToChar:{8:"Backspace",9:"Tab",13:"Enter",16:"Shift",17:"Ctrl",18:"Alt",19:"Pause/Break",20:"Caps Lock",27:"Esc",32:"Space",33:"Page Up",34:"Page Down",35:"End",36:"Home",37:"Left",38:"Up",39:"Right",40:"Down",45:"Insert",46:"Delete",48:"0",49:"1",50:"2",51:"3",52:"4",53:"5",54:"6",55:"7",56:"8",57:"9",65:"A",66:"B",67:"C",68:"D",69:"E",70:"F",71:"G",72:"H",73:"I",74:"J",75:"K",76:"L",77:"M",78:"N",79:"O",80:"P",81:"Q",82:"R",83:"S",84:"T",85:"U",86:"V",87:"W",88:"X",89:"Y",90:"Z",91:"Windows",93:"Right Click",96:"Numpad 0",97:"Numpad 1",98:"Numpad 2",99:"Numpad 3",100:"Numpad 4",101:"Numpad 5",102:"Numpad 6",103:"Numpad 7",104:"Numpad 8",105:"Numpad 9",106:"Numpad *",107:"Numpad +",109:"Numpad -",110:"Numpad .",111:"Numpad /",112:"F1",113:"F2",114:"F3",115:"F4",116:"F5",117:"F6",118:"F7",119:"F8",120:"F9",121:"F10",122:"F11",123:"F12",144:"Num Lock",145:"Scroll Lock",182:"My Computer",183:"My Calculator",186:";",187:"=",188:",",189:"-",190:".",191:"/",192:"`",219:"[",220:"\\",221:"]",222:"'"},panels:[],mouseDown:!1,useTouch:"ontouchstart"in document.documentElement,widgets:[]};s.Presets={dictionary:"undefined"==typeof localStorage.interfacejs?{}:JSON.parse(localStorage.interfacejs),save:function(t){for(var e=[],i=0;i<s.panels.length;i++){var n=s.panels[i];e[i]=[];for(var o=0;o<n.children.length;o++){var r=n.children[o];if("object"==typeof r.children){for(var h=[],a=0;a<r.children.length;a++)h[a]=r.children[a].value;e[i][o]=h}else e[i][o]=r.value}this.dictionary[t]=e,localStorage.interfacejs=JSON.stringify(this.dictionary)}},load:function(t){for(var e=this.dictionary[t],i=0;i<s.panels.length;i++)for(var n=s.panels[i],o=0;o<n.children.length;o++){var r=n.children[o];if("object"==typeof r.children)for(var h=0;h<r.children.length;h++)r.children[h].setValue(e[i][o][h]);else r.setValue(e[i][o])}},list:function(){return Object.keys(this.dictionary)}},s.Panel=function(){var t=this,e=arguments.length>=1?arguments[0].container:void 0;s.extend(this,{type:"Panel",active:!0,children:[],shouldDraw:[],fps:30,useRelativeSizesAndPositions:!0,labelSize:"12px",font:"normal 12px Helvetica",serializeMe:["fps","useRelativeSizesAndPositions","labelSize","font","background","fill","stroke","backgroundColor"],container:function(){if("undefined"==typeof e){n("body").css({margin:0,padding:0});var t=n('<div id="container">');return t.css({width:n(window).width(),height:n(window).height(),display:"block",margin:0,padding:0,position:"absolute",left:0,top:0}),n("body").append(t),t}return e}(),canvas:document.createElement("canvas"),touchEvent:function(e){if(t.active){"undefined"==typeof e.changedTouches&&e.originalEvent&&(e.changedTouches=e.originalEvent.changedTouches);for(var i=0;i<e.changedTouches.length;i++)for(var n=e.changedTouches.item(i),s=0;s<t.children.length;s++)n.x=n.pageX-t.x,n.y=n.pageY-t.y,n.type=e.type,t.children[s].touchEvent(n);e.preventDefault()}},mouseEvent:function(e){if(t.active){"mousedown"===e.type?s.mouseDown=!0:"mouseup"===e.type&&(s.mouseDown=!1);for(var i={x:e.offsetX||e.pageX-t.x,y:e.offsetY||e.pageY-t.y,type:e.type},n=0;n<t.children.length;n++)t.children[n].mouseEvent(i)}},init:function(){var t=n(this.container).offset();this.width=n(this.container).width(),this.height=n(this.container).height(),this.x=t.left,this.y=t.top,isNaN(this.x)&&(this.x=0),isNaN(this.y)&&(this.y=0),n(this.canvas).attr({width:this.width,height:this.height}),n(this.container).css({"user-select":"none","-webkit-user-select":"none"}),n(this.container).append(this.canvas),this.ctx=this.canvas.getContext("2d"),this.ctx.translate(.5,.5),this.ctx.lineWidth=1,s.useTouch?(n(this.container).on("touchstart",this.touchEvent),n(this.container).on("touchmove",this.touchEvent),n(this.container).on("touchend",this.touchEvent)):(n(this.container).on("mousedown",this.mouseEvent),n(this.container).on("mousemove",this.mouseEvent),n(this.container).on("mouseup",this.mouseEvent)),n(this.container).css({outline:"none"}),n(this.container).attr("tabindex",5),n(this.container).on("keydown",this.keydown.bind(this)),n(this.container).on("keyup",this.keyup.bind(this))},keydown:function(t){for(var e=0;e<this.children.length;e++)this.children[e].onkeydown&&this.children[e].onkeydown(t)},keyup:function(t){for(var e=0;e<this.children.length;e++)this.children[e].onkeyup&&this.children[e].onkeyup(t)},draw:function(){if(this.active){for(var t=0;t<this.shouldDraw.length;t++)this.shouldDraw[t].draw();this.shouldDraw.length=0}n.publish("/draw")},getWidgetWithName:function(t){for(var e=0;e<this.children.length;e++)if(this.children[e].name===t)return this.children[e]},redoBoundaries:function(){var t=n(this.container).offset();this.width=n(this.container).width(),this.height=n(this.container).height(),this.x=t.left,this.y=t.top,isNaN(this.x)&&(this.x=0),isNaN(this.y)&&(this.y=0),n(this.canvas).attr({width:this.width,height:this.height}),this.ctx.translate(.5,.5),this.ctx.lineWidth=1,this.refresh()},refresh:function(){if(this.active){this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height);for(var t=0;t<this.children.length;t++)this.children[t].draw()}},add:function(){for(var t=0;t<arguments.length;t++){var e=arguments[t];e.panel=this,e.canvas=this.canvas,e.container=this.container,e.ctx=this.ctx,this.children.push(e),e._init&&!e.added&&e._init(),e.oninit&&!e.added&&e.oninit(),e.draw(),e.added=!0,"function"==typeof e.add&&e.add()}},clear:function(){this.ctx.clearRect(0,0,this.width,this.height),this.children.length=0},remove:function(t){if(this.ctx.clearRect(t._x(),t._y(),t._width(),t._height()),"undefined"!=typeof t.children&&"XY"!==t.type)for(var e=0;e<t.children.length;e++)this.children.splice(this.children.indexOf(t.children[e]),1),s.widgets.splice(s.widgets.indexOf(t.children[e]),1);else this.children.indexOf(t)>-1&&(this.children.splice(this.children.indexOf(t),1),s.widgets.splice(s.widgets.indexOf(t),1),"function"==typeof t.remove&&t.remove())}}),"undefined"!=typeof arguments[0]&&s.extend(this,arguments[0]),this.backgroundColor&&this.setBackgroundColor(this.backgroundColor),this.init(),this.timer=setInterval(function(){t.draw()},Math.round(1e3/this.fps));var i="#000",o="#666",r="#999",h="transparent",t=this,a=this.useRelativeSizesAndPositions;Object.defineProperties(this,{useRelativeSizesAndPositions:{get:function(){return a},set:function(t){if(t!==a)if(a=t,t===!1)for(var e=0;e<this.children.length;e++){var i=this.children[e];i.bounds=[Math.round(i.x*this.width),Math.round(i.y*this.height),Math.round(i.width*this.width),Math.round(i.height*this.height)]}else for(var e=0;e<this.children.length;e++){var i=this.children[e];i.bounds=[i.x/this.width,i.y/this.height,i.width/this.width,i.height/this.height]}this.refresh()}},background:{get:function(){return h},set:function(t){h=t,n(this.container).css({backgroundColor:h})}},childBackground:{get:function(){return i},set:function(e){i=e,t.refresh()}},childStroke:{get:function(){return r},set:function(e){r=e,t.refresh()}},childFill:{get:function(){return o},set:function(e){o=e,t.refresh()}}}),arguments[0]&&(arguments[0].childBackground&&(this.childBackground=arguments[0].childBackground),arguments[0].childFill&&(this.childFill=arguments[0].childFill),arguments[0].childStroke&&(this.childStroke=arguments[0].childStroke)),s.panels.push(this)};var o=function(t){switch(t){case"mousedown":return"touchmousedown";case"mousemove":return"touchmousemove";case"mouseup":return"touchmouseup";default:return t}},r=function(t){switch(t){case"touchstart":return"touchmousedown";case"touchmove":return"touchmousemove";case"touchend":return"touchmouseup";default:return t}},h=0,a={hasFocus:!1,requiresFocus:!0,min:0,max:1,value:0,lastValue:null,name:null,events:{ontouchstart:null,ontouchmove:null,ontouchend:null,onmousedown:null,onmousemove:null,onmouseup:null,ontouchmousedown:null,ontouchmousemove:null,ontouchmouseup:null,onvaluechange:null,onboundschange:null}};s.Widget={init:function(t){this.added=!1,s.extend(this,a),"undefined"==typeof t&&(t={}),this.name=t.name||this.type+"_"+h++,this.target="OSC",this.key="/"+this.name,s.extend(this,t),this.bounds&&(this.x=t.bounds[0],this.y=t.bounds[1],this.width=t.bounds[2],this.height=t.bounds[3]),this.colors&&(this.background=t.colors[0],this.fill=t.colors[1],this.stroke=t.colors[2]),this.focusedTouches=[],this.value&&this.setValue(this.value,!0);{var e=this.bounds||[this.x,this.y,this.width,this.height],i=this.x,n=this.y,o=this.width,r=this.height;this.value}Object.defineProperties(this,{bounds:{configurable:!0,get:function(){return e},set:function(t){e=t,this.x=e[0],this.y=e[1],this.width=e[2],this.height=e[3],this.onboundschange&&this.onboundschange()}},x:{configurable:!0,get:function(){return i},set:function(t){this.clear(),i=t,this.onboundschange&&this.onboundschange(),this.refresh()}},y:{configurable:!0,get:function(){return n},set:function(t){this.clear(),n=t,this.onboundschange&&this.onboundschange(),this.refresh()}},width:{configurable:!0,get:function(){return o},set:function(t){this.clear(),o=t,this.onboundschange&&this.onboundschange(),this.refresh()}},height:{configurable:!0,get:function(){return r},set:function(t){this.clear(),r=t,this.onboundschange&&this.onboundschange(),this.refresh()}}}),s.widgets.push(this)},clear:function(){this.panel&&this.panel.ctx.clearRect(this._x(),this._y(),this._width(),this._height())},refresh:function(){this.panel&&-1===this.panel.shouldDraw.indexOf(this)&&this.panel.shouldDraw.push(this)},setValue:function(t,e){var i=this.max-this.min,n=t;this.value=t,0!==this.min||1!==this.max?(n-=this.min,this._value=n/i):this._value=this.value,e||this.refresh()},hitTest:function(t){return t.x>=this._x()&&t.x<=this._x()+this._width()&&t.y>=this._y()&&t.y<=this._y()+this._height()?!0:!1},mouseEvent:function(t){var e=this.hitTest(t),i=o(t.type);(e||this.hasFocus||!this.requiresFocus)&&("mousedown"===t.type&&(this.hasFocus=!0),this[t.type]&&this[t.type](t,e),this["on"+t.type]&&this["on"+t.type](t,e),this["on"+i]&&this["on"+i](t,e)),"mouseup"===t.type&&(this.hasFocus=!1)},touchEvent:function(t){var e=this.hitTest(t),i=r(t.type);if((e||this.hasFocus||!this.requiresFocus)&&("touchstart"===t.type&&(this.focusedTouches.push(t),this.hasFocus=!0),this[t.type]&&this[t.type](t,e),this["on"+t.type]&&this["on"+t.type](t,e),this["on"+i]&&this["on"+i](t,e)),"touchend"===t.type)for(var n=0;n<this.focusedTouches.length;n++)if(this.focusedTouches[n].id===t.id){this.focusedTouches.splice(n,1),0===this.focusedTouches.length&&(this.hasFocus=!1);break}},draw:function(){},sendTargetMessage:function(){if(this.target&&this.key)if("OSC"===this.target){if(s.OSC)if("undefined"==typeof this.values){var t="string"==typeof this.value?"s":"f";s.OSC.send(this.key,t,[this.value])}else if("undefined"==typeof this.sendValues){for(var t="",e=0;e<this.values.length;e++)t+="string"==typeof this.value?"s":"f";s.OSC.send(this.key,t,this.values)}else this.sendValues()}else if("MIDI"===this.target)s.MIDI&&"undefined"==typeof this.values&&s.MIDI.send(this.key[0],this.key[1],this.key[2],this.value);else if("WebSocket"===this.target){var i,n={type:"socket",address:this.key};if(s.Socket){if("undefined"==typeof this.values)i=[this.value];else{if("undefined"!=typeof this.sendValues)return void this.sendValues();i=[this.values]}n.parameters=i,s.Socket.send(JSON.stringify(n))}}else"function"==typeof this.target[this.key]?this.target[this.key](this.values||this.value):this.target[this.key]=this.values||this.value},_background:function(){return this.background||this.panel.childBackground},_stroke:function(){return this.stroke||this.panel.childStroke},_fill:function(){return this.fill||this.panel.childFill},_x:function(){return this.panel.useRelativeSizesAndPositions?Math.floor(this.x*this.panel.width):this.x},_y:function(){return this.panel.useRelativeSizesAndPositions?Math.floor(this.y*this.panel.height):this.y},_width:function(){return this.panel.useRelativeSizesAndPositions?Math.floor(this.width*this.panel.width):this.width},_height:function(){return this.panel.useRelativeSizesAndPositions?Math.floor(this.height*this.panel.height):this.height},_font:function(){var t=this.font||this.panel.font;return t},label:null,_serializeMe:["background","stroke","fill","x","y","width","height","value","label","onmousedown","onmousemove","onmouseup","ontouchmousedown","ontouchmousemove","ontouchmouseup","ontouchstart","ontouchmove","ontouchend","onvaluechange","name","type","target","key"]},s.HBox=function(){s.extend(this,{type:"HBox",children:[],proxyPanel:{active:!0,x:0,y:0,width:1,height:1,shouldDraw:[],useRelativeSizesAndPositions:!0},add:function(){for(var t=0;t<arguments.length;t++){var e=arguments[t];-1===this.children.indexOf(e)&&this.children.push(e),e.panel=this.proxyPanel,e.ctx=this.panel.ctx}this.layout(),this.draw()},layout:function(){for(var t=this.width/this.children.length/this.width,e=0,i=0;i<this.children.length;i++){var n=this.children[i];n.x=e+this.x,n.y=this.y*(1/this.height),n.width=t,n.height=1,e+=t}return this},draw:function(){this.proxyPanel.width=this._width(),this.proxyPanel.height=this._height();for(var t=0;t<this.children.length;t++)this.children[t].draw()},refresh:function(){for(var t=0;t<this.proxyPanel.shouldDraw.length;t++)this.proxyPanel.shouldDraw[t].draw();this.proxyPanel.shouldDraw.length=0},mouseEvent:function(t){for(var e=0;e<this.children.length;e++){{this.children[e]}this.children[e].mouseEvent(t)}},touchEvent:function(t){for(var e=0;e<this.children.length;e++){{this.children[e]}this.children[e].touchEvent(t)}},_init:function(){this.useRelativeSizesAndPositions=this.panel.useRelativeSizesAndPositions,this.proxyPanel.width=this._width(),this.proxyPanel.height=this._height(),this.proxyPanel.__proto__=this.panel,n.subscribe("/draw",this.refresh.bind(this)),Object.defineProperties(this,{bounds:{configurable:!0,get:function(){return bounds},set:function(t){bounds=t,this.x=bounds[0],this.y=bounds[1],this.width=bounds[2],this.height=bounds[3],this.layout(),this.draw()}}})}}).init(arguments[0])},s.HBox.prototype=s.Widget,s.VBox=function(){s.extend(this,{type:"VBox",children:[],proxyPanel:{active:!0,x:0,y:0,width:1,height:1,shouldDraw:[],useRelativeSizesAndPositions:!0},add:function(){for(var t=0;t<arguments.length;t++){var e=arguments[t];this.children.push(e),e.panel=this.proxyPanel,e.ctx=this.panel.ctx}this.layout(),this.draw()},layout:function(){for(var t=this.height/this.children.length,e=0,i=0;i<this.children.length;i++){var n=this.children[i];n.x=this.x,n.y=(this.y+e)*(1/this.height),n.width=1,n.height=t*(1/this.height),e+=t}return this},draw:function(){this.proxyPanel.width=this._width(),this.proxyPanel.height=this._height();for(var t=0;t<this.children.length;t++)this.children[t].draw()},refresh:function(){for(var t=0;t<this.proxyPanel.shouldDraw.length;t++)this.proxyPanel.shouldDraw[t].draw();this.proxyPanel.shouldDraw.length=0},mouseEvent:function(t){for(var e=0;e<this.children.length;e++){{this.children[e]}this.children[e].mouseEvent(t)}},touchEvent:function(t){t.x-=this._x(),t.y-=this._y();for(var e=0;e<this.children.length;e++){{this.children[e]}this.children[e].touchEvent(t)}},_init:function(){this.useRelativeSizesAndPositions=this.panel.useRelativeSizesAndPositions,this.proxyPanel.width=this._width(),this.proxyPanel.height=this._height(),this.proxyPanel.__proto__=this.panel,n.subscribe("/draw",this.refresh.bind(this)),Object.defineProperties(this,{bounds:{configurable:!0,get:function(){return bounds},set:function(t){bounds=t,this.x=bounds[0],this.y=bounds[1],this.width=bounds[2],this.height=bounds[3],this.layout(),this.draw()}}})}}).init(arguments[0])},s.VBox.prototype=s.Widget,s.Image=function(){s.extend(this,{type:"Image",image:null,path:null,_image:null,load:function(t){this.path=t,this._image=new Image,this._image.src=this.path,this._image.onload=function(){this.image=this._image,this.ctx.drawImage(this.image,this._x(),this._y())}.bind(this)},_init:function(){this.path&&this.load(this.path)},draw:function(){this.image&&this.ctx.drawImage(this.image,this._x(),this._y())}}).init(arguments[0])},s.Image.prototype=s.Widget,s.Slider=function(){s.extend(this,{type:"Slider",isVertical:!0,serializeMe:["isVertical"],draw:function(){var t=this._x(),e=this._y(),i=this._width(),n=this._height();this.ctx.fillStyle=this._background(),this.ctx.fillRect(t,e,i,n),this.ctx.fillStyle=this._fill(),this.isVertical?this.ctx.fillRect(t,e+n-this._value*n,i,this._value*n):this.ctx.fillRect(t,e,i*this._value,n),this.label&&(this.ctx.fillStyle=this._stroke(),this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font=this._font(),this.ctx.fillText(this.label,t+i/2,e+n/2)),this.ctx.strokeStyle=this._stroke(),this.ctx.strokeRect(t,e,i,n)},changeValue:function(t,e){(this.hasFocus||!this.requiresFocus)&&(this._value=this.isVertical?1-e/this._height():t/this._width(),this._value<0?this._value=0:this._value>1&&(this._value=1),this.value=this.min+(this.max-this.min)*this._value,this.value!==this.lastValue&&(this.sendTargetMessage(),this.onvaluechange&&this.onvaluechange(),this.refresh(),this.lastValue=this.value))},mousedown:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},mousemove:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},mouseup:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},touchstart:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchmove:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchend:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())}}).init(arguments[0])},s.Slider.prototype=s.Widget,s.Crossfader=function(){s.extend(this,{type:"Crossfader",crossfaderWidth:30,serializeMe:["crossfaderWidth"],isVertical:!1,_value:.5,draw:function(){var t=this._x(),e=this._y(),i=this._width(),n=this._height();this.ctx.fillStyle=this._background(),this.ctx.fillRect(t,e,i,n),this.ctx.fillStyle=this._fill(),this.isVertical?this.ctx.fillRect(t,e+(n-this.crossfaderWidth)*this._value,i,this.crossfaderWidth):this.ctx.fillRect(t+(i-this.crossfaderWidth)*this._value,e,this.crossfaderWidth,n),this.label&&(this.ctx.fillStyle=this._stroke(),this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font=this._font(),this.ctx.fillText(this.label,t+i/2,e+n/2)),this.ctx.strokeStyle=this._stroke(),this.ctx.strokeRect(t,e,i,n)},changeValue:function(t,e){(this.hasFocus||!this.requiresFocus)&&(this._value=this.isVertical?e/this._height():t/this._width(),this._value<0?this._value=0:this._value>1&&(this._value=1),this.value=this.min+(this.max-this.min)*this._value,this.isVertical&&(this.value*=-1),this.value!==this.lastValue&&(this.sendTargetMessage(),this.onvaluechange&&this.onvaluechange(),this.refresh(),this.lastValue=this.value))},mousedown:function(t){this.changeValue(t.x-this._x(),t.y-this._y())},mousemove:function(t){this.changeValue(t.x-this._x(),t.y-this._y())},mouseup:function(t){this.changeValue(t.x-this._x(),t.y-this._y())},touchstart:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchmove:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchend:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())}}).init(arguments[0])},s.Crossfader.prototype=s.Widget,s.Button=function(){s.extend(this,{type:"Button",_value:0,serializeMe:["mode","label"],mode:"toggle",isMouseOver:!1,isTouchOver:!1,label:null,requiresFocus:!1,draw:function(){var t=this._x(),e=this._y(),i=this._width(),n=this._height();this.ctx.fillStyle=this._value?this._fill():this._background(),this.ctx.fillRect(t,e,i,n),null!==this.label&&(this.ctx.fillStyle=this._stroke(),this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font=this._font(),this.ctx.fillText(this.label,t+i/2,e+n/2)),this.ctx.strokeStyle=this._stroke(),this.ctx.strokeRect(t,e,i,n)},changeValue:function(){(this.hasFocus||!this.requiresFocus)&&(this._value=!this._value,this.value=this._value?this.max:this.min,(this.value!==this.lastValue||"contact"===this.mode)&&(this.sendTargetMessage(),this.onvaluechange&&this.onvaluechange(),this.draw(),this.lastValue=this.value))},setValue:function(t,e){var i=this.max-this.min,n=t;this.value=t,0!==this.min||1!==this.max?(n-=this.min,this._value=n/i):this._value=this.value,this.lastValue=this.value,e||"contact"===this.mode||this.refresh()},mousedown:function(t,e){if(e&&s.mouseDown&&(this.isMouseOver=!0,this.changeValue(),"contact"===this.mode)){var i=this;setTimeout(function(){i._value=0,i.draw()},75)}},mousemove:function(t,e){if(!this.requiresFocus&&e&&s.mouseDown&&!this.isMouseOver)if(this.isMouseOver=!0,"contact"!==this.mode)this.changeValue();else{this._value=1,this.draw();var i=this;setTimeout(function(){i._value=0,i.draw()},75)}else!e&&this.isMouseOver&&(console.log("moved off!"),this.isMouseOver=!1)},mouseup:function(){"momentary"===this.mode&&(this.changeValue(),this.isMouseOver=!1)},touchstart:function(t,e){if(e&&(this.isTouchOver=!0,this.changeValue(),"contact"===this.mode)){var i=this;setTimeout(function(){i._value=0,i.draw()},75)}},touchmove:function(t,e){if(this.requiresFocus||!e||this.isTouchOver)!e&&this.isTouchOver&&(this.isTouchOver=!1);else if(this.isTouchOver=!0,"contact"!==this.mode)this.changeValue();else{this._value=1,this.draw();var i=this;setTimeout(function(){i._value=0,i.draw()},75)}},touchend:function(){this.isTouchOver=!1,"momentary"===this.mode&&this.changeValue()}}).init(arguments[0])},s.Button.prototype=s.Widget,s.ButtonV=function(){s.extend(this,{type:"ButtonV",_value:0,serializeMe:["mode","label"],mode:"toggle",isMouseOver:!1,isTouchOver:!1,label:null,points:[{x:0,y:0},{x:0,y:1},{x:1,y:1},{x:1,y:0},{x:0,y:0}],textLocation:{x:.5,y:.5},draw:function(){var t=this._x(),e=this._y(),i=0,n=this._width(),s=this._height();for(this.ctx.fillStyle=this._value?this._fill():this._background(),this.ctx.beginPath(),this.ctx.strokeStyle=this._stroke(),i;i<this.points.length;i++)0===i?this.ctx.moveTo(t+this.points[i].x*n,e+this.points[i].y*s):this.ctx.lineTo(t+this.points[i].x*n,e+this.points[i].y*s);this.ctx.lineTo(t+this.points[0].x*n,e+this.points[0].y*s),this.ctx.closePath(),this.ctx.fill(),this.ctx.stroke(),null!==this.label&&(this.ctx.fillStyle=this._stroke(),this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font=this._font(),this.ctx.fillText(this.label,t+n*this.textLocation.x,e+s*this.textLocation.y))},changeValue:function(){(this.hasFocus||!this.requiresFocus)&&(this._value=!this._value,this.value=this._value?this.max:this.min,(this.value!==this.lastValue||"contact"===this.mode)&&(this.sendTargetMessage(),this.onvaluechange&&this.onvaluechange(),this.draw(),this.lastValue=this.value))},hitTest:function(t){var e=this._width(),i=this._height(),n=this._x(),s=this._y();if(t.x>=n&&t.x<=n+e&&t.y>=s&&t.y<=s+i){var o=0,r=this.points,h=0;for(o;o<r.length-1;o++)if(r[o+1].x>r[o].x){if(r[o].x*e+n<=t.x&&t.x<r[o+1].x*e+n){var a=(r[o+1].y-r[o].y)/(r[o+1].x-r[o].x)*i/e*(t.x-r[o].x*e+n)+r[o].y*i+s;a-t.y<0&&h++}}else if(r[o+1].x<r[o].x&&r[o].x*e+n>=t.x&&t.x>r[o+1].x*e+n){var a=(r[o+1].y-r[o].y)/(r[o+1].x-r[o].x)*i/e*(t.x-r[o].x*e+n)+r[o].y*i+s;a-t.y<0&&h++}if(h%2==1)return!0}return!1},setValue:function(t,e){var i=this.max-this.min,n=t;this.value=t,0!==this.min||1!==this.max?(n-=this.min,this._value=n/i):this._value=this.value,this.lastValue=this.value,e||"contact"===this.mode||this.refresh()},mousedown:function(t,e){if(e&&s.mouseDown&&(this.isMouseOver=!0,this.changeValue(),"contact"===this.mode)){var i=this;setTimeout(function(){i._value=0,i.draw()},75)}},mousemove:function(t,e){if(!this.requiresFocus&&e&&s.mouseDown&&!this.isMouseOver)if(this.isMouseOver=!0,"contact"!==this.mode)this.changeValue();else{this._value=1,this.draw();var i=this;setTimeout(function(){i._value=0,i.draw()},75)}else if(!e&&this.isMouseOver)if(this.isMouseOver=!1,"contact"!==this.mode)this.changeValue();else{this._value=1,this.draw();var i=this;setTimeout(function(){i._value=0,i.draw()},75)}},mouseup:function(){"momentary"===this.mode&&(this.requiresFocus||!this.requiresFocus&&this.isMouseOver)&&(this.isMouseOver=!1,this.changeValue())},touchstart:function(t,e){if(e&&(this.isTouchOver=!0,this.changeValue(),"contact"===this.mode)){var i=this;setTimeout(function(){i._value=0,i.draw()},75)}},touchmove:function(t,e){if(this.requiresFocus||!e||this.isTouchOver)if(!e&&this.isTouchOver)if(this.isTouchOver=!1,"contact"!==this.mode)this.changeValue();else{this._value=1,this.draw();var i=this;setTimeout(function(){i._value=0,i.draw()},75)}else!e&&this.isTouchOver&&(this.isTouchOver=!1);else if(this.isTouchOver=!0,"contact"!==this.mode)this.changeValue();else{this._value=1,this.draw();var i=this;setTimeout(function(){i._value=0,i.draw()},75)}},touchend:function(){(this.momentary&&this.requiresFocus||!this.requiresFocus&&this.isTouchOver)&&this.changeValue(),this.isTouchOver=!1}}).init(arguments[0])},s.ButtonV.prototype=s.Widget,s.Piano=function(){s.extend(this,{type:"Piano",_value:0,serializeMe:["mode","label"],mode:"toggle",isMouseOver:!1,isTouchOver:!1,label:null,startletter:"C",startoctave:3,endletter:"C",endoctave:5,target:null,noteLabels:!1,_initialized:!1,keyMap:["Z","S","X","D","C","V","G","B","H","N","J","M",","],children:[],play:function(t,e){isNaN(e)&&(e=4410),"undefined"!=typeof Gibber&&(e=Gibber.Clock.time(e));var i=this.children[t];i&&(i.changeValue(),future(function(){1==i._value&&i.changeValue()},e))},onkeyup:function(t){var e=s.keyCodeToChar[t.keyCode],i=this.keyMap.indexOf(e),n=this.children[i];"undefined"!=typeof n&&1==n._value&&n.changeValue()},onkeydown:function(t){var e=s.keyCodeToChar[t.keyCode],i=this.keyMap.indexOf(e),n=this.children[i];"undefined"!=typeof n&&0==n._value&&n.changeValue()},onvaluechange:function(){this.values=[261.626*Math.pow(2,(this.startnote+12*this.octave-49)/12),this.value]},onboundschange:function(){this._initialized&&this.placeKeys()},draw:function(){for(var t=0;t<this.children.length;t++)this.children[t].refresh();return this},placeKeys:function(){var t=(this._x(),this._y(),this._width(),this._height(),this.startoctave),e=0,i=0,n=["0","C","C#/Db","D","D#/Eb","E","F","F#/Gb","G","G#/Ab","A","A#/Bb","B"],o=["0","C","C#","D","D#","E","F","F#","G","G#","A","A#","B"],r=[0,1,2,2,3,3,4,5,5,6,6,7,7],h=i+12*this.endoctave-(e+12*this.startoctave)+1,a=r[i]+7*this.endoctave-(r[e]+7*this.startoctave)+1,u=0;if(this._initialized){this.clear();for(var l=this.children.length-1;l>=0;l--){var c=this.children.pop();this.panel.remove(c)}}for(var l=1;13>l;l++)this.startletter===o[l]&&(e=l),this.endletter===o[l]&&(i=l);[2,4,7,9,11].indexOf(i)>-1&&a--;for(var l=0;h-1>l;l++){var d,f,p,g,v,y;switch(e){case 1:d=[{x:0,y:0},{x:.6,y:0},{x:.6,y:.625},{x:1,y:.625},{x:1,y:1},{x:0,y:1},{x:0,y:0}],p=this._fill(),f={x:.5,y:.75},g=this._background(),v=[u/a*this.width+this.x,this.y,this.width/a,this.height],y=this.noteLabels?n[e]+t:null;break;case 2:d=[{x:.1,y:0},{x:.7,y:0},{x:.7,y:1},{x:.1,y:1},{x:.1,y:0}],f={x:.3925,y:.5},p=this._background(),g=this._fill(),v=[(u-.5)/a*this.width+this.x,this.y,this.width/a,.625*this.height],y=this.noteLabels?n[e]:null;break;case 3:d=[{x:.2,y:0},{x:.8,y:0},{x:.8,y:.625},{x:1,y:.625},{x:1,y:1},{x:0,y:1},{x:0,y:.625},{x:.2,y:.625},{x:.2,y:0}],f={x:.5,y:.75},p=this._fill(),g=this._background(),v=[u/a*this.width+this.x,this.y,this.width/a,this.height],y=this.noteLabels?n[e]:null;break;case 4:d=[{x:.3,y:0},{x:.9,y:0},{x:.9,y:1},{x:.3,y:1},{x:.3,y:0}],f={x:.6075,y:.5},p=this._background(),g=this._fill(),v=[(u-.5)/a*this.width+this.x,this.y,this.width/a,.625*this.height],y=this.noteLabels?n[e]:null;break;case 5:d=[{x:1,y:0},{x:.4,y:0},{x:.4,y:.625},{x:0,y:.625},{x:0,y:1},{x:1,y:1},{x:1,y:0}],f={x:.5,y:.75},p=this._fill(),g=this._background(),v=[u/a*this.width+this.x,this.y,this.width/a,this.height],y=this.noteLabels?n[e]:null;break;case 6:d=[{x:0,y:0},{x:.57142857,y:0},{x:.57142857,y:.625},{x:1,y:.625},{x:1,y:1},{x:0,y:1},{x:0,y:0}],f={x:.5,y:.75},p=this._fill(),g=this._background(),v=[u/a*this.width+this.x,this.y,this.width/a,this.height],y=this.noteLabels?n[e]:null;break;case 7:d=[{x:.07142857,y:0},{x:.64285714,y:0},{x:.64285714,y:1},{x:.07142857,y:1},{x:.07142857,y:0}],f={x:.3925,y:.5},p=this._background(),g=this._fill(),v=[(u-.5)/a*this.width+this.x,this.y,this.width/a,.625*this.height],y=this.noteLabels?n[e]:null;break;case 8:d=[{x:.14285714,y:0},{x:.71428571,y:0},{x:.71428571,y:.625},{x:1,y:.625},{x:1,y:1},{x:0,y:1},{x:0,y:.625},{x:.14285714,y:.625},{x:.14285714,y:0}],f={x:.5,y:.75},p=this._fill(),g=this._background(),v=[u/a*this.width+this.x,this.y,this.width/a,this.height],y=this.noteLabels?n[e]:null;break;case 9:d=[{x:.21428571,y:0},{x:.78571428,y:0},{x:.78571428,y:1},{x:.21428571,y:1},{x:.21428571,y:0}],p=this._background(),g=this._fill(),v=[(u-.5)/a*this.width+this.x,this.y,this.width/a,.625*this.height],y=this.noteLabels?n[e]:null;break;case 10:d=[{x:.28571428,y:0},{x:.85714285,y:0},{x:.85714285,y:.625},{x:1,y:.625},{x:1,y:1},{x:0,y:1},{x:0,y:.625},{x:.28571428,y:.625},{x:.28571428,y:0}],p=this._fill(),g=this._background(),f={x:.5,y:.75},v=[u/a*this.width+this.x,this.y,this.width/a,this.height],y=this.noteLabels?n[e]:null;break;case 11:d=[{x:.35714285,y:0},{x:.92857142,y:0},{x:.92857142,y:1},{x:.35714285,y:1},{x:.35714285,y:0}],p=this._background(),g=this._fill(),f={x:.6075,y:.5},v=[(u-.5)/a*this.width+this.x,this.y,this.width/a,.625*this.height],y=this.noteLabels?n[e]:null;break;case 12:d=[{x:1,y:0},{x:.42857142,y:0},{x:.42857142,y:.625},{x:0,y:.625},{x:0,y:1},{x:1,y:1},{x:1,y:0}],p=this._fill(),g=this._background(),f={x:.5,y:.75},v=[u/a*this.width+this.x,this.y,this.width/a,this.height],y=this.noteLabels?n[e]:null}var m=new s.ButtonV({points:d,textLocation:f,target:this.target,onvaluechange:this.onvaluechange,startnote:e,octave:t,frequency:261.626*Math.pow(2,(e+12*t-49)/12),background:p,fill:g,stroke:this._stroke(),bounds:v,label:y,requiresFocus:!1,mode:"momentary"});-1===[2,4,7,9,11].indexOf(e)&&u++,this.children.push(m),this.panel.add(m),e++,e>12&&(e=1,t++)}if(2==e||4==e||7==e||9==e||11==e)var x=new s.ButtonV({points:[{x:.166,y:0},{x:.5,y:0},{x:.5,y:1},{x:.166,y:1},{x:.166,y:0}],target:this.target,onvaluechange:this.onvaluechange,background:this._background(),startnote:e,octave:t,frequency:261.626*Math.pow(2,(e+12*t-49)/12),bounds:[(u-.5)/a*this.width+this.x,this.y,this.width/a,.625*this.height],label:this.noteLabels?n[e]:null,stroke:this._stroke(),requiresFocus:!1,mode:"momentary"});else if(1==e)var x=new s.ButtonV({textLocation:{x:.5,y:.75},target:this.target,onvaluechange:this.onvaluechange,startnote:e,octave:t,frequency:261.626*Math.pow(2,(e+12*t-49)/12),background:this._fill(),fill:this._background(),stroke:this._stroke(),bounds:[u/a*this.width+this.x,this.y,this.width/a,this.height],label:this.noteLabels?n[e]+t:null,requiresFocus:!1,mode:"momentary"});else if(4==e)var x=new s.ButtonV({textLocation:{x:.5,y:.75},target:this.target,onvaluechange:this.onvaluechange,startnote:e,octave:t,frequency:261.626*Math.pow(2,(e+12*t-49)/12),background:this._fill(),fill:this._background(),stroke:this._stroke(),bounds:[u/a*this.width+this.x,this.y,this.width/a,this.height],label:this.noteLabels?n[e]:null,requiresFocus:!1,mode:"momentary"});
else var x=new s.ButtonV({points:[{x:1,y:0},{x:.33,y:0},{x:.33,y:.625},{x:0,y:.625},{x:0,y:1},{x:1,y:1},{x:1,y:0}],textLocation:{x:.5,y:.75},target:this.target,onvaluechange:this.onvaluechange,startnote:e,octave:t,frequency:261.626*Math.pow(2,(e+12*t-49)/12),background:this._fill(),fill:this._background(),stroke:this._stroke(),bounds:[u/a*this.width+this.x,this.y,this.width/a,this.height],label:this.noteLabels?n[e]:null,requiresFocus:!1,mode:"momentary"});this.children.push(x),this.panel.add(x),this._initialized=!0},_init:function(){this.placeKeys()}}).init(arguments[0])},s.Piano.prototype=s.Widget,s.Knob=function(){s.extend(this,{type:"Knob",_value:0,serializeMe:["usesRotation","knobBuffer"],knobBuffer:3,lastPosition:0,usesRotation:!0,draw:function(){var t=this._x(),e=this._y(),i=this._width(),n=(this._height(),i/2);this.ctx.clearRect(t,e,2*n,2*n),this.ctx.strokeStyle=this._stroke(),this.ctx.fillStyle=this._background();var s=.6*Math.PI,o=.4*Math.PI;if(this.ctx.beginPath(),this.ctx.arc(t+n,e+n,n-this.knobBuffer,s,o,!1),this.ctx.arc(t+n,e+n,.3*(n-this.knobBuffer),o,s,!0),this.ctx.closePath(),this.ctx.fill(),this.ctx.fillStyle=this._fill(),this.centerZero){var r,h=1.5*Math.PI;r=this._value>=.5?Math.PI*(1.5+1.8*(this._value-.5)):Math.PI*(1.5-.9*(1-2*this._value)),this._value>1.8*Math.PI&&(this._value-=1.8*Math.PI),this.ctx.beginPath(),this.ctx.arc(t+n,e+n,n-this.knobBuffer,h,r,this._value<.5),this.ctx.arc(t+n,e+n,.3*(n-this.knobBuffer),r,h,this._value>.5),this.ctx.closePath(),this.ctx.fill()}else{if(this.isInverted)var a=Math.PI*(.4-1.8*this._value);else{var a=.6*Math.PI+1.8*this._value*Math.PI;a>2*Math.PI&&(a-=2*Math.PI)}this.ctx.beginPath(),this.isInverted?(this.ctx.arc(t+n,e+n,n-this.knobBuffer,o,a,!0),this.ctx.arc(t+n,e+n,.3*(n-this.knobBuffer),a,o,!1)):(this.ctx.arc(t+n,e+n,n-this.knobBuffer,s,a,!1),this.ctx.arc(t+n,e+n,.3*(n-this.knobBuffer),a,s,!0)),this.ctx.closePath(),this.ctx.fill()}this.ctx.beginPath(),this.ctx.arc(t+n,e+n,n-this.knobBuffer,s,o,!1),this.ctx.arc(t+n,e+n,.3*(n-this.knobBuffer),o,s,!0),this.ctx.closePath(),this.ctx.stroke(),null!==this.label&&(this.ctx.fillStyle=this._stroke(),this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font=this._font(),this.ctx.fillText(this.label,t+n,e+2.25*n))},setValue:function(t,e){var i=this.max-this.min,n=t;this.lastValue=this.value,this.value=t,0!==this.min||1!==this.max?(n-=this.min,this._value=n/i):this._value=this.value,this.value!==this.lastValue&&(this.sendTargetMessage(),this.onvaluechange&&this.onvaluechange(),this.refresh(),this.lastValue=this.value),e||this.refresh()},changeValue:function(t,e){if(this.hasFocus||!this.requiresFocus){var i=this._width()/2;if(this.lastValue=this.value,this.usesRotation){var n=i-t,s=i-e,o=Math.PI+Math.atan2(s,n);this._value=(o+1.5*Math.PI)%(2*Math.PI)/(2*Math.PI),this.lastRotationValue>.8&&this._value<.2?this._value=1:this.lastRotationValue<.2&&this._value>.8&&(this._value=0)}else-1!=this.lastPosition&&(this._value-=(e-this.lastPosition)/(2*i));this._value>1&&(this._value=1),this._value<0&&(this._value=0),this.lastRotationValue=this._value,this.lastPosition=e;var r=this.max-this.min;this.value=this.min+this._value*r,this.value!==this.lastValue&&(this.sendTargetMessage(),this.onvaluechange&&this.onvaluechange(),this.refresh(),this.lastValue=this.value)}},hitTest:function(t){return t.x>=this._x()&&t.x<this._x()+this._width()&&t.y>=this._y()&&t.y<this._y()+this._width()?!0:!1},mousedown:function(t){this.lastPosition=t.y-this._y(),this.changeValue(t.x-this._x(),t.y-this._y())},mousemove:function(t){this.changeValue(t.x-this._x(),t.y-this._y())},mouseup:function(){},touchstart:function(t){this.lastPosition=t.y-this._y(),this.changeValue(t.x-this._x(),t.y-this._y())},touchmove:function(t){this.changeValue(t.x-this._x(),t.y-this._y())},touchend:function(){},_init:function(){var t=this.width,e=this.height;Object.defineProperty(this,"width",{configurable:!0,get:function(){return t},set:function(i){this.clear(),t=e=i,this.refresh()}}),Object.defineProperty(this,"height",{configurable:!0,get:function(){return e},set:function(t){e=t}})}}).init(arguments[0])},s.Knob.prototype=s.Widget,s.XY=function(){var t=this,e={x:0,y:0},n={x:0,y:0},o={x:0,y:0},h=0;s.extend(this,{type:"XY",_value:0,serializeMe:["childWidth","childHeight","numChildren","usePhysics","values","friction","maxVelocity","detectCollisions","fps"],childWidth:25,childHeight:25,children:[],values:[],_values:[],numChildren:1,usePhysics:!0,friction:.9,activeTouch:null,maxVelocity:10,detectCollisions:!0,touchCount:0,timer:null,fps:30,outputInitialValues:!0,rainbow:function(){for(var t=0;t<this.children.length;t++){var e=this.children[t];e.fill=s.XY.colors[t%s.XY.colors.length]}},remove:function(){this.stopAnimation(),s.widgets.splice(s.widgets.indexOf(this),1)},add:function(){this.usePhysics&&this.startAnimation()},startAnimation:function(){null===this.timer&&(this.timer=setInterval(function(){t.refresh()},1/this.fps*1e3))},stopAnimation:function(){clearInterval(this.timer),this.timer=null},animate:function(){for(var t=(this._x(),this._y(),this._width()),e=this._height(),n=!1,s=0;s<this.children.length;s++){var o=(moveY=!1,this.children[s]);o.x+o.vx<t&&o.x+o.vx>0?o.x+=o.vx:o.x+o.vx>=t&&o.vx>0?o.vx*=-1:o.x+o.vx<=0&&o.vx<0?o.vx*=-1:o.x+=o.vx,o.y+o.vy<e&&o.y+o.vy>0?o.y+=o.vy:o.y+o.vy>=e&&o.vy>0?o.vy*=-1:o.y+o.vy<=0&&o.vy<0?o.vy*=-1:o.y+=o.vy,o.vx*=this.friction,o.vy*=this.friction;var r=o.x/t,h=o.y/e,a=this.max-this.min;(this.values[o.id].x!==r||this.values[o.id].y!==h)&&(this.values[o.id].x=this.min+a*r,this.values[o.id].y=this.min+a*h,n=!0),this.detectCollisions&&(o.collideFlag?o.collideFlag=!1:this.collisionTest(o)),o.vx=Math.abs(o.vx)>this.maxVelocity?this.maxVelocity*i(o.vx):o.vx,o.vy=Math.abs(o.vy)>this.maxVelocity?this.maxVelocity*i(o.vy):o.vy}n&&(this.sendTargetMessage(),this.onvaluechange&&this.onvaluechange())},sendValues:function(){var t="";this._values.length=0;for(var e=0;e<this.values.length;e++)t+="ff",this._values.push(this.values[e].x),this._values.push(this.values[e].y);"OSC"===this.target?s.OSC&&s.OSC.send(this.key,t,this._values):"WebSocket"===this.target&&s.Socket&&s.Socket.send(JSON.stringify({address:this.key,parameters:this._values}))},collisionTest:function(t){for(var e=2*this.childWidth*2*this.childWidth,i=0;i<this.children.length;i++){var n=this.children[i];if(t.id!==n.id){var s=Math.pow(t.x-n.x,2)+Math.pow(t.y-n.y,2);e>s&&this.collide(t,n)}}},collide:function(t,s){e.x=t.x-s.x,e.y=t.y-s.y,n.x=t.vx-s.vx,n.y=t.vy-s.vy,h=Math.sqrt(Math.pow(e.x,2)+Math.pow(e.y,2)),o.x=e.x/h,o.y=e.y/h;var r=o.x*n.x+o.y*n.y;s.vx=t.vx+r*o.x,s.vy=t.vy+r*o.y,t.vx=s.vx-r*o.x,t.vy=s.vy-r*o.y,s.x-=o.x,s.y-=o.y,t.x+=o.x,t.y+=o.y,t.vx=Math.abs(t.vx)>this.maxVelocity?this.maxVelocity*i(t.vx):t.vx,t.vy=Math.abs(t.vy)>this.maxVelocity?this.maxVelocity*i(t.vy):t.vy,s.vx=Math.abs(s.vx)>this.maxVelocity?this.maxVelocity*i(s.vx):s.vx,s.vy=Math.abs(s.vy)>this.maxVelocity?this.maxVelocity*i(s.vy):s.vy,t.collideFlag=!0,s.collideFlag=!0},draw:function(){var t=this._x(),e=this._y(),i=this._width(),n=this._height();this.usePhysics&&this.animate(),this.ctx.fillStyle=this._background(),this.ctx.strokeStyle=this._stroke(),this.ctx.save(),this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.lineTo(t+i,e),this.ctx.lineTo(t+i,e+n),this.ctx.lineTo(t,e+n),this.ctx.lineTo(t,e),this.ctx.fill(),this.ctx.stroke(),this.ctx.clip(),this.ctx.fillStyle=this._fill();for(var s=0;s<this.children.length;s++){var o=this.children[s];this.ctx.lineWidth=2,this.ctx.fillStyle=o.fill||this._fill(),this.ctx.beginPath(),this.ctx.arc(t+o.x,e+o.y,this.childWidth,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.fill(),this.ctx.stroke(),this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.fillStyle=this._stroke(),this.ctx.font=this._font(),this.ctx.fillText(o.id,t+o.x,e+o.y)}this.ctx.closePath(),this.ctx.restore()},changeValue:function(t,e,i){(this.hasFocus||!this.requiresFocus)&&(t.x=e,t.x<0&&(t.x=0),t.x>this._width()&&(t.x=this._width()),t.y=i,t.y<0&&(t.y=0),t.y>this._height()&&(t.y=this._height()),this.values[t.id].x=e/this._width(),this.values[t.id].y=i/this._height(),this.onvaluechange&&this.onvaluechange(),this.usePhysics||(this.sendTargetMessage(),this.refresh()))},makeChildren:function(){for(var t=0;t<this.numChildren;t++){var e=Math.random()*this._width(),i=Math.random()*this._height();this.children.push({id:t,x:e,y:i,vx:0,vy:0,collideFlag:!1,isActive:!1,lastPosition:null}),this.values.push({x:null,y:null})}},touchEvent:function(t){var e=this.hitTest(t),i=r(t.type);e?("touchstart"===t.type?(this.hasFocus=!0,this.touchCount++,this.trackTouch(t.x-this._x(),t.y-this._y(),t)):this[t.type]&&this[t.type](t,e,t.childID),this["on"+t.type]&&this["on"+t.type](t,e,t.childId),this["on"+i]&&this["on"+i](t,e)):"touchend"===t.type&&(this.touchCount--,0===this.touchCount?this.hasFocus=!1:this.touchCount<0&&(this.touchCount=0),this.touchend(t),this["on"+t.type]&&this["on"+t.type](t,e,t.childId),this["on"+i]&&this["on"+i](t,e))},trackMouse:function(t,e){for(var i=1e4,n=null,s=null,o=0;o<this.children.length;o++){var r=this.children[o],h=Math.abs(r.x-t),a=Math.abs(r.y-e);i>h+a&&(i=h+a,n=r,s=o)}n.isActive=!0,n.vx=0,n.vy=0,null!=n&&this.changeValue(n,t,e),this.activeTouch=n,this.activeTouch.lastTouch=null,this.lastTouched=n},mousedown:function(t){this.hitTest(t)&&this.trackMouse(t.x-this._x(),t.y-this._y())},mousemove:function(t){if(this.hitTest(t)&&null!==this.activeTouch){if(null===this.activeTouch.lastTouch)this.activeTouch.lastTouch={x:t.x-this._x(),y:t.y-this._y()};else{var e={x:t.x-this._x(),y:t.y-this._y()};this.activeTouch.velocity={x:e.x-this.activeTouch.lastTouch.x,y:e.y-this.activeTouch.lastTouch.y},this.activeTouch.lastTouch=e}this.changeValue(this.activeTouch,t.x-this._x(),t.y-this._y())}},mouseup:function(){null!==this.activeTouch&&(this.activeTouch.vx=this.activeTouch.velocity.x,this.activeTouch.vy=this.activeTouch.velocity.y,this.activeTouch.lastTouch=null,this.activeTouch=null);for(var t=0;t<this.children.length;t++)this.children[t].isActive=!1},trackTouch:function(t,e,i){for(var n=1e4,s=null,o=null,r=0;r<this.children.length;r++){var h=this.children[r],a=Math.abs(h.x-t),u=Math.abs(h.y-e);n>a+u&&!h.isActive&&(n=a+u,s=h,o=r)}return s.isActive=!0,s.vx=0,s.vy=0,s.identifier=i.identifier,s.childID=o,null!=s&&this.changeValue(s,t,e),this.lastTouched=s,s.childID},touchstart:function(){},touchmove:function(t){for(var e=0;e<this.children.length;e++)if(_t=this.children[e],t.identifier===_t.identifier){this.changeValue(_t,t.x-this._x(),t.y-this._y());var i={x:t.x-this._x(),y:t.y-this._y()};null!==_t.lastPosition&&(_t.velocity={x:i.x-_t.lastPosition.x,y:i.y-_t.lastPosition.y}),_t.lastPosition=i}},touchend:function(t){for(var e=!1,i=null,n=0;n<this.children.length;n++){var s=this.children[n];t.identifier===s.identifier&&(s.velocity&&(s.vx=s.velocity.x,s.vy=s.velocity.y),s.lastPosition=null,s.isActive=!1,e=!0,i=n.childID)}e&&(this.touchUp=i)},_init:function(){this.makeChildren(),this.outputInitialValues&&this.sendTargetMessage()}}).init(arguments[0]),this.requiresFocus=!1,this.half=this.childWidth/2;var a=this.numChildren;Object.defineProperty(this,"numChildren",{get:function(){return a},set:function(t){for(;t>a;)this.children.push({id:this.children.length,x:Math.random()*this._width(),y:Math.random()*this._height(),vx:0,vy:0,collideFlag:!1,isActive:!1,lastPosition:null}),this.values.push({x:null,y:null}),a++;for(;a>t;)this.chidren.pop(),this.values.pop(),a--;this.refresh(),a=t}})},s.XY.prototype=s.Widget,s.XY.colors=["rgba(255,0,0,.35)","rgba(0,255,0,.35)","rgba(0,0,255,.35)","rgba(0,255,255,.35)","rgba(255,0,255,.35)","rgba(255,255,0,.35)"],s.Menu=function(){s.extend(this,{type:"Menu",_value:0,serializeMe:["options","fontSize"],options:[],fontSize:15,touchEvent:function(t){this.hitTest(t)&&t.stopPropagation()},_init:function(){this.element=n("<select>");for(var t=0;t<this.options.length;t++){var e=n("<option>"+this.options[t]+"</option>");this.element.append(e)}this.element.css({position:"absolute",backgroundColor:this._background(),color:this._stroke(),left:this._x()+this.panel.x,top:this._y()+this.panel.y,width:this._width(),height:this._height(),fontSize:this.fontSize,display:"block",border:"1px solid "+this._stroke()}),this.css&&this.element.css(this.css);var i=this;this.element.change(function(){var t=i.value;i.value=i.element.val(),i.sendTargetMessage(),i.onvaluechange(i.value,t)}),this.element.val(-1!==this.options.indexOf(this.value)?this.value:this.options[0]),n(this.container).append(this.element)}}).init(arguments[0])},s.Menu.prototype=s.Widget,s.Label=function(){s.extend(this,{type:"Label",serializeMe:["size","style","hAlign","vAlign","font"],size:12,style:"normal",hAlign:"center",vAlign:"top",font:"sans-serif",draw:function(){this.ctx.font=this.style+" "+this.size+"px "+this.font,this.ctx.textAlign=this.hAlign,this.ctx.textBaseline=this.vAlign;var t,e,i=this.ctx.measureText(this.lastValue),n={x:0,y:this._y()-this.size/2,width:i.width,height:this.size};switch(this.hAlign){case"center":t=this._x()+this._width()/2,n.x=t-i.width/2;break;case"left":t=this._x(),n.x=t;break;case"right":t=this._x()+this._width(),n.x=t-i.width}switch(this.vAlign){case"middle":e=this._y()+this._height()/2,n.y=e-this.size/2;break;case"top":e=this._y(),n.y=e;break;case"bottom":e=this._y()+this._height(),n.y=e-this.size/2}this.ctx.clearRect(n.x,n.y,n.width,2*n.height),this.ctx.save(),this.ctx.beginPath(),this.ctx.moveTo(this._x(),this._y()),this.ctx.lineTo(this._x()+this._width(),this._y()),this.ctx.lineTo(this._x()+this._width(),this._y()+this._height()),this.ctx.lineTo(this._x(),this._y()+this._height()),this.ctx.lineTo(this._x(),this._y()),this.ctx.closePath(),this.ctx.clip(),this.ctx.fillStyle=this._stroke(),this.ctx.fillText(this.value,t,e),this.ctx.restore(),this.lastValue=this.value}}).init(arguments[0]),this.lastValue=this.value},s.Label.prototype=s.Widget,s.TextField=function(){s.extend(this,{type:"TextField",serializeMe:["fontSize"],fontSize:15,touchEvent:function(t){if(this.hitTest(t)){var e=document.createEvent("TouchEvent");e.initUIEvent("touchstart",!0,!0),e.view=window,e.screenX=t.screenX,e.screenY=t.screenY,e.clientX=t.clientX,e.clientY=t.clientY,e.bubbles=!1,e.view=window,e.altKey=!1,e.ctrlKey=!1,e.shiftKey=!1,e.metaKey=!1,this.element.dispatchEvent(e)}},_init:function(){this.element=n("<input>"),0!==this.value&&this.element.val(this.value),this.element.css({position:"absolute",backgroundColor:this._background(),color:this._fill(),left:this._x()+this.panel.x,top:this._y()+this.panel.y,width:this._width(),height:this._height(),fontSize:this.fontSize,display:"block",border:"1px solid "+this._stroke()}),this.css&&this.element.css(this.css);var t=this;this.element.change(function(){var e=t.value;t.value=t.element.val(),t.sendTargetMessage(),t.onvaluechange(t.value,e)}),n(this.container).append(this.element)}}).init(arguments[0])},s.TextField.prototype=s.Widget,s.MultiSlider=function(){s.extend(this,{type:"MultiSlider",isVertical:!0,serializeMe:["isVertical","count","values"],values:[],_values:[],count:16,draw:function(){var t=this._x(),e=this._y(),i=this._width(),n=this._height(),s=i/this.count;this.ctx.fillStyle=this._background(),this.ctx.fillRect(t,e,i,n),this.ctx.fillStyle=this._fill(),this.ctx.strokeStyle=this._stroke();for(var o=0;o<this.count;o++){var r=o*s+t;this.ctx.fillRect(r,e+n-this._values[o]*n,s,this._values[o]*n),this.ctx.strokeRect(r,e,s,n)}},setValue:function(t,e){this.values[t]=e,this._values[t]=e,this.refresh()},resetValues:function(){for(var t=0;t<this.count;t++)this.values[t]=this.min+(this.max-this.min)*this._values[t],"OSC"!==this.target?this.sendTargetMessage():s.OSC&&s.OSC.send(this.key,"if",[sliderHit,this.values[sliderHit]]),this.onvaluechange&&this.onvaluechange(sliderHit,this.values[sliderHit]);this.refresh()},changeValue:function(t,e){if(this.hasFocus||!this.requiresFocus){var i=this._width(),n=i/this.count,o=Math.floor(t/n);_value=0,_value=1-e/this._height(),0>_value?_value=0:_value>1&&(_value=1),this.values[o]=this.min+(this.max-this.min)*_value,this._values[o]=_value,"OSC"!==this.target?this.sendTargetMessage():s.OSC&&s.OSC.send(this.key,"if",[o,this.values[o]]),this.onvaluechange&&this.onvaluechange(o,this.values[o]),this.refresh()}},mousedown:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},mousemove:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},mouseup:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},touchstart:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchmove:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchend:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},onvaluechange:function(){}}).init(arguments[0]);var t=this.x,e=this.y,i=this.width,n=this.height,o=[t,e,i,n],r=this.count;delete this.bounds,Object.defineProperties(this,{x:{get:function(){return t},set:function(e){t=e,this.refresh()}},y:{get:function(){return e},set:function(t){e=t,this.refresh()}},width:{get:function(){return i},set:function(t){i=t,this.refresh()}},height:{get:function(){return n},set:function(t){n=t,this.refresh()}},bounds:{get:function(){return o},set:function(s){o=s,t=o[0],e=o[1],i=o[2],n=o[3],this.refresh()}},count:{get:function(){return r},set:function(t){r=t,this.refresh()}}})},s.MultiSlider.prototype=s.Widget,s.MultiButton=function(){s.extend(this,{type:"MultiButton",mode:"toggle",serializeMe:["mode","rows","columns","requiresFocus"],rows:8,values:[],_values:[],lastValues:[],mouseOver:null,columns:8,draw:function(){var t=this._x(),e=this._y(),i=this._width(),n=this._height(),s=i/this.columns,o=n/this.rows;this.ctx.strokeStyle=this._stroke();for(var r=0;r<this.rows;r++)for(var h=0;h<this.columns;h++){var a=t+h*s,u=e+r*o,l=r*this.columns+h;this.ctx.fillStyle=this._values[l]?this._fill():this._background(),this.ctx.fillRect(a,u,s,o),this.ctx.strokeRect(a,u,s,o)}},setValue:function(t,e,i){var n=t*this.columns+e;this._values[n]=this.values[n]=this.lastValues[n]=i,this.draw()},changeValue:function(t,e){if(this.hasFocus||!this.requiresFocus){var i=this._width(),n=this._height(),o=i/this.columns,r=Math.floor(t/o),h=n/this.rows,a=Math.floor(e/h),u=a*this.columns+r;if(u!==this.mouseOver){if(this._values[u]=!this._values[u],this.values[u]=this._values[u]?this.max:this.min,(this.values[u]!==this.lastValues[u]||"contact"===this.mode)&&("OSC"!==this.target?this.sendTargetMessage():s.OSC&&s.OSC.send(this.key,"iif",[a,r,this.values[u]]),this.onvaluechange&&this.onvaluechange(a,r,this.values[u]),this.draw(),this.lastValues[u]=this.values[u],"contact"===this.mode)){var l=this;setTimeout(function(){l._values[u]=0,l.draw()},75)}this.mouseOver=u}}},mousedown:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},mousemove:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},mouseup:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y()),this.mouseOver=null},touchstart:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchmove:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchend:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())}}).init(arguments[0]),this.requiresFocus=!1;var t=this.x,e=this.y,i=this.width,n=this.height,o=[t,e,i,n],r=this.rows,h=this.columns;delete this.bounds,Object.defineProperties(this,{x:{get:function(){return t},set:function(e){t=e,this.refresh()}},y:{get:function(){return e},set:function(t){e=t,this.refresh()}},width:{get:function(){return i},set:function(t){i=t,this.refresh()}},height:{get:function(){return n},set:function(t){n=t,this.refresh()}},bounds:{get:function(){return o},set:function(s){o=s,t=o[0],e=o[1],i=o[2],n=o[3],this.refresh()}},rows:{get:function(){return r},set:function(t){r=t,this.refresh()}},columns:{get:function(){return h},set:function(t){h=t,this.refresh()}}})},s.MultiButton.prototype=s.Widget,s.Accelerometer=function(){var t=this,e=9.80665;s.extend(this,{type:"Accelerometer",serializeMe:["delay"],delay:100,min:0,max:1,values:[0,0,0],update:function(e){var i=e.acceleration;t.x=t.values[0]=t.min+(0-t.hardwareMin+i.x)/t.hardwareRange*t.max,t.y=t.values[1]=t.min+(0-t.hardwareMin+i.y)/t.hardwareRange*t.max,t.z=t.values[2]=t.min+(0-t.hardwareMin+i.z)/t.hardwareRange*t.max,"undefined"!=typeof t.onvaluechange&&t.onvaluechange(t.x,t.y,t.z),t.sendTargetMessage()},start:function(){return window.addEventListener("devicemotion",this.update,!0),this},stop:function(){return window.removeEventListener("devicemotion",this.update),this}}).init(arguments[0]),s.isAndroid?(this.hardwareMin=e,this.hardwareMax=e):(this.hardwareMin=-2.307*e,this.hardwareMax=2.307*e),this.hardwareRange=this.hardwareMax-this.hardwareMin},s.Accelerometer.prototype=s.Widget,s.Orientation=function(){var t=this;s.extend(this,{type:"Orientation",serializeMe:["delay"],delay:100,values:[0,0,0],update:function(e){t.roll=t.values[0]=t.min+(90+e.gamma)/180*t.max,t.pitch=t.values[1]=t.min+(180+e.beta)/360*t.max,t.yaw=t.values[2]=t.min+e.alpha/360*t.max,isNaN(e.webkitCompassHeading)||(t.heading=t.min+e.webkitCompassHeading/360*t.max),t.sendTargetMessage(),"undefined"!=typeof t.onvaluechange&&t.onvaluechange(t.pitch,t.roll,t.yaw,t.heading)},start:function(){return window.addEventListener("deviceorientation",function(e){t.update(e)},!0),this},stop:function(){window.removeEventListener("deviceorientation")}}).init(arguments[0])},s.Orientation.prototype=s.Widget,s.Range=function(){s.extend(this,{type:"Range",serializeMe:["handleSize"],handleSize:20,values:[0,1],_values:[0,1],draw:function(){var t=this._x(),e=this._y(),i=this._width(),n=this._height();this.ctx.fillStyle=this._background(),this.ctx.clearRect(t,e,i,n);var s=t+this._values[1]*i-this.handleSize,o=t+this._values[0]*i;this.ctx.fillStyle=this._background(),this.ctx.fillRect(t,e,i,n),this.ctx.fillStyle=this._fill(),this.ctx.fillRect(o,e,s-o,n),this.ctx.fillStyle=this._stroke(),this.ctx.fillRect(o,e,this.handleSize,n),this.ctx.fillRect(s,e,this.handleSize,n),this.ctx.strokeStyle=this._stroke(),this.ctx.strokeRect(t,e,i,n)},changeValue:function(t,e){if(this.hasFocus||!this.requiresFocus){var i=this.isVertical?1-e/this._height():t/this._width();0>i?i=0:i>1&&(i=1);var n=this.max-this.min;Math.abs(i-this._values[0])<Math.abs(i-this._values[1])?(this._values[0]=i,this.values[0]=this.min+n*i):(this._values[1]=i,this.values[1]=this.min+n*i),this.refresh(),(this.values[0]!==this.lastLeftValue||this.values[1]!==this.lastRightValue)&&(this.onvaluechange&&this.onvaluechange(this.values[0],this.values[1]),this.refresh(),this.lastLeftValue=this.values[0],this.lastRightValue=this.values[1],this.sendTargetMessage())}},mousedown:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},mousemove:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},mouseup:function(t,e){e&&s.mouseDown&&this.changeValue(t.x-this._x(),t.y-this._y())},touchstart:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchmove:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchend:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())}}).init(arguments[0])},s.Range.prototype=s.Widget,s.Paint=function(){s.extend(this,{lines:[],startTime:0,isAnimating:!1,animationPoint:0,timer:null,shouldLoop:!0,prevTimestamp:null,values:[0,0],draw:function(){var t=this._x(),e=this._y(),i=this._width(),n=this._height();if(this.ctx.fillStyle=this._background(),this.ctx.strokeStyle=this._stroke(),this.ctx.save(),this.ctx.beginPath(),this.ctx.moveTo(t,e),this.ctx.lineTo(t+i,e),this.ctx.lineTo(t+i,e+n),this.ctx.lineTo(t,e+n),this.ctx.lineTo(t,e),this.ctx.fill(),this.ctx.stroke(),this.ctx.clip(),this.ctx.fillStyle=this._fill(),this.lines.length>=1){this.ctx.lineWidth=8;for(var s=0;s<this.lines.length;s++){var o=this.lines[s];if(o.length>=2){this.ctx.moveTo(o[0].x*i,o[0].y*n),this.ctx.beginPath();for(var r=1;r<o.length-2;r++){var h=(o[r].x+o[r+1].x)/2,a=(o[r].y+o[r+1].y)/2;this.ctx.quadraticCurveTo(o[r].x*i,o[r].y*n,h*i,a*n)}this.ctx.stroke()}}}this.ctx.restore()},animate:function(){var t=this;if(this.isAnimating!==!1){var e=this.lines[0],i=e[this.animationPoint],n=e[this.animationPoint+1];if(this.animationPoint>=e.length-1){if(this.shouldLoop)return this.animationPoint=0,this.draw(),void(this.timeout=setTimeout(function(){t.animate()},5));if(this.ctx.fillStyle=this._background(),this.ctx.fillRect(0,0,this._width(),this._height()),0!==this.speedMod)return}this.ctx.save(),this.ctx.strokeStyle="#f00",this.ctx.lineWidth=8,this.ctx.beginPath(),this.ctx.moveTo(i.x*this._width(),i.y*this._height()),this.ctx.lineTo(n.x*this._width(),n.y*this._height()),this.ctx.stroke(),this.ctx.restore(),this.timeout=setTimeout(function(){t.animate()},i.timestamp-this.prevTimestamp),this.prevTimestamp=i.timestamp,this.animationPoint++,this.values=[i.x,i.y],this.sendTargetMessage()}},startAnimation:function(){this.animate()},stopAnimation:function(){this.timer&&clearInterval(this.timer)},mousedown:function(t){this.hitTest(t)&&(this.lines=[],this.animationPoint=0,0===this.lines.length&&(this.startTime=Date.now()),this.lines.push([]),this.isDrawing=!0,this.isAnimating=!1)},mousemove:function(t){if(this.hitTest(t)&&null!==this.activeTouch&&this.isDrawing){var e=this.lines[this.lines.length-1];e&&(e.push({x:t.x/this._width(),y:t.y/this._height(),timestamp:Date.now()-this.startTime}),this.draw())}},mouseup:function(){this.isDrawing=!1,this.lines.length>0&&(this.isAnimating=!0,this.animate())},touchstart:function(t){this.hitTest(t)&&(this.lines=[],this.animationPoint=0,0===this.lines.length&&(this.startTime=Date.now()),this.lines.push([]),this.isDrawing=!0,this.isAnimating=!1),this.activeTouch=t},touchmove:function(t){if(this.hitTest(t)&&null!==this.activeTouch&&this.isDrawing){var e=this.lines[this.lines.length-1];e&&(e.push({x:t.x/this._width(),y:t.y/this._height(),timestamp:Date.now()-this.startTime}),this.draw())}},touchend:function(){this.isDrawing=!1,this.lines.length>0&&(this.isAnimating=!0,this.animate())}}).init(arguments[0])},s.Paint.prototype=s.Widget,s.Patchbay=function(){s.extend(this,{type:"Patchbay",points:[],minWidth:80,cableWidth:5,start:null,over:null,connections:[],rowLength:null,selectedConnection:null,patchOutlineWidth:3,draw:function(){{var t=this._x(),e=this._y(),i=this._width(),n=this._height();this.points.length}this.ctx.fillStyle=this._background(),this.ctx.strokeStyle=this._stroke(),this.ctx.clearRect(t,e,i,n),this.layout(),this.drawSegments(),this.drawPatchPoints(),this.drawConnections()},layout:function(){var t=(this._x(),this._y(),this._width()),e=this._height();this.rows=1,this.patchWidth=t/this.points.length,this.patchWidth<this.minWidth&&(this.patchWidth=this.minWidth),this.rows=Math.ceil(this.patchWidth*this.points.length/t),this.patchHeight=e/this.rows,this.columns=Math.floor(t/this.patchWidth)},drawSegments:function(){{var t=this._x(),e=this._y(),i=this._width();this._height(),this.points.length}this.ctx.fillStyle=this._fill();for(var n=0,s=1,o=0;o<this.points.length;o++)this.start===o?(this.ctx.fillStyle="#777",this.ctx.fillRect(t+n,e+this.patchHeight*(s-1),this.patchWidth,this.patchHeight)):this.over===o&&(this.ctx.fillStyle="#744",this.ctx.fillRect(t+n,e+this.patchHeight*(s-1),this.patchWidth,this.patchHeight)),this.ctx.fillStyle=this._stroke(),this.ctx.textBaseline="middle",this.ctx.textAlign="center",this.ctx.font=this._font(),this.ctx.font="normal 12px Helvetica","undefined"!=typeof this.points[o].name&&this.ctx.fillText(this.points[o].name,n+this.patchWidth/2,e+((s-1)*this.patchHeight+.1*this.patchHeight)),"undefined"!=typeof this.points[o].name2&&this.ctx.fillText(this.points[o].name2,n+this.patchWidth/2,e+((s-1)*this.patchHeight+.9*this.patchHeight)),n+=this.patchWidth,this.points[o].row=s,n+this.patchWidth>i&&(n=0,s++)},drawPatchPoints:function(){{var t=(this._x(),this._y()),e=this._width();this._height(),this.points.length}this.ctx.fillStyle=this._background();for(var i=0,n=1,s=0;s<this.points.length;s++)this.ctx.beginPath(),this.ctx.arc(i+this.patchWidth/2,t+this.patchHeight/2+this.patchHeight*(n-1),this.patchWidth/4,0,2*Math.PI,!0),this.ctx.closePath(),this.ctx.fill(),this.ctx.lineWidth=this.patchOutlineWidth,this.ctx.stroke(),this.points[s].row=n,this.ctx.lineWidth=1,this.ctx.strokeRect(i,t+this.patchHeight*(n-1),this.patchWidth,this.patchHeight),i+=this.patchWidth,i+this.patchWidth>e&&(i=0,n++)},drawConnections:function(){{var t=this._x(),e=this._y();this._width(),this._height()}this.ctx.lineWidth=this.cableWidth;for(var i=0;i<this.connections.length;i++){var n=this.connections[i],s=this.connections[i][0],o=this.connections[i][1],r=t+this.patchWidth*(s%this.columns)+this.patchWidth/2,h=e+this.patchHeight/2+this.patchHeight*Math.floor(s/this.columns),a=t+this.patchWidth*(o%this.columns)+this.patchWidth/2,u=e+this.patchHeight/2+this.patchHeight*Math.floor(o/this.columns),l=r,c=h+.5*this.patchHeight,d=a,f=u+.5*this.patchHeight;if(n.selected)this.ctx.strokeStyle="#0f0";else{var p=this.ctx.createLinearGradient(r,h,a,u);p.addColorStop(0,"rgba(64, 64, 64, 1.000)"),p.addColorStop(1,"rgba(204, 204, 204, 1.000)"),this.ctx.strokeStyle=p}this.ctx.beginPath(),this.ctx.moveTo(r,h),this.ctx.bezierCurveTo(l,c,d,f,a,u),this.ctx.stroke(),n.edge=[r,h,l,c,d,f,a,u]}},_init:function(){var t=(this._x(),this._y(),this._width()),e=this._height();this.patchWidth=t/this.points.length,this.patchHeight=e,this.rows=1},createConnection:function(t){var e=this.points[t[0]],i=this.points[t[1]];i.output!==!1&&(this.connections.push(t),this.onconnection&&this.onconnection(e,i))},changeValue:function(){},hitTestEdges:function(t){for(var e=!1,i=t.x-this._x(),n=t.y-this._y(),s=0;s<this.connections.length;s++){var o=this.connections[s].edge;if(this.ctx.beginPath(),this.ctx.moveTo(o[0],o[1]),this.ctx.bezierCurveTo(o[2],o[3],o[4],o[5],o[6],o[7]),this.ctx.isPointInStroke(i,n)){this.connections.forEach(function(t){t.selected=!1}),this.connections[s].selected=!0,this.selectedConnection=this.connections[s],e=!0;break}}return e},mousedown:function(t,e){if(e&&s.mouseDown){if(!this.hitTestEdges(t)){var i=Math.floor((t.x-this._x()/this._width())/(this._width()/this.columns)),n=Math.floor((t.y-this._y()/this._height())/(this._height()/this.rows));this.start=n*this.columns+i,null!==this.selectedConnection&&(this.selectedConnection.selected=!1,this.selectedConnection=null)}this.draw()}},mousemove:function(t,e){if(e&&s.mouseDown){var i=Math.floor((t.x-this._x()/this._width())/(this._width()/this.columns)),n=Math.floor((t.y-this._y()/this._height())/(this._height()/this.rows)),o=this.over;this.over=n*this.columns+i,this.over!==o&&this.draw()}},mouseup:function(t,e){if(e){var i=Math.floor((t.x-this._x()/this._width())/(this._width()/this.columns)),n=Math.floor((t.y-this._y()/this._height())/(this._height()/this.rows)),s=n*this.columns+i;if(this.start!==s&&null!==this.start){for(var o=[this.start,s],r=!1,h=0;h<this.connections.length;h++)this.connections[h][0]===o[0]&&this.connections[h][1]===o[1]&&(r=!0);r||this.createConnection(o)}}this.over=null,this.start=null,this.draw()},onkeydown:function(t){var e=s.keyCodeToChar[t.keyCode];("Delete"===e||"Backspace"===e)&&null!==this.selectedConnection&&(this.deleteConnection(this.selectedConnection),t.preventDefault())},deleteConnection:function(t){this.connections.splice(this.connections.indexOf(t),1),this.ondisconnection&&this.ondisconnection(this.points[t[0]],this.points[t[1]]),this.draw()},touchstart:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchmove:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())},touchend:function(t,e){e&&this.changeValue(t.x-this._x(),t.y-this._y())}}).init(arguments[0])},s.Patchbay.prototype=s.Widget,s.defineChildProperties=function(t,e){for(var i=0;i<e.length;i++)!function(){var n=e[i],s=t[n];Object.defineProperty(t,n,{get:function(){return s},set:function(e){s=e;for(var i=0;i<t.children.length;i++)t.children[i][n]=s
}})}()},function(t){var e={};t.publish=function(i,n){"object"==typeof e[i]&&e[i].forEach(function(e){e.apply(t,n||[])})},t.subscribe=function(t,i){return e[t]||(e[t]=[]),e[t].push(i),[t,i]},t.unsubscribe=function(i){var n=i[0];e[n]&&t.each(e[n],function(t){this==i[1]&&e[n].splice(t,1)})}}(n),e.exports=s}()},{jquery:2}],2:[function(e,i){!function(t,e){"object"==typeof i&&"object"==typeof i.exports?i.exports=t.document?e(t,!0):function(t){if(!t.document)throw new Error("jQuery requires a window with a document");return e(t)}:e(t)}("undefined"!=typeof window?window:this,function(e,i){function n(t){var e="length"in t&&t.length,i=te.type(t);return"function"===i||te.isWindow(t)?!1:1===t.nodeType&&e?!0:"array"===i||0===e||"number"==typeof e&&e>0&&e-1 in t}function s(t,e,i){if(te.isFunction(e))return te.grep(t,function(t,n){return!!e.call(t,n,t)!==i});if(e.nodeType)return te.grep(t,function(t){return t===e!==i});if("string"==typeof e){if(ae.test(e))return te.filter(e,t,i);e=te.filter(e,t)}return te.grep(t,function(t){return Y.call(e,t)>=0!==i})}function o(t,e){for(;(t=t[e])&&1!==t.nodeType;);return t}function r(t){var e=ge[t]={};return te.each(t.match(pe)||[],function(t,i){e[i]=!0}),e}function h(){Q.removeEventListener("DOMContentLoaded",h,!1),e.removeEventListener("load",h,!1),te.ready()}function a(){Object.defineProperty(this.cache={},0,{get:function(){return{}}}),this.expando=te.expando+a.uid++}function u(t,e,i){var n;if(void 0===i&&1===t.nodeType)if(n="data-"+e.replace(be,"-$1").toLowerCase(),i=t.getAttribute(n),"string"==typeof i){try{i="true"===i?!0:"false"===i?!1:"null"===i?null:+i+""===i?+i:we.test(i)?te.parseJSON(i):i}catch(s){}xe.set(t,e,i)}else i=void 0;return i}function l(){return!0}function c(){return!1}function d(){try{return Q.activeElement}catch(t){}}function f(t,e){return te.nodeName(t,"table")&&te.nodeName(11!==e.nodeType?e:e.firstChild,"tr")?t.getElementsByTagName("tbody")[0]||t.appendChild(t.ownerDocument.createElement("tbody")):t}function p(t){return t.type=(null!==t.getAttribute("type"))+"/"+t.type,t}function g(t){var e=Le.exec(t.type);return e?t.type=e[1]:t.removeAttribute("type"),t}function v(t,e){for(var i=0,n=t.length;n>i;i++)me.set(t[i],"globalEval",!e||me.get(e[i],"globalEval"))}function y(t,e){var i,n,s,o,r,h,a,u;if(1===e.nodeType){if(me.hasData(t)&&(o=me.access(t),r=me.set(e,o),u=o.events)){delete r.handle,r.events={};for(s in u)for(i=0,n=u[s].length;n>i;i++)te.event.add(e,s,u[s][i])}xe.hasData(t)&&(h=xe.access(t),a=te.extend({},h),xe.set(e,a))}}function m(t,e){var i=t.getElementsByTagName?t.getElementsByTagName(e||"*"):t.querySelectorAll?t.querySelectorAll(e||"*"):[];return void 0===e||e&&te.nodeName(t,e)?te.merge([t],i):i}function x(t,e){var i=e.nodeName.toLowerCase();"input"===i&&Ce.test(t.type)?e.checked=t.checked:("input"===i||"textarea"===i)&&(e.defaultValue=t.defaultValue)}function w(t,i){var n,s=te(i.createElement(t)).appendTo(i.body),o=e.getDefaultComputedStyle&&(n=e.getDefaultComputedStyle(s[0]))?n.display:te.css(s[0],"display");return s.detach(),o}function b(t){var e=Q,i=He[t];return i||(i=w(t,e),"none"!==i&&i||(Re=(Re||te("<iframe frameborder='0' width='0' height='0'/>")).appendTo(e.documentElement),e=Re[0].contentDocument,e.write(),e.close(),i=w(t,e),Re.detach()),He[t]=i),i}function _(t,e,i){var n,s,o,r,h=t.style;return i=i||ze(t),i&&(r=i.getPropertyValue(e)||i[e]),i&&(""!==r||te.contains(t.ownerDocument,t)||(r=te.style(t,e)),Ie.test(r)&&Be.test(e)&&(n=h.width,s=h.minWidth,o=h.maxWidth,h.minWidth=h.maxWidth=h.width=r,r=i.width,h.width=n,h.minWidth=s,h.maxWidth=o)),void 0!==r?r+"":r}function k(t,e){return{get:function(){return t()?void delete this.get:(this.get=e).apply(this,arguments)}}}function T(t,e){if(e in t)return e;for(var i=e[0].toUpperCase()+e.slice(1),n=e,s=Ke.length;s--;)if(e=Ke[s]+i,e in t)return e;return n}function C(t,e,i){var n=Xe.exec(e);return n?Math.max(0,n[1]-(i||0))+(n[2]||"px"):e}function S(t,e,i,n,s){for(var o=i===(n?"border":"content")?4:"width"===e?1:0,r=0;4>o;o+=2)"margin"===i&&(r+=te.css(t,i+ke[o],!0,s)),n?("content"===i&&(r-=te.css(t,"padding"+ke[o],!0,s)),"margin"!==i&&(r-=te.css(t,"border"+ke[o]+"Width",!0,s))):(r+=te.css(t,"padding"+ke[o],!0,s),"padding"!==i&&(r+=te.css(t,"border"+ke[o]+"Width",!0,s)));return r}function M(t,e,i){var n=!0,s="width"===e?t.offsetWidth:t.offsetHeight,o=ze(t),r="border-box"===te.css(t,"boxSizing",!1,o);if(0>=s||null==s){if(s=_(t,e,o),(0>s||null==s)&&(s=t.style[e]),Ie.test(s))return s;n=r&&(J.boxSizingReliable()||s===t.style[e]),s=parseFloat(s)||0}return s+S(t,e,i||(r?"border":"content"),n,o)+"px"}function P(t,e){for(var i,n,s,o=[],r=0,h=t.length;h>r;r++)n=t[r],n.style&&(o[r]=me.get(n,"olddisplay"),i=n.style.display,e?(o[r]||"none"!==i||(n.style.display=""),""===n.style.display&&Te(n)&&(o[r]=me.access(n,"olddisplay",b(n.nodeName)))):(s=Te(n),"none"===i&&s||me.set(n,"olddisplay",s?i:te.css(n,"display"))));for(r=0;h>r;r++)n=t[r],n.style&&(e&&"none"!==n.style.display&&""!==n.style.display||(n.style.display=e?o[r]||"":"none"));return t}function D(t,e,i,n,s){return new D.prototype.init(t,e,i,n,s)}function E(){return setTimeout(function(){Je=void 0}),Je=te.now()}function N(t,e){var i,n=0,s={height:t};for(e=e?1:0;4>n;n+=2-e)i=ke[n],s["margin"+i]=s["padding"+i]=t;return e&&(s.opacity=s.width=t),s}function A(t,e,i){for(var n,s=(ni[e]||[]).concat(ni["*"]),o=0,r=s.length;r>o;o++)if(n=s[o].call(i,e,t))return n}function V(t,e,i){var n,s,o,r,h,a,u,l,c=this,d={},f=t.style,p=t.nodeType&&Te(t),g=me.get(t,"fxshow");i.queue||(h=te._queueHooks(t,"fx"),null==h.unqueued&&(h.unqueued=0,a=h.empty.fire,h.empty.fire=function(){h.unqueued||a()}),h.unqueued++,c.always(function(){c.always(function(){h.unqueued--,te.queue(t,"fx").length||h.empty.fire()})})),1===t.nodeType&&("height"in e||"width"in e)&&(i.overflow=[f.overflow,f.overflowX,f.overflowY],u=te.css(t,"display"),l="none"===u?me.get(t,"olddisplay")||b(t.nodeName):u,"inline"===l&&"none"===te.css(t,"float")&&(f.display="inline-block")),i.overflow&&(f.overflow="hidden",c.always(function(){f.overflow=i.overflow[0],f.overflowX=i.overflow[1],f.overflowY=i.overflow[2]}));for(n in e)if(s=e[n],Ze.exec(s)){if(delete e[n],o=o||"toggle"===s,s===(p?"hide":"show")){if("show"!==s||!g||void 0===g[n])continue;p=!0}d[n]=g&&g[n]||te.style(t,n)}else u=void 0;if(te.isEmptyObject(d))"inline"===("none"===u?b(t.nodeName):u)&&(f.display=u);else{g?"hidden"in g&&(p=g.hidden):g=me.access(t,"fxshow",{}),o&&(g.hidden=!p),p?te(t).show():c.done(function(){te(t).hide()}),c.done(function(){var e;me.remove(t,"fxshow");for(e in d)te.style(t,e,d[e])});for(n in d)r=A(p?g[n]:0,n,c),n in g||(g[n]=r.start,p&&(r.end=r.start,r.start="width"===n||"height"===n?1:0))}}function O(t,e){var i,n,s,o,r;for(i in t)if(n=te.camelCase(i),s=e[n],o=t[i],te.isArray(o)&&(s=o[1],o=t[i]=o[0]),i!==n&&(t[n]=o,delete t[i]),r=te.cssHooks[n],r&&"expand"in r){o=r.expand(o),delete t[n];for(i in o)i in t||(t[i]=o[i],e[i]=s)}else e[n]=s}function F(t,e,i){var n,s,o=0,r=ii.length,h=te.Deferred().always(function(){delete a.elem}),a=function(){if(s)return!1;for(var e=Je||E(),i=Math.max(0,u.startTime+u.duration-e),n=i/u.duration||0,o=1-n,r=0,a=u.tweens.length;a>r;r++)u.tweens[r].run(o);return h.notifyWith(t,[u,o,i]),1>o&&a?i:(h.resolveWith(t,[u]),!1)},u=h.promise({elem:t,props:te.extend({},e),opts:te.extend(!0,{specialEasing:{}},i),originalProperties:e,originalOptions:i,startTime:Je||E(),duration:i.duration,tweens:[],createTween:function(e,i){var n=te.Tween(t,u.opts,e,i,u.opts.specialEasing[e]||u.opts.easing);return u.tweens.push(n),n},stop:function(e){var i=0,n=e?u.tweens.length:0;if(s)return this;for(s=!0;n>i;i++)u.tweens[i].run(1);return e?h.resolveWith(t,[u,e]):h.rejectWith(t,[u,e]),this}}),l=u.props;for(O(l,u.opts.specialEasing);r>o;o++)if(n=ii[o].call(u,t,l,u.opts))return n;return te.map(l,A,u),te.isFunction(u.opts.start)&&u.opts.start.call(t,u),te.fx.timer(te.extend(a,{elem:t,anim:u,queue:u.opts.queue})),u.progress(u.opts.progress).done(u.opts.done,u.opts.complete).fail(u.opts.fail).always(u.opts.always)}function j(t){return function(e,i){"string"!=typeof e&&(i=e,e="*");var n,s=0,o=e.toLowerCase().match(pe)||[];if(te.isFunction(i))for(;n=o[s++];)"+"===n[0]?(n=n.slice(1)||"*",(t[n]=t[n]||[]).unshift(i)):(t[n]=t[n]||[]).push(i)}}function L(t,e,i,n){function s(h){var a;return o[h]=!0,te.each(t[h]||[],function(t,h){var u=h(e,i,n);return"string"!=typeof u||r||o[u]?r?!(a=u):void 0:(e.dataTypes.unshift(u),s(u),!1)}),a}var o={},r=t===wi;return s(e.dataTypes[0])||!o["*"]&&s("*")}function q(t,e){var i,n,s=te.ajaxSettings.flatOptions||{};for(i in e)void 0!==e[i]&&((s[i]?t:n||(n={}))[i]=e[i]);return n&&te.extend(!0,t,n),t}function W(t,e,i){for(var n,s,o,r,h=t.contents,a=t.dataTypes;"*"===a[0];)a.shift(),void 0===n&&(n=t.mimeType||e.getResponseHeader("Content-Type"));if(n)for(s in h)if(h[s]&&h[s].test(n)){a.unshift(s);break}if(a[0]in i)o=a[0];else{for(s in i){if(!a[0]||t.converters[s+" "+a[0]]){o=s;break}r||(r=s)}o=o||r}return o?(o!==a[0]&&a.unshift(o),i[o]):void 0}function R(t,e,i,n){var s,o,r,h,a,u={},l=t.dataTypes.slice();if(l[1])for(r in t.converters)u[r.toLowerCase()]=t.converters[r];for(o=l.shift();o;)if(t.responseFields[o]&&(i[t.responseFields[o]]=e),!a&&n&&t.dataFilter&&(e=t.dataFilter(e,t.dataType)),a=o,o=l.shift())if("*"===o)o=a;else if("*"!==a&&a!==o){if(r=u[a+" "+o]||u["* "+o],!r)for(s in u)if(h=s.split(" "),h[1]===o&&(r=u[a+" "+h[0]]||u["* "+h[0]])){r===!0?r=u[s]:u[s]!==!0&&(o=h[0],l.unshift(h[1]));break}if(r!==!0)if(r&&t["throws"])e=r(e);else try{e=r(e)}catch(c){return{state:"parsererror",error:r?c:"No conversion from "+a+" to "+o}}}return{state:"success",data:e}}function H(t,e,i,n){var s;if(te.isArray(e))te.each(e,function(e,s){i||Ci.test(t)?n(t,s):H(t+"["+("object"==typeof s?e:"")+"]",s,i,n)});else if(i||"object"!==te.type(e))n(t,e);else for(s in e)H(t+"["+s+"]",e[s],i,n)}function B(t){return te.isWindow(t)?t:9===t.nodeType&&t.defaultView}var I=[],z=I.slice,$=I.concat,X=I.push,Y=I.indexOf,U={},G=U.toString,K=U.hasOwnProperty,J={},Q=e.document,Z="2.1.4",te=function(t,e){return new te.fn.init(t,e)},ee=/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,ie=/^-ms-/,ne=/-([\da-z])/gi,se=function(t,e){return e.toUpperCase()};te.fn=te.prototype={jquery:Z,constructor:te,selector:"",length:0,toArray:function(){return z.call(this)},get:function(t){return null!=t?0>t?this[t+this.length]:this[t]:z.call(this)},pushStack:function(t){var e=te.merge(this.constructor(),t);return e.prevObject=this,e.context=this.context,e},each:function(t,e){return te.each(this,t,e)},map:function(t){return this.pushStack(te.map(this,function(e,i){return t.call(e,i,e)}))},slice:function(){return this.pushStack(z.apply(this,arguments))},first:function(){return this.eq(0)},last:function(){return this.eq(-1)},eq:function(t){var e=this.length,i=+t+(0>t?e:0);return this.pushStack(i>=0&&e>i?[this[i]]:[])},end:function(){return this.prevObject||this.constructor(null)},push:X,sort:I.sort,splice:I.splice},te.extend=te.fn.extend=function(){var t,e,i,n,s,o,r=arguments[0]||{},h=1,a=arguments.length,u=!1;for("boolean"==typeof r&&(u=r,r=arguments[h]||{},h++),"object"==typeof r||te.isFunction(r)||(r={}),h===a&&(r=this,h--);a>h;h++)if(null!=(t=arguments[h]))for(e in t)i=r[e],n=t[e],r!==n&&(u&&n&&(te.isPlainObject(n)||(s=te.isArray(n)))?(s?(s=!1,o=i&&te.isArray(i)?i:[]):o=i&&te.isPlainObject(i)?i:{},r[e]=te.extend(u,o,n)):void 0!==n&&(r[e]=n));return r},te.extend({expando:"jQuery"+(Z+Math.random()).replace(/\D/g,""),isReady:!0,error:function(t){throw new Error(t)},noop:function(){},isFunction:function(t){return"function"===te.type(t)},isArray:Array.isArray,isWindow:function(t){return null!=t&&t===t.window},isNumeric:function(t){return!te.isArray(t)&&t-parseFloat(t)+1>=0},isPlainObject:function(t){return"object"!==te.type(t)||t.nodeType||te.isWindow(t)?!1:t.constructor&&!K.call(t.constructor.prototype,"isPrototypeOf")?!1:!0},isEmptyObject:function(t){var e;for(e in t)return!1;return!0},type:function(t){return null==t?t+"":"object"==typeof t||"function"==typeof t?U[G.call(t)]||"object":typeof t},globalEval:function(t){var e,i=eval;t=te.trim(t),t&&(1===t.indexOf("use strict")?(e=Q.createElement("script"),e.text=t,Q.head.appendChild(e).parentNode.removeChild(e)):i(t))},camelCase:function(t){return t.replace(ie,"ms-").replace(ne,se)},nodeName:function(t,e){return t.nodeName&&t.nodeName.toLowerCase()===e.toLowerCase()},each:function(t,e,i){var s,o=0,r=t.length,h=n(t);if(i){if(h)for(;r>o&&(s=e.apply(t[o],i),s!==!1);o++);else for(o in t)if(s=e.apply(t[o],i),s===!1)break}else if(h)for(;r>o&&(s=e.call(t[o],o,t[o]),s!==!1);o++);else for(o in t)if(s=e.call(t[o],o,t[o]),s===!1)break;return t},trim:function(t){return null==t?"":(t+"").replace(ee,"")},makeArray:function(t,e){var i=e||[];return null!=t&&(n(Object(t))?te.merge(i,"string"==typeof t?[t]:t):X.call(i,t)),i},inArray:function(t,e,i){return null==e?-1:Y.call(e,t,i)},merge:function(t,e){for(var i=+e.length,n=0,s=t.length;i>n;n++)t[s++]=e[n];return t.length=s,t},grep:function(t,e,i){for(var n,s=[],o=0,r=t.length,h=!i;r>o;o++)n=!e(t[o],o),n!==h&&s.push(t[o]);return s},map:function(t,e,i){var s,o=0,r=t.length,h=n(t),a=[];if(h)for(;r>o;o++)s=e(t[o],o,i),null!=s&&a.push(s);else for(o in t)s=e(t[o],o,i),null!=s&&a.push(s);return $.apply([],a)},guid:1,proxy:function(t,e){var i,n,s;return"string"==typeof e&&(i=t[e],e=t,t=i),te.isFunction(t)?(n=z.call(arguments,2),s=function(){return t.apply(e||this,n.concat(z.call(arguments)))},s.guid=t.guid=t.guid||te.guid++,s):void 0},now:Date.now,support:J}),te.each("Boolean Number String Function Array Date RegExp Object Error".split(" "),function(t,e){U["[object "+e+"]"]=e.toLowerCase()});var oe=function(t){function e(t,e,i,n){var s,o,r,h,a,u,c,f,p,g;if((e?e.ownerDocument||e:R)!==A&&N(e),e=e||A,i=i||[],h=e.nodeType,"string"!=typeof t||!t||1!==h&&9!==h&&11!==h)return i;if(!n&&O){if(11!==h&&(s=me.exec(t)))if(r=s[1]){if(9===h){if(o=e.getElementById(r),!o||!o.parentNode)return i;if(o.id===r)return i.push(o),i}else if(e.ownerDocument&&(o=e.ownerDocument.getElementById(r))&&q(e,o)&&o.id===r)return i.push(o),i}else{if(s[2])return Q.apply(i,e.getElementsByTagName(t)),i;if((r=s[3])&&b.getElementsByClassName)return Q.apply(i,e.getElementsByClassName(r)),i}if(b.qsa&&(!F||!F.test(t))){if(f=c=W,p=e,g=1!==h&&t,1===h&&"object"!==e.nodeName.toLowerCase()){for(u=C(t),(c=e.getAttribute("id"))?f=c.replace(we,"\\$&"):e.setAttribute("id",f),f="[id='"+f+"'] ",a=u.length;a--;)u[a]=f+d(u[a]);p=xe.test(t)&&l(e.parentNode)||e,g=u.join(",")}if(g)try{return Q.apply(i,p.querySelectorAll(g)),i}catch(v){}finally{c||e.removeAttribute("id")}}}return M(t.replace(ae,"$1"),e,i,n)}function i(){function t(i,n){return e.push(i+" ")>_.cacheLength&&delete t[e.shift()],t[i+" "]=n}var e=[];return t}function n(t){return t[W]=!0,t}function s(t){var e=A.createElement("div");try{return!!t(e)}catch(i){return!1}finally{e.parentNode&&e.parentNode.removeChild(e),e=null}}function o(t,e){for(var i=t.split("|"),n=t.length;n--;)_.attrHandle[i[n]]=e}function r(t,e){var i=e&&t,n=i&&1===t.nodeType&&1===e.nodeType&&(~e.sourceIndex||Y)-(~t.sourceIndex||Y);if(n)return n;if(i)for(;i=i.nextSibling;)if(i===e)return-1;return t?1:-1}function h(t){return function(e){var i=e.nodeName.toLowerCase();return"input"===i&&e.type===t}}function a(t){return function(e){var i=e.nodeName.toLowerCase();return("input"===i||"button"===i)&&e.type===t}}function u(t){return n(function(e){return e=+e,n(function(i,n){for(var s,o=t([],i.length,e),r=o.length;r--;)i[s=o[r]]&&(i[s]=!(n[s]=i[s]))})})}function l(t){return t&&"undefined"!=typeof t.getElementsByTagName&&t}function c(){}function d(t){for(var e=0,i=t.length,n="";i>e;e++)n+=t[e].value;return n}function f(t,e,i){var n=e.dir,s=i&&"parentNode"===n,o=B++;return e.first?function(e,i,o){for(;e=e[n];)if(1===e.nodeType||s)return t(e,i,o)}:function(e,i,r){var h,a,u=[H,o];if(r){for(;e=e[n];)if((1===e.nodeType||s)&&t(e,i,r))return!0}else for(;e=e[n];)if(1===e.nodeType||s){if(a=e[W]||(e[W]={}),(h=a[n])&&h[0]===H&&h[1]===o)return u[2]=h[2];if(a[n]=u,u[2]=t(e,i,r))return!0}}}function p(t){return t.length>1?function(e,i,n){for(var s=t.length;s--;)if(!t[s](e,i,n))return!1;return!0}:t[0]}function g(t,i,n){for(var s=0,o=i.length;o>s;s++)e(t,i[s],n);return n}function v(t,e,i,n,s){for(var o,r=[],h=0,a=t.length,u=null!=e;a>h;h++)(o=t[h])&&(!i||i(o,n,s))&&(r.push(o),u&&e.push(h));return r}function y(t,e,i,s,o,r){return s&&!s[W]&&(s=y(s)),o&&!o[W]&&(o=y(o,r)),n(function(n,r,h,a){var u,l,c,d=[],f=[],p=r.length,y=n||g(e||"*",h.nodeType?[h]:h,[]),m=!t||!n&&e?y:v(y,d,t,h,a),x=i?o||(n?t:p||s)?[]:r:m;if(i&&i(m,x,h,a),s)for(u=v(x,f),s(u,[],h,a),l=u.length;l--;)(c=u[l])&&(x[f[l]]=!(m[f[l]]=c));if(n){if(o||t){if(o){for(u=[],l=x.length;l--;)(c=x[l])&&u.push(m[l]=c);o(null,x=[],u,a)}for(l=x.length;l--;)(c=x[l])&&(u=o?te(n,c):d[l])>-1&&(n[u]=!(r[u]=c))}}else x=v(x===r?x.splice(p,x.length):x),o?o(null,r,x,a):Q.apply(r,x)})}function m(t){for(var e,i,n,s=t.length,o=_.relative[t[0].type],r=o||_.relative[" "],h=o?1:0,a=f(function(t){return t===e},r,!0),u=f(function(t){return te(e,t)>-1},r,!0),l=[function(t,i,n){var s=!o&&(n||i!==P)||((e=i).nodeType?a(t,i,n):u(t,i,n));return e=null,s}];s>h;h++)if(i=_.relative[t[h].type])l=[f(p(l),i)];else{if(i=_.filter[t[h].type].apply(null,t[h].matches),i[W]){for(n=++h;s>n&&!_.relative[t[n].type];n++);return y(h>1&&p(l),h>1&&d(t.slice(0,h-1).concat({value:" "===t[h-2].type?"*":""})).replace(ae,"$1"),i,n>h&&m(t.slice(h,n)),s>n&&m(t=t.slice(n)),s>n&&d(t))}l.push(i)}return p(l)}function x(t,i){var s=i.length>0,o=t.length>0,r=function(n,r,h,a,u){var l,c,d,f=0,p="0",g=n&&[],y=[],m=P,x=n||o&&_.find.TAG("*",u),w=H+=null==m?1:Math.random()||.1,b=x.length;for(u&&(P=r!==A&&r);p!==b&&null!=(l=x[p]);p++){if(o&&l){for(c=0;d=t[c++];)if(d(l,r,h)){a.push(l);break}u&&(H=w)}s&&((l=!d&&l)&&f--,n&&g.push(l))}if(f+=p,s&&p!==f){for(c=0;d=i[c++];)d(g,y,r,h);if(n){if(f>0)for(;p--;)g[p]||y[p]||(y[p]=K.call(a));y=v(y)}Q.apply(a,y),u&&!n&&y.length>0&&f+i.length>1&&e.uniqueSort(a)}return u&&(H=w,P=m),g};return s?n(r):r}var w,b,_,k,T,C,S,M,P,D,E,N,A,V,O,F,j,L,q,W="sizzle"+1*new Date,R=t.document,H=0,B=0,I=i(),z=i(),$=i(),X=function(t,e){return t===e&&(E=!0),0},Y=1<<31,U={}.hasOwnProperty,G=[],K=G.pop,J=G.push,Q=G.push,Z=G.slice,te=function(t,e){for(var i=0,n=t.length;n>i;i++)if(t[i]===e)return i;return-1},ee="checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped",ie="[\\x20\\t\\r\\n\\f]",ne="(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+",se=ne.replace("w","w#"),oe="\\["+ie+"*("+ne+")(?:"+ie+"*([*^$|!~]?=)"+ie+"*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|("+se+"))|)"+ie+"*\\]",re=":("+ne+")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|"+oe+")*)|.*)\\)|)",he=new RegExp(ie+"+","g"),ae=new RegExp("^"+ie+"+|((?:^|[^\\\\])(?:\\\\.)*)"+ie+"+$","g"),ue=new RegExp("^"+ie+"*,"+ie+"*"),le=new RegExp("^"+ie+"*([>+~]|"+ie+")"+ie+"*"),ce=new RegExp("="+ie+"*([^\\]'\"]*?)"+ie+"*\\]","g"),de=new RegExp(re),fe=new RegExp("^"+se+"$"),pe={ID:new RegExp("^#("+ne+")"),CLASS:new RegExp("^\\.("+ne+")"),TAG:new RegExp("^("+ne.replace("w","w*")+")"),ATTR:new RegExp("^"+oe),PSEUDO:new RegExp("^"+re),CHILD:new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\("+ie+"*(even|odd|(([+-]|)(\\d*)n|)"+ie+"*(?:([+-]|)"+ie+"*(\\d+)|))"+ie+"*\\)|)","i"),bool:new RegExp("^(?:"+ee+")$","i"),needsContext:new RegExp("^"+ie+"*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\("+ie+"*((?:-\\d)?\\d*)"+ie+"*\\)|)(?=[^-]|$)","i")},ge=/^(?:input|select|textarea|button)$/i,ve=/^h\d$/i,ye=/^[^{]+\{\s*\[native \w/,me=/^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/,xe=/[+~]/,we=/'|\\/g,be=new RegExp("\\\\([\\da-f]{1,6}"+ie+"?|("+ie+")|.)","ig"),_e=function(t,e,i){var n="0x"+e-65536;return n!==n||i?e:0>n?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320)},ke=function(){N()};try{Q.apply(G=Z.call(R.childNodes),R.childNodes),G[R.childNodes.length].nodeType}catch(Te){Q={apply:G.length?function(t,e){J.apply(t,Z.call(e))}:function(t,e){for(var i=t.length,n=0;t[i++]=e[n++];);t.length=i-1}}}b=e.support={},T=e.isXML=function(t){var e=t&&(t.ownerDocument||t).documentElement;return e?"HTML"!==e.nodeName:!1},N=e.setDocument=function(t){var e,i,n=t?t.ownerDocument||t:R;return n!==A&&9===n.nodeType&&n.documentElement?(A=n,V=n.documentElement,i=n.defaultView,i&&i!==i.top&&(i.addEventListener?i.addEventListener("unload",ke,!1):i.attachEvent&&i.attachEvent("onunload",ke)),O=!T(n),b.attributes=s(function(t){return t.className="i",!t.getAttribute("className")}),b.getElementsByTagName=s(function(t){return t.appendChild(n.createComment("")),!t.getElementsByTagName("*").length}),b.getElementsByClassName=ye.test(n.getElementsByClassName),b.getById=s(function(t){return V.appendChild(t).id=W,!n.getElementsByName||!n.getElementsByName(W).length}),b.getById?(_.find.ID=function(t,e){if("undefined"!=typeof e.getElementById&&O){var i=e.getElementById(t);return i&&i.parentNode?[i]:[]}},_.filter.ID=function(t){var e=t.replace(be,_e);return function(t){return t.getAttribute("id")===e}}):(delete _.find.ID,_.filter.ID=function(t){var e=t.replace(be,_e);return function(t){var i="undefined"!=typeof t.getAttributeNode&&t.getAttributeNode("id");return i&&i.value===e}}),_.find.TAG=b.getElementsByTagName?function(t,e){return"undefined"!=typeof e.getElementsByTagName?e.getElementsByTagName(t):b.qsa?e.querySelectorAll(t):void 0}:function(t,e){var i,n=[],s=0,o=e.getElementsByTagName(t);if("*"===t){for(;i=o[s++];)1===i.nodeType&&n.push(i);return n}return o},_.find.CLASS=b.getElementsByClassName&&function(t,e){return O?e.getElementsByClassName(t):void 0},j=[],F=[],(b.qsa=ye.test(n.querySelectorAll))&&(s(function(t){V.appendChild(t).innerHTML="<a id='"+W+"'></a><select id='"+W+"-\f]' msallowcapture=''><option selected=''></option></select>",t.querySelectorAll("[msallowcapture^='']").length&&F.push("[*^$]="+ie+"*(?:''|\"\")"),t.querySelectorAll("[selected]").length||F.push("\\["+ie+"*(?:value|"+ee+")"),t.querySelectorAll("[id~="+W+"-]").length||F.push("~="),t.querySelectorAll(":checked").length||F.push(":checked"),t.querySelectorAll("a#"+W+"+*").length||F.push(".#.+[+~]")}),s(function(t){var e=n.createElement("input");e.setAttribute("type","hidden"),t.appendChild(e).setAttribute("name","D"),t.querySelectorAll("[name=d]").length&&F.push("name"+ie+"*[*^$|!~]?="),t.querySelectorAll(":enabled").length||F.push(":enabled",":disabled"),t.querySelectorAll("*,:x"),F.push(",.*:")})),(b.matchesSelector=ye.test(L=V.matches||V.webkitMatchesSelector||V.mozMatchesSelector||V.oMatchesSelector||V.msMatchesSelector))&&s(function(t){b.disconnectedMatch=L.call(t,"div"),L.call(t,"[s!='']:x"),j.push("!=",re)}),F=F.length&&new RegExp(F.join("|")),j=j.length&&new RegExp(j.join("|")),e=ye.test(V.compareDocumentPosition),q=e||ye.test(V.contains)?function(t,e){var i=9===t.nodeType?t.documentElement:t,n=e&&e.parentNode;return t===n||!(!n||1!==n.nodeType||!(i.contains?i.contains(n):t.compareDocumentPosition&&16&t.compareDocumentPosition(n)))}:function(t,e){if(e)for(;e=e.parentNode;)if(e===t)return!0;return!1},X=e?function(t,e){if(t===e)return E=!0,0;var i=!t.compareDocumentPosition-!e.compareDocumentPosition;return i?i:(i=(t.ownerDocument||t)===(e.ownerDocument||e)?t.compareDocumentPosition(e):1,1&i||!b.sortDetached&&e.compareDocumentPosition(t)===i?t===n||t.ownerDocument===R&&q(R,t)?-1:e===n||e.ownerDocument===R&&q(R,e)?1:D?te(D,t)-te(D,e):0:4&i?-1:1)}:function(t,e){if(t===e)return E=!0,0;var i,s=0,o=t.parentNode,h=e.parentNode,a=[t],u=[e];if(!o||!h)return t===n?-1:e===n?1:o?-1:h?1:D?te(D,t)-te(D,e):0;if(o===h)return r(t,e);for(i=t;i=i.parentNode;)a.unshift(i);for(i=e;i=i.parentNode;)u.unshift(i);for(;a[s]===u[s];)s++;return s?r(a[s],u[s]):a[s]===R?-1:u[s]===R?1:0},n):A},e.matches=function(t,i){return e(t,null,null,i)},e.matchesSelector=function(t,i){if((t.ownerDocument||t)!==A&&N(t),i=i.replace(ce,"='$1']"),!(!b.matchesSelector||!O||j&&j.test(i)||F&&F.test(i)))try{var n=L.call(t,i);if(n||b.disconnectedMatch||t.document&&11!==t.document.nodeType)return n}catch(s){}return e(i,A,null,[t]).length>0},e.contains=function(t,e){return(t.ownerDocument||t)!==A&&N(t),q(t,e)},e.attr=function(t,e){(t.ownerDocument||t)!==A&&N(t);var i=_.attrHandle[e.toLowerCase()],n=i&&U.call(_.attrHandle,e.toLowerCase())?i(t,e,!O):void 0;return void 0!==n?n:b.attributes||!O?t.getAttribute(e):(n=t.getAttributeNode(e))&&n.specified?n.value:null},e.error=function(t){throw new Error("Syntax error, unrecognized expression: "+t)},e.uniqueSort=function(t){var e,i=[],n=0,s=0;if(E=!b.detectDuplicates,D=!b.sortStable&&t.slice(0),t.sort(X),E){for(;e=t[s++];)e===t[s]&&(n=i.push(s));for(;n--;)t.splice(i[n],1)}return D=null,t},k=e.getText=function(t){var e,i="",n=0,s=t.nodeType;if(s){if(1===s||9===s||11===s){if("string"==typeof t.textContent)return t.textContent;for(t=t.firstChild;t;t=t.nextSibling)i+=k(t)}else if(3===s||4===s)return t.nodeValue}else for(;e=t[n++];)i+=k(e);return i},_=e.selectors={cacheLength:50,createPseudo:n,match:pe,attrHandle:{},find:{},relative:{">":{dir:"parentNode",first:!0}," ":{dir:"parentNode"},"+":{dir:"previousSibling",first:!0},"~":{dir:"previousSibling"}},preFilter:{ATTR:function(t){return t[1]=t[1].replace(be,_e),t[3]=(t[3]||t[4]||t[5]||"").replace(be,_e),"~="===t[2]&&(t[3]=" "+t[3]+" "),t.slice(0,4)},CHILD:function(t){return t[1]=t[1].toLowerCase(),"nth"===t[1].slice(0,3)?(t[3]||e.error(t[0]),t[4]=+(t[4]?t[5]+(t[6]||1):2*("even"===t[3]||"odd"===t[3])),t[5]=+(t[7]+t[8]||"odd"===t[3])):t[3]&&e.error(t[0]),t},PSEUDO:function(t){var e,i=!t[6]&&t[2];return pe.CHILD.test(t[0])?null:(t[3]?t[2]=t[4]||t[5]||"":i&&de.test(i)&&(e=C(i,!0))&&(e=i.indexOf(")",i.length-e)-i.length)&&(t[0]=t[0].slice(0,e),t[2]=i.slice(0,e)),t.slice(0,3))}},filter:{TAG:function(t){var e=t.replace(be,_e).toLowerCase();return"*"===t?function(){return!0}:function(t){return t.nodeName&&t.nodeName.toLowerCase()===e}},CLASS:function(t){var e=I[t+" "];return e||(e=new RegExp("(^|"+ie+")"+t+"("+ie+"|$)"))&&I(t,function(t){return e.test("string"==typeof t.className&&t.className||"undefined"!=typeof t.getAttribute&&t.getAttribute("class")||"")})},ATTR:function(t,i,n){return function(s){var o=e.attr(s,t);return null==o?"!="===i:i?(o+="","="===i?o===n:"!="===i?o!==n:"^="===i?n&&0===o.indexOf(n):"*="===i?n&&o.indexOf(n)>-1:"$="===i?n&&o.slice(-n.length)===n:"~="===i?(" "+o.replace(he," ")+" ").indexOf(n)>-1:"|="===i?o===n||o.slice(0,n.length+1)===n+"-":!1):!0}},CHILD:function(t,e,i,n,s){var o="nth"!==t.slice(0,3),r="last"!==t.slice(-4),h="of-type"===e;return 1===n&&0===s?function(t){return!!t.parentNode}:function(e,i,a){var u,l,c,d,f,p,g=o!==r?"nextSibling":"previousSibling",v=e.parentNode,y=h&&e.nodeName.toLowerCase(),m=!a&&!h;if(v){if(o){for(;g;){for(c=e;c=c[g];)if(h?c.nodeName.toLowerCase()===y:1===c.nodeType)return!1;p=g="only"===t&&!p&&"nextSibling"}return!0}if(p=[r?v.firstChild:v.lastChild],r&&m){for(l=v[W]||(v[W]={}),u=l[t]||[],f=u[0]===H&&u[1],d=u[0]===H&&u[2],c=f&&v.childNodes[f];c=++f&&c&&c[g]||(d=f=0)||p.pop();)if(1===c.nodeType&&++d&&c===e){l[t]=[H,f,d];break}}else if(m&&(u=(e[W]||(e[W]={}))[t])&&u[0]===H)d=u[1];else for(;(c=++f&&c&&c[g]||(d=f=0)||p.pop())&&((h?c.nodeName.toLowerCase()!==y:1!==c.nodeType)||!++d||(m&&((c[W]||(c[W]={}))[t]=[H,d]),c!==e)););return d-=s,d===n||d%n===0&&d/n>=0}}},PSEUDO:function(t,i){var s,o=_.pseudos[t]||_.setFilters[t.toLowerCase()]||e.error("unsupported pseudo: "+t);return o[W]?o(i):o.length>1?(s=[t,t,"",i],_.setFilters.hasOwnProperty(t.toLowerCase())?n(function(t,e){for(var n,s=o(t,i),r=s.length;r--;)n=te(t,s[r]),t[n]=!(e[n]=s[r])}):function(t){return o(t,0,s)}):o}},pseudos:{not:n(function(t){var e=[],i=[],s=S(t.replace(ae,"$1"));return s[W]?n(function(t,e,i,n){for(var o,r=s(t,null,n,[]),h=t.length;h--;)(o=r[h])&&(t[h]=!(e[h]=o))}):function(t,n,o){return e[0]=t,s(e,null,o,i),e[0]=null,!i.pop()}}),has:n(function(t){return function(i){return e(t,i).length>0}}),contains:n(function(t){return t=t.replace(be,_e),function(e){return(e.textContent||e.innerText||k(e)).indexOf(t)>-1}}),lang:n(function(t){return fe.test(t||"")||e.error("unsupported lang: "+t),t=t.replace(be,_e).toLowerCase(),function(e){var i;do if(i=O?e.lang:e.getAttribute("xml:lang")||e.getAttribute("lang"))return i=i.toLowerCase(),i===t||0===i.indexOf(t+"-");while((e=e.parentNode)&&1===e.nodeType);return!1}}),target:function(e){var i=t.location&&t.location.hash;return i&&i.slice(1)===e.id},root:function(t){return t===V},focus:function(t){return t===A.activeElement&&(!A.hasFocus||A.hasFocus())&&!!(t.type||t.href||~t.tabIndex)},enabled:function(t){return t.disabled===!1},disabled:function(t){return t.disabled===!0},checked:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&!!t.checked||"option"===e&&!!t.selected},selected:function(t){return t.parentNode&&t.parentNode.selectedIndex,t.selected===!0},empty:function(t){for(t=t.firstChild;t;t=t.nextSibling)if(t.nodeType<6)return!1;return!0},parent:function(t){return!_.pseudos.empty(t)},header:function(t){return ve.test(t.nodeName)},input:function(t){return ge.test(t.nodeName)},button:function(t){var e=t.nodeName.toLowerCase();return"input"===e&&"button"===t.type||"button"===e},text:function(t){var e;return"input"===t.nodeName.toLowerCase()&&"text"===t.type&&(null==(e=t.getAttribute("type"))||"text"===e.toLowerCase())},first:u(function(){return[0]}),last:u(function(t,e){return[e-1]}),eq:u(function(t,e,i){return[0>i?i+e:i]}),even:u(function(t,e){for(var i=0;e>i;i+=2)t.push(i);return t}),odd:u(function(t,e){for(var i=1;e>i;i+=2)t.push(i);return t}),lt:u(function(t,e,i){for(var n=0>i?i+e:i;--n>=0;)t.push(n);return t}),gt:u(function(t,e,i){for(var n=0>i?i+e:i;++n<e;)t.push(n);return t})}},_.pseudos.nth=_.pseudos.eq;for(w in{radio:!0,checkbox:!0,file:!0,password:!0,image:!0})_.pseudos[w]=h(w);for(w in{submit:!0,reset:!0})_.pseudos[w]=a(w);return c.prototype=_.filters=_.pseudos,_.setFilters=new c,C=e.tokenize=function(t,i){var n,s,o,r,h,a,u,l=z[t+" "];if(l)return i?0:l.slice(0);for(h=t,a=[],u=_.preFilter;h;){(!n||(s=ue.exec(h)))&&(s&&(h=h.slice(s[0].length)||h),a.push(o=[])),n=!1,(s=le.exec(h))&&(n=s.shift(),o.push({value:n,type:s[0].replace(ae," ")}),h=h.slice(n.length));for(r in _.filter)!(s=pe[r].exec(h))||u[r]&&!(s=u[r](s))||(n=s.shift(),o.push({value:n,type:r,matches:s}),h=h.slice(n.length));if(!n)break}return i?h.length:h?e.error(t):z(t,a).slice(0)},S=e.compile=function(t,e){var i,n=[],s=[],o=$[t+" "];if(!o){for(e||(e=C(t)),i=e.length;i--;)o=m(e[i]),o[W]?n.push(o):s.push(o);o=$(t,x(s,n)),o.selector=t}return o},M=e.select=function(t,e,i,n){var s,o,r,h,a,u="function"==typeof t&&t,c=!n&&C(t=u.selector||t);if(i=i||[],1===c.length){if(o=c[0]=c[0].slice(0),o.length>2&&"ID"===(r=o[0]).type&&b.getById&&9===e.nodeType&&O&&_.relative[o[1].type]){if(e=(_.find.ID(r.matches[0].replace(be,_e),e)||[])[0],!e)return i;u&&(e=e.parentNode),t=t.slice(o.shift().value.length)}for(s=pe.needsContext.test(t)?0:o.length;s--&&(r=o[s],!_.relative[h=r.type]);)if((a=_.find[h])&&(n=a(r.matches[0].replace(be,_e),xe.test(o[0].type)&&l(e.parentNode)||e))){if(o.splice(s,1),t=n.length&&d(o),!t)return Q.apply(i,n),i;break}}return(u||S(t,c))(n,e,!O,i,xe.test(t)&&l(e.parentNode)||e),i},b.sortStable=W.split("").sort(X).join("")===W,b.detectDuplicates=!!E,N(),b.sortDetached=s(function(t){return 1&t.compareDocumentPosition(A.createElement("div"))}),s(function(t){return t.innerHTML="<a href='#'></a>","#"===t.firstChild.getAttribute("href")})||o("type|href|height|width",function(t,e,i){return i?void 0:t.getAttribute(e,"type"===e.toLowerCase()?1:2)}),b.attributes&&s(function(t){return t.innerHTML="<input/>",t.firstChild.setAttribute("value",""),""===t.firstChild.getAttribute("value")})||o("value",function(t,e,i){return i||"input"!==t.nodeName.toLowerCase()?void 0:t.defaultValue}),s(function(t){return null==t.getAttribute("disabled")})||o(ee,function(t,e,i){var n;return i?void 0:t[e]===!0?e.toLowerCase():(n=t.getAttributeNode(e))&&n.specified?n.value:null}),e}(e);te.find=oe,te.expr=oe.selectors,te.expr[":"]=te.expr.pseudos,te.unique=oe.uniqueSort,te.text=oe.getText,te.isXMLDoc=oe.isXML,te.contains=oe.contains;
var re=te.expr.match.needsContext,he=/^<(\w+)\s*\/?>(?:<\/\1>|)$/,ae=/^.[^:#\[\.,]*$/;te.filter=function(t,e,i){var n=e[0];return i&&(t=":not("+t+")"),1===e.length&&1===n.nodeType?te.find.matchesSelector(n,t)?[n]:[]:te.find.matches(t,te.grep(e,function(t){return 1===t.nodeType}))},te.fn.extend({find:function(t){var e,i=this.length,n=[],s=this;if("string"!=typeof t)return this.pushStack(te(t).filter(function(){for(e=0;i>e;e++)if(te.contains(s[e],this))return!0}));for(e=0;i>e;e++)te.find(t,s[e],n);return n=this.pushStack(i>1?te.unique(n):n),n.selector=this.selector?this.selector+" "+t:t,n},filter:function(t){return this.pushStack(s(this,t||[],!1))},not:function(t){return this.pushStack(s(this,t||[],!0))},is:function(t){return!!s(this,"string"==typeof t&&re.test(t)?te(t):t||[],!1).length}});var ue,le=/^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/,ce=te.fn.init=function(t,e){var i,n;if(!t)return this;if("string"==typeof t){if(i="<"===t[0]&&">"===t[t.length-1]&&t.length>=3?[null,t,null]:le.exec(t),!i||!i[1]&&e)return!e||e.jquery?(e||ue).find(t):this.constructor(e).find(t);if(i[1]){if(e=e instanceof te?e[0]:e,te.merge(this,te.parseHTML(i[1],e&&e.nodeType?e.ownerDocument||e:Q,!0)),he.test(i[1])&&te.isPlainObject(e))for(i in e)te.isFunction(this[i])?this[i](e[i]):this.attr(i,e[i]);return this}return n=Q.getElementById(i[2]),n&&n.parentNode&&(this.length=1,this[0]=n),this.context=Q,this.selector=t,this}return t.nodeType?(this.context=this[0]=t,this.length=1,this):te.isFunction(t)?"undefined"!=typeof ue.ready?ue.ready(t):t(te):(void 0!==t.selector&&(this.selector=t.selector,this.context=t.context),te.makeArray(t,this))};ce.prototype=te.fn,ue=te(Q);var de=/^(?:parents|prev(?:Until|All))/,fe={children:!0,contents:!0,next:!0,prev:!0};te.extend({dir:function(t,e,i){for(var n=[],s=void 0!==i;(t=t[e])&&9!==t.nodeType;)if(1===t.nodeType){if(s&&te(t).is(i))break;n.push(t)}return n},sibling:function(t,e){for(var i=[];t;t=t.nextSibling)1===t.nodeType&&t!==e&&i.push(t);return i}}),te.fn.extend({has:function(t){var e=te(t,this),i=e.length;return this.filter(function(){for(var t=0;i>t;t++)if(te.contains(this,e[t]))return!0})},closest:function(t,e){for(var i,n=0,s=this.length,o=[],r=re.test(t)||"string"!=typeof t?te(t,e||this.context):0;s>n;n++)for(i=this[n];i&&i!==e;i=i.parentNode)if(i.nodeType<11&&(r?r.index(i)>-1:1===i.nodeType&&te.find.matchesSelector(i,t))){o.push(i);break}return this.pushStack(o.length>1?te.unique(o):o)},index:function(t){return t?"string"==typeof t?Y.call(te(t),this[0]):Y.call(this,t.jquery?t[0]:t):this[0]&&this[0].parentNode?this.first().prevAll().length:-1},add:function(t,e){return this.pushStack(te.unique(te.merge(this.get(),te(t,e))))},addBack:function(t){return this.add(null==t?this.prevObject:this.prevObject.filter(t))}}),te.each({parent:function(t){var e=t.parentNode;return e&&11!==e.nodeType?e:null},parents:function(t){return te.dir(t,"parentNode")},parentsUntil:function(t,e,i){return te.dir(t,"parentNode",i)},next:function(t){return o(t,"nextSibling")},prev:function(t){return o(t,"previousSibling")},nextAll:function(t){return te.dir(t,"nextSibling")},prevAll:function(t){return te.dir(t,"previousSibling")},nextUntil:function(t,e,i){return te.dir(t,"nextSibling",i)},prevUntil:function(t,e,i){return te.dir(t,"previousSibling",i)},siblings:function(t){return te.sibling((t.parentNode||{}).firstChild,t)},children:function(t){return te.sibling(t.firstChild)},contents:function(t){return t.contentDocument||te.merge([],t.childNodes)}},function(t,e){te.fn[t]=function(i,n){var s=te.map(this,e,i);return"Until"!==t.slice(-5)&&(n=i),n&&"string"==typeof n&&(s=te.filter(n,s)),this.length>1&&(fe[t]||te.unique(s),de.test(t)&&s.reverse()),this.pushStack(s)}});var pe=/\S+/g,ge={};te.Callbacks=function(t){t="string"==typeof t?ge[t]||r(t):te.extend({},t);var e,i,n,s,o,h,a=[],u=!t.once&&[],l=function(r){for(e=t.memory&&r,i=!0,h=s||0,s=0,o=a.length,n=!0;a&&o>h;h++)if(a[h].apply(r[0],r[1])===!1&&t.stopOnFalse){e=!1;break}n=!1,a&&(u?u.length&&l(u.shift()):e?a=[]:c.disable())},c={add:function(){if(a){var i=a.length;!function r(e){te.each(e,function(e,i){var n=te.type(i);"function"===n?t.unique&&c.has(i)||a.push(i):i&&i.length&&"string"!==n&&r(i)})}(arguments),n?o=a.length:e&&(s=i,l(e))}return this},remove:function(){return a&&te.each(arguments,function(t,e){for(var i;(i=te.inArray(e,a,i))>-1;)a.splice(i,1),n&&(o>=i&&o--,h>=i&&h--)}),this},has:function(t){return t?te.inArray(t,a)>-1:!(!a||!a.length)},empty:function(){return a=[],o=0,this},disable:function(){return a=u=e=void 0,this},disabled:function(){return!a},lock:function(){return u=void 0,e||c.disable(),this},locked:function(){return!u},fireWith:function(t,e){return!a||i&&!u||(e=e||[],e=[t,e.slice?e.slice():e],n?u.push(e):l(e)),this},fire:function(){return c.fireWith(this,arguments),this},fired:function(){return!!i}};return c},te.extend({Deferred:function(t){var e=[["resolve","done",te.Callbacks("once memory"),"resolved"],["reject","fail",te.Callbacks("once memory"),"rejected"],["notify","progress",te.Callbacks("memory")]],i="pending",n={state:function(){return i},always:function(){return s.done(arguments).fail(arguments),this},then:function(){var t=arguments;return te.Deferred(function(i){te.each(e,function(e,o){var r=te.isFunction(t[e])&&t[e];s[o[1]](function(){var t=r&&r.apply(this,arguments);t&&te.isFunction(t.promise)?t.promise().done(i.resolve).fail(i.reject).progress(i.notify):i[o[0]+"With"](this===n?i.promise():this,r?[t]:arguments)})}),t=null}).promise()},promise:function(t){return null!=t?te.extend(t,n):n}},s={};return n.pipe=n.then,te.each(e,function(t,o){var r=o[2],h=o[3];n[o[1]]=r.add,h&&r.add(function(){i=h},e[1^t][2].disable,e[2][2].lock),s[o[0]]=function(){return s[o[0]+"With"](this===s?n:this,arguments),this},s[o[0]+"With"]=r.fireWith}),n.promise(s),t&&t.call(s,s),s},when:function(t){var e,i,n,s=0,o=z.call(arguments),r=o.length,h=1!==r||t&&te.isFunction(t.promise)?r:0,a=1===h?t:te.Deferred(),u=function(t,i,n){return function(s){i[t]=this,n[t]=arguments.length>1?z.call(arguments):s,n===e?a.notifyWith(i,n):--h||a.resolveWith(i,n)}};if(r>1)for(e=new Array(r),i=new Array(r),n=new Array(r);r>s;s++)o[s]&&te.isFunction(o[s].promise)?o[s].promise().done(u(s,n,o)).fail(a.reject).progress(u(s,i,e)):--h;return h||a.resolveWith(n,o),a.promise()}});var ve;te.fn.ready=function(t){return te.ready.promise().done(t),this},te.extend({isReady:!1,readyWait:1,holdReady:function(t){t?te.readyWait++:te.ready(!0)},ready:function(t){(t===!0?--te.readyWait:te.isReady)||(te.isReady=!0,t!==!0&&--te.readyWait>0||(ve.resolveWith(Q,[te]),te.fn.triggerHandler&&(te(Q).triggerHandler("ready"),te(Q).off("ready"))))}}),te.ready.promise=function(t){return ve||(ve=te.Deferred(),"complete"===Q.readyState?setTimeout(te.ready):(Q.addEventListener("DOMContentLoaded",h,!1),e.addEventListener("load",h,!1))),ve.promise(t)},te.ready.promise();var ye=te.access=function(t,e,i,n,s,o,r){var h=0,a=t.length,u=null==i;if("object"===te.type(i)){s=!0;for(h in i)te.access(t,e,h,i[h],!0,o,r)}else if(void 0!==n&&(s=!0,te.isFunction(n)||(r=!0),u&&(r?(e.call(t,n),e=null):(u=e,e=function(t,e,i){return u.call(te(t),i)})),e))for(;a>h;h++)e(t[h],i,r?n:n.call(t[h],h,e(t[h],i)));return s?t:u?e.call(t):a?e(t[0],i):o};te.acceptData=function(t){return 1===t.nodeType||9===t.nodeType||!+t.nodeType},a.uid=1,a.accepts=te.acceptData,a.prototype={key:function(t){if(!a.accepts(t))return 0;var e={},i=t[this.expando];if(!i){i=a.uid++;try{e[this.expando]={value:i},Object.defineProperties(t,e)}catch(n){e[this.expando]=i,te.extend(t,e)}}return this.cache[i]||(this.cache[i]={}),i},set:function(t,e,i){var n,s=this.key(t),o=this.cache[s];if("string"==typeof e)o[e]=i;else if(te.isEmptyObject(o))te.extend(this.cache[s],e);else for(n in e)o[n]=e[n];return o},get:function(t,e){var i=this.cache[this.key(t)];return void 0===e?i:i[e]},access:function(t,e,i){var n;return void 0===e||e&&"string"==typeof e&&void 0===i?(n=this.get(t,e),void 0!==n?n:this.get(t,te.camelCase(e))):(this.set(t,e,i),void 0!==i?i:e)},remove:function(t,e){var i,n,s,o=this.key(t),r=this.cache[o];if(void 0===e)this.cache[o]={};else{te.isArray(e)?n=e.concat(e.map(te.camelCase)):(s=te.camelCase(e),e in r?n=[e,s]:(n=s,n=n in r?[n]:n.match(pe)||[])),i=n.length;for(;i--;)delete r[n[i]]}},hasData:function(t){return!te.isEmptyObject(this.cache[t[this.expando]]||{})},discard:function(t){t[this.expando]&&delete this.cache[t[this.expando]]}};var me=new a,xe=new a,we=/^(?:\{[\w\W]*\}|\[[\w\W]*\])$/,be=/([A-Z])/g;te.extend({hasData:function(t){return xe.hasData(t)||me.hasData(t)},data:function(t,e,i){return xe.access(t,e,i)},removeData:function(t,e){xe.remove(t,e)},_data:function(t,e,i){return me.access(t,e,i)},_removeData:function(t,e){me.remove(t,e)}}),te.fn.extend({data:function(t,e){var i,n,s,o=this[0],r=o&&o.attributes;if(void 0===t){if(this.length&&(s=xe.get(o),1===o.nodeType&&!me.get(o,"hasDataAttrs"))){for(i=r.length;i--;)r[i]&&(n=r[i].name,0===n.indexOf("data-")&&(n=te.camelCase(n.slice(5)),u(o,n,s[n])));me.set(o,"hasDataAttrs",!0)}return s}return"object"==typeof t?this.each(function(){xe.set(this,t)}):ye(this,function(e){var i,n=te.camelCase(t);if(o&&void 0===e){if(i=xe.get(o,t),void 0!==i)return i;if(i=xe.get(o,n),void 0!==i)return i;if(i=u(o,n,void 0),void 0!==i)return i}else this.each(function(){var i=xe.get(this,n);xe.set(this,n,e),-1!==t.indexOf("-")&&void 0!==i&&xe.set(this,t,e)})},null,e,arguments.length>1,null,!0)},removeData:function(t){return this.each(function(){xe.remove(this,t)})}}),te.extend({queue:function(t,e,i){var n;return t?(e=(e||"fx")+"queue",n=me.get(t,e),i&&(!n||te.isArray(i)?n=me.access(t,e,te.makeArray(i)):n.push(i)),n||[]):void 0},dequeue:function(t,e){e=e||"fx";var i=te.queue(t,e),n=i.length,s=i.shift(),o=te._queueHooks(t,e),r=function(){te.dequeue(t,e)};"inprogress"===s&&(s=i.shift(),n--),s&&("fx"===e&&i.unshift("inprogress"),delete o.stop,s.call(t,r,o)),!n&&o&&o.empty.fire()},_queueHooks:function(t,e){var i=e+"queueHooks";return me.get(t,i)||me.access(t,i,{empty:te.Callbacks("once memory").add(function(){me.remove(t,[e+"queue",i])})})}}),te.fn.extend({queue:function(t,e){var i=2;return"string"!=typeof t&&(e=t,t="fx",i--),arguments.length<i?te.queue(this[0],t):void 0===e?this:this.each(function(){var i=te.queue(this,t,e);te._queueHooks(this,t),"fx"===t&&"inprogress"!==i[0]&&te.dequeue(this,t)})},dequeue:function(t){return this.each(function(){te.dequeue(this,t)})},clearQueue:function(t){return this.queue(t||"fx",[])},promise:function(t,e){var i,n=1,s=te.Deferred(),o=this,r=this.length,h=function(){--n||s.resolveWith(o,[o])};for("string"!=typeof t&&(e=t,t=void 0),t=t||"fx";r--;)i=me.get(o[r],t+"queueHooks"),i&&i.empty&&(n++,i.empty.add(h));return h(),s.promise(e)}});var _e=/[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source,ke=["Top","Right","Bottom","Left"],Te=function(t,e){return t=e||t,"none"===te.css(t,"display")||!te.contains(t.ownerDocument,t)},Ce=/^(?:checkbox|radio)$/i;!function(){var t=Q.createDocumentFragment(),e=t.appendChild(Q.createElement("div")),i=Q.createElement("input");i.setAttribute("type","radio"),i.setAttribute("checked","checked"),i.setAttribute("name","t"),e.appendChild(i),J.checkClone=e.cloneNode(!0).cloneNode(!0).lastChild.checked,e.innerHTML="<textarea>x</textarea>",J.noCloneChecked=!!e.cloneNode(!0).lastChild.defaultValue}();var Se="undefined";J.focusinBubbles="onfocusin"in e;var Me=/^key/,Pe=/^(?:mouse|pointer|contextmenu)|click/,De=/^(?:focusinfocus|focusoutblur)$/,Ee=/^([^.]*)(?:\.(.+)|)$/;te.event={global:{},add:function(t,e,i,n,s){var o,r,h,a,u,l,c,d,f,p,g,v=me.get(t);if(v)for(i.handler&&(o=i,i=o.handler,s=o.selector),i.guid||(i.guid=te.guid++),(a=v.events)||(a=v.events={}),(r=v.handle)||(r=v.handle=function(e){return typeof te!==Se&&te.event.triggered!==e.type?te.event.dispatch.apply(t,arguments):void 0}),e=(e||"").match(pe)||[""],u=e.length;u--;)h=Ee.exec(e[u])||[],f=g=h[1],p=(h[2]||"").split(".").sort(),f&&(c=te.event.special[f]||{},f=(s?c.delegateType:c.bindType)||f,c=te.event.special[f]||{},l=te.extend({type:f,origType:g,data:n,handler:i,guid:i.guid,selector:s,needsContext:s&&te.expr.match.needsContext.test(s),namespace:p.join(".")},o),(d=a[f])||(d=a[f]=[],d.delegateCount=0,c.setup&&c.setup.call(t,n,p,r)!==!1||t.addEventListener&&t.addEventListener(f,r,!1)),c.add&&(c.add.call(t,l),l.handler.guid||(l.handler.guid=i.guid)),s?d.splice(d.delegateCount++,0,l):d.push(l),te.event.global[f]=!0)},remove:function(t,e,i,n,s){var o,r,h,a,u,l,c,d,f,p,g,v=me.hasData(t)&&me.get(t);if(v&&(a=v.events)){for(e=(e||"").match(pe)||[""],u=e.length;u--;)if(h=Ee.exec(e[u])||[],f=g=h[1],p=(h[2]||"").split(".").sort(),f){for(c=te.event.special[f]||{},f=(n?c.delegateType:c.bindType)||f,d=a[f]||[],h=h[2]&&new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"),r=o=d.length;o--;)l=d[o],!s&&g!==l.origType||i&&i.guid!==l.guid||h&&!h.test(l.namespace)||n&&n!==l.selector&&("**"!==n||!l.selector)||(d.splice(o,1),l.selector&&d.delegateCount--,c.remove&&c.remove.call(t,l));r&&!d.length&&(c.teardown&&c.teardown.call(t,p,v.handle)!==!1||te.removeEvent(t,f,v.handle),delete a[f])}else for(f in a)te.event.remove(t,f+e[u],i,n,!0);te.isEmptyObject(a)&&(delete v.handle,me.remove(t,"events"))}},trigger:function(t,i,n,s){var o,r,h,a,u,l,c,d=[n||Q],f=K.call(t,"type")?t.type:t,p=K.call(t,"namespace")?t.namespace.split("."):[];if(r=h=n=n||Q,3!==n.nodeType&&8!==n.nodeType&&!De.test(f+te.event.triggered)&&(f.indexOf(".")>=0&&(p=f.split("."),f=p.shift(),p.sort()),u=f.indexOf(":")<0&&"on"+f,t=t[te.expando]?t:new te.Event(f,"object"==typeof t&&t),t.isTrigger=s?2:3,t.namespace=p.join("."),t.namespace_re=t.namespace?new RegExp("(^|\\.)"+p.join("\\.(?:.*\\.|)")+"(\\.|$)"):null,t.result=void 0,t.target||(t.target=n),i=null==i?[t]:te.makeArray(i,[t]),c=te.event.special[f]||{},s||!c.trigger||c.trigger.apply(n,i)!==!1)){if(!s&&!c.noBubble&&!te.isWindow(n)){for(a=c.delegateType||f,De.test(a+f)||(r=r.parentNode);r;r=r.parentNode)d.push(r),h=r;h===(n.ownerDocument||Q)&&d.push(h.defaultView||h.parentWindow||e)}for(o=0;(r=d[o++])&&!t.isPropagationStopped();)t.type=o>1?a:c.bindType||f,l=(me.get(r,"events")||{})[t.type]&&me.get(r,"handle"),l&&l.apply(r,i),l=u&&r[u],l&&l.apply&&te.acceptData(r)&&(t.result=l.apply(r,i),t.result===!1&&t.preventDefault());return t.type=f,s||t.isDefaultPrevented()||c._default&&c._default.apply(d.pop(),i)!==!1||!te.acceptData(n)||u&&te.isFunction(n[f])&&!te.isWindow(n)&&(h=n[u],h&&(n[u]=null),te.event.triggered=f,n[f](),te.event.triggered=void 0,h&&(n[u]=h)),t.result}},dispatch:function(t){t=te.event.fix(t);var e,i,n,s,o,r=[],h=z.call(arguments),a=(me.get(this,"events")||{})[t.type]||[],u=te.event.special[t.type]||{};if(h[0]=t,t.delegateTarget=this,!u.preDispatch||u.preDispatch.call(this,t)!==!1){for(r=te.event.handlers.call(this,t,a),e=0;(s=r[e++])&&!t.isPropagationStopped();)for(t.currentTarget=s.elem,i=0;(o=s.handlers[i++])&&!t.isImmediatePropagationStopped();)(!t.namespace_re||t.namespace_re.test(o.namespace))&&(t.handleObj=o,t.data=o.data,n=((te.event.special[o.origType]||{}).handle||o.handler).apply(s.elem,h),void 0!==n&&(t.result=n)===!1&&(t.preventDefault(),t.stopPropagation()));return u.postDispatch&&u.postDispatch.call(this,t),t.result}},handlers:function(t,e){var i,n,s,o,r=[],h=e.delegateCount,a=t.target;if(h&&a.nodeType&&(!t.button||"click"!==t.type))for(;a!==this;a=a.parentNode||this)if(a.disabled!==!0||"click"!==t.type){for(n=[],i=0;h>i;i++)o=e[i],s=o.selector+" ",void 0===n[s]&&(n[s]=o.needsContext?te(s,this).index(a)>=0:te.find(s,this,null,[a]).length),n[s]&&n.push(o);n.length&&r.push({elem:a,handlers:n})}return h<e.length&&r.push({elem:this,handlers:e.slice(h)}),r},props:"altKey bubbles cancelable ctrlKey currentTarget eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),fixHooks:{},keyHooks:{props:"char charCode key keyCode".split(" "),filter:function(t,e){return null==t.which&&(t.which=null!=e.charCode?e.charCode:e.keyCode),t}},mouseHooks:{props:"button buttons clientX clientY offsetX offsetY pageX pageY screenX screenY toElement".split(" "),filter:function(t,e){var i,n,s,o=e.button;return null==t.pageX&&null!=e.clientX&&(i=t.target.ownerDocument||Q,n=i.documentElement,s=i.body,t.pageX=e.clientX+(n&&n.scrollLeft||s&&s.scrollLeft||0)-(n&&n.clientLeft||s&&s.clientLeft||0),t.pageY=e.clientY+(n&&n.scrollTop||s&&s.scrollTop||0)-(n&&n.clientTop||s&&s.clientTop||0)),t.which||void 0===o||(t.which=1&o?1:2&o?3:4&o?2:0),t}},fix:function(t){if(t[te.expando])return t;var e,i,n,s=t.type,o=t,r=this.fixHooks[s];for(r||(this.fixHooks[s]=r=Pe.test(s)?this.mouseHooks:Me.test(s)?this.keyHooks:{}),n=r.props?this.props.concat(r.props):this.props,t=new te.Event(o),e=n.length;e--;)i=n[e],t[i]=o[i];return t.target||(t.target=Q),3===t.target.nodeType&&(t.target=t.target.parentNode),r.filter?r.filter(t,o):t},special:{load:{noBubble:!0},focus:{trigger:function(){return this!==d()&&this.focus?(this.focus(),!1):void 0},delegateType:"focusin"},blur:{trigger:function(){return this===d()&&this.blur?(this.blur(),!1):void 0},delegateType:"focusout"},click:{trigger:function(){return"checkbox"===this.type&&this.click&&te.nodeName(this,"input")?(this.click(),!1):void 0},_default:function(t){return te.nodeName(t.target,"a")}},beforeunload:{postDispatch:function(t){void 0!==t.result&&t.originalEvent&&(t.originalEvent.returnValue=t.result)}}},simulate:function(t,e,i,n){var s=te.extend(new te.Event,i,{type:t,isSimulated:!0,originalEvent:{}});n?te.event.trigger(s,null,e):te.event.dispatch.call(e,s),s.isDefaultPrevented()&&i.preventDefault()}},te.removeEvent=function(t,e,i){t.removeEventListener&&t.removeEventListener(e,i,!1)},te.Event=function(t,e){return this instanceof te.Event?(t&&t.type?(this.originalEvent=t,this.type=t.type,this.isDefaultPrevented=t.defaultPrevented||void 0===t.defaultPrevented&&t.returnValue===!1?l:c):this.type=t,e&&te.extend(this,e),this.timeStamp=t&&t.timeStamp||te.now(),void(this[te.expando]=!0)):new te.Event(t,e)},te.Event.prototype={isDefaultPrevented:c,isPropagationStopped:c,isImmediatePropagationStopped:c,preventDefault:function(){var t=this.originalEvent;this.isDefaultPrevented=l,t&&t.preventDefault&&t.preventDefault()},stopPropagation:function(){var t=this.originalEvent;this.isPropagationStopped=l,t&&t.stopPropagation&&t.stopPropagation()},stopImmediatePropagation:function(){var t=this.originalEvent;this.isImmediatePropagationStopped=l,t&&t.stopImmediatePropagation&&t.stopImmediatePropagation(),this.stopPropagation()}},te.each({mouseenter:"mouseover",mouseleave:"mouseout",pointerenter:"pointerover",pointerleave:"pointerout"},function(t,e){te.event.special[t]={delegateType:e,bindType:e,handle:function(t){var i,n=this,s=t.relatedTarget,o=t.handleObj;return(!s||s!==n&&!te.contains(n,s))&&(t.type=o.origType,i=o.handler.apply(this,arguments),t.type=e),i}}}),J.focusinBubbles||te.each({focus:"focusin",blur:"focusout"},function(t,e){var i=function(t){te.event.simulate(e,t.target,te.event.fix(t),!0)};te.event.special[e]={setup:function(){var n=this.ownerDocument||this,s=me.access(n,e);s||n.addEventListener(t,i,!0),me.access(n,e,(s||0)+1)},teardown:function(){var n=this.ownerDocument||this,s=me.access(n,e)-1;s?me.access(n,e,s):(n.removeEventListener(t,i,!0),me.remove(n,e))}}}),te.fn.extend({on:function(t,e,i,n,s){var o,r;if("object"==typeof t){"string"!=typeof e&&(i=i||e,e=void 0);for(r in t)this.on(r,e,i,t[r],s);return this}if(null==i&&null==n?(n=e,i=e=void 0):null==n&&("string"==typeof e?(n=i,i=void 0):(n=i,i=e,e=void 0)),n===!1)n=c;else if(!n)return this;return 1===s&&(o=n,n=function(t){return te().off(t),o.apply(this,arguments)},n.guid=o.guid||(o.guid=te.guid++)),this.each(function(){te.event.add(this,t,n,i,e)})},one:function(t,e,i,n){return this.on(t,e,i,n,1)},off:function(t,e,i){var n,s;if(t&&t.preventDefault&&t.handleObj)return n=t.handleObj,te(t.delegateTarget).off(n.namespace?n.origType+"."+n.namespace:n.origType,n.selector,n.handler),this;if("object"==typeof t){for(s in t)this.off(s,e,t[s]);return this}return(e===!1||"function"==typeof e)&&(i=e,e=void 0),i===!1&&(i=c),this.each(function(){te.event.remove(this,t,i,e)})},trigger:function(t,e){return this.each(function(){te.event.trigger(t,e,this)})},triggerHandler:function(t,e){var i=this[0];return i?te.event.trigger(t,e,i,!0):void 0}});var Ne=/<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:]+)[^>]*)\/>/gi,Ae=/<([\w:]+)/,Ve=/<|&#?\w+;/,Oe=/<(?:script|style|link)/i,Fe=/checked\s*(?:[^=]|=\s*.checked.)/i,je=/^$|\/(?:java|ecma)script/i,Le=/^true\/(.*)/,qe=/^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g,We={option:[1,"<select multiple='multiple'>","</select>"],thead:[1,"<table>","</table>"],col:[2,"<table><colgroup>","</colgroup></table>"],tr:[2,"<table><tbody>","</tbody></table>"],td:[3,"<table><tbody><tr>","</tr></tbody></table>"],_default:[0,"",""]};We.optgroup=We.option,We.tbody=We.tfoot=We.colgroup=We.caption=We.thead,We.th=We.td,te.extend({clone:function(t,e,i){var n,s,o,r,h=t.cloneNode(!0),a=te.contains(t.ownerDocument,t);if(!(J.noCloneChecked||1!==t.nodeType&&11!==t.nodeType||te.isXMLDoc(t)))for(r=m(h),o=m(t),n=0,s=o.length;s>n;n++)x(o[n],r[n]);if(e)if(i)for(o=o||m(t),r=r||m(h),n=0,s=o.length;s>n;n++)y(o[n],r[n]);else y(t,h);return r=m(h,"script"),r.length>0&&v(r,!a&&m(t,"script")),h},buildFragment:function(t,e,i,n){for(var s,o,r,h,a,u,l=e.createDocumentFragment(),c=[],d=0,f=t.length;f>d;d++)if(s=t[d],s||0===s)if("object"===te.type(s))te.merge(c,s.nodeType?[s]:s);else if(Ve.test(s)){for(o=o||l.appendChild(e.createElement("div")),r=(Ae.exec(s)||["",""])[1].toLowerCase(),h=We[r]||We._default,o.innerHTML=h[1]+s.replace(Ne,"<$1></$2>")+h[2],u=h[0];u--;)o=o.lastChild;te.merge(c,o.childNodes),o=l.firstChild,o.textContent=""}else c.push(e.createTextNode(s));for(l.textContent="",d=0;s=c[d++];)if((!n||-1===te.inArray(s,n))&&(a=te.contains(s.ownerDocument,s),o=m(l.appendChild(s),"script"),a&&v(o),i))for(u=0;s=o[u++];)je.test(s.type||"")&&i.push(s);return l},cleanData:function(t){for(var e,i,n,s,o=te.event.special,r=0;void 0!==(i=t[r]);r++){if(te.acceptData(i)&&(s=i[me.expando],s&&(e=me.cache[s]))){if(e.events)for(n in e.events)o[n]?te.event.remove(i,n):te.removeEvent(i,n,e.handle);me.cache[s]&&delete me.cache[s]}delete xe.cache[i[xe.expando]]}}}),te.fn.extend({text:function(t){return ye(this,function(t){return void 0===t?te.text(this):this.empty().each(function(){(1===this.nodeType||11===this.nodeType||9===this.nodeType)&&(this.textContent=t)})},null,t,arguments.length)},append:function(){return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=f(this,t);e.appendChild(t)}})},prepend:function(){return this.domManip(arguments,function(t){if(1===this.nodeType||11===this.nodeType||9===this.nodeType){var e=f(this,t);e.insertBefore(t,e.firstChild)}})},before:function(){return this.domManip(arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this)})},after:function(){return this.domManip(arguments,function(t){this.parentNode&&this.parentNode.insertBefore(t,this.nextSibling)})},remove:function(t,e){for(var i,n=t?te.filter(t,this):this,s=0;null!=(i=n[s]);s++)e||1!==i.nodeType||te.cleanData(m(i)),i.parentNode&&(e&&te.contains(i.ownerDocument,i)&&v(m(i,"script")),i.parentNode.removeChild(i));return this},empty:function(){for(var t,e=0;null!=(t=this[e]);e++)1===t.nodeType&&(te.cleanData(m(t,!1)),t.textContent="");return this},clone:function(t,e){return t=null==t?!1:t,e=null==e?t:e,this.map(function(){return te.clone(this,t,e)})},html:function(t){return ye(this,function(t){var e=this[0]||{},i=0,n=this.length;if(void 0===t&&1===e.nodeType)return e.innerHTML;if("string"==typeof t&&!Oe.test(t)&&!We[(Ae.exec(t)||["",""])[1].toLowerCase()]){t=t.replace(Ne,"<$1></$2>");try{for(;n>i;i++)e=this[i]||{},1===e.nodeType&&(te.cleanData(m(e,!1)),e.innerHTML=t);e=0}catch(s){}}e&&this.empty().append(t)},null,t,arguments.length)},replaceWith:function(){var t=arguments[0];return this.domManip(arguments,function(e){t=this.parentNode,te.cleanData(m(this)),t&&t.replaceChild(e,this)}),t&&(t.length||t.nodeType)?this:this.remove()},detach:function(t){return this.remove(t,!0)},domManip:function(t,e){t=$.apply([],t);var i,n,s,o,r,h,a=0,u=this.length,l=this,c=u-1,d=t[0],f=te.isFunction(d);if(f||u>1&&"string"==typeof d&&!J.checkClone&&Fe.test(d))return this.each(function(i){var n=l.eq(i);f&&(t[0]=d.call(this,i,n.html())),n.domManip(t,e)});if(u&&(i=te.buildFragment(t,this[0].ownerDocument,!1,this),n=i.firstChild,1===i.childNodes.length&&(i=n),n)){for(s=te.map(m(i,"script"),p),o=s.length;u>a;a++)r=i,a!==c&&(r=te.clone(r,!0,!0),o&&te.merge(s,m(r,"script"))),e.call(this[a],r,a);if(o)for(h=s[s.length-1].ownerDocument,te.map(s,g),a=0;o>a;a++)r=s[a],je.test(r.type||"")&&!me.access(r,"globalEval")&&te.contains(h,r)&&(r.src?te._evalUrl&&te._evalUrl(r.src):te.globalEval(r.textContent.replace(qe,"")))}return this}}),te.each({appendTo:"append",prependTo:"prepend",insertBefore:"before",insertAfter:"after",replaceAll:"replaceWith"},function(t,e){te.fn[t]=function(t){for(var i,n=[],s=te(t),o=s.length-1,r=0;o>=r;r++)i=r===o?this:this.clone(!0),te(s[r])[e](i),X.apply(n,i.get());return this.pushStack(n)}});var Re,He={},Be=/^margin/,Ie=new RegExp("^("+_e+")(?!px)[a-z%]+$","i"),ze=function(t){return t.ownerDocument.defaultView.opener?t.ownerDocument.defaultView.getComputedStyle(t,null):e.getComputedStyle(t,null)};!function(){function t(){r.style.cssText="-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;display:block;margin-top:1%;top:1%;border:1px;padding:1px;width:4px;position:absolute",r.innerHTML="",s.appendChild(o);var t=e.getComputedStyle(r,null);i="1%"!==t.top,n="4px"===t.width,s.removeChild(o)}var i,n,s=Q.documentElement,o=Q.createElement("div"),r=Q.createElement("div");r.style&&(r.style.backgroundClip="content-box",r.cloneNode(!0).style.backgroundClip="",J.clearCloneStyle="content-box"===r.style.backgroundClip,o.style.cssText="border:0;width:0;height:0;top:0;left:-9999px;margin-top:1px;position:absolute",o.appendChild(r),e.getComputedStyle&&te.extend(J,{pixelPosition:function(){return t(),i},boxSizingReliable:function(){return null==n&&t(),n},reliableMarginRight:function(){var t,i=r.appendChild(Q.createElement("div"));return i.style.cssText=r.style.cssText="-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",i.style.marginRight=i.style.width="0",r.style.width="1px",s.appendChild(o),t=!parseFloat(e.getComputedStyle(i,null).marginRight),s.removeChild(o),r.removeChild(i),t}}))}(),te.swap=function(t,e,i,n){var s,o,r={};for(o in e)r[o]=t.style[o],t.style[o]=e[o];s=i.apply(t,n||[]);for(o in e)t.style[o]=r[o];return s};var $e=/^(none|table(?!-c[ea]).+)/,Xe=new RegExp("^("+_e+")(.*)$","i"),Ye=new RegExp("^([+-])=("+_e+")","i"),Ue={position:"absolute",visibility:"hidden",display:"block"},Ge={letterSpacing:"0",fontWeight:"400"},Ke=["Webkit","O","Moz","ms"];te.extend({cssHooks:{opacity:{get:function(t,e){if(e){var i=_(t,"opacity");return""===i?"1":i}}}},cssNumber:{columnCount:!0,fillOpacity:!0,flexGrow:!0,flexShrink:!0,fontWeight:!0,lineHeight:!0,opacity:!0,order:!0,orphans:!0,widows:!0,zIndex:!0,zoom:!0},cssProps:{"float":"cssFloat"},style:function(t,e,i,n){if(t&&3!==t.nodeType&&8!==t.nodeType&&t.style){var s,o,r,h=te.camelCase(e),a=t.style;return e=te.cssProps[h]||(te.cssProps[h]=T(a,h)),r=te.cssHooks[e]||te.cssHooks[h],void 0===i?r&&"get"in r&&void 0!==(s=r.get(t,!1,n))?s:a[e]:(o=typeof i,"string"===o&&(s=Ye.exec(i))&&(i=(s[1]+1)*s[2]+parseFloat(te.css(t,e)),o="number"),null!=i&&i===i&&("number"!==o||te.cssNumber[h]||(i+="px"),J.clearCloneStyle||""!==i||0!==e.indexOf("background")||(a[e]="inherit"),r&&"set"in r&&void 0===(i=r.set(t,i,n))||(a[e]=i)),void 0)}},css:function(t,e,i,n){var s,o,r,h=te.camelCase(e);return e=te.cssProps[h]||(te.cssProps[h]=T(t.style,h)),r=te.cssHooks[e]||te.cssHooks[h],r&&"get"in r&&(s=r.get(t,!0,i)),void 0===s&&(s=_(t,e,n)),"normal"===s&&e in Ge&&(s=Ge[e]),""===i||i?(o=parseFloat(s),i===!0||te.isNumeric(o)?o||0:s):s}}),te.each(["height","width"],function(t,e){te.cssHooks[e]={get:function(t,i,n){return i?$e.test(te.css(t,"display"))&&0===t.offsetWidth?te.swap(t,Ue,function(){return M(t,e,n)}):M(t,e,n):void 0},set:function(t,i,n){var s=n&&ze(t);return C(t,i,n?S(t,e,n,"border-box"===te.css(t,"boxSizing",!1,s),s):0)}}}),te.cssHooks.marginRight=k(J.reliableMarginRight,function(t,e){return e?te.swap(t,{display:"inline-block"},_,[t,"marginRight"]):void 0}),te.each({margin:"",padding:"",border:"Width"},function(t,e){te.cssHooks[t+e]={expand:function(i){for(var n=0,s={},o="string"==typeof i?i.split(" "):[i];4>n;n++)s[t+ke[n]+e]=o[n]||o[n-2]||o[0];return s}},Be.test(t)||(te.cssHooks[t+e].set=C)}),te.fn.extend({css:function(t,e){return ye(this,function(t,e,i){var n,s,o={},r=0;if(te.isArray(e)){for(n=ze(t),s=e.length;s>r;r++)o[e[r]]=te.css(t,e[r],!1,n);return o}return void 0!==i?te.style(t,e,i):te.css(t,e)},t,e,arguments.length>1)},show:function(){return P(this,!0)},hide:function(){return P(this)},toggle:function(t){return"boolean"==typeof t?t?this.show():this.hide():this.each(function(){Te(this)?te(this).show():te(this).hide()})}}),te.Tween=D,D.prototype={constructor:D,init:function(t,e,i,n,s,o){this.elem=t,this.prop=i,this.easing=s||"swing",this.options=e,this.start=this.now=this.cur(),this.end=n,this.unit=o||(te.cssNumber[i]?"":"px")},cur:function(){var t=D.propHooks[this.prop];return t&&t.get?t.get(this):D.propHooks._default.get(this)},run:function(t){var e,i=D.propHooks[this.prop];return this.pos=e=this.options.duration?te.easing[this.easing](t,this.options.duration*t,0,1,this.options.duration):t,this.now=(this.end-this.start)*e+this.start,this.options.step&&this.options.step.call(this.elem,this.now,this),i&&i.set?i.set(this):D.propHooks._default.set(this),this}},D.prototype.init.prototype=D.prototype,D.propHooks={_default:{get:function(t){var e;return null==t.elem[t.prop]||t.elem.style&&null!=t.elem.style[t.prop]?(e=te.css(t.elem,t.prop,""),e&&"auto"!==e?e:0):t.elem[t.prop]},set:function(t){te.fx.step[t.prop]?te.fx.step[t.prop](t):t.elem.style&&(null!=t.elem.style[te.cssProps[t.prop]]||te.cssHooks[t.prop])?te.style(t.elem,t.prop,t.now+t.unit):t.elem[t.prop]=t.now}}},D.propHooks.scrollTop=D.propHooks.scrollLeft={set:function(t){t.elem.nodeType&&t.elem.parentNode&&(t.elem[t.prop]=t.now)}},te.easing={linear:function(t){return t},swing:function(t){return.5-Math.cos(t*Math.PI)/2}},te.fx=D.prototype.init,te.fx.step={};var Je,Qe,Ze=/^(?:toggle|show|hide)$/,ti=new RegExp("^(?:([+-])=|)("+_e+")([a-z%]*)$","i"),ei=/queueHooks$/,ii=[V],ni={"*":[function(t,e){var i=this.createTween(t,e),n=i.cur(),s=ti.exec(e),o=s&&s[3]||(te.cssNumber[t]?"":"px"),r=(te.cssNumber[t]||"px"!==o&&+n)&&ti.exec(te.css(i.elem,t)),h=1,a=20;if(r&&r[3]!==o){o=o||r[3],s=s||[],r=+n||1;do h=h||".5",r/=h,te.style(i.elem,t,r+o);while(h!==(h=i.cur()/n)&&1!==h&&--a)}return s&&(r=i.start=+r||+n||0,i.unit=o,i.end=s[1]?r+(s[1]+1)*s[2]:+s[2]),i}]};te.Animation=te.extend(F,{tweener:function(t,e){te.isFunction(t)?(e=t,t=["*"]):t=t.split(" ");for(var i,n=0,s=t.length;s>n;n++)i=t[n],ni[i]=ni[i]||[],ni[i].unshift(e)},prefilter:function(t,e){e?ii.unshift(t):ii.push(t)}}),te.speed=function(t,e,i){var n=t&&"object"==typeof t?te.extend({},t):{complete:i||!i&&e||te.isFunction(t)&&t,duration:t,easing:i&&e||e&&!te.isFunction(e)&&e};return n.duration=te.fx.off?0:"number"==typeof n.duration?n.duration:n.duration in te.fx.speeds?te.fx.speeds[n.duration]:te.fx.speeds._default,(null==n.queue||n.queue===!0)&&(n.queue="fx"),n.old=n.complete,n.complete=function(){te.isFunction(n.old)&&n.old.call(this),n.queue&&te.dequeue(this,n.queue)},n},te.fn.extend({fadeTo:function(t,e,i,n){return this.filter(Te).css("opacity",0).show().end().animate({opacity:e},t,i,n)},animate:function(t,e,i,n){var s=te.isEmptyObject(t),o=te.speed(e,i,n),r=function(){var e=F(this,te.extend({},t),o);(s||me.get(this,"finish"))&&e.stop(!0)};return r.finish=r,s||o.queue===!1?this.each(r):this.queue(o.queue,r)},stop:function(t,e,i){var n=function(t){var e=t.stop;
delete t.stop,e(i)};return"string"!=typeof t&&(i=e,e=t,t=void 0),e&&t!==!1&&this.queue(t||"fx",[]),this.each(function(){var e=!0,s=null!=t&&t+"queueHooks",o=te.timers,r=me.get(this);if(s)r[s]&&r[s].stop&&n(r[s]);else for(s in r)r[s]&&r[s].stop&&ei.test(s)&&n(r[s]);for(s=o.length;s--;)o[s].elem!==this||null!=t&&o[s].queue!==t||(o[s].anim.stop(i),e=!1,o.splice(s,1));(e||!i)&&te.dequeue(this,t)})},finish:function(t){return t!==!1&&(t=t||"fx"),this.each(function(){var e,i=me.get(this),n=i[t+"queue"],s=i[t+"queueHooks"],o=te.timers,r=n?n.length:0;for(i.finish=!0,te.queue(this,t,[]),s&&s.stop&&s.stop.call(this,!0),e=o.length;e--;)o[e].elem===this&&o[e].queue===t&&(o[e].anim.stop(!0),o.splice(e,1));for(e=0;r>e;e++)n[e]&&n[e].finish&&n[e].finish.call(this);delete i.finish})}}),te.each(["toggle","show","hide"],function(t,e){var i=te.fn[e];te.fn[e]=function(t,n,s){return null==t||"boolean"==typeof t?i.apply(this,arguments):this.animate(N(e,!0),t,n,s)}}),te.each({slideDown:N("show"),slideUp:N("hide"),slideToggle:N("toggle"),fadeIn:{opacity:"show"},fadeOut:{opacity:"hide"},fadeToggle:{opacity:"toggle"}},function(t,e){te.fn[t]=function(t,i,n){return this.animate(e,t,i,n)}}),te.timers=[],te.fx.tick=function(){var t,e=0,i=te.timers;for(Je=te.now();e<i.length;e++)t=i[e],t()||i[e]!==t||i.splice(e--,1);i.length||te.fx.stop(),Je=void 0},te.fx.timer=function(t){te.timers.push(t),t()?te.fx.start():te.timers.pop()},te.fx.interval=13,te.fx.start=function(){Qe||(Qe=setInterval(te.fx.tick,te.fx.interval))},te.fx.stop=function(){clearInterval(Qe),Qe=null},te.fx.speeds={slow:600,fast:200,_default:400},te.fn.delay=function(t,e){return t=te.fx?te.fx.speeds[t]||t:t,e=e||"fx",this.queue(e,function(e,i){var n=setTimeout(e,t);i.stop=function(){clearTimeout(n)}})},function(){var t=Q.createElement("input"),e=Q.createElement("select"),i=e.appendChild(Q.createElement("option"));t.type="checkbox",J.checkOn=""!==t.value,J.optSelected=i.selected,e.disabled=!0,J.optDisabled=!i.disabled,t=Q.createElement("input"),t.value="t",t.type="radio",J.radioValue="t"===t.value}();var si,oi,ri=te.expr.attrHandle;te.fn.extend({attr:function(t,e){return ye(this,te.attr,t,e,arguments.length>1)},removeAttr:function(t){return this.each(function(){te.removeAttr(this,t)})}}),te.extend({attr:function(t,e,i){var n,s,o=t.nodeType;if(t&&3!==o&&8!==o&&2!==o)return typeof t.getAttribute===Se?te.prop(t,e,i):(1===o&&te.isXMLDoc(t)||(e=e.toLowerCase(),n=te.attrHooks[e]||(te.expr.match.bool.test(e)?oi:si)),void 0===i?n&&"get"in n&&null!==(s=n.get(t,e))?s:(s=te.find.attr(t,e),null==s?void 0:s):null!==i?n&&"set"in n&&void 0!==(s=n.set(t,i,e))?s:(t.setAttribute(e,i+""),i):void te.removeAttr(t,e))},removeAttr:function(t,e){var i,n,s=0,o=e&&e.match(pe);if(o&&1===t.nodeType)for(;i=o[s++];)n=te.propFix[i]||i,te.expr.match.bool.test(i)&&(t[n]=!1),t.removeAttribute(i)},attrHooks:{type:{set:function(t,e){if(!J.radioValue&&"radio"===e&&te.nodeName(t,"input")){var i=t.value;return t.setAttribute("type",e),i&&(t.value=i),e}}}}}),oi={set:function(t,e,i){return e===!1?te.removeAttr(t,i):t.setAttribute(i,i),i}},te.each(te.expr.match.bool.source.match(/\w+/g),function(t,e){var i=ri[e]||te.find.attr;ri[e]=function(t,e,n){var s,o;return n||(o=ri[e],ri[e]=s,s=null!=i(t,e,n)?e.toLowerCase():null,ri[e]=o),s}});var hi=/^(?:input|select|textarea|button)$/i;te.fn.extend({prop:function(t,e){return ye(this,te.prop,t,e,arguments.length>1)},removeProp:function(t){return this.each(function(){delete this[te.propFix[t]||t]})}}),te.extend({propFix:{"for":"htmlFor","class":"className"},prop:function(t,e,i){var n,s,o,r=t.nodeType;if(t&&3!==r&&8!==r&&2!==r)return o=1!==r||!te.isXMLDoc(t),o&&(e=te.propFix[e]||e,s=te.propHooks[e]),void 0!==i?s&&"set"in s&&void 0!==(n=s.set(t,i,e))?n:t[e]=i:s&&"get"in s&&null!==(n=s.get(t,e))?n:t[e]},propHooks:{tabIndex:{get:function(t){return t.hasAttribute("tabindex")||hi.test(t.nodeName)||t.href?t.tabIndex:-1}}}}),J.optSelected||(te.propHooks.selected={get:function(t){var e=t.parentNode;return e&&e.parentNode&&e.parentNode.selectedIndex,null}}),te.each(["tabIndex","readOnly","maxLength","cellSpacing","cellPadding","rowSpan","colSpan","useMap","frameBorder","contentEditable"],function(){te.propFix[this.toLowerCase()]=this});var ai=/[\t\r\n\f]/g;te.fn.extend({addClass:function(t){var e,i,n,s,o,r,h="string"==typeof t&&t,a=0,u=this.length;if(te.isFunction(t))return this.each(function(e){te(this).addClass(t.call(this,e,this.className))});if(h)for(e=(t||"").match(pe)||[];u>a;a++)if(i=this[a],n=1===i.nodeType&&(i.className?(" "+i.className+" ").replace(ai," "):" ")){for(o=0;s=e[o++];)n.indexOf(" "+s+" ")<0&&(n+=s+" ");r=te.trim(n),i.className!==r&&(i.className=r)}return this},removeClass:function(t){var e,i,n,s,o,r,h=0===arguments.length||"string"==typeof t&&t,a=0,u=this.length;if(te.isFunction(t))return this.each(function(e){te(this).removeClass(t.call(this,e,this.className))});if(h)for(e=(t||"").match(pe)||[];u>a;a++)if(i=this[a],n=1===i.nodeType&&(i.className?(" "+i.className+" ").replace(ai," "):"")){for(o=0;s=e[o++];)for(;n.indexOf(" "+s+" ")>=0;)n=n.replace(" "+s+" "," ");r=t?te.trim(n):"",i.className!==r&&(i.className=r)}return this},toggleClass:function(t,e){var i=typeof t;return"boolean"==typeof e&&"string"===i?e?this.addClass(t):this.removeClass(t):this.each(te.isFunction(t)?function(i){te(this).toggleClass(t.call(this,i,this.className,e),e)}:function(){if("string"===i)for(var e,n=0,s=te(this),o=t.match(pe)||[];e=o[n++];)s.hasClass(e)?s.removeClass(e):s.addClass(e);else(i===Se||"boolean"===i)&&(this.className&&me.set(this,"__className__",this.className),this.className=this.className||t===!1?"":me.get(this,"__className__")||"")})},hasClass:function(t){for(var e=" "+t+" ",i=0,n=this.length;n>i;i++)if(1===this[i].nodeType&&(" "+this[i].className+" ").replace(ai," ").indexOf(e)>=0)return!0;return!1}});var ui=/\r/g;te.fn.extend({val:function(t){var e,i,n,s=this[0];{if(arguments.length)return n=te.isFunction(t),this.each(function(i){var s;1===this.nodeType&&(s=n?t.call(this,i,te(this).val()):t,null==s?s="":"number"==typeof s?s+="":te.isArray(s)&&(s=te.map(s,function(t){return null==t?"":t+""})),e=te.valHooks[this.type]||te.valHooks[this.nodeName.toLowerCase()],e&&"set"in e&&void 0!==e.set(this,s,"value")||(this.value=s))});if(s)return e=te.valHooks[s.type]||te.valHooks[s.nodeName.toLowerCase()],e&&"get"in e&&void 0!==(i=e.get(s,"value"))?i:(i=s.value,"string"==typeof i?i.replace(ui,""):null==i?"":i)}}}),te.extend({valHooks:{option:{get:function(t){var e=te.find.attr(t,"value");return null!=e?e:te.trim(te.text(t))}},select:{get:function(t){for(var e,i,n=t.options,s=t.selectedIndex,o="select-one"===t.type||0>s,r=o?null:[],h=o?s+1:n.length,a=0>s?h:o?s:0;h>a;a++)if(i=n[a],!(!i.selected&&a!==s||(J.optDisabled?i.disabled:null!==i.getAttribute("disabled"))||i.parentNode.disabled&&te.nodeName(i.parentNode,"optgroup"))){if(e=te(i).val(),o)return e;r.push(e)}return r},set:function(t,e){for(var i,n,s=t.options,o=te.makeArray(e),r=s.length;r--;)n=s[r],(n.selected=te.inArray(n.value,o)>=0)&&(i=!0);return i||(t.selectedIndex=-1),o}}}}),te.each(["radio","checkbox"],function(){te.valHooks[this]={set:function(t,e){return te.isArray(e)?t.checked=te.inArray(te(t).val(),e)>=0:void 0}},J.checkOn||(te.valHooks[this].get=function(t){return null===t.getAttribute("value")?"on":t.value})}),te.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "),function(t,e){te.fn[e]=function(t,i){return arguments.length>0?this.on(e,null,t,i):this.trigger(e)}}),te.fn.extend({hover:function(t,e){return this.mouseenter(t).mouseleave(e||t)},bind:function(t,e,i){return this.on(t,null,e,i)},unbind:function(t,e){return this.off(t,null,e)},delegate:function(t,e,i,n){return this.on(e,t,i,n)},undelegate:function(t,e,i){return 1===arguments.length?this.off(t,"**"):this.off(e,t||"**",i)}});var li=te.now(),ci=/\?/;te.parseJSON=function(t){return JSON.parse(t+"")},te.parseXML=function(t){var e,i;if(!t||"string"!=typeof t)return null;try{i=new DOMParser,e=i.parseFromString(t,"text/xml")}catch(n){e=void 0}return(!e||e.getElementsByTagName("parsererror").length)&&te.error("Invalid XML: "+t),e};var di=/#.*$/,fi=/([?&])_=[^&]*/,pi=/^(.*?):[ \t]*([^\r\n]*)$/gm,gi=/^(?:about|app|app-storage|.+-extension|file|res|widget):$/,vi=/^(?:GET|HEAD)$/,yi=/^\/\//,mi=/^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/,xi={},wi={},bi="*/".concat("*"),_i=e.location.href,ki=mi.exec(_i.toLowerCase())||[];te.extend({active:0,lastModified:{},etag:{},ajaxSettings:{url:_i,type:"GET",isLocal:gi.test(ki[1]),global:!0,processData:!0,async:!0,contentType:"application/x-www-form-urlencoded; charset=UTF-8",accepts:{"*":bi,text:"text/plain",html:"text/html",xml:"application/xml, text/xml",json:"application/json, text/javascript"},contents:{xml:/xml/,html:/html/,json:/json/},responseFields:{xml:"responseXML",text:"responseText",json:"responseJSON"},converters:{"* text":String,"text html":!0,"text json":te.parseJSON,"text xml":te.parseXML},flatOptions:{url:!0,context:!0}},ajaxSetup:function(t,e){return e?q(q(t,te.ajaxSettings),e):q(te.ajaxSettings,t)},ajaxPrefilter:j(xi),ajaxTransport:j(wi),ajax:function(t,e){function i(t,e,i,r){var a,l,y,m,w,_=e;2!==x&&(x=2,h&&clearTimeout(h),n=void 0,o=r||"",b.readyState=t>0?4:0,a=t>=200&&300>t||304===t,i&&(m=W(c,b,i)),m=R(c,m,b,a),a?(c.ifModified&&(w=b.getResponseHeader("Last-Modified"),w&&(te.lastModified[s]=w),w=b.getResponseHeader("etag"),w&&(te.etag[s]=w)),204===t||"HEAD"===c.type?_="nocontent":304===t?_="notmodified":(_=m.state,l=m.data,y=m.error,a=!y)):(y=_,(t||!_)&&(_="error",0>t&&(t=0))),b.status=t,b.statusText=(e||_)+"",a?p.resolveWith(d,[l,_,b]):p.rejectWith(d,[b,_,y]),b.statusCode(v),v=void 0,u&&f.trigger(a?"ajaxSuccess":"ajaxError",[b,c,a?l:y]),g.fireWith(d,[b,_]),u&&(f.trigger("ajaxComplete",[b,c]),--te.active||te.event.trigger("ajaxStop")))}"object"==typeof t&&(e=t,t=void 0),e=e||{};var n,s,o,r,h,a,u,l,c=te.ajaxSetup({},e),d=c.context||c,f=c.context&&(d.nodeType||d.jquery)?te(d):te.event,p=te.Deferred(),g=te.Callbacks("once memory"),v=c.statusCode||{},y={},m={},x=0,w="canceled",b={readyState:0,getResponseHeader:function(t){var e;if(2===x){if(!r)for(r={};e=pi.exec(o);)r[e[1].toLowerCase()]=e[2];e=r[t.toLowerCase()]}return null==e?null:e},getAllResponseHeaders:function(){return 2===x?o:null},setRequestHeader:function(t,e){var i=t.toLowerCase();return x||(t=m[i]=m[i]||t,y[t]=e),this},overrideMimeType:function(t){return x||(c.mimeType=t),this},statusCode:function(t){var e;if(t)if(2>x)for(e in t)v[e]=[v[e],t[e]];else b.always(t[b.status]);return this},abort:function(t){var e=t||w;return n&&n.abort(e),i(0,e),this}};if(p.promise(b).complete=g.add,b.success=b.done,b.error=b.fail,c.url=((t||c.url||_i)+"").replace(di,"").replace(yi,ki[1]+"//"),c.type=e.method||e.type||c.method||c.type,c.dataTypes=te.trim(c.dataType||"*").toLowerCase().match(pe)||[""],null==c.crossDomain&&(a=mi.exec(c.url.toLowerCase()),c.crossDomain=!(!a||a[1]===ki[1]&&a[2]===ki[2]&&(a[3]||("http:"===a[1]?"80":"443"))===(ki[3]||("http:"===ki[1]?"80":"443")))),c.data&&c.processData&&"string"!=typeof c.data&&(c.data=te.param(c.data,c.traditional)),L(xi,c,e,b),2===x)return b;u=te.event&&c.global,u&&0===te.active++&&te.event.trigger("ajaxStart"),c.type=c.type.toUpperCase(),c.hasContent=!vi.test(c.type),s=c.url,c.hasContent||(c.data&&(s=c.url+=(ci.test(s)?"&":"?")+c.data,delete c.data),c.cache===!1&&(c.url=fi.test(s)?s.replace(fi,"$1_="+li++):s+(ci.test(s)?"&":"?")+"_="+li++)),c.ifModified&&(te.lastModified[s]&&b.setRequestHeader("If-Modified-Since",te.lastModified[s]),te.etag[s]&&b.setRequestHeader("If-None-Match",te.etag[s])),(c.data&&c.hasContent&&c.contentType!==!1||e.contentType)&&b.setRequestHeader("Content-Type",c.contentType),b.setRequestHeader("Accept",c.dataTypes[0]&&c.accepts[c.dataTypes[0]]?c.accepts[c.dataTypes[0]]+("*"!==c.dataTypes[0]?", "+bi+"; q=0.01":""):c.accepts["*"]);for(l in c.headers)b.setRequestHeader(l,c.headers[l]);if(c.beforeSend&&(c.beforeSend.call(d,b,c)===!1||2===x))return b.abort();w="abort";for(l in{success:1,error:1,complete:1})b[l](c[l]);if(n=L(wi,c,e,b)){b.readyState=1,u&&f.trigger("ajaxSend",[b,c]),c.async&&c.timeout>0&&(h=setTimeout(function(){b.abort("timeout")},c.timeout));try{x=1,n.send(y,i)}catch(_){if(!(2>x))throw _;i(-1,_)}}else i(-1,"No Transport");return b},getJSON:function(t,e,i){return te.get(t,e,i,"json")},getScript:function(t,e){return te.get(t,void 0,e,"script")}}),te.each(["get","post"],function(t,e){te[e]=function(t,i,n,s){return te.isFunction(i)&&(s=s||n,n=i,i=void 0),te.ajax({url:t,type:e,dataType:s,data:i,success:n})}}),te._evalUrl=function(t){return te.ajax({url:t,type:"GET",dataType:"script",async:!1,global:!1,"throws":!0})},te.fn.extend({wrapAll:function(t){var e;return te.isFunction(t)?this.each(function(e){te(this).wrapAll(t.call(this,e))}):(this[0]&&(e=te(t,this[0].ownerDocument).eq(0).clone(!0),this[0].parentNode&&e.insertBefore(this[0]),e.map(function(){for(var t=this;t.firstElementChild;)t=t.firstElementChild;return t}).append(this)),this)},wrapInner:function(t){return this.each(te.isFunction(t)?function(e){te(this).wrapInner(t.call(this,e))}:function(){var e=te(this),i=e.contents();i.length?i.wrapAll(t):e.append(t)})},wrap:function(t){var e=te.isFunction(t);return this.each(function(i){te(this).wrapAll(e?t.call(this,i):t)})},unwrap:function(){return this.parent().each(function(){te.nodeName(this,"body")||te(this).replaceWith(this.childNodes)}).end()}}),te.expr.filters.hidden=function(t){return t.offsetWidth<=0&&t.offsetHeight<=0},te.expr.filters.visible=function(t){return!te.expr.filters.hidden(t)};var Ti=/%20/g,Ci=/\[\]$/,Si=/\r?\n/g,Mi=/^(?:submit|button|image|reset|file)$/i,Pi=/^(?:input|select|textarea|keygen)/i;te.param=function(t,e){var i,n=[],s=function(t,e){e=te.isFunction(e)?e():null==e?"":e,n[n.length]=encodeURIComponent(t)+"="+encodeURIComponent(e)};if(void 0===e&&(e=te.ajaxSettings&&te.ajaxSettings.traditional),te.isArray(t)||t.jquery&&!te.isPlainObject(t))te.each(t,function(){s(this.name,this.value)});else for(i in t)H(i,t[i],e,s);return n.join("&").replace(Ti,"+")},te.fn.extend({serialize:function(){return te.param(this.serializeArray())},serializeArray:function(){return this.map(function(){var t=te.prop(this,"elements");return t?te.makeArray(t):this}).filter(function(){var t=this.type;return this.name&&!te(this).is(":disabled")&&Pi.test(this.nodeName)&&!Mi.test(t)&&(this.checked||!Ce.test(t))}).map(function(t,e){var i=te(this).val();return null==i?null:te.isArray(i)?te.map(i,function(t){return{name:e.name,value:t.replace(Si,"\r\n")}}):{name:e.name,value:i.replace(Si,"\r\n")}}).get()}}),te.ajaxSettings.xhr=function(){try{return new XMLHttpRequest}catch(t){}};var Di=0,Ei={},Ni={0:200,1223:204},Ai=te.ajaxSettings.xhr();e.attachEvent&&e.attachEvent("onunload",function(){for(var t in Ei)Ei[t]()}),J.cors=!!Ai&&"withCredentials"in Ai,J.ajax=Ai=!!Ai,te.ajaxTransport(function(t){var e;return J.cors||Ai&&!t.crossDomain?{send:function(i,n){var s,o=t.xhr(),r=++Di;if(o.open(t.type,t.url,t.async,t.username,t.password),t.xhrFields)for(s in t.xhrFields)o[s]=t.xhrFields[s];t.mimeType&&o.overrideMimeType&&o.overrideMimeType(t.mimeType),t.crossDomain||i["X-Requested-With"]||(i["X-Requested-With"]="XMLHttpRequest");for(s in i)o.setRequestHeader(s,i[s]);e=function(t){return function(){e&&(delete Ei[r],e=o.onload=o.onerror=null,"abort"===t?o.abort():"error"===t?n(o.status,o.statusText):n(Ni[o.status]||o.status,o.statusText,"string"==typeof o.responseText?{text:o.responseText}:void 0,o.getAllResponseHeaders()))}},o.onload=e(),o.onerror=e("error"),e=Ei[r]=e("abort");try{o.send(t.hasContent&&t.data||null)}catch(h){if(e)throw h}},abort:function(){e&&e()}}:void 0}),te.ajaxSetup({accepts:{script:"text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"},contents:{script:/(?:java|ecma)script/},converters:{"text script":function(t){return te.globalEval(t),t}}}),te.ajaxPrefilter("script",function(t){void 0===t.cache&&(t.cache=!1),t.crossDomain&&(t.type="GET")}),te.ajaxTransport("script",function(t){if(t.crossDomain){var e,i;return{send:function(n,s){e=te("<script>").prop({async:!0,charset:t.scriptCharset,src:t.url}).on("load error",i=function(t){e.remove(),i=null,t&&s("error"===t.type?404:200,t.type)}),Q.head.appendChild(e[0])},abort:function(){i&&i()}}}});var Vi=[],Oi=/(=)\?(?=&|$)|\?\?/;te.ajaxSetup({jsonp:"callback",jsonpCallback:function(){var t=Vi.pop()||te.expando+"_"+li++;return this[t]=!0,t}}),te.ajaxPrefilter("json jsonp",function(t,i,n){var s,o,r,h=t.jsonp!==!1&&(Oi.test(t.url)?"url":"string"==typeof t.data&&!(t.contentType||"").indexOf("application/x-www-form-urlencoded")&&Oi.test(t.data)&&"data");return h||"jsonp"===t.dataTypes[0]?(s=t.jsonpCallback=te.isFunction(t.jsonpCallback)?t.jsonpCallback():t.jsonpCallback,h?t[h]=t[h].replace(Oi,"$1"+s):t.jsonp!==!1&&(t.url+=(ci.test(t.url)?"&":"?")+t.jsonp+"="+s),t.converters["script json"]=function(){return r||te.error(s+" was not called"),r[0]},t.dataTypes[0]="json",o=e[s],e[s]=function(){r=arguments},n.always(function(){e[s]=o,t[s]&&(t.jsonpCallback=i.jsonpCallback,Vi.push(s)),r&&te.isFunction(o)&&o(r[0]),r=o=void 0}),"script"):void 0}),te.parseHTML=function(t,e,i){if(!t||"string"!=typeof t)return null;"boolean"==typeof e&&(i=e,e=!1),e=e||Q;var n=he.exec(t),s=!i&&[];return n?[e.createElement(n[1])]:(n=te.buildFragment([t],e,s),s&&s.length&&te(s).remove(),te.merge([],n.childNodes))};var Fi=te.fn.load;te.fn.load=function(t,e,i){if("string"!=typeof t&&Fi)return Fi.apply(this,arguments);var n,s,o,r=this,h=t.indexOf(" ");return h>=0&&(n=te.trim(t.slice(h)),t=t.slice(0,h)),te.isFunction(e)?(i=e,e=void 0):e&&"object"==typeof e&&(s="POST"),r.length>0&&te.ajax({url:t,type:s,dataType:"html",data:e}).done(function(t){o=arguments,r.html(n?te("<div>").append(te.parseHTML(t)).find(n):t)}).complete(i&&function(t,e){r.each(i,o||[t.responseText,e,t])}),this},te.each(["ajaxStart","ajaxStop","ajaxComplete","ajaxError","ajaxSuccess","ajaxSend"],function(t,e){te.fn[e]=function(t){return this.on(e,t)}}),te.expr.filters.animated=function(t){return te.grep(te.timers,function(e){return t===e.elem}).length};var ji=e.document.documentElement;te.offset={setOffset:function(t,e,i){var n,s,o,r,h,a,u,l=te.css(t,"position"),c=te(t),d={};"static"===l&&(t.style.position="relative"),h=c.offset(),o=te.css(t,"top"),a=te.css(t,"left"),u=("absolute"===l||"fixed"===l)&&(o+a).indexOf("auto")>-1,u?(n=c.position(),r=n.top,s=n.left):(r=parseFloat(o)||0,s=parseFloat(a)||0),te.isFunction(e)&&(e=e.call(t,i,h)),null!=e.top&&(d.top=e.top-h.top+r),null!=e.left&&(d.left=e.left-h.left+s),"using"in e?e.using.call(t,d):c.css(d)}},te.fn.extend({offset:function(t){if(arguments.length)return void 0===t?this:this.each(function(e){te.offset.setOffset(this,t,e)});var e,i,n=this[0],s={top:0,left:0},o=n&&n.ownerDocument;if(o)return e=o.documentElement,te.contains(e,n)?(typeof n.getBoundingClientRect!==Se&&(s=n.getBoundingClientRect()),i=B(o),{top:s.top+i.pageYOffset-e.clientTop,left:s.left+i.pageXOffset-e.clientLeft}):s},position:function(){if(this[0]){var t,e,i=this[0],n={top:0,left:0};return"fixed"===te.css(i,"position")?e=i.getBoundingClientRect():(t=this.offsetParent(),e=this.offset(),te.nodeName(t[0],"html")||(n=t.offset()),n.top+=te.css(t[0],"borderTopWidth",!0),n.left+=te.css(t[0],"borderLeftWidth",!0)),{top:e.top-n.top-te.css(i,"marginTop",!0),left:e.left-n.left-te.css(i,"marginLeft",!0)}}},offsetParent:function(){return this.map(function(){for(var t=this.offsetParent||ji;t&&!te.nodeName(t,"html")&&"static"===te.css(t,"position");)t=t.offsetParent;return t||ji})}}),te.each({scrollLeft:"pageXOffset",scrollTop:"pageYOffset"},function(t,i){var n="pageYOffset"===i;te.fn[t]=function(s){return ye(this,function(t,s,o){var r=B(t);return void 0===o?r?r[i]:t[s]:void(r?r.scrollTo(n?e.pageXOffset:o,n?o:e.pageYOffset):t[s]=o)},t,s,arguments.length,null)}}),te.each(["top","left"],function(t,e){te.cssHooks[e]=k(J.pixelPosition,function(t,i){return i?(i=_(t,e),Ie.test(i)?te(t).position()[e]+"px":i):void 0})}),te.each({Height:"height",Width:"width"},function(t,e){te.each({padding:"inner"+t,content:e,"":"outer"+t},function(i,n){te.fn[n]=function(n,s){var o=arguments.length&&(i||"boolean"!=typeof n),r=i||(n===!0||s===!0?"margin":"border");return ye(this,function(e,i,n){var s;return te.isWindow(e)?e.document.documentElement["client"+t]:9===e.nodeType?(s=e.documentElement,Math.max(e.body["scroll"+t],s["scroll"+t],e.body["offset"+t],s["offset"+t],s["client"+t])):void 0===n?te.css(e,i,r):te.style(e,i,n,r)},e,o?n:void 0,o,null)}})}),te.fn.size=function(){return this.length},te.fn.andSelf=te.fn.addBack,"function"==typeof t&&t.amd&&t("jquery",[],function(){return te});var Li=e.jQuery,qi=e.$;return te.noConflict=function(t){return e.$===te&&(e.$=qi),t&&e.jQuery===te&&(e.jQuery=Li),te},typeof i===Se&&(e.jQuery=e.$=te),te})},{}]},{},[1])(1)});
}).call(this,typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : {})

},{}]},{},[1])


//# sourceMappingURL=bundle.js.map
