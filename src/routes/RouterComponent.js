import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import AdminHome from '../components/admin/AdminHome'
import Comment from '../components/demo_akhilesh/Comment'
import Homepage from '../components/home/Homepage'
import Login from '../components/login_signup/Login'
import Logout from '../components/login_signup/Logout'
import SignUp from '../components/login_signup/SignUp'
import MyOrder from '../components/orders/MyOrder'
import UploadMaterial from '../components/upload/UploadMaterial'

import Landingpage from '../landing/Landingpage'

export class RouterComponent extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Landingpage}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/signup" component={SignUp}/>
                    <Route exact path="/home" component={Homepage}/>
                    <Route exact path="/admin" component={AdminHome}/>
                    <Route exact path="/upload/material" component={UploadMaterial}/>
                    <Route exact path="/logout" component={Logout}/>
                    <Route exact path="/mycart" component={MyOrder}/>
                    <Route exact path="/comment" component={Comment}/>
                </Switch>
            </div>
        )
    }
}

export default RouterComponent
