// import React, { Component, PropTypes } from 'react';
// import { connect } from 'react-redux';
// import TopBarComponent from '../components/partials/topbar';
// import LeftSideMenuComponent from '../components/partials/left-side-menu';
// import { bindActionCreators } from 'redux';
// import AuthAction from '../actions/auth'
// import EventDetailAction from '../actions/event_detail'
// import _ from 'lodash'

// export default function (ComposedComponent) {
//     class Authentication extends Component {
//         constructor(props, context) {
//             super(props);
//             context.router
//         }

//         componentWillMount() {
//             if(localStorage.isAuth != 'true') {
//                 this.context.router.push('/login');


//             }
//             else {
//                 if(_.isEmpty(this.props.auth.userInfo)) {
//                     this.props.reLoginAction(this.context.router)
//                 }
//             }
//             this.props.getListPropertyAction();
//             this.props.getAllAdplanTypeAction();
//             this.props.getAllSponsorAction();
//             this.props.getAllCurrencyAction();
//             this.props.getAllSizeCampaign();
//             this.props.getAllLabelCampaign();
//             this.props.getAllTypeCampaign();
//             this.props.getListEventStatus();
//         }

//         componentDidUpdate() {
//             if(localStorage.isAuth != 'true') {
//                 this.context.router.push('/login');
//             }
//         }

//         componentDidMount() {

//         }

//         render() {
//             return (
//                 <div id="wrapper" className="enlarged forced">
//                     <TopBarComponent />
//                     <LeftSideMenuComponent />
//                     <div className="content-page" style={{minHeight:'1000px'}}>
//                         <div className="content">
//                             <div className="container" style={{color:'black'}}>
//                                 <ComposedComponent {...this.props} />
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             );
//         }
//     }

//     Authentication.contextTypes = {
//         router: PropTypes.object,
//         authenticated: PropTypes.bool
//     };

//     function mapStateToProps(state) {
//         return {
//             auth: state.auth
//         }
//     }

//     function mapDispatchToProps(dispatch) {
//     return bindActionCreators({
//         ...AuthAction,
//         ...EventDetailAction,
//     }, dispatch)
// }

//   return connect(mapStateToProps, mapDispatchToProps)(Authentication);
// }

