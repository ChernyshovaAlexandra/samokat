import React, { useEffect, useState } from 'react';
import './assets/style/main.scss';
import Login from './components/Login';
import Loader from './components/Loader';
import {  apiUrl } from './contexts';
import Landing from './landing';



const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [startLogin, setLoginStart] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(true); // New state to track code verification

  useEffect(() => {
    // Проверка наличия сохраненного токена при загрузке
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }

    // Имитация задержки для отображения лоадера
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleLoginSuccess = (token: string) => {
    // Обработка успешного входа в систему и сохранение токена
    setToken(token);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    // Выход из системы и удаление токена
    setToken(null);
    localStorage.removeItem('token');
  };

  if (isLoading) {
    // Отображение лоадера во время проверки токена
    return <Loader />;
  }
  const state = '';

  return (
    <>
      {startLogin ?
        <Login apiUrl={apiUrl} isCodeVerified={isCodeVerified} setIsCodeVerified={setIsCodeVerified} /> :
        <Landing setLoginStart={setLoginStart} isCodeVerified={isCodeVerified} />}
    </>
  );
};

export default App;
