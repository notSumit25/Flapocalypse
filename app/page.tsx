'use client'
import React, { useEffect, useRef } from 'react';
import { RoomManager } from './Managers/RoomManager';

const SinglePlayer: React.FC = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    let roomManager: RoomManager;

    useEffect(() => {
        if (canvasRef.current) {
            const context = canvasRef.current.getContext('2d');
            if (context) {
                roomManager = new RoomManager(context, canvasRef.current.height);
                roomManager.addBird(100,100);
                roomManager.gameLoop();
            }
        }
    }, []);

    return (
        <div className='flex justify-center items-center h-screen w-full'>
            <h1 className='select-none'>Single Player</h1>
            <canvas ref={canvasRef} width={800} height={600}></canvas>
        </div>
    );
};

export default SinglePlayer;