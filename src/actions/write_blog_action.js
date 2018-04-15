var Dropbox = require('dropbox').Dropbox;
const uuidv1 = require('uuid/v1');
// https://blogs-ibcurt.herokuapp.com
var dbx = new Dropbox({ accessToken: '5PWsLfRTL8AAAAAAAAAAYT8Jo3peXlCJvylaiGgxvEs2cxsaLNcLZC5w9GuNVphK' });
const onBeginWriteBlog = (id, isShowWriteBlog = true) => (dispatch) => {
	dispatch({
		type: types.ON_BEGIN_WRITE_BLOG, 
		payload: {
			isShowWriteBlog: isShowWriteBlog, 
			writeBlogType: id, 
		}
	})
}

const updateValueContent = (value) => (dispatch) => {
	dispatch({
		type: types.UPDATE_VALUE_CONTENT, 
		payload: {
			valueContent: value, 
		}
	})
}

const updateLink = (value) => (dispatch) => {
	dispatch({
		type: types.UPDATE_VALUE_LINK, 
		payload: {
			link: value, 
		}
	})
} 

const onSubmitContent = (files) => (dispatch, getState) => {
	let { writeBlogType, valueContent, link } = getState().write_blog;
 	var obj = {blog: {content: '', link: ''}}
 	function getShareLink(file) {
 		var p = new Promise((a, b) => {
 			let filename = ''
 			let d = file.type.substr(file.type.indexOf('/') + 1, file.type.length)
 			filename = `${uuidv1()}.${d}`
 			dbx.filesUpload({path: '/'+filename, contents: file})
	 		.then((response) => {
	 			dbx.sharingCreateSharedLink({path:response.path_display})
	 			.then((link) => {
	 				var l = link.url.replace('www.dropbox.com', 'dl.dropboxusercontent.com')
	 				a(l);
	 			})
	 			.catch((err) => {
	 				b(err);
	 			})
	 		})
	 		.catch((err) => {
	 			b(err)
	 		})
 		});
 		return p;
 	}
 	var promise = []
	if(files && files.length > 0) {
		for(var i = 0; i < files.length; i++) {
			promise.push(getShareLink(files[i]))
		}
	}
	Promise.all(promise)
	.then((uploaded) => {
		var filesUpload = []
		if(uploaded.length > 0) {
			for(var i = 0; i < uploaded.length; i++) {
				filesUpload.push({path: uploaded[i]})
			}
		}
		obj.files = filesUpload;
		obj.blog.content = valueContent;
		obj.blog.type = writeBlogType;
		obj.blog.link = link;
		axios.post('https://blogs-ibcurt.herokuapp.com/create-blog', obj)
		.then((response) => {
			if(response.data.status == 0) {
				alert('Create Successfully');
				dispatch({
					type: types.CREATE_BLOG, 
					payload: {
						writeBlogType: '', 
					valueContent: '', 
					link: '', 
					isShowWriteBlog: false,
					}
				})
			}
		}, (err) => {
			console.log('err ',err)
		})
	},(err) => {
		console.log('err ',err)
	})
}

const getBlogs = () => (dispatch, getState) => {
	let {limit, offset} = getState().write_blog
	// axios.post('http://localhost:2019/get-blog', {limit: limit, offset: offset})
	axios.post('https://blogs-ibcurt.herokuapp.com/get-blog')
	.then((response) => {
		let {data, count} = response.data
		dispatch({
			type: types.GET_BLOG, 
			payload: {blogs: data, count: count}
		})
	}, (err) => {
		console.log('err ',err)
	})
}

const changePage = (type = 'next') => (dispatch, getState) => {
	let {limit, offset, count} = getState().write_blog
	let newOffset = JSON.parse(JSON.stringify(offset))
	if(type == 'next') {
		newOffset = newOffset + limit;
		if(newOffset > count) {
			newOffset = count;
		}
	}
	else {
		newOffset = newOffset - limit;
		if(newOffset < 0) {
			newOffset = 0
		}
	}
	dispatch({
		type: types.CHANGE_PAGE, 
		payload: {offset: newOffset}
	})
	dispatch(getBlogs());
}

module.exports = {
	onBeginWriteBlog,  
	updateValueContent, 
	onSubmitContent, 
	getBlogs, 
	updateLink, 
	changePage, 
}