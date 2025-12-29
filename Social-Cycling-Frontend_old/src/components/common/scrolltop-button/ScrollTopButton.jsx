import React from 'react';
import { scrollTop } from '../../../utils';

import './scrolltopbutton.scss';

const ScrollTopButton = () => {
    return (
        <div className="scroll-top">
            <button onClick={scrollTop}>
                <i className="fas fa-arrow-up"></i>
            </button>
        </div>
    )
}

export default ScrollTopButton
