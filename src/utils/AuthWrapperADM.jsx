import axios from 'axios';
import {  useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AuthWrapperADM () {
  const navigate = useNavigate();

  console.log("testando se entrou")
  useEffect(() => {
    console.log("testando se entrou")
    const checkAuth = async () => {
      
      const token = sessionStorage.getItem('accessToken');
      const userName = sessionStorage.getItem('user'); 
      const password =  sessionStorage.getItem('password'); 
      if (!token) {
        // Se não houver token, redireciona para o login
        navigate('/');
      } else {
        try {
          const response = await axios.put(`${import.meta.env.VITE_REACT_APP_LINK}Contas/login`, {
            userName,
            password,
          },
            {
           headers: {
            'Content-Type': 'application/json',
            'accept': '*/*',
          }});
        } catch (erro){
          console.log(erro)
          navigate('/');
        }
    
      }
    };

    checkAuth();
  }, [navigate]);

  return (<></>);
};
