import React from 'react';
import './NewModels.css';

const NewModels = () => {
  const models = [
    {
      id: 1,
      name: 'VoltRide X1',
      description: 'High-speed electric bike perfect for city deliveries.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 2,
      name: 'VoltRide Cruiser',
      description: 'Comfortable ride with extended battery life.',
      image: 'https://via.placeholder.com/150',
    },
    {
      id: 3,
      name: 'VoltRide Pro',
      description: 'Advanced features for professional riders.',
      image: 'https://via.placeholder.com/150',
    },
  ];

  return (
    <section className="new-models">
      <h2>Best Models to Rent</h2>
      <div className="models-grid">
        {models.map((model) => (
          <div className="model-card" key={model.id}>
            <img src={model.image} alt={model.name} className="model-image" />
            <h3>{model.name}</h3>
            <p>{model.description}</p>
            <button className="rent-button">Rent Now</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewModels;
