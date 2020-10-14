import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'

export class Landingpage extends Component {
    constructor() {
        super()
        this.state = {

        }
    }
    componentDidMount() {
        
    }
    render() {
        if (localStorage.getItem('loggedIn')==="success" && localStorage.getItem('userType')==="user") {
            return (
                <div>
                    <Redirect to="/home"/>
                </div>
            )
        } else if (localStorage.getItem('loggedIn')==="success" && localStorage.getItem('userType')=== "admin") {
            return (
                <div>
                    <Redirect to="/admin"/>
                </div>
            )
        }else{
            return(
                <div>
                    <Redirect to="/login"/>
                </div>
            )
        }
    }
}

export default Landingpage
