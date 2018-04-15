const initState = {
	latitude: {
		lat: 14.058324,
     	lng: 108.277199
	}, 
	defaultObj : {
		center: {
	    	lat: 14.058324,
	     	lng: 108.277199
    	},
    	zoom: 11
	}, 
}

function writeBlog(state = initState, action) {
	switch(action.type) {
		case types.UPDATE_LAT:
			return {...state, ...action.payload}
		case types.SEARCH_LOCATION:
			return {...state, ...action.payload}
		case types.LOAD_LATITUDE:
			return {...state, ...action.payload}
		case types.RESET_LATITUDE:
			return {...state, ...action.payload}
		default:
			return state;

	}
	return state;
}

module.exports = writeBlog;
