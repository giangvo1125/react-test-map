const Poloniex = require('poloniex-api-node')
const config = require('./config')
const _private = new Poloniex(config.myKey, config.mySecret);
const _public = new Poloniex();

var func = {
	buy: (currencyPair, price, amount, option) => {
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
	sell: (currencyPair, price, amount, option) => {
		var p = new Promise((a, b) => {
			_private.sell(
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
	getListOrderBuySell: (currencyPair, size) => {
		var p = new Promise((a, b) => {
			_public.returnOrderBook(
				currencyPair, 
				size,
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
	get24Volume: () => {
		var p = new Promise((a, b) => {
			_public.return24Volume((err, data) => {
				if(err) {
					b(err)
				}
				else {
					a(data)
				}
			})
		});
		return p;
	}, 
	returnTicker: () => {
		var p = new Promise((a, b) => {
			_public.returnTicker((err, data) => {
				if(err) {
					b(err)
				}
				else {
					a(data)
				}
			})
		});
		return p;
	}, 
	cancelOrder: (orderNumber) => {
		var p = new Promise((a, b) => {
			_private.cancelOrder(orderNumber, (err, data) => {
				if(err) {
					b(err)
				}
				else {
					a(data)
				}
			})
		});
		return p;
	}, 
	getMyTradeHistory: (currencyPair, start, end, size) => {
		var p = new Promise((a, b) => {
			_private.returnMyTradeHistory(
				currencyPair, 
				start, 
				end, 
				size, 
				(err, data) => {
				if(err) {
					b(err)
				}
				else {
					a(data)
				}
			})
		});
		return p;
	}, 
	getChartData: (currencyPair, second, start, end) => {
		var p = new Promise((a, b) => {
			_public.returnChartData(
				currencyPair, 
				second, 
				start, 
				end, 
				(err, data) => {
				if(err) {
					b(err)
				}
				else {
					a(data)
				}
			})
		});
		return p;
	}, 
	getMyBalancesCoin: () => {
		var p = new Promise((a, b) => {
			_private.returnBalances((err, data) => {
				if(err) {
					b(err)
				}
				else {
					a(data)
				}
			})
		});
		return p;
	}, 
	getOpenOrders: (currencyPair) => {
		var p = new Promise((a, b) => {
			_private.returnOpenOrders(currencyPair, (err, data) => {
				if(err) {
					b(err)
				}
				else {
					a(data)
				}
			})
		});
		return p;
	}, 
}

module.exports = func
