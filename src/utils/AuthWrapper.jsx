import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthWrapper = ({children}) => {
  const navigate = useNavigate();

  useEffect(() => {
    console.log("Autenticando...")
    const checkAuth = () => {
      const token = sessionStorage.getItem('accessToken');
      const user = sessionStorage.getItem('user'); 
      const password = sessionStorage.getItem('password'); 
      if (!user && !password) {
        // Se não houver token, redireciona para o login
        navigate('/login');
      }
    };

    checkAuth();
  }, [navigate]);

  return<>{children}</>

};

export default AuthWrapper;