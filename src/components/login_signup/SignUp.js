import React from 'react'
import { Card } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { db } from '../../firebase/firebase'

export class SignUp extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            userName: '',
            password: '',
            emailId: '',
            authId: '',
            login:false,
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    handleSubmit = (e) => {
        e.preventDefault();
        try {
            db.collection('Users').add({
                fullName: this.state.userName,
                emailId: this.state.emailId,
                password: this.state.password,
                auth_id: ''
            })
                .then((res) => {
                    console.log(res);
                    this.setState({
                        login:true
                    })
                })
                .catch((err) => {
                    console.log('error:', err);
                })

        } catch (err) {
            console.log(err);
        }

    }
    render() {
        if(this.state.login===true){
            return(
                <div>
                    <Redirect to="/login"/>
                </div>
            )
        }
        return (
            <div>
                <center><h2 style={{marginTop:"3%"}}>SignUp</h2></center>
                <Card className="upload-outer-card">
                    <form onSubmit={this.handleSubmit}>
                        <label>Full Name</label>
                        <input name="userName" onChange={this.handleChange} className="update-input" />
                        <label >Email Id</label>
                        <input name="emailId" onChange={this.handleChange} className="update-input" />
                        <label>Password</label>
                        <input name="password" onChange={this.handleChange} className="update-input" />
                        <button type="submit" className="update-button">Sign Up</button>
                        <center><Link to="/login"> Have an account already?Login</Link></center>

                    </form>
                </Card>
            </div>
        )
    }
}

export default SignUp
