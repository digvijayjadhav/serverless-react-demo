import React from 'react'
import { Button, Card } from 'react-bootstrap'
import { db } from '../../firebase/firebase';
import NavBar from '../navbar/NavBar';


export class MyOrder extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            itemDetails: [],
            items: [],
            prices: [],
            itemIdarray: []
        }
    }

    async componentDidMount() {
        try {
            const ref=db.collection('Users').doc(localStorage.getItem('userId'))
            const doc=await ref.get()
            if (!doc.exists) {
                console.log('No such document!');
              } else {
                console.log('Document data:', doc.data());
            
                doc.data().forEach((element, index) => {
                        db.collection('store').doc(element).get()
                            .then(res => {
                                console.log('debugg order data', res.data());
                                this.setState(prevState => ({
                                    // itemDetails: [...prevState.itemDetails, res.data()],
                                    // prices: [...prevState.prices, res.data()['itemPrice']]
                                }))
                                // console.log('-----',this.state.prices);
                            })
                            .catch(err=>{
                                console.log('my order err',err);
                            })
            
                    
                })
                .catch(err=>{
                    console.log('my order err',err);
                })
            }

            /* var str = JSON.stringify(this.props.match.params.id);
            var str1 = str.slice(1, str.length - 1);
            var arr = str1.split(',')
            console.log(arr);
            arr.forEach(element => {
                this.setState(prev=>({itemIdarray:[...prev.itemIdarray,element]}))
                // console.log('debugg ---> ', element); */




            // });
        } catch (err) {
            console.log('Myorder error : ', err);
        }

    }
    handleSubmit = (e) => {
        var sum = 0

        this.state.prices.forEach((item, index) => {
            sum = sum + parseInt(item)
        })
        console.log(sum);
        db.collection('orders').add({
            items: this.state.itemIdarray,
            cost: sum,
            timestamp: Date.now(),
            userId: localStorage.getItem('userId')
        })
            .then(res => {
                console.log('success ', res);
            })
            .catch(err => {
                console.log('error in order page', err);
            })
    }
    render() {
        return (
            <div>
                <NavBar />
                <Card>
                    {this.state.itemDetails.map((e, index) => {
                        return (
                            <div key={index}>
                                <Card className="home-item-card" key={index}>
                                    <p>{e['itemId']}</p>
                                    <p>{e['itemDescription']}</p>
                                    <p>{e['itemPrice']}</p>
                                    <img src={e['imgUrl']} height="10%" width="25%" alt="Image of product" />

                                </Card>

                            </div>
                        )
                    })}
                    <Button onClick={this.handleSubmit} style={{ width: '20%', marginLeft: '20%', marginBottom: '5%', backgroundColor: '#FFDD3C', color: '#000', margin: 'none' }}>Proceed To Checkout</Button>
                </Card>

            </div>
        )
    }
}

export default MyOrder
