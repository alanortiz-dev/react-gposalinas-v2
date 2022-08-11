import React from 'react';
import './Home.css';
import NavigationBar from '../../commons/NavigationBar';


const Home = () => {

    let ac = localStorage.getItem('account')
    let account = JSON.parse(ac)

    return (
        <>
            <div className='HomeContainer'>
                <div className='HomeContent'>
                    <NavigationBar text='Menu' />
                    <div className='HomeBody'>
                       
                    
                    </div>
                    <div className='Home' />
                </div>
            </div>
        </>
    )
};

export default Home;