const version                   = '@VERSION',
	  wponion_pickledvanilla_js = function( selector ) {
		  // The wpopv object is actually just the init constructor 'enhanced'
		  // Need init if wpopv is called (just allow error to be thrown if not included)
		  return new wponion_pickledvanilla_js.fn.init( selector );
	  };

wponion_pickledvanilla_js.fn = wponion_pickledvanilla_js.prototype = {
	wpopv: version,
	constructor: wponion_pickledvanilla_js,
};

export default wponion_pickledvanilla_js;
