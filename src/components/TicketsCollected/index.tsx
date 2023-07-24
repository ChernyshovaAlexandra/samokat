import React, { useState, useEffect } from "react";
import "./index.scss";

const TicketsCollected: React.FC = () => {
    const [tickets, setTickets] = useState(20);
    const [wW, setWindowW] = useState(window.innerWidth)
    // Function to update active circles based on the number of tickets


    return (
        <div className="arrow-container">
            <div className="arrow" >
                <div className="pb-auto"></div>
                <div className="progress-bar" style={{ background: `linear-gradient(${wW > 840? '45deg' : '180deg'}, #ff005b ${(100 / 50) * tickets}%, transparent ${((100 / 50) * tickets)}%)` }} />
                <div className={`circle ${tickets >= 15 ? "active" : ""}`}>
                    <h4>15</h4>
                    <p>билетиков</p>
                    <div className={`${tickets >= 15 ? 'active' : ''} badge pink`}>Промокод на скидку 20%</div>
                </div>

                <div className={`circle ${tickets >= 25 ? "active" : ""}`}>
                    <h4>25</h4>
                    <p>билетиков</p>
                    <div className={`${tickets >= 25 ? 'active' : ''} badge pink`}>Промокод на скидку 300 руб</div>

                </div>
                <div className={`circle ${tickets >= 50 ? "active" : ""}`}>
                    <h4>50</h4>
                    <p>билетиков</p>
                    <div className={`${tickets >= 50 ? 'active' : ''} badge pink`}>Промокод на скидку 500 руб</div>
                </div>


            </div>
        </div >
    );
};

export default TicketsCollected;