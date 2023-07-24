import React, { useState } from 'react';
import Game from '../Game';
import { GameProvider } from '../Game/GameContext';
import GameNavigation from '../Game/Navigation/game-navigation';
import './index.scss'
import UserAccount from '../../components/UserAccount';

interface MainScreenProps {
    handleLogout: () => void;
    phoneNumber: string;
    setActiveTab: (num: number) => void;
    activeTab: number;
}

const MainScreen: React.FC<MainScreenProps> = ({ handleLogout, phoneNumber, activeTab, setActiveTab }) => {
    return (
        <div className='gameplay'>
            <GameNavigation phoneNumber={phoneNumber} activeTab={activeTab} setActiveTab={setActiveTab} handleLogout={handleLogout} />
            {activeTab === 1 ?
                <section className='main-screen'>
                    <h1 className='game'>У Самоката появилась доставка по морю на яхтах!</h1>
                    <p>Доставьте заказы вовремя и получите дополнительный билетик!</p>
                    <GameProvider>
                        <Game />
                    </GameProvider>
                </section> :
                <UserAccount />}
        </div>
    );
};

export default MainScreen;
