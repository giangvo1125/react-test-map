var config = {
	development: {
		port: 3019,
		domain: 'localhost',
		googleMapKey: 'AIzaSyAB1fnBaVZuM58Kj-dzHsQoVWZFCNxB_2I', 
		googleGeoCoding: 'AIzaSyBfh1UPk2zAah4ksWlP97Mzl2_nG-RY9dY', 
	},
	production: {
		port: 3019, 
		domain: 'localhost',
		googleMapKey: 'AIzaSyAB1fnBaVZuM58Kj-dzHsQoVWZFCNxB_2I', 
		googleGeoCoding: 'AIzaSyBfh1UPk2zAah4ksWlP97Mzl2_nG-RY9dY', 
	},
	
}
const env = process.env.NODE_ENV || 'development'

module.exports = config[env];
