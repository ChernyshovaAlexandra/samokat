import React, { createContext, useState, useEffect, useContext } from 'react';
export const apiUrl = 'https://example.com';
interface MainContextValue {
    phoneNumber: string;
    setPhoneNumber: (phoneNumber: string) => void;
    verificationCode: string;
    setVerificationCode: (verificationCode: string) => void;
    token: string;
    setToken: (token: string) => void;
    isCodeSent: boolean;
    setIsCodeSent: (isCodeSent: boolean) => void;
    isPhoneNumberValid: boolean;
    setIsPhoneNumberValid: (isPhoneNumberValid: boolean) => void;
    resendTimer: number;
    setResendTimer: (resendTimer: number) => void;
    handleResendCode: () => void;
    handleSendVerificationCode: () => void;
    handleVerifyCode: () => void;
}
interface MainProviderProps {
    children: React.ReactNode; // Include the children prop here
    value: {
        setPhoneNumber: (phoneNumber: string) => void,
        isPhoneNumberValid: boolean,
        phoneNumber: string,
    };
}
export const MainContext = createContext<MainContextValue>({
    phoneNumber: '',
    setPhoneNumber: () => { },
    verificationCode: '',
    setVerificationCode: () => { },
    token: '',
    setToken: () => { },
    isCodeSent: false,
    setIsCodeSent: () => { },
    isPhoneNumberValid: false,
    setIsPhoneNumberValid: () => { },
    resendTimer: 0,
    setResendTimer: () => { },
    handleResendCode: () => { },
    handleSendVerificationCode: () => { },
    handleVerifyCode: () => { },
});

export const useMainContext = () => useContext(MainContext);

export const MainProvider: React.FC<MainProviderProps> = ({ children }) => {
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
        // onLoginSuccess(receivedToken); // Uncomment this line if you want to call onLoginSuccess
    };

    return (
        <MainContext.Provider
            value={{
                phoneNumber,
                setPhoneNumber,
                verificationCode,
                setVerificationCode,
                token,
                setToken,
                isCodeSent,
                setIsCodeSent,
                isPhoneNumberValid,
                setIsPhoneNumberValid,
                resendTimer,
                setResendTimer,
                handleResendCode,
                handleSendVerificationCode,
                handleVerifyCode,
            }}
        >
            {children}
        </MainContext.Provider>
    );
};

