import React from 'react';
import {Redirect} from "react-router-dom";
import {connect} from "react-redux";

const mapStateToPropsForRedirect = (state) => ({
    isAuth: state.auth.isAuth
});

const WithAuthRedirect = (Component) => {

    class RedirectComponent extends React.Component{
        render() {
            console.log('hoc props', this.props);

            if (!this.props.isAuth) return <Redirect to={'/login'}/>;

            return<Component {...this.props}/>;
        }

    }

    return  connect(mapStateToPropsForRedirect)(RedirectComponent)
};

export default WithAuthRedirect;