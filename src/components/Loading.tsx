import React from 'react';
import Lottie from 'react-lottie'
import animationData from '../assets/loading-animation.json';

interface LoadingProps {
    height?: number
}

const Loading: React.FC<LoadingProps> = ({ height }) => {
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

Loading.defaultProps = {
    height: 400
}

export default Loading;
