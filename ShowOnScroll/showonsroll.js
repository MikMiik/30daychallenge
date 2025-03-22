const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const home = $('#home');
const homeContent = $('.home-content');
const box1 = $('.box1');
const box2 = $('.box2');
const boxMembers = [...$$('.box-member')];

function animation(element, elementCdn, animation) {
    if (!(elementCdn.top > window.innerHeight || elementCdn.bottom < 0)) {
        element.style.animation = animation;
    } else {
        element.style.animation = '';
    }
}
document.addEventListener('scroll',() => {
    const homeContentCdn = homeContent.getBoundingClientRect();
    const box1Cdn = box1.getBoundingClientRect();
    const box2Cdn = box2.getBoundingClientRect();
   
    animation(homeContent, homeContentCdn, 'slideIn 1s ease-in-out');
    animation(box1, box1Cdn, 'fromLeft 1s ease-in-out');
    animation(box2, box2Cdn, 'fromRight 1s ease-in-out');
    boxMembers.forEach((boxMember) => {
        const boxMemberCdn = boxMember.getBoundingClientRect();
        animation(boxMember, boxMemberCdn, 'fadeIn 0.5s ease-in-out');
    })
})
