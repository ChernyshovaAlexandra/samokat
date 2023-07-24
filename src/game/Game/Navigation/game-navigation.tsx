import React from "react"
import logo from '../../../assets/images/logoPink.svg'
import logout from '../../../assets/images/Logout.svg'
import './index.scss';
import { number } from "prop-types";


interface GameNavigationProps {
    activeTab: number;
    setActiveTab: (val: number) => void;
    handleLogout: () => void;
    phoneNumber: string;
}

const GameNavigation: React.FC<GameNavigationProps> = ({ activeTab, setActiveTab, handleLogout, phoneNumber }) => {
    const tabs = ['Личный кабинет', 'Игра']
    return (
        <nav className="game_nav">
            <div className="flex game_nav-flex">
                <div className="logo">
                    <img src={logo} />
                </div>
                <div className="tabs flex">
                    {tabs.map((tab, id) => (
                        <div className={`tab ${activeTab === id ? 'active' : ''}`} key={id} onClick={() => setActiveTab(id)}>{tab}</div>
                    ))}
                </div>
                <div className="settings flex">
                    <div className="score">408 баллов</div>
                    {/* <div className="phone">{phoneNumber}</div> */}
                    <div className="phone">+7 9** *** ** 07</div>
                    <div className="logout" onClick={() => handleLogout()}>
                        <img src={logout} alt="" />
                    </div>
                </div>
            </div>
        </nav>
    )
}

export default GameNavigation;