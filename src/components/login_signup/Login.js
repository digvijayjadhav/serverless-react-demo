import React, { Component } from 'react'
import { Button, Card } from 'react-bootstrap'
import { Link, Redirect } from 'react-router-dom'
import { db,firebase_ } from '../../firebase/firebase'
import './Login.css'
export class Login extends Component {

    constructor(props) {
        super(props)
        this.state = {
            emailId: '',
            password: '',
            users: [],
            login: 0,
            validatePass: false,
            validateEmail: false,
        }
        this.handleSubmit=this.handleSubmit.bind(this)
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,
        })
    }
    
    async handleSubmit (e)  {
        e.preventDefault();
        if (this.state.emailId != '' && this.state.password != '') {
               
            await db.collection("Users").get()
                .then(querySnapshot => {
                    querySnapshot.forEach(doc => {
                        const data = doc.data()
                        this.setState(prevState => ({
                            users: [...prevState.users, data]
                        }))
                    })
                    console.log(this.state.users);
                    this.state.users.forEach(user => {
                        if (user['emailId'] === this.state.emailId) {
                            if (user['password'] === this.state.password) {
                                this.setState({ login: 1 })
                                db.collection('Users').where('emailId', '==', `${this.state.emailId}`).get()
                                    .then(async querySnapshot=>{
                                        const loggedUserId=querySnapshot.docs[0]['Nf']['key']['path']['segments'][6];
                                        console.log(querySnapshot.docs[0]['Nf']['key']['path']['segments']);
                                        localStorage.setItem('userId',loggedUserId);
                                        // localStorage.setItem('userType',)
                                        console.log(loggedUserId);
                                        await db.collection('Users').doc(loggedUserId).get()
                                            .then((res)=>{
                                                console.log('userType:',res.data()['role']);
                                                localStorage.setItem('userType',res.data()['role'])
                                                localStorage.setItem('loggedIn','success')
                                                this.setState({ login: 1 })
                                            })
                                            .catch(err=>{
                                                console.log('role error',err);
                                            })
                                    })
                                    .catch(err=>{
                                        console.log('login error : ',err);
                                    })
                                
                            } else {
                                this.setState({ login: 2 })
                            }
                        } else {
                            this.setState({ login: 3 })
                        }
                    })


                })
                .catch(err => {
                    console.log('error in home page', err);
                })
        } else {
            if (this.state.emailId === '' && this.state.password === '') {
                this.setState({
                    validateEmail: true,
                    validatePass: true
                })

            }
            else if (this.state.emailId === '') {
                this.setState({
                    validateEmail: true,
                    validatePass: false

                })
            } else if (this.state.password === '') {
                this.setState({
                    validatePass: true,
                    validateEmail: false,
                })
            }
            
            
        }
    }
    
    render() {
        if (this.state.login === 1 && localStorage.getItem('userType')==="admin") {
            return (
                <div>
                    <Redirect to="/admin" />
                </div>
            )
        }else if(this.state.login === 1 && localStorage.getItem('userType')==="user"){
            return (
                <div>
                    <Redirect to="/home" />
                </div>
            )
        }
        return (
            <div>
                <center><h2 style={{marginTop:"3%"}}>Login</h2></center>
                <Card className="upload-outer-card">
                
                    <form onSubmit={this.handleSubmit}>
                        <label >Email Id</label>
                        <input name="emailId" onChange={this.handleChange} className="update-input" />
                        {this.state.validateEmail ? <label className="error-label">Please fill the details first</label> : <div></div>}<br />
                        <label>Password</label>
                        <input name="password" type="password" onChange={this.handleChange} className="update-input" />
                        {this.state.validatePass ? <label className="error-label">Please fill the details first</label> : <div></div>}

                        <Button className="update-button" type="submit">Login</Button>
                        {this.state.login === 2 ? <label className="error-label">Incorrect Password</label> : <div>{this.state.login === 3 ? <label className="error-label">User is not registered, SignUp first</label> : <div></div>}</div>}
                        <center><Link to="/signup">Don't have account? Sign In</Link></center>
                    </form>
                </Card>
            </div>
        )
    }
}

export default Login
