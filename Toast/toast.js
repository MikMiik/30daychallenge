const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const btnsNode = $$('.toasts-container button');
const btns = Array.from(btnsNode);
const toastslist = $('.toasts-list');

function renderToast(status) {
    const li = document.createElement('li');
    switch (status) {
        case 'success':
            li.innerHTML = `
                <i class="fa-solid fa-circle-check"></i>
                <span>This is a ${status} message</span>
                <div class="timeline ${status}"></div>
            `
            li.style.background = 'var(--success-light-color)'
            li.style.borderLeft = '5px solid var(--success-color)'
        break;
        case 'warning':
            li.innerHTML = `
                <i class="fa-solid fa-circle-exclamation"></i>
                <span>This is a ${status} message</span>
                <div class="timeline ${status}"></div>
            `
            li.style.background = 'var(--warning-light-color)'
            li.style.borderLeft = '5px solid var(--warning-color)'
        break;
        case 'error':
            li.innerHTML = `
                <i class="fa-solid fa-triangle-exclamation"></i>
                <span>This is a ${status} message</span>
                <div class="timeline ${status}"></div>
            `
            li.style.background = 'var(--error-light-color)'
            li.style.borderLeft = '5px solid var(--error-color)'
        break;
    }
    toastslist.appendChild(li);
    setTimeout(() => {
        li.style.animation = 'hide-toast 1.5s ease forwards'
    }, 4000)
    setTimeout(() => {
        li.remove();
    }, 7000)
}

btns.forEach((btn) => {
    btn.addEventListener('click', () => {
        if (btn.classList.contains('toast-success')) {
            renderToast('success')
        }
        if (btn.classList.contains('toast-warning')) {
            renderToast('warning')
        }
        if (btn.classList.contains('toast-error')) {
            renderToast('error')
        }
    })
})