import React, { Component } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

import GoogleMapReact from 'google-map-react';

const MarkerComponent = () => <img width="15" height="20" src='/assets/images/marker.png' />;

class MapComponent extends Component {
	constructor(props, context) {
		super(props);
        context.router
	}
	_onClickMap(obj) {
		if(this.props && typeof this.props._onClickMap === 'function') {
			this.props._onClickMap(obj)
		}
	}
	render() {
		let {
			defaultObj: {
				center, 
				zoom, 
			}, 
			latitude: {
				lat, 
				lng, 
			}, 
		} = this.props
		return (
			<div style={{ height: '100%', width: '100%' }}>
		        <GoogleMapReact
		          bootstrapURLKeys={{ key: config.googleMapKey }}
		          center={center}
		          zoom={zoom}
		          hoverDistance={1}
		          onClick={this._onClickMap.bind(this)}
		        >
		          <MarkerComponent
		            lat={lat}
		            lng={lng}
		          />
		        </GoogleMapReact>
		      </div>
		)
	}
}

MapComponent.contextTypes = {
    router: React.PropTypes.object.isRequired
};

const mapStateToProps = ({map}) => {
	return {
		defaultObj: map.defaultObj, 
		latitude: map.latitude, 
	}
}

const mapDispatchToProps = (dispatch) => {
	return bindActionCreators({
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(MapComponent)