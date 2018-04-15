import uuidv1 from'uuid/v1';

const onSearchLocation = (typeSearch='', data) => (dispatch, getState) => {
	let { isCallAPI } = getState().data
	var params = ''
	switch(typeSearch) {
		case 'address':
			var temp = ''
			for(let key in data) {
				if(data[key] != '') {
					temp+= data[key].replace(/\s/g,'+')
					temp+= '+'
				}
			}
			temp = temp.substr(0, temp.length - 1)
			params = `address=${temp}`
		break;
		case 'latlng':
			params = `latlng=${data.lat},${data.lng}`
		default:
		break;
	}
	if(typeSearch != '') {
		var url = `https://maps.googleapis.com/maps/api/geocode/json?${params}&key=${config.googleGeoCoding}`
		axios.get(url)
		.then((response) => {
			if(response.data && response.data.results.length > 0) {
				var findObj = response.data.results[0]
				if(typeSearch == 'latlng') {
					// findObj = _.find(response.data.results, (item) => {
					// 	return item.geometry.location_type == 'APPROXIMATE'
					// })
					findObj = response.data.results[0]
				}
				if(findObj) {
					dispatch({
						type: types.SEARCH_LOCATION, 
						payload: {
							latitude: findObj.geometry.location, 
							defaultObj : {
								center: findObj.geometry.location, 
						    	zoom: 11
							}, 
						}
					})
					if(typeSearch == 'latlng') {
						var obj = {}
						for(let i = 0; i < findObj.address_components.length; i++) {
							let item = findObj.address_components[i]
							if(item.types[0] == 'route') {
								obj['street'] = item.long_name == 'Unnamed Road' ? '' : item.long_name;
							}
							else if(Helper.isExistedDataInArray(item.types, 'sublocality') || Helper.isExistedDataInArray(item.types, 'sublocality_level_1')) {
								obj['ward'] = item.long_name;
							}
							else if(Helper.isExistedDataInArray(item.types, 'administrative_area_level_2')) {
								obj['district'] = item.long_name;
							}
							else if(Helper.isExistedDataInArray(item.types, 'administrative_area_level_1')) {
								obj['city'] = item.long_name;
							}
							else if(Helper.isExistedDataInArray(item.types, 'country')) {
								obj['country'] = item.long_name;
							}
						}
						dispatch({
							type: types.FILL_DETAIL_ADDRESS, 
							payload: obj
						})
					}
				}
			}
		}, (err) => {
			console.log('err ',err)
		})
	}
}

const updateLat = (data) => (dispatch) => {
	dispatch({
		type: types.UPDATE_LAT, 
		payload: {
			latitude: {
				lat: data.lat, 
				lng: data.lng, 
			},
			defaultObj : {
				center: {
					lat: data.lat, 
					lng: data.lng,
				}, 
		    	zoom: 11
			}, 
		}
	})
	dispatch(onSearchLocation('latlng', data))
}

const changeStatusModal = (isOpenModal = false) => (dispatch) => {
	dispatch({
		type: types.ON_CHANGE_STATUS_MODAL, 
		payload: {isOpenModal: isOpenModal}
	})
	if(isOpenModal == false) {
		dispatch(resetDetailData())
	}
}

const fillDetailAddress = (key, value) => (dispatch) => {
	return new Promise((resolve, reject) => {
		let obj = {}
		obj[key] = value;
		dispatch({
			type: types.FILL_DETAIL_ADDRESS, 
			payload: obj
		})
		resolve()
	})
}

const submitData = () => (dispatch, getState) => {
	let { 
		data: {
			detail,
		}, 
		map: {
			latitude, 
		} 
	} = getState()
	var func = (detail) => {
		return new Promise((resolve, reject) => {
			if(!detail.id) {
				detail.latitude = latitude
				let obj = {}
				obj[uuidv1()] = detail
				firebase.database().ref().child('address').push().update(detail)
			}
			else {
				detail.latitude = latitude
				let obj = {}
				obj = detail
				firebase.database().ref().child(`address/${detail.id}`).update(obj);
			}
			resolve()
		})
	}
	func(detail)
	.then(() => {
		dispatch({
			type: types.SUBMIT_DATA, 
			payload: {detail: {}, isOpenModal: false}
		})
		dispatch(resetLatitude())
		dispatch(getListAddress())
	})
}

const getListAddress = (isFirst = false) => (dispatch) => {
	var ref = firebase.database().ref('address').once('value')
	ref.then((snapshot) => {
		var arr  = []
		var data = snapshot.val()
		for(let key in data) {
			var obj = data[key]
			obj.id = key
			arr.push(obj)
		}
		dispatch({
			type: types.GET_LIST_ADDRESS, 
			payload: {list: arr}
		})
	})
}

const loadDetailItem = (obj) => (dispatch) => {
	return new Promise((resolve, reject) => {
		dispatch({
			type: types.LOAD_DETAIL_ITEM, 
			payload: { detail: obj }
		})
		dispatch({
			type: types.LOAD_LATITUDE, 
			payload: {
				latitude: {
					lat: obj.latitude.lat, 
					lng: obj.latitude.lng, 
				},
				defaultObj : {
					center: {
						lat: obj.latitude.lat, 
						lng: obj.latitude.lng, 
					}, 
			    	zoom: 11
				}, 
			}
		})
		resolve();
	})
}

const resetDetailData = () => (dispatch) => {
	dispatch({
		type: types.RESET_DETAIL_DATA, 
		payload: {
			detail: {
				street: '', 
				ward: '', 
				district: '', 
				city: '', 
				country: '', 
			}
		}
	})
}

const resetLatitude = () => (dispatch) => {
	dispatch({
		type: types.RESET_LATITUDE, 
		payload: {
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
	})
}

const exportCSVFile = () => (dispatch, getState) => {
	let { list } = getState().data
	let filename = `csv_file_${moment().format('DD/MM/YYYY')}`
	var parseArray = (list) => {
		var array = [];
		for(let i = 0; i < list.length; i++) {
			var arr = []
			arr.push(list[i]['street'])
			arr.push(list[i]['ward'])
			arr.push(list[i]['district'])
			arr.push(list[i]['city'])
			arr.push(list[i]['country'])
			arr.push(list[i]['latitude']['lat'])
			arr.push(list[i]['latitude']['lng'])
			
			array.push(arr)
		}
		return array;
	}
    var processRow = (list) => {
        var finalVal = '';
        for (let i = 0; i < list.length; i++) {
            var innerValue = list[i] === null ? '' : list[i].toString();
            if (list[i] instanceof Date) {
                innerValue = list[i].toLocaleString();
            };
            var result = innerValue.replace(/"/g, '""');
            if (result.search(/("|,|\n)/g) >= 0)
                result = '"' + result + '"';
            if (i > 0)
                finalVal += ',';
            finalVal += result;
        }
        return finalVal + '\n';
    };
    var csvFile = '';
    var parseList = parseArray(JSON.parse(JSON.stringify(list)))
    for (var i = 0; i < parseList.length; i++) {
        csvFile += processRow(parseList[i]);
    }

    var blob = new Blob([csvFile], { type: 'text/csv;charset=utf-8;' });
    if (navigator.msSaveBlob) {
        navigator.msSaveBlob(blob, filename);
    } 
    else {
        var link = document.createElement("a");
        if (link.download !== undefined) {
            var url = URL.createObjectURL(blob);
            link.setAttribute("href", url);
            link.setAttribute("download", filename);
            link.style.visibility = 'hidden';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        }
    }
    dispatch({
    	type: types.EXPORT_CSV_FILE, 
    	payload: {}
    })
}

const validateData = () => (dispatch, getState) => {
	return new Promise((resolve, reject) => {
		let { detail } = getState().data;
		if(!detail.street) {
			dispatch({
				type: types.VALIDATE_DATA, 
				payload: { validateObj: { street: true } }
			})
			reject()
		}
		else {
			resolve()
		}
	})
}

module.exports = {
	onSearchLocation: onSearchLocation, 
	updateLat: updateLat, 
	changeStatusModal: changeStatusModal, 
	fillDetailAddress: fillDetailAddress,
	submitData: submitData, 
	getListAddress: getListAddress, 
	loadDetailItem: loadDetailItem, 
	resetDetailData: resetDetailData, 
	resetLatitude: resetLatitude, 
	exportCSVFile: exportCSVFile, 
	validateData: validateData, 

}