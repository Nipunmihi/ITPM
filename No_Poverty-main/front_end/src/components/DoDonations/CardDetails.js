import { Button, Form, Input, InputNumber, Row, Card, Col } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';

import axios from 'axios';
import React from 'react'
import { useState, Link } from 'react';
const layout = {
    labelCol: {
        span: 8,
    },
    wrapperCol: {
        span: 16,
    },
};

/* eslint-disable no-template-curly-in-string */
const validateMessages = {
    required: '${label} is required!',
    types: {
        email: '${label} is not a valid email!',
        number: '${label} is not a valid number!',
    },
    number: {
        range: '${label} must be between ${min} and ${max}',
    },
};
/* eslint-enable no-template-curly-in-string */

const onFinish = (values) => {
    console.log(values);
};

function clickMe() {
    var text = document.getElementById("popup");
    text.classList.toggle("hide");
    text.classList.toggle("show");

}
function validateCardNumber(inputValue) {
    const regex = /^[0-9]{16}$/; // matches any string of exactly 16 digits
    return regex.test(inputValue);
}
// function formatCardNumber(inputValue) {
//     const regex = /(\d{4})/g; // matches any group of 4 digits
//     return inputValue.replace(regex, '$1 '); // inserts a space after each group
// }
function formatCardNumber(inputValue) {
    const regex = /(\d{1,4})/g; // matches any group of 1 to 4 digits
    return inputValue.replace(regex, (_, group) => {
        if (group.length === 4) {
            return `${group} `;
        }
        return group;
    }); // inserts a space after each group of 4 digits
}
function redirect() {

}




const CardDetails = () => {

    const [name, setName] = useState('');
    const navigate = useNavigate();
    const [cvc, setCvc] = useState('');
    const [amount, setAmount] = useState();


    const [cardFields, setCardFields] = useState(['', '', '', '']);

    const handleChange = (event) => {
        setAmount(event.target.value);
    };

    const handleSubmit = () => {
        // Perform form submission logic here
        // Show alert
        alert('Payment Successful!!');
        // Redirect to another page
        navigate('/showdonation');
    };

    function handleCardFieldChange(index, value) {
        const newCardFields = [...cardFields];
        newCardFields[index] = value;
        setCardFields(newCardFields);
    }
    function getCardNumber() {
        return cardFields.join('').replace(/\s/g, ''); // combines fields and removes spaces
    }

    // function sendDonation(e) {
    //     e.preventDefault();

    //     const donateSchema = {
    //         name,
    //         email,
    //         contact,
    //         amount,
    //         total,
    //         status
    //     }

    //     axios.post("http://localhost:4000/donation/", donateSchema)
    //         .then(value => {
    //             console.log(value);
    //         })
    //         .catch((err) => {
    //             console.log(`Error: ${err?.response?.data}`);
    //         })
    // }
    return (
        <>
         <div className='otherdash' style={{
                    minHeight: '100vh',
                    display: 'flex',
                  
                }}>
                    

            <div style={{paddingLeft:450}}>
            <br></br>
                    <br></br>
                    <br></br>

                <Col span={5} />
                <Card style={{ height: 400, width: 500 }}>
                    {/* <div style={{ backgroundColor: "#37475E", width: "45%", marginLeft: "25%", marginTop: "10%",paddingLeft:"5%" }} > */}
                    <Row>

                        <h1>Provide Card Details </h1>
                        <Form style={{ color: "white" }}>
                            <Form.Item
                                name="name"
                                label="Name on Card"
                                rules={[
                                    {
                                        required: true,
                                    },
                                ]}
                                labelCol={{
                                    span: 6,
                                    style: { color: "white" },
                                }}

                            >
                                <Input onChange={(val) => {
                                    setName(val.target.value);
                                }} style={{ width: "300px", color: "pink" }} />
                            </Form.Item>
                            <Form.Item
                                label="Card Number"
                                rules={[
                                    {
                                        required: true,
                                        validator: (_, __, cb) => {
                                            const cardNumber = getCardNumber();
                                            if (validateCardNumber(cardNumber)) {
                                                cb();
                                            } else {
                                                cb(new Error('Please enter a valid 16-digit card number'));
                                            }
                                        },
                                    },
                                ]}
                            >
                                <Input value={cardFields[0]} maxLength={4} onChange={(e) => handleCardFieldChange(0, e.target.value)} style={{ width: "80px" }} />
                                <span>&nbsp;</span>
                                <Input value={cardFields[1]} maxLength={4} onChange={(e) => handleCardFieldChange(1, e.target.value)} style={{ width: "80px" }} />
                                <span>&nbsp;</span>
                                <Input value={cardFields[2]} maxLength={4} onChange={(e) => handleCardFieldChange(2, e.target.value)} style={{ width: "80px" }} />
                                <span>&nbsp;</span>
                                <Input value={cardFields[3]} maxLength={4} onChange={(e) => handleCardFieldChange(3, e.target.value)} style={{ width: "80px" }} />
                            </Form.Item>

                            <Form.Item
                                name="contact"
                                label="CVC"
                                rules={[
                                    {
                                        required: true,
                                    },
                                    {
                                        validator: (_, value) => {
                                            if (!/^\d{3}$/.test(value)) {
                                                return Promise.reject(new Error('Please enter a valid 3-digit CVC number'));
                                            }
                                            return Promise.resolve();
                                        },
                                    },
                                ]}
                            >
                                <Input onChange={(e) => setCvc(e.target.value)} style={{ width: "75px" }} />
                            </Form.Item>
                            {/* <Form.Item
        name="amount"
    >
        Enter Amount<Input onChange={(val) => {
            setAmount(val.target.value);
        }} />

    </Form.Item>
    <Form.Item
        name="total"
    >
        Enter Total<Input onChange={(val) => {
            setTotal(val.target.value);
        }} />
    </Form.Item>
    <Form.Item
        name="status"
    >
        Enter status<Input onChange={(val) => {
            setStatus(val.target.value);
        }} />

    </Form.Item> */}
                            {/* <Form.Item defaultValue={1000} >
    <Input
    name='amount'
    id="message"
    onchange={handleChange}
    />
    <h2> MEssage:{amount}</h2>
</Form.Item> */}
                            {/* <Form.Item name={['amount']} label="Payment">
        <Button type="primary" ghost>
            1000
        </Button>
        <Button type="primary" ghost>
            2000
        </Button>
        <Button type="primary" ghost onClick={clickMe} id="theButton">
            Other
        </Button>
    </Form.Item> */}


                            <Form.Item
                                wrapperCol={{
                                    ...layout.wrapperCol,
                                    offset: 8,
                                }}
                            >
                                {/* <Link to="/PaymentPortal"> */}
                                <Button type="primary" htmlType="submit" onClick={handleSubmit}>
                                    Submit
                                </Button>
                                {/* </Link> */}

                            </Form.Item>
                        </Form>
                    </Row>


                    {/* </div> */}
                </Card>

            </div>
            </div>
        </>

    );

}

export default CardDetails
