import React, { useState, useEffect } from "react";
import "./index.scss";
import TicketsCollected from "../TicketsCollected";

const UserAccount: React.FC = () => {
    const time = 24 * 3600;
    const [timeLeft, setTimeLeft] = useState<number>(time);
    // Function to format time to hh:mm:ss format
    const formatTime = (time: number): string => {
        const hours = Math.floor(time / 3600);
        const minutes = Math.floor((time % 3600) / 60);
        const seconds = time % 60;

        const hh = hours.toString().padStart(2, "0");
        const mm = minutes.toString().padStart(2, "0");
        const ss = seconds.toString().padStart(2, "0");

        return `${hh}:${mm}:${ss}`;
    };
    useEffect(() => {


        // Update timer every second
        const timer = setInterval(() => {
            setTimeLeft((prevTime) => {
                if (prevTime > 0) {
                    return prevTime - 1;
                } else {
                    clearInterval(timer);
                    // Here you can trigger any additional actions when the timer reaches 0
                    // For example, you can reset the timer or perform some other action.
                    return 0;
                }
            });
        }, 1000);

        // Clear the interval when the component unmounts
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="user-account">
            <div>
                <h1>До начисления билетиков за покупки в приложении Самокат</h1>
                <div className="timer text-pink">{formatTime(timeLeft)}</div>
            </div>
            <div className="tickets-section">
                <div className="ticket">
                    <h3 className="ticket-ammount">80</h3>
                    <p>билетиков</p>
                </div>
                <p>Совершайте покупки на сумму от 700 руб в приложении Самокат и получайте дополнительные билетики</p>
                <a href="https://web.samokat.ru/?utm_source=yacht_game" className="btn">За покупками</a>
            </div>
            <div className="friends-section">
                <h2>Приглашай друзей</h2>
                <p>Отправляй ссылку друзьям - и получай дополнительные билетики</p>
                <div className="badges">
                    <div className="badge">+1 билетик за регистрацию каждого друга</div>
                    <div className="badge">+2 билетика за покупку друга</div>
                </div>
                <button className="btn white">Скопировать ссылку
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                        <rect x="5" y="3" width="10" height="14" rx="3" stroke="#999999" strokeWidth="1.5" />
                        <path d="M17.5 7.40137C18.3967 7.92008 19 8.8896 19 10V18C19 19.6569 17.6569 21 16 21H12C10.8896 21 9.92008 20.3967 9.40137 19.5" stroke="#999999" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </button>
            </div>
            <div className="ticket-timeline">
                <h2>Получай дополнительные подарки за собранные билетики</h2>
                <TicketsCollected />
            </div>
            <div className="revenue-section">
                <h2>История начислений</h2>
                <div className="revenue-story">
                    <div className="revenue-story-item">
                        <h3>Покупка в приложении самокат 20.08.23</h3>
                        <p className="text-pink">+10 билетиков</p>
                    </div>
                    <div className="revenue-story-item">
                        <h3>Игра</h3>
                        <p className="text-pink">+1 билетик</p>
                    </div>
                    <div className="revenue-story-item">
                        <h3>Регистрация друга</h3>
                        <p className="text-pink">+2 билетика</p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserAccount;
