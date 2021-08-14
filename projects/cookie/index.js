/*
 ДЗ 7 - Создать редактор cookie с возможностью фильтрации

 7.1: На странице должна быть таблица со списком имеющихся cookie. Таблица должна иметь следующие столбцы:
   - имя
   - значение
   - удалить (при нажатии на кнопку, выбранная cookie удаляется из браузера и таблицы)

 7.2: На странице должна быть форма для добавления новой cookie. Форма должна содержать следующие поля:
   - имя
   - значение
   - добавить (при нажатии на кнопку, в браузер и таблицу добавляется новая cookie с указанным именем и значением)

 Если добавляется cookie с именем уже существующей cookie, то ее значение в браузере и таблице должно быть обновлено

 7.3: На странице должно быть текстовое поле для фильтрации cookie
 В таблице должны быть только те cookie, в имени или значении которых, хотя бы частично, есть введенное значение
 Если в поле фильтра пусто, то должны выводиться все доступные cookie
 Если добавляемая cookie не соответствует фильтру, то она должна быть добавлена только в браузер, но не в таблицу
 Если добавляется cookie, с именем уже существующей cookie и ее новое значение не соответствует фильтру,
 то ее значение должно быть обновлено в браузере, а из таблицы cookie должна быть удалена

 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

import './cookie.html';

/*
 app - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
const homeworkContainer = document.querySelector('#app');
// текстовое поле для фильтрации cookie
const filterNameInput = homeworkContainer.querySelector('#filter-name-input');
// текстовое поле с именем cookie
const addNameInput = homeworkContainer.querySelector('#add-name-input');
// текстовое поле со значением cookie
const addValueInput = homeworkContainer.querySelector('#add-value-input');
// кнопка "добавить cookie"
const addButton = homeworkContainer.querySelector('#add-button');
// таблица со списком cookie
const listTable = homeworkContainer.querySelector('#list-table tbody');

const cookie = getCookie();
iterateCookieObj(cookie);

function getCookie() {
  if (!document.cookie) return;

  const cookieAll = document.cookie.split('; ');
  return cookieAll.reduce((prev, current) => {
    const [name, value] = current.split('=');
    prev[name] = value;
    return prev;
  }, {});
}

function iterateCookieObj(cookieObj) {
  if (!cookieObj) return;
  listTable.innerHTML = '';
  for (const key in cookieObj) {
    if (cookieObj) {
      createTR(key, cookieObj[key]);
    }
  }
}

function isMatching(full, chunk) {
  return full.toLowerCase().indexOf(chunk.toLowerCase()) !== -1;
}

function createTR(name, value) {
  const tr = document.createElement('tr');
  tr.innerHTML =
    '<td>' + name + '</td><td>' + value + '</td><td><button>Удалить</button></td>';
  listTable.appendChild(tr);
}

filterNameInput.addEventListener('input', function () {
  filter();
});

function filter() {
  const filterGetCookie = getCookie();
  const value = filterNameInput.value;
  for (const key in filterGetCookie) {
    if (filterGetCookie)
      if (!isMatching(filterGetCookie[key], value) && !isMatching(key, value)) {
        delete filterGetCookie[key];
      }
  }
  iterateCookieObj(filterGetCookie);
}

addButton.addEventListener('click', () => {
  document.cookie = `${addNameInput.value}=${addValueInput.value}`;
  filter();
});

listTable.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    const tr = e.target.closest('tr');
    const deletedCookie = tr.children[0].textContent;
    document.cookie = `${deletedCookie}=deleted; max-age=0`;
    tr.remove();
  }
});
