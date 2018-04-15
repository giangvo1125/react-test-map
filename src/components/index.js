import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MapComponent from './map'
import ToolsComponent from './tools'
import ListComponent from './list'
import ModalComponent from './modal'

class ContentComponent extends Component {
	constructor(props, context) {
		super(props);
        context.router
	}
	componentWillMount() {
	}
	componentDidUpdate() {
	}
	componentDidMount() {
		
	}
	render() {
		return (
			<div className="container">
		    	<ToolsComponent/>
		    	<ListComponent/>
		    	<ModalComponent/>
		    </div>
		)
	}
}

ContentComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentComponent)