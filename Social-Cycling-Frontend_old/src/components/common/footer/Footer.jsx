import React from 'react';
import './footer.scss';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer__container">
                <p>Copyright © {new Date().getFullYear()} {" "}
                    <a href="https://github.com/jensrott/Social-Cycling" target="blank">
                        Social Cycling
                    </a>
                </p>
            </div>
        </footer>
    )
}

export default Footer

