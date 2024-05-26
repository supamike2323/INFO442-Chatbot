import React from 'react';
import '../css/css.css';

const AboutUs = () => {
  return (
    <div className="aboutUsSection">
      <h2 className="aboutUsTitle">About Us</h2>
      <div className="aboutUsContent">
        <img src="./img/img3.jpg" alt="PetPals" className="aboutUsImage" />
        <div className="aboutUsWelcomeText">
          <p className="welcomeMessage">
            Welcome to PetPals! Our mission is to provide pet owners with a comprehensive and easy-to-use tool to find the best pet clinics and care for their beloved animals.
          </p>
        </div>
      </div>
      <div className="aboutUsText">
        <p className="aboutUsDescription">
          At PetPals, we understand the importance of pet health and strive to ensure that all pets receive the highest quality care. Our team is dedicated to maintaining a platform that connects pet owners with top-rated veterinary services in their area.
        </p>
        <p className="aboutUsDescription">
          Thank you for choosing PetPals. We are committed to helping you keep your pets healthy and happy.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;