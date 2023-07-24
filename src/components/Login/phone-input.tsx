import React, { useState, useEffect, ChangeEvent } from 'react';

interface PhoneInputProps {
  value: string;
  onChange: (value: string) => void;
}

const PhoneInput: React.FC<PhoneInputProps> = ({ value, onChange }) => {
  const [isValid, setIsValid] = useState<boolean>(true);

  useEffect(() => {
    const isValidPhone = /^\+7 \(\d{3}\) \d{3}-\d{2}-\d{2}$/.test(value);
    setIsValid(isValidPhone);
    
  }, [value]);

  const handlePhoneNumberChange = (event: ChangeEvent<HTMLInputElement>) => {
    const input = event.target.value;
    // Удаляем все символы, кроме цифр
    const sanitizedInput = input.replace(/\D/g, '');

    // Если номер введен и не содержит '+', добавляем '+'
    if (sanitizedInput && sanitizedInput.charAt(0) !== '+') {
      if (sanitizedInput.charAt(0) !== '7') {
        onChange(`+7 (${sanitizedInput.slice(0, 3)}) ${sanitizedInput.slice(3, 6)}-${sanitizedInput.slice(6, 8)}-${sanitizedInput.slice(8, 10)}`);
      } else {
        onChange(`+7 (${sanitizedInput.slice(1, 4)}) ${sanitizedInput.slice(4, 7)}-${sanitizedInput.slice(7, 9)}-${sanitizedInput.slice(9, 11)}`);
      }
    } else {
      onChange(sanitizedInput);
    }
  };

  return (
    <div style={{ width: '100%', display: 'grid', placeItems: 'center' }}>
      <input
        type="text"
        value={value}
        onChange={handlePhoneNumberChange}
        placeholder="+7 (9ХХ) ХХХ-ХХ-ХХ"
      />
      {!isValid && <p className='validationText'>Пожалуйста, введите номер в правильном формате.</p>}
    </div>
  );
};

export default PhoneInput;
