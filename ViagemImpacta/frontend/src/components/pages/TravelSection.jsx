// src/components/TravelSection.jsx

import React from 'react';
import { allPromotionalTravels } from '../data/promotions.js'; 
import TravelCard from './TravelCard.jsx';

function TravelSection({ id, title }) {
  return (
    <section id={id} className="py-12 bg-gray-50 px-6">
      <div className="container mx-auto">
        <div className="section-title">
          <h2 className="text-3xl font-bold">
            {title}
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 cards-grid">
          {allPromotionalTravels.map((travel) => (
            <TravelCard key={travel.id} travel={travel} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default TravelSection;
