import React, { useState } from 'react';
import './HowWorks.css';

const HowWorks = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const steps = [
    {
      id: 1,
      title: 'Step 1: Create an Account',
      description: 'Sign up on VoltRides to create an account and start exploring the available bikes.',
    },
    {
      id: 2,
      title: 'Step 2: Choose a Bike',
      description: 'Browse through a variety of electric bikes and select the one that best suits your needs.',
    },
    {
      id: 3,
      title: 'Step 3: Book and Pay',
      description: 'Confirm your booking and securely pay through our platform. You’ll receive a confirmation with rental details.',
    },
    {
      id: 4,
      title: 'Step 4: Start Riding',
      description: 'Pick up your bike and enjoy a hassle-free, eco-friendly ride across the city.',
    },
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <section className="how-works">
      <h2>How It Works</h2>
      <div className="accordion">
        {steps.map((step, index) => (
          <div
            className={`accordion-item ${activeIndex === index ? 'open' : ''}`}
            key={step.id}
          >
            <button
              className="accordion-title"
              onClick={() => toggleAccordion(index)}
            >
              {step.title}
            </button>
            <div className="accordion-content">
              <p>{step.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowWorks;
