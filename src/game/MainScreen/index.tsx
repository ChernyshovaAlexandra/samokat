import React, { useState } from 'react';
import Game from '../Game';
import { GameProvider } from '../Game/GameContext';
import GameNavigation from '../Game/Navigation/game-navigation';
import './index.scss'

interface MainScreenProps {
}

const MainScreen: React.FC<MainScreenProps> = ({ }) => {
    const [activeTab, setActiveTab] = useState(0);
    return (
        <div className='gameplay'>
            <GameNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
            {/* cupCount={100} coinCount={10} */}
            <section className='main-screen'>
                <h1 className='game'>У Самоката появилась доставка по морю на яхтах!</h1>
                <p>Доставьте заказы вовремя и получите дополнительный билетик!</p>
                <GameProvider>
                    <Game />
                </GameProvider>

            </section>
        </div>
    );
};

export default MainScreen;
