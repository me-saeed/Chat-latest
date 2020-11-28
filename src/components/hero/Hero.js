import React, { Component } from 'react'
import { setupScrollReveal } from '../../assets/js/main.js';
import Footer from '../../components/layout/Footer';
import NewsletterForm from '../forms/NewsletterForm';

function Hero(props)  {
  // componentDidMount() {
  //   setupScrollReveal();
  // }



    const Illustration = props.illustration;

    return (
      <section className="hero">
        <div className="container">
          <div className="hero-inner">
            <div className="hero-copy">
              <div className="container-sm">
                <h1 className="hero-title h2-mobile mt-0 is-revealing">Talk to Strangers</h1>
                <p className="hero-paragraph is-revealing">Enter Your Name and start chit chat</p>
              </div>

        
            
            
     

              <NewsletterForm className="hero-form" submit="Get early access" />
            </div>

            <div className="hero-illustration">
              <Illustration />
            </div>
          </div>
        
        </div>
      </section>
    )

}

export default Hero;
