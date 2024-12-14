import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

export const Internships = () => {
  const navigate = useNavigate();

  useEffect(() => {
    
    navigate('/opportunities?filter=internship');
  }, [navigate]);

 
  return (
    <div className="flex flex-col justify-center m-5 items-center gap-2">
      <h1> Internships </h1>
    </div>
  );
};