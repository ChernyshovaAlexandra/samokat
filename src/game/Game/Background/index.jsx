import { Sprite, useTick } from "@pixi/react";
import React, { useState } from "react";
import bg from './background.jpg';
import * as PIXI from 'pixi.js';

const Game = ({ isAnimating }) => {
  const [y1, setY1] = useState(1016);
  const [y2, setY2] = useState(508); // Set the initial position of the second sprite below the first sprite
  const [y3, setY3] = useState(0); // Set the initial position of the third sprite below the second sprite


  const speed = 3; // Adjust the value to control the movement speed

  useTick((delta) => {
    if (isAnimating) {

      setY1((prevY1) => prevY1 + speed * delta);
      setY2((prevY2) => prevY2 + speed * delta);
      setY3((prevY3) => prevY3 + speed * delta);

      if (y1 >= 1016) {
        setY1((prevY1) => prevY1 - 508);
      }

      if (y2 >= 508) {
        setY2((prevY2) => prevY2 - 508);
      }

      if (y3 >= 0) {
        setY3((prevY3) => prevY3 - 508);
      }
    }
  });

  const texture = PIXI.Texture.from(bg);
  texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;


  return (
    <>
      <Sprite texture={texture} anchor={0.5} x={160} y={y1} height={508} width={320} />
      <Sprite texture={texture} anchor={0.5} x={160} y={y2} height={508} width={320} />
      <Sprite texture={texture} anchor={0.5} x={160} y={y3} height={508} width={320} />

    </>
  );
};

export default Game;
