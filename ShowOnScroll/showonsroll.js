const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const home = $('#home');
const homeContent = $('.home-content');
const box1 = $('.box1');
const box2 = $('.box2');
const boxMembers = [...$$('.box-member')];
document.addEventListener('scroll',() => {
    const homeContentCdn = homeContent.getBoundingClientRect();
    const box1Cdn = box1.getBoundingClientRect();
    console.log(box1Cdn)
    const box2Cdn = box2.getBoundingClientRect();
   
    if (homeContentCdn.bottom < 0) {
        homeContent.style.animation = '';
    } else {
        homeContent.style.animation = 'slideIn 1s ease-in-out';
    }
    if ((box1Cdn.top > 0 && box1Cdn.top < window.innerHeight) || (box1Cdn.bottom > 0 && box1Cdn.bottom < window.innerHeight)) {
        box1.style.animation = 'fromLeft 1s ease-in-out';
    } else {
        box1.style.animation = '';
    }
    if ((box2Cdn.top > 0 && box2Cdn.top < window.innerHeight) || (box2Cdn.bottom > 0 && box2Cdn.bottom < window.innerHeight)) {
        box2.style.animation = 'fromRight 1s ease-in-out';
    } else {
        box2.style.animation = '';
    }
    boxMembers.forEach((boxMember) => {
        const boxMemberCdn = boxMember.getBoundingClientRect();
        if ((boxMemberCdn.top > 0 && boxMemberCdn.top <  window.innerHeight) || (boxMemberCdn.bottom > 0 && boxMemberCdn.bottom < window.innerHeight)) {
            boxMember.style.animation = 'fadeIn 0.5s ease-in-out';
        } else {
            boxMember.style.animation = '';
        }
    })
})
