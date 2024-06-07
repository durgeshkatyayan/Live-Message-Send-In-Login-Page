import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import showToast from 'show-toast';
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
    const [remember, setRemember] = useState(false);
    const [values, setValues] = useState({
        uid: '',
        pass: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        const rememberMe = localStorage.getItem('remember') === 'true';
        const storedUid = localStorage.getItem('uid');
        const storedPass = localStorage.getItem('pass');
        if (storedUid && rememberMe) {
            setValues({
                uid: storedUid,
                pass: storedPass
            });
            setRemember(true);
        }
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/v1/login', values);
            if (response.data.success) {
                showToast({
                    str: `${response.data.message}`,
                    time: 1000,
                    position: 'top'
                });
                // console.log()
                sessionStorage.setItem('uid', values.uid)
                sessionStorage.setItem('date',response.data.result[0].created_at.split('T')[0])
                // sessionStorage.setItem('pass', values.pass)

                if (remember) {
                    localStorage.setItem('uid', values.uid);
                    localStorage.setItem('pass', values.pass);
                    localStorage.setItem('remember', true);
                } else {
                    localStorage.removeItem('uid');
                    localStorage.removeItem('pass');
                    localStorage.removeItem('remember');
                }

                setTimeout(() => {
                    navigate('/home');
                }, 1000);
            } else {
                showToast(response.data.error, 'error');
            }
        } catch (error) {
            if (error.response && error.response.data) {
                showToast(error.response.data.error, 'error');
            } else {
                showToast('Invalid User', 'error');
            }
        }
    };

    const handleRemember = () => {
        setRemember(prev => !prev);
    };

    return (
        <>
            <div className='container md:flex items-center justify-around gap-5 mt-2 mx-auto'>
                <div className='w-[19rem] sm:w-[25rem] h-full px-5 py-5 mx-auto my-5' style={{ boxShadow: '0 0 5px 1px #ddd' }}>
                    <h1 className='text-3xl font-serif text-center py-3'>Login Page</h1>
                    <form className='flex flex-col gap-5 mt-5' onSubmit={handleSubmit}>
                        <div className='flex gap-2'>
                            <label className='whitespace-nowrap me-5'>Uid :</label>
                            <input
                                type="text"
                                required
                                name="uid"
                                value={values.uid}
                                onChange={handleChange}
                                className='border ms-5 px-1 w-full outline-none rounded'
                            />
                        </div>
                        <div className='flex gap-2'>
                            <label className='whitespace-nowrap'>Password :</label>
                            <input
                                type="password"
                                required
                                name="pass"
                                value={values.pass}
                                onChange={handleChange}
                                className='border px-1 w-full outline-none rounded'
                                placeholder='****'
                            />
                        </div>
                        <div className='flex gap-2'>
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={handleRemember}
                            />
                            <p>Remember me</p>
                        </div>
                        <div>
                            <button type='submit' className='w-full bg-blue-950 rounded text-white font-semibold pt-1'>Submit</button>
                            <div className='flex items-center justify-between'>
                                <p></p>
                                <Link to='/forget-password' className='hover:underline hover:text-blue-900'>Forget Password</Link>
                            </div>
                        </div>
                    </form>
                </div>
                <div className='md:w-[48vw] sm:w-[52vw] w-[48vh] h-[95vh] px-[5vw] py-[12vw] bg-blue-950 mx-auto'>
                    <h1 className='text-5xl font-semibold text-white'>Welcome to Company <br /> Name</h1><br />
                    <p className='text-white'>Our mass SMS and Email service provide you to reach more client engage, and also you can fill your target with the potential customer on the basis of different types of products and services which is you want to reach your client door. So why late if no account, sign up quickly and get your expect to plan and start from today with the best and cheap SMS cost!</p>
                </div>
            </div>
        </>
    );
};

export default LoginPage;
