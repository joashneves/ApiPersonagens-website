import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthWrapperADM () {
  const navigate = useNavigate();

  console.log("testando se entrou")
  useEffect(() => {
    console.log("testando se entrou")
    const checkAuth = () => {
      const token = sessionStorage.getItem('accessToken');
      if (!token) {
        // Se não houver token, redireciona para o login
        navigate('/');
      }
    };

    checkAuth();
  }, [navigate]);

  return (<></>);
};
