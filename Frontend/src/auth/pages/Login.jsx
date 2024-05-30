import '../../assets/styles/login.css';  // Asegúrate de que el nombre del archivo sea correcto

// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3002/api/login', { email, password });
      const { token } = response.data;

      localStorage.setItem('token', token);

      setError('');
      console.log('Usuario autenticado correctamente');

      navigate('/listUserHelp');
    } catch (error) {
      console.error(error);
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="container-login">
      <div className="card-login">
        <h2 className="card-login-title">Iniciar sesión</h2>
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit} className="content-login">
          <div>
            <label>Email:</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <div>
            <label>Contraseña:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="input-field"
            />
          </div>
          <button type="submit" className="btn-submit-login">Iniciar sesión</button>
        </form>
        <p className="link-new-account">¿No tienes una cuenta? <a href="#">Crear una cuenta</a></p>
      </div>
    </div>
  );
};