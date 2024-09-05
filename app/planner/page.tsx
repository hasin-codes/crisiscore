import React from 'react';
import Planner from '../../components/Planner';

const PlannerPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Planner</h1>
      <Planner />
    </div>
  );
};

export default PlannerPage;