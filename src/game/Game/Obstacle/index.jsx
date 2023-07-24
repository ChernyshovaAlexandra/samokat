import React, { useState, useEffect } from 'react';
import { Sprite, useTick } from "@pixi/react";
import * as PIXI from 'pixi.js'

const Obstacle = ({ x, y, speed, isAnimating, onObstaclePositionChange, index, width, height, texture }) => {
    const [obstacleY, setObstacleY] = useState(y);

    useTick(() => {
        if (isAnimating) { setObstacleY((prevY) => prevY + speed); }
        onObstaclePositionChange(index, { x: x, y: obstacleY });
    });
    const textureCur = PIXI.Texture.from(texture);
    textureCur.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;
    return (
        <>
            <Sprite texture={textureCur} anchor={0.5} x={x} y={obstacleY} width={width} height={height} />
        </>
    );
};

export default Obstacle;