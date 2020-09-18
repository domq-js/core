function CacheStorage() {
}

CacheStorage.prototype = {
	get: function( key, _default = false ) {
		return this[ key ] || _default;
	},
	set: function( key, data ) {
		this[ key ] = data;
		return this;
	}
};
const staticStorage    = Object.create( {
	d: Object.create( {} ),
	g: ( name ) => staticStorage.d[ name ] || false,
	s: ( name ) => {
		staticStorage.d[ name ] = new CacheStorage();
		return staticStorage.d[ name ];
	},
	r: ( name ) => {
		if( staticStorage.d[ name ] ) {
			delete staticStorage.d[ name ];
		}
	},
} );

export default function( cacheName, remove = false ) {
	if( remove ) {
		staticStorage.r( cacheName );
		return this;
	}
	let isExists = staticStorage.g( cacheName );
	if( !isExists ) {
		return staticStorage.s( cacheName );
	}
	return isExists;
}
