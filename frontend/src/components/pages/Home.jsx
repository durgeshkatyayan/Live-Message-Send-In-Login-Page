import React from 'react'
import Layout from '../Layout/Layout.jsx'
import { menuItem } from '../common/index.jsx'
const Home = () => {
    return (
        <>
            <div className='w-full  py-2 px-8'>
                <div className='flex items-center justify-center'>
                    <p className='text-2xl font-semibold font-serif' style={{ textShadow: '1px 1px 1px #ddd' }}>CRM Home Page</p>
                </div>
            </div>
            <Layout>
                <div className='mt-1 w-full bg-white'>
                    <div className='w-48 h-[80vh] py-5' style={{ boxShadow: '1px 1px 3px 1px #ddd' }}>
                        {
                            menuItem.map((item, index) => (
                                <div className='flex items-center px-4 gap-3 py-4 cursor-pointer'>
                                    <p className={`text-2xl hover:animate-bounce ${index==2 && 'bg-green-700 text-white rounded-full'} ${index==3 && 'bg-blue-500 text-white rounded-full'}`}>{item.icon ? item.icon : 'NA'}</p>
                                    <p className='hover:text-black hover:font-medium '>{item.name ? item.name : 'NA'}</p>
                                </div>
                            ))
                        }
                    </div>
                </div>
            </Layout>
        </>
    )
}

export default Home