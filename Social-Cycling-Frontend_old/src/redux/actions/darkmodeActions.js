import { TOGGLE_DARKMODE, ADD_DARKMODE, REMOVE_DARKMODE } from './types';

const body = document.querySelector('html');

export const toggleDarkmode = () => (dispatch) => {
    body.classList.toggle('darkTheme')
    let darkmode = JSON.parse(localStorage.getItem('darkmode'))
    localStorage.setItem('darkmode', JSON.stringify(!darkmode))
    dispatch({ type: TOGGLE_DARKMODE })
}
export const addDarkmode = () => (dispatch) => {
    body.classList.add('darkTheme')
    localStorage.setItem('darkmode', 'true')
    dispatch({ type: ADD_DARKMODE })
}
export const removeDarkmode = () => (dispatch) => {
    body.classList.remove('darkTheme')
    localStorage.setItem('darkmode', 'false')
    dispatch({ type: REMOVE_DARKMODE })
}