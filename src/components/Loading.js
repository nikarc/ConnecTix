import React from 'react';
import Lottie from 'react-lottie'
import animationData from '../assets/loading-animation.json';

export default function Loading ({ height }) {
    const defaultAnimationOptions = {
        loop: true,
        autoplay: true,
        animationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid'
        }
    };

    return (
        <div className="loading">
            <Lottie
                options={defaultAnimationOptions}
                height={height}
            />
        </div>
    )
}
