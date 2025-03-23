import {
    Button,
    Col,
    Form,
    Input,
    Modal,
    Row,
    notification
} from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import CustomRow from '../common/Form_header';
import WrapperCard from '../common/Wrapper_card';


const config = {
    rules: [
        {
            type: 'object',
            required: true,
            message: 'Please select time!',
        },
    ],
};

const PublishAd = props => {

    const { isModalOpen, isEditModalOpen, isOpen, showModal, handleCancel, handleOk, selectedItem } = props;
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [smallDes, setSmallDes] = useState('');
    const [longDes, setLongDes] = useState("");
    const [help, setHelp] = useState("");

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (name !== '' && location !== '') {
            const i =
            {
                name: name,
                location: location,
                smallDes: smallDes,
                longDes: longDes,
                help: help,

            };
            try {
                if (selectedItem) {
                    await axios.put(`http://localhost:4000/adDonations/${selectedItem._id}`, i);
                    notification.success({
                        message: 'Updated Successful',
                        description: 'You have successfully Updated Report',
                      });
                      window.location.reload(); 


                } else {
                    await axios.post('http://localhost:4000/adDonations/create', i);
                    notification.success({
                        message: 'Created Successful',
                        description: 'You have successfully Created Report',
                      });
                      window.location.reload(); 


                }
                handleOk();

            } catch (error) {
                console.log('create item failes ${error}');

            }
        } else {
            console.log("else called ${name}");

        }
    };

    useEffect(() => {
        if (selectedItem) {
            setName(selectedItem.name);
            setLocation(selectedItem.location);
            setSmallDes(selectedItem.smallDes);
            setLongDes(selectedItem.longDes);
            setHelp(selectedItem.help);
        }
    }, [])

    function sendAdData(e) {
        e.preventDefault();

        const adSchema = {
            name,
            location,
            smallDes,
            longDes,
            help
        };

        axios.post("http://localhost:4000/adDonations/create", adSchema)
            .then(value => {
                console.log(value);
            })
            .catch((err) => {
                console.log(`Error: ${err?.response?.data}`);
            })
    }


    return (
        <>


            <Modal
                open={isOpen}
                onCancel={handleCancel}
                onOk={handleOk}
                width={1000}
                footer={null}

            >
                <div style={{ padding: 1, alignItems: "center", backgroundColor: '#D3D3D3', width: 900, height: 650, borderRadius: 5 }}>

                    <WrapperCard style={{ backgroundColor: "#37475E" }}>
                        <CustomRow style={{ justifyContent: "space-between", padding: "16px" }} >
                            <h1 style={{ color: "White" }}>Publish Donation Opportunities</h1>

                        </CustomRow>
                    </WrapperCard>
                    <Form
                        layout='vertical'
                        autoComplete="false"
                        style={{ padding: 1, paddingLeft: 140 }}
                    >
                        <br></br>
                        <Row>
                            <Col span={12}>
                                <Form.Item
                                    name="name"
                                    label="Name"
                                    initialValue={selectedItem?.name}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Enter name"
                                        }

                                    ]}
                                >
                                    <Input onChange={(val) => {
                                        setName(val.target.value);
                                    }}
                                    />
                                </Form.Item>
                            </Col>

                            <br></br>



                            <Form.Item
                                name="location"
                                label="Location"
                                initialValue={selectedItem?.location}
                                rules={[
                                    {
                                        required: true,

                                        message: 'Enter Location!',
                                    },
                                ]}
                            >
                                <Input placeholder='Enter Location' onChange={(val) => {
                                    setLocation(val.target.value);
                                }} />
                            </Form.Item>
                            <Col span={4} />
                        </Row>
                        <Row>



                            <Form.Item
                                name="smallDes"
                                label="Enter Small Description"
                                initialValue={selectedItem?.smallDes}
                                rules={[
                                    {
                                        required: true,

                                        message: "Please enter data"
                                    }
                                ]}
                            >
                                <Input onChange={(val) => {
                                    setSmallDes(val.target.value);
                                }} />
                            </Form.Item>
                            <Col span={3} />
                            <Form.Item
                                name="help"
                                label="Help Required"
                                initialValue={selectedItem?.help}
                                rules={[
                                    {
                                        required: true,

                                        message: "Please enter data"
                                    }
                                ]}
                            >
                                <Input onChange={(val) => {
                                    setHelp(val.target.value);
                                }} />
                            </Form.Item>

                            <br></br>
                        </Row>
                        <Row>
                            <Col span={13}  >

                                <Form.Item
                                    name="longDes"
                                    label="Enter Long Description"
                                    initialValue={selectedItem?.longDes}
                                    rules={[
                                        {
                                            required: true,
                                            message: "Please enter data"
                                        }
                                    ]}
                                >
                                    <Input.TextArea onChange={(val) => {
                                        setLongDes(val.target.value);
                                    }} />
                                </Form.Item>
                            </Col>
                            <br></br>
                        </Row>
                        {/* <br></br> */}


                        <Row>
                            <Col span={13} />
                            <Form.Item label=" " colon={false} >
                                <Button type="primary" color='red' htmlType="submit" style={{ backgroundColor: "#f44336", fontWeight: "bold" }}
                                    onClick={handleCancel}
                                >
                                    Cancel
                                </Button>
                            </Form.Item>
                            <Col span={1} />
                            <Form.Item label=" " colon={false}>
                                <Button type="primary" htmlType="submit" style={{ fontWeight: "bold" }} onClick={handleSubmit} >
                                    {selectedItem ? "Edit" : "Submit"}
                                </Button>
                            </Form.Item>


                        </Row>


                    </Form >

                </div>
            </Modal>
        </>

    )
}

export default PublishAd