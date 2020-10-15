import React, {Component, Suspense} from 'react';
import {BrowserRouter, Route, withRouter} from "react-router-dom";
import './App.css';
import Navbar from "./components/Navbar/Navbar";
import UsersContainer from "./components/Users/UsersContainer";
import ProfileContainer from "./components/Profile/ProfileContainer";
import HeaderContainer from "./components/Header/HeaderContainer";
import Login from "./components/Login/Login";
import {connect, Provider} from "react-redux";
import {compose} from "redux";
import {initializeApp} from "./redux/appReducer";
import Preloader from "./components/common/Preloader/Preloader";
import SuspenseComponent from "./hoc/SuspenseComponent";
import WithSuspense from "./hoc/WithSuspense";
import Dialogs from "./components/Dialogs/Dialogs";
import store from "./redux/redux-store";

//lazy loading
const DialogsContainer = React.lazy(() => import('./components/Dialogs/DialogsContainer'));
const News = React.lazy(() => import('./components/News/News'));
const Music = React.lazy(() => import('./components/Music/Music'));
const Settings = React.lazy(() => import('./components/Settings/Settings'));

class App extends Component {

    componentDidMount() {
        this.props.initializeApp()
    }

    render() {

        return this.props.initialized
            ? <div className="app-wrapper">
                <HeaderContainer/>
                <Navbar/>
                <div className='app-wrapper-block'>
                    <div className="app-wrapper-content">
                        <Route path='/' render={() => <ProfileContainer/>} exact/>
                        <Route path='/profile/:userId?' render={() => <ProfileContainer/>} exact/>
                        <Route path='/dialogs' render={WithSuspense(DialogsContainer)}/>
                        <Route path='/users' render={() => <UsersContainer/>}/>
                        <Route path='/login' render={() => <Login/>}/>
                        <Route path='/news' render={() => (
                            <Suspense fallback={<Preloader/>}>
                                <News/>
                            </Suspense>
                        )}/>
                        <Route path='/music' render={() => (
                            <Suspense fallback={<Preloader/>}>
                                <Music/>
                            </Suspense>
                        )}/>
                        <Route path='/settings' render={() => (
                            <Suspense fallback={<Preloader/>}>
                                <Settings/>
                            </Suspense>
                        )}/>
                    </div>
                </div>
            </div>
            : <Preloader/>

    }
}

const mapStateToProps = (state) => {
    return {
        initialized: state.app.initialized
    }
};

const AppContainer = compose(
    withRouter,
    connect(mapStateToProps, {initializeApp}))
(App);

const SamuraiNetwork = () => {
    return (
        <BrowserRouter>
            <Provider store={store}>
                <AppContainer/>
            </Provider>
        </BrowserRouter>
    )
}

export default SamuraiNetwork;
