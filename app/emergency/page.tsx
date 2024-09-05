import React from 'react';
import { Emergency } from '../../components/Emergency';

const EmergencyPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-4">Emergency Information</h1>
      <Emergency />
    </div>
  );
};

export default EmergencyPage;