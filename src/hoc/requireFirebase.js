import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent) {

	class Firebase extends Component {
		

    	componentWillMount() {
    		let config = {
			    apiKey: "AIzaSyDJ58TfQp6RoZ_y0LXvL2NwZRx61PD2HKo",
			    authDomain: "testproject-fbde9.firebaseapp.com",
			    databaseURL: "https://testproject-fbde9.firebaseio.com",
			    projectId: "testproject-fbde9",
			    storageBucket: "testproject-fbde9.appspot.com",
			    messagingSenderId: "920154857875"
			};
			firebase.initializeApp(config);
	        
	    }

		render() {
			return <ComposedComponent {...this.props} />
		}
	}

	return connect(null)(Firebase);
}