import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import MapComponent from './map'

import Actions from '../actions/actions'

class ModalComponent extends Component {
	constructor(props, context) {
		super(props);
        context.router
	}
	_onCloseModal() {
		this.props.changeStatusModal(false)
	}
	_onInputData(key, e) {
		let value = e.target.value;
		this.props.fillDetailAddress(key, value)
		.then(() => {
			let { detail } = this.props;
			this.props.onSearchLocation('address', detail)
		})
	}
	_onSubmit() {
		this.props.validateData()
		.then(() => {
			this.props.submitData();
		},() => {
			alert('Please input data.')
		})
	}
	render() {
		let { 
			isOpenModal, 
			validateObj, 
			detail: {
				street, 
				ward, 
				district, 
				city, 
				country, 
			}
		} = this.props;
		return (
			<div className={`modal modal-lg ${isOpenModal == true ? 'active' : ''}`}>
				<div className="modal__container">
					<div className="modal-header">
						<div className="title">Modal</div>
						<div className="close" onClick={this._onCloseModal.bind(this)}>X</div>
					</div>
					<div className="modal-body">
						<div className="modal-content">
							<div className="flex">
								<div className="flex-1">
									<div className={`form-group ${validateObj && validateObj['street'] == true ? 'has-error' : ''}`}>
										<label className="control-label">Street Name</label>
										<input 
											type="text" 
											className="form-control" 
											onChange={this._onInputData.bind(this, 'street')}
											value={street || ''}
										/>
										<p className="help-block">required</p>
									</div>
									<div className={`form-group ${validateObj && validateObj['ward'] == true ? 'has-error' : ''}`}>
										<label className="control-label">Ward</label>
										<input 
											type="text" 
											className="form-control" 
											onChange={this._onInputData.bind(this, 'ward')}
											value={ward || ''}
										/>
										<p className="help-block">required</p>
									</div>
									<div className={`form-group ${validateObj && validateObj['district'] == true ? 'has-error' : ''}`}>
										<label className="control-label">District</label>
										<input 
											type="text" 
											className="form-control" 
											onChange={this._onInputData.bind(this, 'district')}
											value={district || ''}
										/>
										<p className="help-block">required</p>
									</div>
									<div className={`form-group ${validateObj && validateObj['city'] == true ? 'has-error' : ''}`}>
										<label className="control-label">City</label>
										<input 
											type="text" 
											className="form-control" 
											onChange={this._onInputData.bind(this, 'city')}
											value={city || ''}
										/>
										<p className="help-block">required</p>
									</div>
									<div className={`form-group ${validateObj && validateObj['country'] == true ? 'has-error' : ''}`}>
										<label className="control-label">Country</label>
										<input 
											type="text" 
											className="form-control" 
											onChange={this._onInputData.bind(this, 'country')}
											value={country || ''}
										/>
										<p className="help-block">required</p>
									</div>
								</div>
								<div className="flex-1 margin-left-40">
									{
										isOpenModal == true ? 
										<MapComponent _onClickMap={this.props.updateLat.bind(this)} /> : ''
									}
								</div>
							</div>
						</div>
					</div>
					<div className="modal-footer">
						<a className="btn" onClick={this._onCloseModal.bind(this)}>Cancel</a>
						<a className="btn btn-primary margin-left-10" onClick={this._onSubmit.bind(this)}>Submit</a>
					</div>
				</div>
			</div>
		)
	}
}

const mapStateToProps = (state) => {
	return {
		isOpenModal: state.data.isOpenModal, 
		validateObj: state.data.validateObj, 
		detail: state.data.detail, 
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
		...Actions, 
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ModalComponent)