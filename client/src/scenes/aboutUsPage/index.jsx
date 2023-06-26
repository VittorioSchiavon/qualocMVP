import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import React, { useState } from 'react';

const AboutUsPage = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);


  
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send email with the user's email and message using an API or other means
    // Add your logic here

    // Reset form fields
    setEmail('');
    setMessage('');
    setIsFormSubmitted(true);
  };

  const faqData = [
    {
      question: 'What is React?',
      answer:
        'React is a JavaScript library for building user interfaces. It allows you to create reusable UI components and efficiently update and render them when the underlying data changes.'
    },
    {
      question: 'How do I install React?',
      answer:
        'You can install React by using npm (Node Package Manager) or yarn. Run the command "npm install react" or "yarn add react" in your project directory to install React.'
    },
    {
      question: 'What are React components?',
      answer:
        'React components are the building blocks of a React application. They are reusable and independent pieces of code that describe how a part of the user interface should appear based on the input data.'
    },
    // Add more FAQ items as needed
  ];

  const toggleAccordion = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null);
    } else {
      setActiveIndex(index);
    }
  };

  const renderFAQItems = () => {
    return faqData.map((faq, index) => (
      <div key={index} className="faq-item">
        <div
          className={`faq-question ${activeIndex === index ? 'active' : ''}`}
          onClick={() => toggleAccordion(index)}
        >
          {faq.question}
        </div>
        {activeIndex === index && (
          <div className="faq-answer">{faq.answer}</div>
        )}
      </div>
    ));
  };

  return (
    <>
    <Navbar/>

    <div className="about-us-container">
      <h1 className="about-us-title">About Us</h1>
      <div className="about-us-content">
        <p className="about-us-description">
          Welcome to our website! We are a team of dedicated individuals passionate about delivering high-quality products and services to our customers.
        </p>
        <div className="about-us-mission">
          <h2 className="about-us-mission-title">Our Mission</h2>
          <p className="about-us-mission-description">
            Our mission is to provide innovative solutions that meet the needs of our clients and exceed their expectations. We strive to deliver excellence in every project we undertake, leveraging cutting-edge technologies and a customer-centric approach.
          </p>
        </div>
        <div className="about-us-values">
          <h2 className="about-us-values-title">Our Values</h2>
          <ul className="about-us-values-list">
            <li className="about-us-value">Quality: We are committed to delivering products and services of the highest quality, ensuring customer satisfaction.</li>
            <li className="about-us-value">Innovation: We embrace innovation, constantly seeking new ideas and technologies to stay at the forefront of our industry.</li>
            <li className="about-us-value">Collaboration: We foster a collaborative environment, working closely with our clients and partners to achieve shared success.</li>
            <li className="about-us-value">Integrity: We uphold the highest ethical standards, prioritizing transparency, honesty, and trust in all our interactions.</li>
          </ul>
        </div>
        <p className="about-us-explore">
          Feel free to explore our website and learn more about what we do. We are dedicated to providing exceptional experiences and value to our customers.
        </p>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default AboutUsPage;
