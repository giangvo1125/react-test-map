import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Actions from '../actions/actions'

class ToolsComponent extends Component {
	constructor(props, context) {
		super(props);
        context.router
	}
	_onOpenModal() {
		this.props.changeStatusModal(true)
	}
	_onExportCSV() {
		this.props.exportCSVFile();
	}
	render() {
		return (
			<div className="flex">
				<a className="btn btn-primary" onClick={this._onOpenModal.bind(this)}>Add</a>
				<a className="btn btn-primary margin-left-10" onClick={this._onExportCSV.bind(this)}>Export CSV</a>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...Actions,
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolsComponent)