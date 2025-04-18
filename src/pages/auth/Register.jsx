import React from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const navigate = useNavigate();

  const fakeRegister = () => {
    // Après inscription, on peut rediriger vers login
    navigate('/login');
  };

  return (
    <div>
      <h2>Inscription</h2>
      <input placeholder="Nom" />
      <input placeholder="Email" />
      <input placeholder="Mot de passe" type="password" />
      <button onClick={fakeRegister}>S'inscrire</button>
    </div>
  );
};

export default Register;
