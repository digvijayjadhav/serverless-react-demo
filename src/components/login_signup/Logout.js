import React from 'react'
import { Redirect } from 'react-router-dom'
import { db } from '../../firebase/firebase'

export class Logout extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
             
        }
    }
    componentWillUnmount(){
       db.terminate().then(()=>{
           db.clearPersistence()
       })
    }
    clearStorage(){
        localStorage.removeItem('userId')
        localStorage.removeItem('userType')
        localStorage.removeItem('loggedIn')
    }
    async componentDidMount(){
        await this.clearStorage()
    }
    render() {
        return (
            <div>
               <Redirect to="/"/> 
            </div>
        )
    }
}

export default Logout
