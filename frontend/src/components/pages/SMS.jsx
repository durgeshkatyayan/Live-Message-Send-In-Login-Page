import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
const SMS = () => {
    const [showMobileInput, setShowMobileInput] = useState(false);
    const [showFileInput, setShowFileInput] = useState(false);
    // const [userName,setUserName]=useState('')
    const navigate = useNavigate()
    const getUid = sessionStorage.getItem('uid')
   
    const handleRadioChange = (option) => {
        if (option === 'mobile') {
            setShowMobileInput(true);
            setShowFileInput(false);
        }
        if (option === 'file') {
            setShowMobileInput(false);
            setShowFileInput(true);
        }
    };
    return (
        <div className='container sm:w-[44vw] w-[23rem] md:w-[55vw] mx-auto h-full p-5 mt-5' style={{ boxShadow: '0 0 5px 1px #ddd' }}>
          {getUid==null?(''):( <h1 className='text-black text-sm -tracking-tighter'>{`Welcome ${getUid}`}</h1>)} 
            <p className='text-3xl font-serif text-center'>SMS/SENDER</p>
            <form action="" className='px-5 my-5 flex flex-col gap-5'>
                <div className='flex flex-col gap-2 '>
                    <div className='flex gap-2'>
                        <input type="radio" name="option" id="fileOption" value="mobile" onChange={() => handleRadioChange('mobile')} />
                        <p>Type Mobile Number</p>
                    </div>
                    {showMobileInput &&
                        (<div className=''>
                            <label htmlFor="">Mobile No : </label>
                            <input type="text" name="" id="" pattern="\d+" className='border w-full' />
                        </div>)
                    }
                </div>

                <div className='flex flex-col gap-2'>
                    <div className='flex gap-2'>
                        <input type="radio" name="option" id="leOption" value="file" onChange={() => handleRadioChange('file')} />
                        <p>Import CSV File</p>
                    </div>
                    {showFileInput &&
                        (<div className=''>
                            <label htmlFor="">File: </label>
                            <input type="file" name="" id="" className='border w-full' />
                        </div>)
                    }
                </div>
            </form>
        </div>
    );
};

export default SMS;
