import { Button, Card, Form, Input, InputNumber } from 'antd';
import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import "../../assets/styles/makedonate.css";
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
const DonateForm = () => {

    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const nameDon = searchParams.get('name');
    const paid = "Paid";

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [contact, setContact] = useState('');
    const [amount, setAmount] = useState();
    const [total, setTotal] = useState();
    const [status, setStatus] = useState('');
    const [helpGiven, setHelpGiven] = useState('');
    const navigate = useNavigate();

    const [amountError, setAmountError] = useState('');
    const [contactError, setContactError] = useState('');
    const isSubmitDisabledforAmount = amountError !== '';
    const isSubmitDisabled = contactError !== '';
    const handleChange = (event) => {
        setAmount(event.target.value);
    };

    useState(() => {
        setHelpGiven(nameDon);
      }, [nameDon]);

      useState(() => {
        setStatus(paid);
      }, [paid]);

    function sendDonation(e) {
        e.preventDefault();

        const donateSchema = {
            name,
            email,
            contact,
            amount,
            total,
            status,
            helpGiven
        }

        axios.post("http://localhost:4000/donation/", donateSchema)
            .then(value => {
                console.log(value);
                navigate("/cardDetails");
            })
            .catch((err) => {
                console.log(`Error: ${err?.response?.data}`);
            })
    }

    

  function validateContact(value) {
    if (value.length !== 10 || value.charAt(0) !== '0') {
      setContactError('Enter a valid Contact Number');
    } else {
      setContactError('');
    }
  }

  function validateAmount(value) {
    if (isNaN(value) || !Number.isInteger(Number(value))) {
      setAmountError('Amount must be an integer');
    } else {
      setAmountError('');
    }
  }
    return (
        <>
            <div className='bgdon'>
            <br></br>
            <br></br>
            <br></br>
                <Card style={{ width: "25%", opacity: "0.8", marginLeft: "8%" }}>
                    <h1>I want to Donate</h1>
                    <h1>{nameDon}</h1>
                    <Form>
                        <Form.Item
                            name="name"
                            label="Name"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                        >
                            <Input onChange={(val) => {
                                setName(val.target.value);
                            }} />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            label="Email"
                            rules={[
                                {
                                    required:true,
                                    type: 'email',
                                },
                            ]}
                        >
                            <Input onChange={(val) => {
                                setEmail(val.target.value);
                            }} />
                        </Form.Item>
                        <Form.Item
                            name="contact"
                            label="Contact"
                            rules={[
                                {
                                    required: true,
                                },
                            ]}
                            validateStatus={contactError ? 'error' : ''}
                            help={contactError}
                          >
                            <Input onChange={(val) => {
                                setContact(val.target.value);
                                validateContact(val.target.value);
                            }} />
                        </Form.Item>
                        <Form.Item
                            name="amount"
                        >
                            Enter Amount<Input onChange={(val) => {
                                setAmount(val.target.value);
                                validateAmount(val.target.value);
                            }} />

                        </Form.Item>
                        {/* <Form.Item
                            name="total"
                        >
                            Enter Total<Input onChange={(val) => {
                                setTotal(val.target.value);
                            }} />
                        </Form.Item> */}
                        {/* <Form.Item
                            name="status"
                        >
                            Enter status<Input onChange={(val) => {
                                setStatus(val.target.value);
                            }} />

                        </Form.Item> */}
                        <Form.Item
                            name="helpGiven"
                            initialValue={nameDon}
                        >
                            Help Given to: <Input disabled placeholder={nameDon}/>

                        </Form.Item>
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
                            <p>Help Given:{nameDon}</p>

                            <Button type="primary" htmlType="submit" onClick={sendDonation} disabled={isSubmitDisabled || isSubmitDisabledforAmount}  >
                                Submit
                            </Button>
                        </Form.Item>
                    </Form>
                </Card>
                <br></br>
                <br></br>
                <br></br>
            </div>
        </>
    );

}

export default DonateForm
