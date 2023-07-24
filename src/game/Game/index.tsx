import React, { useContext, useEffect, useState } from 'react';
import { Container, Stage } from '@pixi/react';
import { Rectangle } from '@pixi/math';
import Background from './Background';
import Ship from './Ship';
import Obstacle from './Obstacle';
import './game.scss';
import { GameContext, ObstacleType } from './GameContext';
import Message from '../../components/Message';
import { obstacleTypes } from './game_parametres';
import Countdown from './Countdown';

const Game: React.FC = () => {
    const {
        isAnimating,
        setIsAnimating,
        shipPosition,
        setIsGameOver,
        handleStartAnimation,
        handleStopAnimation,
        isGameOver,
    } = useContext(GameContext);
    const [gameStart, setGameIsNotOnStart] = useState(true)
    const [gameObstacles, setGameObstacles] = useState<ObstacleType[]>([]);
    const [shipRect, setShipRect] = useState(shipPosition);
    const [timer, setTimer] = useState(30); // 30-second timer
    const [clearBg, clear] = useState(false)
    const [countdown, showCountdown] = useState(false)
    const [isColliding, setIsColliding] = useState(false); // Состояние для отслеживания столкновения

    const addObstacle = () => {
        const randomTypeIndex = Math.floor(Math.random() * obstacleTypes.length);
        const obstacleType = obstacleTypes[randomTypeIndex];

        const containerWidth = 320; // Set the container's width here (replace with your actual container width)
        const minObstacleX = containerWidth * 0.15; // 10% of the container's width
        const maxObstacleX = containerWidth * 0.65; // 90% of the container's width

        const randomX = Math.random() * (maxObstacleX - minObstacleX) + minObstacleX;
        const randomY = -obstacleType.height; // Start the obstacle above the stage

        const obstacle: ObstacleType = {
            x: randomX,
            y: randomY,
            width: obstacleType.width,
            height: obstacleType.height,
            speed: obstacleType.speed,
            texture: obstacleType.texture,
        };
        setGameObstacles((prevObstacles) => [...prevObstacles, obstacle]);
    };

    useEffect(() => {
        if (isAnimating) {
            const interval = setInterval(addObstacle, 2000); // Add an obstacle every 2 seconds
            return () => {
                clearInterval(interval);
            };
        }
    }, [isAnimating]);

    useEffect(() => {
        const checkCollisions = () => {
            const shipObj = new Rectangle(
                shipRect.x,
                shipRect.y,
                shipRect.width,
                shipRect.height
            );

            for (let i = 0; i < gameObstacles.length; i++) {
                const obstacle = gameObstacles[i];
                const obstacleRect = new Rectangle(
                    obstacle.x,
                    obstacle.y,
                    obstacle.width,
                    obstacle.height
                );

                const isIntersecting = shipObj.intersects(obstacleRect);
                if (isIntersecting) {
                    setIsColliding(true);
                    setIsAnimating(false);
                    setTimeout(() => {
                        setIsGameOver(true);
                    }, 1000)
                    break;
                }
            }
        };

        const gameLoop = () => {
            if (!isAnimating) return;
            checkCollisions();
        };

        const animationFrame = requestAnimationFrame(gameLoop);

        return () => {
            cancelAnimationFrame(animationFrame);
        };
    }, [isAnimating, gameObstacles, shipRect, setIsGameOver, setIsAnimating]);

    const handleObstaclePositionChange = (
        index: number,
        position: { x: number; y: number }
    ) => {
        setGameObstacles((prevObstacles) => {
            const updatedObstacles = [...prevObstacles];
            updatedObstacles[index] = {
                ...updatedObstacles[index],
                ...position,
            };
            return updatedObstacles;
        });
    };

    const handleShipPositionChange = (position: { x: number; y: number, width: number, height: number }) => {
        setShipRect(position);
    };

    const handleNewGame = () => {
        clear(true);
        setGameObstacles([]); // Clear the obstacles
        setShipRect(shipPosition); // Reset the ship position
        setTimer(30); // Reset the timer
        setIsGameOver(false);
        setIsAnimating(false);
    };

    useEffect(() => {
        if (isAnimating && timer > 0) {
            const countdown = setInterval(() => {
                setTimer((prevTimer) => prevTimer - 1);
            }, 1000);

            return () => {
                clearInterval(countdown);
            };
        }
    }, [isAnimating, timer]);
    useEffect(() => {
        if (!gameStart) {
            showCountdown(true)
            setTimeout(() => {
                handleStartAnimation();
            }, 3000)
        }
    }, [gameStart])

    return (
        <>
            <div className="relative game_container">
                {gameStart ? <Message position="center">
                    <h3>Капитан, добро <br />пожаловать
                        на борт! </h3>
                    <p>Вам надо доставить заказ за&nbsp;30&nbsp;секунд.
                        Не забывайте объезжать препятствия</p>
                    <div className="btn" onClick={() => {
                        setGameIsNotOnStart(false);
                    }}>Начать</div>
                </Message> : null}
                {countdown ? <Countdown /> : <></>}
                <nav className='game_inner_nav'>
                    <div className='timer flex'>
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
                            <circle cx="12" cy="14" r="9" stroke="#FF005B" strokeWidth="1.5" />
                            <path d="M10 2H14" stroke="#FF005B" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M12 2L12 5" stroke="#FF005B" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M12 14L15 11" stroke="#FF005B" strokeWidth="1.5" strokeLinecap="round" />
                            <path d="M18.5 7L19 6.5" stroke="#FF005B" strokeWidth="1.5" strokeLinecap="round" />
                        </svg>

                        <p className="text-pink">00:{timer.toString().padStart(2, '0')}</p>
                    </div>
                </nav>
                <Stage width={320} height={640} options={{ backgroundColor: 0x000000 }}>
                    <Container>
                        <Background setIsAnimating={setIsAnimating} isAnimating={isAnimating} clearBg={clearBg} />
                        {gameObstacles.map((obstacle, index) => (
                            <Obstacle
                                index={index}
                                onObstaclePositionChange={handleObstaclePositionChange}
                                key={index}
                                x={obstacle.x}
                                y={obstacle.y}
                                width={obstacle.width}
                                height={obstacle.height}
                                speed={obstacle.speed}
                                texture={obstacle.texture}
                                isAnimating={isAnimating}
                            />
                        ))}
                        <Ship
                            isColliding={isColliding}
                            shipPosition={shipPosition}
                            speed={1}
                            isAnimating={isAnimating}
                            onShipPositionChange={handleShipPositionChange}
                        />
                    </Container>
                </Stage>
                {isGameOver && (
                    <Message
                        text="Ты проиграл"
                        position="center"
                        // buttonText="Еще"
                        // onClick={handleNewGame}
                    />
                )}
                {!isGameOver && timer === 0 && (
                    <Message
                        text="Ты выиграл"
                        position="center"
                        // buttonText="Еще"
                        // onClick={handleNewGame}
                    />
                )}
                {/*  */}

                {/* <div className="flex">
                    <button className="btn" onClick={handleStartAnimation}>
                        Start
                    </button>
                    <button className="btn" onClick={handleStopAnimation}>
                        Stop
                    </button>
                </div> */}
            </div>
        </>
    );
};

export default Game;
