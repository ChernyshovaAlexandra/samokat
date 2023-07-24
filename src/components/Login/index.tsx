import React, { useState, useEffect } from 'react';
import './index.scss';
import logo from '../../assets/images/Logo.svg';
import PhoneInput from './phone-input';
import MainScreen from '../../game/MainScreen'; // Import the game screen component

interface LoginProps {
  apiUrl: string;
  setIsCodeVerified: (parametr: boolean) => void;
  isCodeVerified: boolean;
}

const Login: React.FC<LoginProps> = ({ apiUrl, setIsCodeVerified, isCodeVerified }) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [token, setToken] = useState('');
  const [isCodeSent, setIsCodeSent] = useState(false);
  const [isPhoneNumberValid, setIsPhoneNumberValid] = useState(false);
  const [resendTimer, setResendTimer] = useState(0);

  useEffect(() => {
    // Timer for resending code
    let timer: NodeJS.Timeout;
    if (resendTimer > 0) {
      timer = setTimeout(() => {
        setResendTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    }

    return () => clearTimeout(timer);
  }, [resendTimer]);

  const handlePhoneNumberChange = (value: string) => {
    setPhoneNumber(value);
    setIsPhoneNumberValid(validatePhoneNumber(value));
  };

  const handleResendCode = () => {
    // Logic for resending code to the phone number
    // Call API with the phone number
    // Set resendTimer to 60 seconds
    setResendTimer(60);
  };

  const validatePhoneNumber = (value: string): boolean => {
    const phoneRegex = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/;
    return phoneRegex.test(value);
  };

  const handleSendVerificationCode = () => {
    if (isPhoneNumberValid) {
      // Logic for sending the verification code
      // Call API with the phone number
      // On success, setIsCodeSent to true
      setIsCodeSent(true);
      setResendTimer(60); // Start the resend timer
    }
  };

  const handleVerifyCode = () => {
    // Logic for verifying the code
    // Call API with the verification code
    // On success, setToken with the received token
    // Call onLoginSuccess with the token
    const receivedToken = 'your_received_token_here'; // Replace with the actual received token
    setToken(receivedToken);
    setIsCodeVerified(true); // Mark the code as verified
  };

  return (
    <div className="landing-container relative login">
      <div className="landing-content container">
        <section className="main_content">
          <div className="landing-logo">
            <img src={logo} alt="Логотип" className="" />
          </div>
          {isCodeSent && !isCodeVerified ? ( // Render the verification code input when code is sent and not verified
            <>
              <h1 className="landing-title">Введите код из СМС</h1>
              <p className="landing-text">Мы отправили его на номер {phoneNumber}</p>

              <div className="login_phone flex">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Введите код"
                  maxLength={4}
                />
                <button
                  disabled={verificationCode.length < 4}
                  className="btn white block landing-button"
                  onClick={handleVerifyCode}
                >
                  Продолжить
                </button>
                {resendTimer > 0 ? (
                  <p className="disclaimer">Отправить код повторно через {resendTimer} секунд</p>
                ) : (
                  <button className="btn white block resend-button" onClick={handleResendCode}>
                    Отправить код повторно
                  </button>
                )}
              </div>
            </>
          ) : (
            // Render the phone number input when code is not sent or not verified
            <>
              <h1 className="landing-title">Введите номер телефона</h1>
              <p className="landing-text">Укажите тот, к которому привязан аккаунт в Самокате</p>
              <div className="login_phone flex">
                <PhoneInput value={phoneNumber} onChange={handlePhoneNumberChange} />
                <button
                  className={`btn white block landing-button${isPhoneNumberValid ? '' : ' disabled'}`}
                  onClick={handleSendVerificationCode}
                  disabled={!isPhoneNumberValid}
                >
                  Продолжить
                </button>


                <p className="disclaimer">
                  Нажимая кнопку, я даю согласие на обработку{' '}
                  <a href="">персональных данных</a> на условиях{' '}
                  <a href="">Политики Конфиденциальности</a>
                </p>
              </div>
            </>
          )}
        </section>
        <footer>
          <p className="landing-disclaimer">
            Зона, время, товары и предложения доставки ограничены. Организатор, продавец ООО
            «Умный ритейл» ОГРН 1177847261602, 192019, Санкт‑Петербург, улица Седова, дом 11, Литер
            А, этаж 6, помещение 627. Информационные услуги оказываются ООО «Умное пространство»
            ОГРН 1137847232852, 192019, Санкт-Петербург, улица Седова, дом 11, литер А
          </p>
          <div className="landing-menu flex">
            <div className="landing-menu-item" onClick={() => { }}>
              Правила акции
            </div>
            <div className="landing-menu-item">Политика конфиденциальности</div>
            <div className="landing-menu-item">Лицензионное соглашение</div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Login;
