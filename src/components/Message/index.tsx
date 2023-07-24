import React, { ReactNode } from 'react';
import './index.scss';

interface MessageProps {
  position: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'center' | 'center countdown';
  text?: string;
  buttonText?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const Message: React.FC<MessageProps> = ({ position, text, buttonText, onClick, children }) => {
  const getMessagePositionStyle = (): React.CSSProperties => {
    switch (position) {
      case 'top-right':
        return { top: '1rem', right: '1rem' };
      case 'top-left':
        return { top: '1rem', left: '1rem' };
      case 'bottom-right':
        return { bottom: '1rem', right: '1rem' };
      case 'bottom-left':
        return { bottom: '1rem', left: '1rem' };
      case 'center':
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      case 'center countdown':
        return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
      default:
        return {};
    }
  };

  return (
    <div className={`message-container ${position==='center countdown' ? 'countdown' : ''}`}>
      <div className={`message message-${position}`} style={getMessagePositionStyle()}>
        {text ? <h3>{text}</h3> : <></>}
        {children ? <>{children}</> : <></>}

        {buttonText && onClick && <button className='btn' onClick={onClick}>{buttonText}</button>}
      </div>
    </div>
  );
};

export default Message;
