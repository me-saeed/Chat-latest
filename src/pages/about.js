import React from 'react';
import Layout from '../layouts/index';

const AboutPage = () => {
  return (
    <Layout>
      <article className="entry">
        <div className="container">
          <div className="ent">
            <div className="entry-cont">
              <div className="">
                <header className="entry-header">
                  <h1 className="entry-title">About Us</h1>
                </header>

                <div className="entry-body">
                  <p>
                    Helostranger is developed by Encodersoft team 
                </p>
                  <p>
                  Helostranger provide scure chat with random peaple around the globe. 
                  <br/>
                   We are going to build community for Stranger people
                </p>
                  <hr />
                  <p>Visit Our Website <a href="https://www.encodersoft.co/" target="_blank"s>Encodersoft</a></p>
                 
                </div>
              </div>
            </div>
            <div className="entry-media">
              <img src="https://image.freepik.com/free-vector/business-people-meeting-isometric_23-2148314387.jpg/420x640" alt="" />
            </div>
          </div>
        </div>
      </article>
    </Layout>
  );
};

export default AboutPage;
