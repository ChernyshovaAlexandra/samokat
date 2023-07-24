import { useState } from 'react'
import logo from '../assets/images/Logo.svg'
import Message from '../components/Message'
import MainScreen from '../game/MainScreen';


interface LandingProps {
    setLoginStart: (value: boolean) => void;
    isCodeVerified: boolean;
    handleLogout: () => void;
    phoneNumber: string;
    setActiveTab: (num: number) => void;
    activeTab: number;
}


const Landing: React.FC<LandingProps> = ({ setLoginStart, isCodeVerified, handleLogout, phoneNumber, setActiveTab, activeTab }) => {
    const [rules, showRules] = useState(false)
    return (
        <div className={`landing-container relative ${isCodeVerified ? 'verified' : ''} ${activeTab === 0 ? 'full' : ''}`}>
            {rules && (
                <Message
                    text="Правила акции"
                    position="center"

                >
                    <p><b>Вот как можно выиграть призы:</b></p>
                    <ul>
                        <li>Зарегистрируйтесь на сайте</li>
                        <li>Делайте заказы в приложении на сумму от <span className="text-pink">700 рублей</span></li>
                        <li>Получай <span className="text-pink">5 билетиков</span> за каждую покупку</li>
                        <li>Участвуйте в розыгрыше морской прогулки на парусной яхте от <span className="text-pink">Силы Ветра</span></li>
                        <li>Доставляйте заказы в игре и зарабатывайте дополнительные билетики</li>
                        <li>Приглашайте друзей и увеличивайте шансы на победу</li>
                    </ul>
                    <div className="btn text-center rules-btn text-white" onClick={() => showRules(false)}>Понятно</div>
                    <a href="" className="fullRules">Полные правила акции</a>
                </Message>
            )}
            <div className="landing-content container">
                {isCodeVerified ?
                    <section className="main_content">
                        <MainScreen handleLogout={handleLogout} phoneNumber={phoneNumber} activeTab={activeTab} setActiveTab={setActiveTab} />
                    </section>
                    :
                    <section className="main_content">
                        <div className="landing-logo">
                            <img src={logo} alt="Логотип" className="" />
                        </div>
                        <h1 className="landing-title">Выиграйте морскую прогулку <br />
                            в Сочи от Силы Ветра</h1>
                        <p className="landing-text">
                            Доставляйте заказы в игре и зарабатывайте дополнительные билетики
                        </p>
                        <div className="landing-buttons">

                            <button className="btn block landing-button">Участвовать</button>
                            <button className="btn white block landing-button" onClick={() => setLoginStart(true)}>Войти</button>
                        </div>
                    </section>
                }
                <footer>
                    <p className="landing-disclaimer">
                        Зона, время, товары и предложения доставки ограничены. Организатор, продавец ООО
                        «Умный ритейл» ОГРН 1177847261602, 192019, Санкт‑Петербург, улица Седова, дом 11, Литер
                        А, этаж 6, помещение 627. Информационные услуги оказываются ООО «Умное пространство»
                        ОГРН 1137847232852, 192019, Санкт-Петербург, улица Седова, дом 11, литер А
                    </p>
                    <div className="landing-menu flex">
                        <div className="landing-menu-item" onClick={() => showRules(true)}>Правила акции</div>
                        <div className="landing-menu-item">Политика конфиденциальности</div>
                        <div className="landing-menu-item">Лицензионное соглашение</div>
                    </div>
                </footer>

            </div>
        </div>
    )
}


export default Landing
