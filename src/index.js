import React, { useState, useEffect } from 'react';
import User from './user';
import Moderation from './moderation';
import Analytics from './analytics';
import './CardStyles.css';
export default function Home() {
  const [loading, setLoading] = useState(true);

  // Simulate page loading
  useEffect(() => {
    setTimeout(() => setLoading(false), 2000); // Simulate a 2-second loading time
  }, []);

  return (
    <div className="main-container">
      {loading ? (
        <div className="loader">Loading...</div> // Loader for page reloading
      ) : (
        <>
          
            <div className="header">
                <h1>
                    S<br />
                    o<br />
                    c<br />
                    i<br />
                    a<br />
                    l<br />
                    {' '}
                    M<br />
                    e<br />
                    d<br />
                    i<br />
                    a<br />
                    {' '}
                    <br/>
                    A<br />
                    n<br />
                    a<br />
                    l<br />
                    y<br />
                    t<br />
                    i<br />
                    c<br />
                    a<br />
                    l<br />
                    {' '}
                    <br/>
                    D<br />
                    a<br />
                    s<br />
                    h<br />
                    b<br />
                    o<br />
                    a<br />
                    r<br />
                    d<br/>
                </h1>
                <br/>
                <span>Copyright © Prakhar Verma</span>
            </div>

            <div>
            <marquee direction="right" behavior="scroll" scrollamount="5">
                <div className='mar-div'>Socialmedia Analytics Dashboard</div>
                <div className='mar-div'>Socialmedia Analytics Dashboard</div>
                <div className='mar-div'>Socialmedia Analytics Dashboard</div>
                <div className='mar-div'>Socialmedia Analytics Dashboard</div>
                <div className='mar-div'>Socialmedia Analytics Dashboard</div>
                <div className='mar-div'>Socialmedia Analytics Dashboard</div>
                <div className='mar-div'>Socialmedia Analytics Dashboard</div>
                <div className='mar-div'>Socialmedia Analytics Dashboard</div>
                <div className='mar-div'>Socialmedia Analytics Dashboard</div>
            </marquee>

                <User />
                <Moderation />
                <Analytics />
            </div>
        </>
      )}
    </div>
  );
}
