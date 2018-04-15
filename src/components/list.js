import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import Actions from '../actions/actions'

class ListComponent extends Component {
	constructor(props, context) {
		super(props);
        context.router
	}
	componentWillMount() {
		this.props.getListAddress()
	}
	_onEditData(item) {
		this.props.loadDetailItem(item);
		this.props.changeStatusModal(true);
	}
	render() {
		let { list } = this.props;
		let list_element = list.map((item) => {
			return (
				<tr key={item.id}>
					<td>{item.street}</td>
					<td>{item.ward}</td>
					<td>{item.district}</td>
					<td>{item.city}</td>
					<td>{item.country}</td>
					<td width="1"><a className="btn btn-sm btn-warning" onClick={this._onEditData.bind(this, item)}>Edit</a></td>
				</tr>
			)
		})
		return (
			<div className="table-container">
				<table className="table">
					<thead>
						<tr>
							<th>Street Name</th>
							<th>Ward</th>
							<th>District</th>
							<th>City</th>
							<th>Country</th>
							<th width="1">Action</th>
						</tr>
					</thead>
					<tbody>
						{list_element}
					</tbody>
				</table>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		list: state.data.list, 
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...Actions, 
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ListComponent)