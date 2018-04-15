import React, { Component } from 'react'
import { connect } from 'react-redux'

class ContentComponent extends Component {
	constructor(props, context) {
		super(props);
        context.router
	}
	componentDidMount() {
	}
	render() {
		return (
			<div>
				{this.props.children}
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

export default connect(null, null)(ContentComponent)