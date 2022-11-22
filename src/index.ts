import './styles.css';

window.addEventListener('load', () => {
    const header = document.createElement('h1');
    header.innerText = 'HELLOWE '

    const content = document.querySelector('#content');
    content.appendChild(header);
})