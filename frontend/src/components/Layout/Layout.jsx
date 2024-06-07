import React from 'react'
import SMS from '../pages/SMS.jsx'
import Footer from './Footer.jsx'

const Layout = (props) => {
    return (
        <>
            <SMS className='h-14' />
            <main style={{ minHeight: '80vh' }}>
                {props.children}
            </main>
            <Footer />
        </>
    )
}

export default Layout