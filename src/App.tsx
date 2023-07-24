import React, { useEffect, useState } from 'react';
import './assets/style/main.scss';
import Login from './components/Login';
import Loader from './components/Loader';
import { apiUrl } from './contexts';
import Landing from './landing';



const App: React.FC = () => {
  const [token, setToken] = useState<string | null>(null);
  const [isLoading, setLoading] = useState(false);
  const [startLogin, setLoginStart] = useState(false);
  const [isCodeVerified, setIsCodeVerified] = useState(true); // New state to track code verification
  const [phoneNumber, setPhoneNumber] = useState('');
  const [activeTab, setActiveTab] = useState(1);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
    const timeout = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  const handleLoginSuccess = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  const handleLogout = () => {
    setToken(null);
    setLoading(true);
    setIsCodeVerified(false);
    localStorage.removeItem('token');
    // setLoginStart(true)
  };

  if (isLoading) {
    return <Loader />;
  }
  const state = '';

  return (
    <>
      {startLogin ?
        <Login phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber} apiUrl={apiUrl} isCodeVerified={isCodeVerified} setIsCodeVerified={setIsCodeVerified} /> :
        <Landing activeTab={activeTab} setActiveTab={setActiveTab} phoneNumber={phoneNumber} setLoginStart={setLoginStart} isCodeVerified={isCodeVerified} handleLogout={handleLogout} />}
    </>
  );
};

export default App;
