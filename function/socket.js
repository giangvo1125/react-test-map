const config = require('./config')

var func = {
	onConnect: () => {
		var p = new Promise((a, b) => {
			_private.buy(
				currencyPair, 
				price, 
				amount, 
				option.option1 ? option.option1 : null, 
				option.option2 ? option.option2 : null, 
				option.option3 ? option.option3 : null, 
				(err, data) => {
				    if(err) {
				    	b(err);
				    }
				    else {
				    	a(data);
				    }
				})
		});
		return p;
	}, 
	
}

module.exports = func
