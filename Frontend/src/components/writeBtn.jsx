import React from 'react'
import './writeBtn.scss'
import { useNavigate } from 'react-router-dom';


const WriteBtn = () => {
  const navigate = useNavigate();

  const handleClick =() => {
    navigate ('/WriteMsg');
  };

  return (
    <div className="writeBtn" onClick={handleClick}>
     
    </div>
  )
}

export default WriteBtn