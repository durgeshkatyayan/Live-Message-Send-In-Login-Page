import axios from 'axios'
import React, { useState } from 'react'
import emailjs from 'emailjs-com'
import { useNavigate } from 'react-router-dom'
const ForgetPassword = () => {
  const [values, setValues] = useState({
    uid: '',
    email: ''
  });
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate()
  const handleChange = (e) => {
    const { value, name } = e.target;
    setValues({
      ...values,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/v1/forget-password', values);
      const pass = await (response.data.result[0].pass);
      const emailParams = {
        email: values.email,
        uid: values.uid,
        pass: pass
      };

      emailjs.send('service_ua687ll', 'template_tukdy9l', emailParams, '93UIHvuVHYEWhXi1k')
        .then((result) => {
          console.log(result.text);
          setMessage('Email sent to your registered email successfully!');
          setTimeout(() => {
            navigate('/')
          }, 5000)
          setError('')
        }, (error) => {
          console.log(error.text);
          setError('An error occurred, please try again.');
          setMessage('');
        });
    } catch (error) {
      console.log("Error in forget password");
      setError('Error in forget password');
      setMessage('');
    }
  };

  return (
    <div className='container sm:w-[34vw] w-[21rem] md:w-[45vw] mx-auto  p-5 mt-5' style={{ boxShadow: '0 0 5px 1px #ddd' }}>
      <p className='text-3xl font-serif text-center'>Forget Password</p>
      <form action="" className='px-10 my-5 flex flex-col gap-5' onSubmit={handleSubmit}>
        <div className='flex flex-col gap-2 '>
          <label htmlFor="uid">UID:</label>
          <input type="text" name="uid" id="uid" value={values.uid} onChange={handleChange} className='border w-full' required />
        </div>
        <div className='flex flex-col gap-2'>
          <label htmlFor="email">Email Id:</label>
          <input type="email" name="email" id="email" className='border w-full' value={values.email} onChange={handleChange} required />
        </div>
        <button type='submit' className='w-full bg-blue-950 rounded text-white font-semibold pt-1'>Send</button>
      </form>
      {message && <p className="text-green-500 text-center">{message}</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
    </div>
  );
}

export default ForgetPassword;
