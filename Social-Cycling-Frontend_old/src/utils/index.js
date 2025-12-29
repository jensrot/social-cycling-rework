import axios from "axios";
import { toast } from "react-toastify";

import 'react-toastify/dist/ReactToastify.css';

/** 
 * Set the token we get from JWT as default header token.
 * That way we can enter private routes.
 * @param {string} token 
 */
export const setAuthToken = token => {
    if (token) {
        // Apply to every request
        axios.defaults.headers.common["Authorization"] = token;
    } else {
        // Delete authorization header
        delete axios.defaults.headers.common["Authorization"];
    }
};

/** Copy to clipboard.
 *  @param {string} value
 */
export const copyToClipboard = value => {
    const $textarea = document.createElement('textarea');
    $textarea.value = value;
    document.body.appendChild($textarea);
    $textarea.select();
    document.execCommand('copy');
    document.body.removeChild($textarea);
};

/** Smooth scroll to a specific element on the page.
 *  @param {HTMLElement} element
 */
export const smoothScroll = element => {
    document.querySelector(element).scrollIntoView({
        behavior: 'smooth'
    });
}

/** Change the container style based on the 
 *  amount of posts created.
 *  @param {Array<Object>} posts
 *  @returns {string} style 
 */
export const generateFlexContainer = (posts) => {
    const amountOfPosts = 5;
    let style = "";
    if (posts.length === amountOfPosts) {
        return style = "space-between";
    }
    return style = "initial";
}

toast.configure();

/** 
 * Generate a toast.
 * @param {('info'|'success'|'warning'|'error'|'dark'|'default')} type - Allowed values 
 * @param {string} message 
 * @param {number} waitTime
 * @returns {Function} toast
 */
export const generateToast = (type, message, waitTime) => {
    if (type === "info") {
        return toast.info(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: waitTime,
        });
    } else if (type === "success") {
        return toast.success(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: waitTime,
        });
    } else if (type === "warning") {
        return toast.warning(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: waitTime,
        });
    } else if (type === "error") {
        return toast.error(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: waitTime,
        });
    } else if (type === "dark") {
        return toast.dark(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: waitTime,
        });
    } else if (type === "default") {
        return toast(message, {
            position: toast.POSITION.TOP_RIGHT,
            autoClose: waitTime,
        });
    }
}

/** Smooth scroll to the top of the window.
 *  @returns {Window} window
 */
export const scrollTop = () => {
    return window.scroll({ top: 0, left: 0, behavior: "smooth" });
}
