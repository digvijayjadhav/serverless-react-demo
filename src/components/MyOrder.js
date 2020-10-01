import React from 'react'
import { Card } from 'react-bootstrap'
import NavBar from './navbar/NavBar'

export class MyOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        return (
            <div>
                <NavBar/>
                <Card>
                    <p>{this.props.name}</p>
                    <p>{this.props.description}</p>
                    <p>{this.props.price}</p>
                    <img src={this.props.imgUrl}/>
                </Card>
            </div>
        )
    }
}

export default MyOrder
