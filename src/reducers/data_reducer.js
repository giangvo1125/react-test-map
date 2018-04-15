const initState = {
	detail: {
		street: '', 
		ward: '', 
		district: '', 
		city: '', 
		country: '', 
	}, 
	validateObj: {}, 
	isOpenModal: false, 
	list: [], 
}

function writeBlog(state = initState, action) {
	switch(action.type) {
		case types.ON_CHANGE_STATUS_MODAL:
			return {...state, ...action.payload}
		case types.FILL_DETAIL_ADDRESS:
			return {
				...state, 
				detail: {
					...state.detail, 
					...action.payload, 
				}
			}
		case types.GET_LIST_ADDRESS:
			return {...state, ...action.payload}
		case types.LOAD_DETAIL_ITEM:
			return {...state, ...action.payload}
		case types.RESET_DETAIL_DATA:
			return {...state, ...action.payload}
		case types.SUBMIT_DATA:
			return {...state, ...action.payload}
		case types.EXPORT_CSV_FILE:
			return {...state, ...action.payload}
		case types.VALIDATE_DATA:
			return {...state, ...action.payload}
		default:
			return state;

	}
	return state;
}

module.exports = writeBlog;
