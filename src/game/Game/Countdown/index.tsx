import React, { useState, useEffect } from "react";
import Message from "../../../components/Message";

const Countdown: React.FC = () => {
    const [count, setCount] = useState(3);

    useEffect(() => {
        const timer = setInterval(() => {
            setCount((prevCount) => prevCount - 1);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);

    return (
        <>
            {count > 0 &&
                <Message position='center countdown'>
                    <h1>{count}</h1>
                </Message>
            }
        </>
    );
};

export default Countdown;
