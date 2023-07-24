import { Sprite, useTick } from "@pixi/react";
import React, { useEffect, useState } from "react";
import bg from './background.jpg';
import * as PIXI from 'pixi.js';

const Game = ({ isAnimating, clearBg, setIsAnimating }) => {
  const spriteHeight = 4800; // Высота вашего фона
  const containerWidth = 320; // Ширина контейнера, в котором происходит отображение фона
  const containerHeight = 640; // Высота контейнера, в котором происходит отображение фона
  const speed = 1450 / containerHeight; // Скорость прокрутки фона за 30 секунд

  // 4800 / 30000
  const [y, setY] = useState(-spriteHeight + containerHeight);

  useTick((delta) => {
    if (isAnimating) {
      setY((prevY) => prevY + speed * delta); // Плавно прокручиваем фон вниз

      // Если спрайт достиг нижней границы контейнера, возвращаем его вверх
      if (y >= -5) {
        setIsAnimating(false);
        // setY(-spriteHeight + containerHeight);
      }
    }
  });
  useEffect(() => {
    if (clearBg) {
      setY(-spriteHeight + containerHeight)
    }
  }, [clearBg])
  const texture = PIXI.Texture.from(bg);
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  return (
    <>
      <Sprite texture={texture} anchor={0} x={0} y={y} height={spriteHeight} width={containerWidth} />
    </>
  );
};

export default Game;
