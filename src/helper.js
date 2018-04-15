//services loading UI
import  accounting  from 'accounting-js';

export const blockUI = (isBlock) => {
	if(isBlock == true) {
        let loading_gif =
        '<div class="loading">'+
        '<span class="l-1"></span>'+
        '<span class="l-2"></span>'+
        '<span class="l-3"></span>'+
        '</div>';
		$.blockUI({
            baseZ: 2000,
            // message: '<img src="/assets/images/loading.gif" />',
            message: loading_gif,
		    css: {
		        border: 'none',
		        backgroundColor: 'transparent'
		    },
            overlayCSS: { backgroundColor: 'none' }
        });
	}
	else if(isBlock == false) {
		$.unblockUI();
	}
};

export const showNotify = (title, text, type, position) => {
    $.notify({
        title: title,
        text: text,
        // image: "<i class='"+icon+"'></i>"
    }, {
        style: 'metro',
        className: type,
        globalPosition:position,
        showAnimation: "show",
        showDuration: 0,
        hideDuration: 0,
        autoHideDelay: 5000,
        autoHide: true,
        clickToHide: true
    });
};

export const sort_by = (field, reverse, primer) => {

   var key = primer ?
       (x) => {return primer(x[field])} :
       (x) => {return x[field]};

   reverse = !reverse ? 1 : -1;

   return (a, b) => {
       return a = key(a), b = key(b), reverse * ((a > b) - (b > a));
    }
}

export const regexPassword = /^(?=.*?[A-Za-z])(?=.*?[#?!@$%^&*-\d]).{4,15}$/;
export const regexFile = /^(data:image|data:application)\/(png|jpg|pdf|vnd.ms-excel|zip);base64,/;
export const regexTracking = /^[a-zA-Z0-9!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]*$/

export const timeGetNotification = 3 * 60 * 1000;

export const getUrlParameter = (key) => {
    let pageUrl = decodeURIComponent(window.location.search.substring(1)),
        paramsUrl = pageUrl.split('&'),
        paramsName,
        i;
    console.log('paramsUrl ',paramsUrl)
    for (i = 0; i < paramsUrl.length; i++) {
        paramsName = paramsUrl[i].split('=');

        if (paramsName[0] === key) {
            return paramsName[1] === undefined ? true : paramsName[1];
        }
    }
};

export const watchObj = (obj, prop, handler) => {
    var currval = obj[prop];
    const callback = () => {
        if (obj[prop] != currval) {
            var temp = currval;
            currval = obj[prop];
            handler(temp, currval);
        }
    }
    return callback;
}

export const compareDate = (date1, date2, condition) => {
    let run_date1 = new Date(date1)
    let run_date2 = new Date(date2)
    if(condition == true) {
        if(run_date1 > run_date2) {
            // date1 = moment(date2).format('MM/DD/YYYY');
            return moment(date2).format('MM/DD/YYYY');
        }
        else
            return date1;
    }
    else if(condition == false) {
        if(run_date1 < run_date2) {
            // date1 = moment(date2).format('MM/DD/YYYY');
            return moment(date2).format('MM/DD/YYYY');
        }
        else
            return date1;
    }
    else {
        return null;
    }
}

export const searchByAction = (input_id, datalist_id, value, apiUrl) => {
	if (typeof(dataList) != 'undefined' && dataList != null) {
			if (typeof(input) != 'undefined' && input != null) {
					let childArray = dataList.children;
					let request = new XMLHttpRequest();
					request.onreadystatechange = (response) => {
							if (request.readyState === 4) {
									if (request.status === 200) {
											let jsonOptions = JSON.parse(request.responseText);
											console.log(jsonOptions)
											$('#'+datalist_id).empty();
											a(jsonOptions)
											input.placeholder = "e.g. datalist";
									} else {
											a();
											input.placeholder = "Couldn't load datalist options :(";
									}
							}
					};

					input.placeholder = "Loading options...";

					request.open('GET', config.apiUrl + apiUrl + value, true);
					request.setRequestHeader('Authorization', localStorage.accessToken)
					request.send();
			}
	}
}

export const searchAutoComplete = (input_id, datalist_id, value, apiUrl) => {
    let dataList = document.getElementById(datalist_id);
    let input = document.getElementById(input_id);
    let p = new Promise((a, b) => {
        if (typeof(dataList) != 'undefined' && dataList != null) {
            if (typeof(input) != 'undefined' && input != null) {
                let childArray = dataList.children;
                let request = new XMLHttpRequest();
                request.onreadystatechange = (response) => {
                    if (request.readyState === 4) {
                        if (request.status === 200) {
                            let jsonOptions = JSON.parse(request.responseText);
														console.log(jsonOptions)
                            $('#'+datalist_id).empty();
                            a(jsonOptions)
                            input.placeholder = "e.g. datalist";
                        } else {
                            a();
                            input.placeholder = "Couldn't load datalist options :(";
                        }
                    }
                };

                input.placeholder = "Loading options...";

                request.open('GET', config.apiUrl + apiUrl + value, true);
                request.setRequestHeader('Authorization', localStorage.accessToken)
                request.send();
            }
        }
        else {
            a([]);
        }
    });
    return p;

}

export const searchAction = (userId, setState) => {
	//reset list
	let dataList = document.getElementById('associated-events-ul');
	$(dataList).find('li').remove();
	//get input
	let input = document.getElementsByClassName('associated-events-input')[0];
	const value = input.value;

	input.value = "";
	input.placeholder = "Loading...";
	//get api
	apiService.loadList(userId, 5, 0, value).then((result)=> {
		if (result.status === 200) {
			const data = result.data.Data;
			if (data && data.length > 0) {
				input.placeholder = 'Choose from list events below';
				setState(data);
				_.each(data, (item, index)=> {
					const li = document.createElement('li');
					li.innerHTML = item.event_name;
					li.tabIndex = index;
					li.value = item.event_id;
					li.onclick = function(e) {
						input.value = e.target.innerHTML;
						input.id = e.target.value;
						$(dataList).hide();
					}
					dataList.appendChild(li);
				});
				$(dataList).show();
			} else {
				input.placeholder = 'No event have that name'
			}
		} else  {
			input.placeholder = 'No event have that name'
		}
	}, (err)=>{
		console.log(err)
		input.placeholder = 'No event have that name'
	})
}
export const formatMoney = (value) => {
     let string = '$0.00';
    let realValue = Math.abs(value);
    if(isNaN(realValue)) {
        string = accounting.formatMoney(value);
    }
    else {
        string = '$ ' + realValue + '.00'
    }
    return string;
}
export const formatTime = (value) => {
		const offset =  -(new Date().getTimezoneOffset() / 60);
		// return moment(value).add(7, 'hours').fromNow();
		return moment(value).fromNow();
}
export const base64ToArrayBuffer = (base64) => {

    let binaryString = window.atob(base64.replace(regexFile,''));
    let binaryLen = binaryString.length;
    let bytes = new Uint8Array(binaryLen);
    for (let i = 0; i < binaryLen; i++) {
        let ascii = binaryString.charCodeAt(i);
        bytes[i] = ascii;
    }
    return bytes;
}
export const saveByteArray = (fileName, byte) => {
    var blob = new Blob([byte]);
    var link = document.createElement('a');
    link.href = window.URL.createObjectURL(blob);
    var timeNow = new Date();
    var month = timeNow.getMonth() + 1;
    link.download = fileName;
    link.click();
};

export const generateString = (length) => {
    var charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
        retVal = "";
    var string_length = 6
    if(length != '' && length != null && length != undefined) {
        string_length = length
    }
    for (var i = 0, n = charset.length; i < string_length; ++i) {
        retVal += charset.charAt(Math.floor(Math.random() * n));
    }
    return retVal;
}

export const newTabByUrl = (url) => {
    if(url!= null && url != '') {
        window.open(url, '_blank');
        //url truyen vao phai co dang http://xxxx hay https://xxxx
    }
}

export const checkData = (data) => {
    if(data != undefined && data != null && data != '') {
        return true;
    }
    else {
        return false;
    }
}

export const checkObj = (obj) => {
    if(checkData(obj) && !_.isEmpty(obj)) {
        return true;
    }
    else {
        return false;
    }
}

export const checkTrueData = (data, key) => {
    let type = typeof key;
    let value_number,value_string;
    let isCheck = false
    if(type == 'number') {
        value_number = key;
        value_string = key.toString();
        isCheck = true;
    }
    else if(type == 'string') {
        value_number = parseInt(key);
        value_string = key;
        isCheck = true;
    }

    if(isCheck == true) {
        if(data == value_number || data == value_string) {
            return true;
        }
        else {
            return false;
        }
    }
    else {
        return false;
    }
}

export const access_token = 'KD83JFML2JCJWKWU3MFOI';

export const isNotExisted = (data, arrayKey) => {
    let isNotExisted = true;
    for(let i = 0; i < arrayKey.length; i++) {
        if(arrayKey[i].type == 'indexOf') {
            if(data.indexOf(arrayKey[i].value) != -1) {
                isNotExisted = false;
            }
        }
        else {
            if(data == arrayKey[i].value) {
                isNotExisted = false;
            }
        }
    }
    return isNotExisted;
}

export const isExistedInArray = (array, obj, keyFound) => {
    let isExisted = false;
    for(let i = 0; i < array.length; i++) {
        if (checkData(array[i][keyFound])) {
            if(array[i][keyFound] == obj[keyFound]) {
                isExisted = true;
                break;
            }
        }
    }
    return isExisted;
}

export const isExistedDataInArray = (array, data) => {
    let isExisted = false;
    for(let i = 0; i < array.length; i++) {
        if(array[i] == data) {
            isExisted = true;
        }
    }
    return isExisted;
}

export const countItemObjHasValue = (obj) => {
    let count = 0;
    for(let key in obj) {
        if(Helper.checkData(obj[key])) {
            count++;
        }
    }
    return count;
}

export const inputElementString = 'input:text, input:password, input:file, select, textarea';