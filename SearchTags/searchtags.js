let tags = JSON.parse(localStorage.getItem('tags')) || [];
const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);
const input = $('.content input');
const tagsUl = $('.content ul');

renderTags(tags, tagsUl)
input.addEventListener('keydown',(e) => {
  if (e.key === 'Enter') {
    let matchingvalue ='';
    tags.forEach((tag) => {
      if (tag.value === input.value) {
        matchingvalue = input.value;
      }
    })
    if (matchingvalue) {
      input.value = '';
      renderTags(tags, tagsUl)
    } else {
      tags.push({
        value : input.value
      })
  
      input.value = '';
      renderTags(tags, tagsUl)
    }
  }
})

function renderTags(tags, tagsUl) {
  let html ='';
  tags.forEach((tag) => {
    html += `
      <li>
          ${tag.value}
          <i class="fa-solid fa-xmark"></i>
      </li>
    `
  })
  tagsUl.innerHTML = html;

  const deleteButtons = Array.from($$('.fa-xmark'));
  deleteButtons.forEach((deleteButton, index) => {
    deleteButton.addEventListener('click', () => {
      tags.splice(index, 1)
      renderTags(tags, tagsUl)
    })
  })

  const removeAll = $('.btn__remove-all');
  removeAll.addEventListener('click',() => {
    tags.splice(0, tags.length);
    // tags =[] --- Không dùng được do tham chiếu (chatgpt)
    renderTags(tags, tagsUl);
  })
  localStorage.setItem('tags', JSON.stringify(tags));
}