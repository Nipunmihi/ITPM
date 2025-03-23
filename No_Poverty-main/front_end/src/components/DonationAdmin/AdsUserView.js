import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import "../../assets/styles/adsUserView.css"
import { EnvironmentOutlined } from '@ant-design/icons';

const AdsUserView = () => {

    const [ads, setAds] = useState([]);

    function getAds() {
        axios.get("http://localhost:4000/adDonations/")
            .then((res) => {
                setAds(res.data);
            })
            .catch((err) => {
                alert(err.message);
            });
    }
    useEffect(() => {
        getAds();
    }, [])


    const Columns = [{
        title: 'Name',
        dataIndex: 'name',
        key: 'name',
    }, {
        title: 'Location',
        dataIndex: 'location',
        key: 'location',
    }, {
        title: 'Small Description',
        dataIndex: 'smallDes',
        key: 'smallDes',
    },
    {
        title: 'Help Required',
        dataIndex: 'help',
        key: 'help',
    }, {
        title: 'Long Description',
        dataIndex: 'longDes',
        key: 'longDes',
        // }, {
        //     title: 'Status',
        //     dataIndex: 'status',
        //     key: 'status',
    }];
    return (
        <div className="AUVbg">
            <br></br>
            <center>

                <h1 style={{color:"white"}}>Donation Opportunities</h1>
            </center>

            <br></br>
            {ads.map((ad, index) => (
                <div key={index} className="card">
                    <h2 className="adName">{ad.name}({ad.smallDes})</h2>
                    <p className='loc'>
                        <EnvironmentOutlined />
                        <span className="locationText">:</span> {ad.location}
                    </p>

                    <p>Help Required: {ad.help}</p>
                    <p>{ad.longDes}</p>
                    <Link to={`/donate?name=${encodeURIComponent(ad.name)}`}>
                        <button className='donBtn'>
                            Donate
                        </button>
                    </Link>
                </div>
            ))}
            <br></br>
            <br></br>
            <br></br>
        </div>
    );
}

export default AdsUserView