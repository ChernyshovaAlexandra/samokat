import React, { useEffect, useState } from "react";
import { Sprite, useTick } from "@pixi/react";
import shipImage from './ship.png';
import shipImage2 from './ship2.png';
import * as PIXI from 'pixi.js';

interface ShipProps {
  shipPosition: { x: number; y: number };
  speed: number;
  isAnimating: boolean;
  isColliding: boolean;
  onShipPositionChange: (position: { x: number; y: number, width: number, height: number }) => void;
}

const Ship: React.FC<ShipProps> = ({ shipPosition, speed, isAnimating, onShipPositionChange, isColliding }) => {
  const [shipX, setShipX] = useState(shipPosition.x);
  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);
  const ShipWidth = 64;
  const [shipRotation, setShipRotation] = useState(0); // Состояние для угла поворота корабля

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isAnimating) {
      if (event.key === 'ArrowLeft') {
        setLeftPressed(true);
      }

      if (event.key === 'ArrowRight') {
        setRightPressed(true);
      }
    }
  };

  const handleKeyUp = (event: KeyboardEvent) => {
    if (event.key === 'ArrowLeft') {
      setLeftPressed(false);
    }
    setShipRotation(0)
    if (event.key === 'ArrowRight') {
      setRightPressed(false);
    }
  };

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isAnimating]);

  const containerWidth = 320; // Set the container's width here (replace with your actual container width)
  const minShipX = 0;
  const maxShipX = containerWidth - ShipWidth;

  useTick(() => {
    if (leftPressed) {
      const newShipX = shipX - speed;
      const clampedX = Math.max(minShipX, newShipX); // Clamp ship's x position to the left boundary
      setShipX(clampedX);
      onShipPositionChange({ x: clampedX, y: shipPosition.y, width: 64, height: 128 });
      const maxRotation = 0;
      const minRotation = -.2;
      let rotation = shipX / maxShipX * minRotation; // Вычисляем угол в зависимости от положения корабля
      rotation = Math.min(maxRotation, rotation);
      rotation = Math.max(minRotation, rotation);
      // Вращение корабля на 2 градуса против часовой стрелки
      setShipRotation(rotation);
    }

    if (rightPressed) {
      const newShipX = shipX + speed;
      const clampedX = Math.min(maxShipX, newShipX); // Clamp ship's x position to the right boundary
      setShipX(clampedX);
      onShipPositionChange({ x: clampedX, y: shipPosition.y, width: 64, height: 128 });

      // Вращение корабля на 2 градуса по часовой стрелке

      const maxRotation = .2;
      const minRotation = 0;
      let rotation = shipX / maxShipX * maxRotation; // Вычисляем угол в зависимости от положения корабля
      rotation = Math.min(maxRotation, rotation);
      rotation = Math.max(minRotation, rotation);

      // Вращаем корабль вправо, если rotateRight === true
      // Обновляем угол поворота корабля
      setShipRotation(rotation);
    }
  });

  const texture = PIXI.Texture.from(shipImage);
  const texture2 = PIXI.Texture.from(shipImage2);
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
  texture2.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return (
    <>
      <Sprite
        texture={isColliding ? texture2 : texture}
        anchor={[0.5, 0.5]} // Центрирование точки вращения в центре корабля
        x={shipX}
        y={300}
        width={64}
        height={240}
        rotation={shipRotation} // Устанавливаем угол поворота корабля
      />
    </>
  );
};

export default Ship;
