import React from 'react';

const { REACT_APP_SITE_NAME: SITE_NAME } = process.env;

const waveSvg = '<svg className="wave" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path d="M0,96L48,96C96,96,192,96,288,90.7C384,85,480,75,576,74.7C672,75,768,85,864,117.3C960,149,1056,203,1152,213.3C1248,224,1344,192,1392,176L1440,160L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>';

export default function Footer () {
    return (
        <footer style={{ backgroundImage: `url("data:image/svg+xml,${waveSvg}")` }}>
            <h1 id="BrandName">{SITE_NAME}</h1>
        </footer>
    );
}
