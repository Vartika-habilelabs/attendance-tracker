import React from 'react';
import MajdoorList from '../components/MajdoorList/MajdoorList';
import { useNavigate } from 'react-router-dom';

const MajdoorListPage = () => {
  const navigate = useNavigate();
  const handleMajdoorSelect = (majdoor) => {
    navigate(`/dashboard/${majdoor.id}`);
  };
  return <MajdoorList onMajdoorSelect={handleMajdoorSelect} />;
};

export default MajdoorListPage; 