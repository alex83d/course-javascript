/* Задание со звездочкой */

/*
 Создайте страницу с кнопкой.
 При нажатии на кнопку должен создаваться div со случайными размерами, цветом и позицией на экране
 Необходимо предоставить возможность перетаскивать созданные div при помощи drag and drop
 Запрещено использовать сторонние библиотеки. Разрешено пользоваться только тем, что встроено в браузер
 */

/*
 homeworkContainer - это контейнер для всех ваших домашних заданий
 Если вы создаете новые html-элементы и добавляете их на страницу, то добавляйте их только в этот контейнер

 Пример:
   const newDiv = document.createElement('div');
   homeworkContainer.appendChild(newDiv);
 */
import './dnd.html';

const homeworkContainer = document.querySelector('#app');
let currentDnD;

document.addEventListener('mousemove', (e) => {
  if (currentDnD) {
    currentDnD.style.left = e.pageX - currentDnD.offsetWidth / 2 + 'px';
    currentDnD.style.top = e.pageY - currentDnD.offsetHeight / 2 + 'px';
  }
});

export function createDiv() {
  const getRandomSize = () => Math.round(Math.random() * 100 + 100) + 'px';
  const getRandomColor = () => {
    const r = Math.floor(Math.random() * 256),
      g = Math.floor(Math.random() * 256),
      b = Math.floor(Math.random() * 256);
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
  };

  const div = document.createElement('div');

  div.classList.add('draggable-div');
  div.style.width = getRandomSize();
  div.style.height = getRandomSize();
  div.style.backgroundColor = getRandomColor();
  div.style.top = 100 * Math.random() + 'px';
  div.style.left = 100 * Math.random() + 'px';

  div.addEventListener('mousedown', (e) => {
    currentDnD = div;
    e.pageX;
    e.pageY;
  });

  div.addEventListener('mouseup', () => (currentDnD = false));

  return div;
}

const addDivButton = homeworkContainer.querySelector('#addDiv');

addDivButton.addEventListener('click', function () {
  const div = createDiv();
  homeworkContainer.appendChild(div);
});
