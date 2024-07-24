const body = document.body;

const header = createElement('header', 'header', body);
header.innerHTML = `
  <header class="header">
    <h1 class="header__title">Nonograms game</h1>
  </header>
`;

header.addEventListener('click', () => {
  modalOpen(modalGreetings);
});

const main = createElement('main', 'main', body);
// левое меню
const sectionSide = createElement('section', 'sidebar', main);
const sideContainer = createElement('div', 'sidebar__container', sectionSide);

const settingBtn = createElement('button', 'sidebar__setting-btn btn', sideContainer); //кнопка настройки
settingBtn.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m370-80-16-128q-13-5-24.5-12T307-235l-119 50L78-375l103-78q-1-7-1-13.5v-27q0-6.5 1-13.5L78-585l110-190 119 50q11-8 23-15t24-12l16-128h220l16 128q13 5 24.5 12t22.5 15l119-50 110 190-103 78q1 7 1 13.5v27q0 6.5-2 13.5l103 78-110 190-118-50q-11 8-23 15t-24 12L590-80H370Zm112-260q58 0 99-41t41-99q0-58-41-99t-99-41q-59 0-99.5 41T342-480q0 58 40.5 99t99.5 41Z"/></svg>';

const volumeBtn = createElement('button', 'sidebar__volume-btn btn', sideContainer); // кнопка звук
volumeBtn.innerHTML = `
<svg class="sidebar__volume-off" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M792-56 671-177q-25 16-53 27.5T560-131v-82q14-5 27.5-10t25.5-12L480-368v208L280-360H120v-240h128L56-792l56-56 736 736-56 56Zm-8-232-58-58q17-31 25.5-65t8.5-70q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 53-14.5 102T784-288ZM650-422l-90-90v-130q47 22 73.5 66t26.5 96q0 15-2.5 29.5T650-422ZM480-592 376-696l104-104v208Z"/></svg>
  <svg class="sidebar__volume-on"xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-131v-82q90-26 145-100t55-168q0-94-55-168T560-749v-82q124 28 202 125.5T840-481q0 127-78 224.5T560-131ZM120-360v-240h160l200-200v640L280-360H120Zm440 40v-322q47 22 73.5 66t26.5 96q0 51-26.5 94.5T560-320Z"/></svg>
`;

// модалка Настройки
const modalSetting = createElement('div', 'modal', body);
modalSetting.innerHTML = `
<div class="modal__body">
  <div class="modal__content">
    <button class="modal__close btn"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
    <div class="modal__title">Game settings:</div>
  </div>
</div>
`;

// модалка Выигрыша
const modalWin = createElement('div', 'modal', body);
modalWin.innerHTML = `
<div class="modal__body">
  <div class="modal__content modal__content-win">
    <button class="modal__close btn"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
    <div class="modal__title">Yay, you won the game in <span class="modal__win"></span>! Press reset to start again! </div>
  </div>
</div>
`;

// модалка Последние результаты
const modalLastRes = createElement('div', 'modal', body);
modalLastRes.innerHTML = `
<div class="modal__body">
  <div class="modal__content modal__content-win">
    <button class="modal__close btn"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
    <div class="modal__title">Last results:</div>
    <table class="table">
    <thead>
      <tr class="table__header">
        <th class="table__head-row">Template</th>
        <th class="table__head-row">Difficulty</th>
        <th class="table__head-row">Time</th>
      </tr>
    </thead>
    <tbody>
    </tbody>
  </table>
  </div>
</div>
`;

const modalGreetings = createElement('div', 'modal', body);
modalGreetings.innerHTML = `
 <div class="modal__body">
    <div class="modal__content modal__content-greetings">
      <button class="modal__close btn"><svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="m256-200-56-56 224-224-224-224 56-56 224 224 224-224 56 56-224 224 224 224-56 56-224-224-224 224Z"/></svg></button>
      <div class="modal__title">Welcome to the Nonograms game!</div>
      <div class="modal__subtitle">It's a puzzle game to reveal a hidden picture by looking at the number clues. <br>The clues are given at the top and left side of the grid. Each number in these clue defines a block of black cell. A number indicates an unbroken line of black cells, and they are in the same order as the lines. <span>Good luck!</span></div>
    </div>
  </div>
`;

modalOpen(modalGreetings); // модалка приветствия

// элементы модальных окон
const modalCloseBtn = document.querySelectorAll('.modal__close');
const modalContent = modalSetting.querySelector('.modal__content');

// создание кнопки и выпадающего меню Select: size в Настройках игры
createSelect('size');
const selectSize = document.querySelector('#size');
const sizeWrapper = createElement('div', 'select__options-wrapper', selectSize);
createList(sizeWrapper, ['5x5', '10x10', '15x15'], 3);

// создание кнопки и выпадающего меню Select: temp в Настройках игры
createSelect('temp');
const selectTemp = document.querySelector('#temp');
const tempWrapper = createElement('div', 'select__options-wrapper', selectTemp);

// генерация выпадающего меню Select: temp (display none по умол)
for (let key in data) {
  let arr = [];
  data[key].forEach((el) => arr.push(el.name));
  createList(tempWrapper, arr, arr.length);
}

// title select temp
const selectButtons = document.querySelectorAll('.select__btn');
selectButtons[1].querySelector('span').textContent = 'Select:' + 'Camel';

// создание main кнопок игры
const resetBtn = createElement('button', 'sidebar__reset-btn', sideContainer);
resetBtn.textContent = 'Reset';

const randomGameBtn = createElement('button', 'modal__random-btn', modalContent);
randomGameBtn.textContent = 'Random game';

const solutionBtn = createElement('button', 'sidebar__solution-btn', sideContainer);
solutionBtn.textContent = 'Solution';

const lastResultsBtn = createElement('button', 'sidebar__result-btn', sideContainer);
lastResultsBtn.textContent = 'Last results';

// звуки игры
const id = ['lkm', 'pkm', 'win', 'empty'];
const src = ['lkm.mp3', 'pkm.mp3', 'win.mp3', 'empty.mp3'];

// функция создания audio элементов
for (let i = 0; i < 4; i++) {
  const audio = createElement('audio', '', sideContainer);
  audio.setAttribute('id', id[i]);
  audio.preload = 'auto';
  const source = createElement('source', '', audio);
  source.src = 'assets/' + src[i];
  source.type = 'audio/mp3';
}

const audioLkm = document.querySelector('#lkm');
const audioPkm = document.querySelector('#pkm');
const audioWin = document.querySelector('#win');
const audioEmpty = document.querySelector('#empty');

// timer с начала игры
let timerIsRunning = false;
let interval;
let minutes = 0;
let seconds = 0;

// Создание секции GAME
const sectionGame = createElement('section', 'game', main);
const container = createElement('div', 'game__container', sectionGame);
const wrapper = createElement('div', 'game__wrapper', container);

// список размеров и шаблонов
const sizes = selectSize.querySelectorAll('.select__option');
const temps = selectTemp.querySelectorAll('.select__option');

// правое меню
const rightSidebar = createElement('section', 'sidebar-right', main);
const rightSidebarContainer = createElement('div', 'sidebar-right__container', rightSidebar);

// кнопка Дневная/Темная тема
const checkThemeBtn = createElement('button', 'sidebar-right__theme-btn btn', rightSidebarContainer);
checkThemeBtn.innerHTML = `
<svg class="sidebar-right__light-theme" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M440-800v-120h80v120h-80Zm0 760v-120h80v120h-80Zm360-400v-80h120v80H800Zm-760 0v-80h120v80H40Zm708-252-56-56 70-72 58 58-72 70ZM198-140l-58-58 72-70 56 56-70 72Zm564 0-70-72 56-56 72 70-58 58ZM212-692l-72-70 58-58 70 72-56 56Zm268 452q-100 0-170-70t-70-170q0-100 70-170t170-70q100 0 170 70t70 170q0 100-70 170t-170 70Zm0-80q67 0 113.5-46.5T640-480q0-67-46.5-113.5T480-640q-67 0-113.5 46.5T320-480q0 67 46.5 113.5T480-320Zm0-160Z"/></svg>
<svg class="sidebar-right__dark-theme" xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24"><path d="M560-80q-82 0-155-31.5t-127.5-86Q223-252 191.5-325T160-480q0-83 31.5-155.5t86-127Q332-817 405-848.5T560-880q54 0 105 14t95 40q-91 53-145.5 143.5T560-480q0 112 54.5 202.5T760-134q-44 26-95 40T560-80Zm0-80h21q10 0 19-2-57-66-88.5-147.5T480-480q0-89 31.5-170.5T600-798q-9-2-19-2h-21q-133 0-226.5 93.5T240-480q0 133 93.5 226.5T560-160Zm-80-320Z"/></svg>
`;

// кнопка Сохранить игру
const saveGameBtn = createElement('button', 'sidebar-right__save-btn', rightSidebarContainer);
saveGameBtn.textContent = 'Save game';

// кнопка Продолжить игру
const continueGameBtn = createElement('button', 'sidebar-right__continue-btn', rightSidebarContainer);
continueGameBtn.textContent = 'Continue last game';

// const github = createElement('div', 'sidebar-right__github', rightSidebarContainer);
// github.textContent = 'my Gitgub ✨';

// Инициализация  игры ----------------------------------------------------------------------------- !
function gameInit() {
  temps[0].classList.add('select__option-active'); // первый шаблон по умол

  // задать тему
  if (!localStorage.getItem('theme')) {
    localStorage.setItem('theme', 'light');
    // кнопка переключения темы
    document.querySelector('.sidebar-right__light-theme').style.display = 'none';
    document.querySelector('.sidebar-right__dark-theme').style.display = 'block';
  } else {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark') {
      toogleTheme();
      localStorage.setItem('theme', 'dark');
      document.querySelector('.sidebar-right__light-theme').style.display = 'block';
      document.querySelector('.sidebar-right__dark-theme').style.display = 'none';
    } 
  }
  checkTheme();  // менять бэкграунд
  checkSize('5x5');
  initTemp(data['5x5'][0]);
  addBorder(5);
  clickBoardCell(data['5x5'][0]);

  if (localStorage.getItem('results')) {
    checkTable(); // таблица результатов
  }

  localStorage.setItem('temp', JSON.stringify(data['5x5'][0])); // шаблон
  localStorage.setItem('match', JSON.stringify([])); // совпавшие
  localStorage.setItem('falsy', JSON.stringify([])); // не совпавшие
  localStorage.setItem('cross', JSON.stringify([])); // крестик 
}

gameInit();

// открыть Настройки
settingBtn.addEventListener('click', () => {
  modalOpen(modalSetting);
});

// кнопка вкл/выкл ЗВУК
volumeBtn.addEventListener('click', () => {
  const allAudio = document.querySelectorAll('audio');
  
  allAudio.forEach(function (audio) {
    audio.muted = !audio.muted;

    if (audio.muted) {
      document.querySelector('.sidebar__volume-on').style.display = 'none';
      document.querySelector('.sidebar__volume-off').style.display = 'block';
    }
    
    if (!audio.muted) {
      document.querySelector('.sidebar__volume-on').style.display = 'block';
      document.querySelector('.sidebar__volume-off').style.display = 'none';
    }
  });
});

// кнопка переключения ТЕМЫ
checkThemeBtn.addEventListener('click', () => {
  const lsTheme = localStorage.getItem('theme');
  const temp = JSON.parse(localStorage.getItem('temp'));

  if (lsTheme === 'light') {
    localStorage.setItem('theme', 'dark');
    document.querySelector('.sidebar-right__light-theme').style.display = 'block';
    document.querySelector('.sidebar-right__dark-theme').style.display = 'none';
  } else {
    localStorage.setItem('theme', 'light');
    document.querySelector('.sidebar-right__light-theme').style.display = 'none';
    document.querySelector('.sidebar-right__dark-theme').style.display = 'block';
  }

  toogleTheme();
  addBorder(temp.board.length);
});

// кнопка Х на модалках
modalCloseBtn.forEach((btn) => {
  btn.addEventListener('click', () => {
    modalClose(modalSetting);
    modalClose(modalWin);
    modalClose(modalLastRes);
    modalClose(modalGreetings);
  });
});

// кнопка выбора шаблона и размеров
selectButtons.forEach((btn) => {
  btn.addEventListener('click', (e) => {
    const parent = e.target.closest('.select');
    parent.classList.toggle('select-active');
  })
});

// опции размера
sizes.forEach((el) => {
  el.addEventListener('click', () => {
    checkSize(el.textContent);
    temps.forEach((temp) => temp.classList.remove('select__option-active'));
    selectButtons[1].querySelector('span').textContent = 'Select:';
    selectSize.classList.remove('select-active');
  });
});

// опции шаблонов
temps.forEach((el) => {
  el.addEventListener('click', () => {
    temps.forEach((temp) => temp.classList.remove('select__option-active'));
    selectButtons[1].querySelector('span').textContent = 'Select:' + el.textContent;
    el.classList.add('select__option-active');
    checkTemp(el.textContent);
    clrInterval();
    modalClose(modalSetting);
  })
});

// кнопка RESET
resetBtn.addEventListener('click', () => {
  resetGame();

  const temp = JSON.parse(localStorage.getItem('temp'));
  initTemp(temp);
  clickBoardCell(temp);
});

// кнопка SAVE GAME
saveGameBtn.addEventListener('click', () => {
  localStorage.setItem('min', minutes);
  localStorage.setItem('sec', seconds);
  localStorage.setItem('saveMatches', localStorage.getItem('match'));
  localStorage.setItem('saveFalsy', localStorage.getItem('falsy'));
  localStorage.setItem('saveCross', localStorage.getItem('cross'));
  localStorage.setItem('saveTemp', localStorage.getItem('temp'));
});

// кнопка CONTINUE GAME
continueGameBtn.addEventListener('click', () => {
  resetGame();

  minutes = Number(localStorage.getItem('min'));
  seconds = Number(localStorage.getItem('sec'));

  const temp = JSON.parse(localStorage.getItem('saveTemp'));
  initTemp(temp);
  clickBoardCell(temp);
  
  const secondSpan = document.querySelector('.game__sec');
  const minuteSpan = document.querySelector('.game__min');

  minuteSpan.textContent = `${minutes.toString().length < 2 ? '0' + minutes.toString() : minutes.toString()}`;
  secondSpan.textContent = `${seconds.toString().length < 2 ? '0' + seconds.toString() : seconds.toString()}`;

  const matchArr = JSON.parse(localStorage.getItem('saveMatches'));
  const falsyArr = JSON.parse(localStorage.getItem('saveFalsy'));
  const crossArr = JSON.parse(localStorage.getItem('saveCross'));

  const arr = [...matchArr, ...falsyArr];

  const board = document.querySelector('.game__board');
  const cells = board.querySelectorAll('.game__cell');

  for (let i = 0; i < arr.length; i++) {
    cells.forEach((cell) => {
      if (cell.getAttribute('id') === arr[i]) {
        cell.style.backgroundColor = 'black';
      }
    });
  }

  for (let i = 0; i < crossArr.length; i++) {
    cells.forEach((cell) => {
      if (cell.getAttribute('id') === crossArr[i]) {
        cell.classList.toggle('game__cell_mod');
      }
    });
  }

  localStorage.setItem('match', JSON.stringify(matchArr));
  localStorage.setItem('falsy', JSON.stringify(falsyArr));
  localStorage.setItem('cross', JSON.stringify(crossArr));
  localStorage.setItem('temp', JSON.stringify(temp));

  selectButtons[0].querySelector('span').textContent = 'Select:' + `${temp.board.length}x${temp.board.length}`;
  selectButtons[1].querySelector('span').textContent = 'Select:' + temp.name;
  
  selectTemp.querySelectorAll('.select__option').forEach((li) => li.classList.remove('select__option-active'));
  selectTemp.querySelectorAll('.select__option').forEach((li) => {
    if (li.textContent === temp.name) {
      li.classList.add('select__option-active');
    }
  });
});

// кнопка RANDOM GAME
randomGameBtn.addEventListener('click', () => {
  resetGame();

  const randomSize = Math.floor(Math.random() * 3);
  const randomTemp = Math.floor(Math.random() * 5);

  const random = Object.values(data)[randomSize][randomTemp];

  initTemp(random);
  clickBoardCell(random);
  checkSize(String(Object.keys(data)[randomSize]));

  selectButtons[1].querySelector('span').textContent = 'Select:' + random.name;
  selectButtons[0].querySelector('span').textContent = 'Select:' + Object.keys(data)[randomSize];

  setActiveClassOption(selectTemp, String(random.name));

  localStorage.setItem('temp', JSON.stringify(random));
  modalClose(modalSetting);
});

// кнопка SOLUTION GAME
solutionBtn.addEventListener('click', () => {
  resetGame();

  const temp = JSON.parse(localStorage.getItem('temp'));
  initTemp(temp);

  const board = document.querySelector('.game__board');
  const cells = board.querySelectorAll('.game__cell');
  const boardArr = temp.board.flat(1);

  for (let i = 0; i < boardArr.length; i++) {
    if (boardArr[i] == 1) {
      cells[i].style.backgroundColor = 'black';
    }
  }

  document.querySelector('.game__wrapper').style.pointerEvents = 'none';
});

// кнопка последние результаты
lastResultsBtn.addEventListener('click', () => {
  modalOpen(modalLastRes);
});

// наведение на ячейки
// function hoverOnCell() {
  
// }

// hoverOnCell();