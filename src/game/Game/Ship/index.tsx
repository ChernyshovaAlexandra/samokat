import React, { useEffect, useState } from "react";
import { Sprite, useTick } from "@pixi/react";
import shipImage from './ship.png';
import * as PIXI from 'pixi.js';

interface ShipProps {
  shipPosition: { x: number; y: number };
  speed: number;
  isAnimating: boolean;
  onShipPositionChange: (position: { x: number; y: number, width: number, height: number }) => void;
}

const Ship: React.FC<ShipProps> = ({ shipPosition, speed, isAnimating, onShipPositionChange }) => {
  const [shipX, setShipX] = useState(shipPosition.x);
  const [leftPressed, setLeftPressed] = useState(false);
  const [rightPressed, setRightPressed] = useState(false);

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
  const minShipX = containerWidth * 0.2;
  const maxShipX = containerWidth * 0.6;
  useTick(() => {
    if (leftPressed) {
      const newShipX = shipX - speed;
      const clampedX = Math.max(minShipX, newShipX); // Clamp ship's x position to the left boundary
      setShipX(clampedX);
      onShipPositionChange({ x: clampedX, y: shipPosition.y, width: 64, height: 128 });
    }

    if (rightPressed) {
      const newShipX = shipX + speed;
      const clampedX = Math.min(maxShipX, newShipX); // Clamp ship's x position to the right boundary
      setShipX(clampedX);
      onShipPositionChange({ x: clampedX, y: shipPosition.y, width: 64, height: 128 });
    }
  });


  const texture = PIXI.Texture.from(shipImage);
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return (
    <>
      <Sprite texture={texture} anchor={[0, 0]} x={shipX} y={300} width={64} height={128} />
    </>
  );
};

export default Ship;
