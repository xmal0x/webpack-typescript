import './styles.css';

interface IPost {
    body: string,
    id: number,
    title: string,
    userId: number
}

interface IComment {
    postId: number,
    id: number,
    name: string,
    email: string,
    body: string
}

const commentsUrl = 'https://jsonplaceholder.typicode.com/comments';
const postsUrl = 'https://jsonplaceholder.typicode.com/posts'

window.addEventListener('load', () => {
    addListeners();
    getDataAndAddToContainer<IPost>(postsUrl, getPost);
})

function addListeners(): void {
    const postsButton = document.querySelector('#postsBtn');
    const commentsButton = document.querySelector('#commentsBtn');

    postsButton.addEventListener('click', () => {
        getDataAndAddToContainer<IPost>(postsUrl, getPost);
    });
    commentsButton.addEventListener('click', async() => {
        getDataAndAddToContainer<IComment>(commentsUrl, getComment);
    });
}

async function fetchData<T>(url: string, limit: number = 20): Promise<T> {
    return await fetch(`${url}?_limit=${limit}`)
        .then(async response => await response.json())
}

async function getDataAndAddToContainer<T>(url: string, formatDataCallback: (v: T) => string): Promise<void> {
    const response = await fetchData<T[]>(url);
    const formattedData = response.map((v: T) => formatDataCallback(v)).join('\n');
    addToContainer(formattedData);
}

function getPost(post: IPost): string {
    return `
        <div class="card">
            <h4 class="card-title">${post.title}</h4>
            <p class="card-body">${post.body}</p>
        </div>
    `
}

function getComment(comment: IComment): string {
    return `
        <div class="card">
            <h4 class="card-title">${comment.name}</h4>
            <p class="card-body">${comment.email}</p>
            <p class="card-body">${comment.body}</p>
        </div>
    `
}

function addToContainer(data: string): void {
    const container = document.querySelector('#container') as HTMLElement;
    container.style.opacity = '0';
    setTimeout(() => {
        container.innerHTML = data;
        container.style.opacity = '1';
    }, 300)
}