import React, { Component } from 'react'
import { Button, Card, Form, Nav, Navbar } from 'react-bootstrap'
import { CgBell } from 'react-icons/cg'
import { FaUserCircle, FaBell } from 'react-icons/fa'
import { db, rdb } from '../../firebase/firebase'
import './Comment.css'
export class Comment extends Component {

    constructor(props) {
        super(props)
        this.state = {
            comment: '',
            comments_fetched: [],
            notify: false,
            notifications: [],
            notificationCount:0,
        }
    }
    async fetchComment(e) {
        try {
            await db.collection('comment').onSnapshot((res) => {
                console.log('response ', res);
                var a = [], b = [], c = [], d = []
                res.forEach(element => {
                    a.push(element.data()['userId'])
                    b.push(element.data()['actual_comment'])
                    c.push(element.data()['timestamp'])
                    d = a.map(function (event, i) {
                        return [event, b[i], c[i]];
                    })
                    this.setState({
                        comments_fetched: d
                    })
                    /* this.setState(prevState => ({
                        comments_fetched: [...prevState.comments_fetched, element.data()]
                    })) */
                })
                console.log('-----', this.state.comments_fetched);
            })
        }
        catch (err) {
            console.log('Comment fail err', err);
        }
    }
    async fetchNotificationCount() {
        const rootRef = rdb.ref();
        const noteRef = rootRef.child('Notification');
        try {
            var a=[],b=[],c=[] ,d=[],f=[]
            
            await noteRef.on('value', res => {
                console.log('----',res.numChildren());
                
                
                res.forEach((e) => {
                    console.log('----',e.numChildren());
                    a.push(e.val()['message'])
                    b.push(e.val()['timestamp'])
                    c.push(e.val()['read'])
                    f.push(e.key)
                    d = a.map(function (event, i) {
                        return [event, b[i], c[i],f[i]];
                    })
                    this.setState({notifications:d})  //handle this
                    console.log(this.state.notifications);
                    this.state.notifications.forEach((e,i)=>{
                        // console.log(e[2]);
                        if(e[2]===0){
                            this.setState({notificationCount:parseInt(this.state.notificationCount)+1})
                        }
                    })
                });
               
            })

        } catch (err) {
            console.log('notification error', err);
        }

    }
     async componentDidMount() {
        
        await this.fetchNotificationCount()
        await this.fetchComment()
        console.log('after fetching');
        console.log('-----', this.state.comments_fetched);
        console.log('notification: ', this.state.notifications);
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    handleSubmit = (e) => {
        e.preventDefault()
        db.collection('comment').add({
            actual_comment: this.state.comment,
            timestamp: Date.now(),
            userId: 1234567,
        })
            .then(res => {
                console.log('Comment success response', res);
                // this.fetchComment()
                this.setState({
                    comment: ''
                })

            })
            .catch(err => {
                console.log('Comment fail err', err);
            })
    }
    notify = (e) => {

        this.setState({
            notify: true
        })
    }
    handleNotify=(e,id)=>{
        e.preventDefault()
        const rootRef = rdb.ref();
        const noteRef = rootRef.child(`Notification/${id}`);
        try{
            noteRef.update({read:1})
        }catch(err){
            console.log('notify error',err);
        }
    }
    render() {
        if (this.state.notify) {
            return (
                <div>
                    Notify
                    <Card>
                        {this.state.notifications.map((element,index)=>{
                            return(
                                <div key={index} >
                                    <p>{element[0]}</p>
                                    <p>{element[1]}</p>
                                    <p>{element[2]}</p>
                                    <p>{element[3]}</p>
                                    <Button onClick={(e)=>{
                                        this.handleNotify(e,element[3])
                                    }}>Read</Button>   
                                </div>
                            )
                        })}
                    </Card>
                </div>
            )
        }
        return (
            <div>
                <Navbar bg="dark" expand="lg" >
                    <Navbar.Brand href="/home" style={{ color: '#fff' }}>Amazon Clone</Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link href="/home" style={{ color: '#fff' }}>Home</Nav.Link>
                            {/* <Nav.Link href="/upload/material" style={{ color: '#fff' }}>Upload</Nav.Link> */}
                            <Nav.Link href="/logout" style={{ color: '#fff' }}>Logout</Nav.Link>

                        </Nav>
                        <Form inline>

                            <FaBell style={{ height: '30px', width: '30px', color: '#fff' }} onClick={this.notify} /><span className="badge badge-warning">{this.state.notificationCount}</span>
                            <FaUserCircle style={{ marginLeft: '17px', height: '30px', width: '30px', color: '#fff' }} />
                        </Form>
                    </Navbar.Collapse>
                </Navbar>
                <center><h1>Comment Section</h1></center>
                <Card className="comment-outer-card">
                    {this.state.comments_fetched.map((e, index) => {
                        return (
                            <Card key={index}>
                                {/* <p>{e[index][0]}</p> */}
                                {/* <p>{e[index][1]}</p> */}
                                <p>{e[0]}</p>
                                <p>{e[1]}</p>
                                <p>{e[2]}</p>
                            </Card>
                        )
                    })}

                    <form onSubmit={this.handleSubmit}>

                        <input value={this.state.comment} name="comment" type="text" placeholder="Add Comment" onChange={this.handleChange} />
                        <Button type="submit" >Post</Button>
                    </form>
                </Card>
            </div>
        )
    }
}

export default Comment
