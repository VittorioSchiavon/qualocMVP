import Footer from 'components/Footer';
import Navbar from 'components/Navbar';
import React, { useState } from 'react';

const FAQPage = () => {
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
    <div className="faq-page">
      <h1>Frequently Asked Questions</h1>
      <div className="faq-container">{renderFAQItems()}</div>
    </div>
    
    {isFormSubmitted ? (
        <div className="form-success-message">
          Thank you for your message! We will get back to you soon.
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="custom-email-form">
          <h2>Can't find your question?</h2>
          <p>Send us your question, and we'll get back to you via email.</p>
          <div className="form-group">
            <label htmlFor="email">Your Email:</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={handleEmailChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Your Question:</label>
            <textarea
              id="message"
              value={message}
              onChange={handleMessageChange}
              required
            />
          </div>
          <button type="submit">Send</button>
        </form>
      )}
    <Footer/>
    </>
  );
};

export default FAQPage;
