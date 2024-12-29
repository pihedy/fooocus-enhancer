/** 
 * @author: Pihedy 
 */

import { gradioApp } from "../components/gradioApp";

/**
 * It adds a tiny flag about the app.
 */
document.addEventListener('fooocus-enhancer-ready', () => {
    let Separator = document.createElement('div');
    let Author = document.createElement('a');

    Separator.textContent = '·';
    Separator.className = 'svelte-1ax1toq';

    Author.textContent = 'Fooocus Enhancer by Pihedy';
    Author.className = 'svelte-1ax1toq';
    Author.href = '#';

    let Footer = gradioApp().getTag('footer');

    Footer?.appendChild(Separator);
    Footer?.appendChild(Author);
});