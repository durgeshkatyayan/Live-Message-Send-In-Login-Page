import axios from 'axios';
import React, { useEffect, useState } from 'react';

const SMS = () => {
    const [ipAddress, setIpAddress] = useState('');
    const getUid = sessionStorage.getItem('uid');
    const getDate = sessionStorage.getItem('date');

    const getIpAddress = async () => {
        try {
            const response = await axios.get('https://ipinfo.io/49.43.118.78/json?token=4f9139290b5a05');
            setIpAddress(response.data.ip);
        } catch (error) {
            console.log('Error in accessing IP address');
        }
    };

    useEffect(() => {
        const fetchIpAndSendApi = async () => {
            await getIpAddress();
            if (ipAddress) {
                try {
                    const fetchApi = await axios.post('/api/v1/set-api',  {api:ipAddress} );
                } catch (error) {
                    console.log(error);
                }
            }
        };
        fetchIpAndSendApi();
    }, [ipAddress]);  // Dependency added to ensure API call occurs after IP address is fetched

    return (
        <div className='w-full  p-3 px-8' style={{ boxShadow: '0 0 2px 1px #ddd' }}>
            <div className='flex items-center justify-between'>
                <p>IP Address: {ipAddress}</p>
                <p>Welcome {getUid}</p>
                <p>Date: {getDate}</p>
            </div>
        </div>
    );
};

export default SMS;
