import React, { Component } from 'react'
import { Route, Switch } from 'react-router-dom'
import Homepage from '../components/Homepage'
import Login from '../components/Login'
import MyOrder from '../components/MyOrder'
import UploadMaterial from '../components/UploadMaterial'
import Landingpage from '../landing/Landingpage'

export class RouterComponent extends Component {
    render() {
        return (
            <div>
                <Switch>
                    <Route exact path="/" component={Landingpage}/>
                    <Route exact path="/login" component={Login}/>
                    <Route exact path="/home" component={Homepage}/>
                    <Route exact path="/upload/material" component={UploadMaterial}/>
                    <Route exact path="/mycart/:name/:description/:price/:imgUrl" component={MyOrder}/>
                </Switch>
            </div>
        )
    }
}

export default RouterComponent
