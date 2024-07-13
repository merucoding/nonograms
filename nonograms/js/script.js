function createElement(tag, elemClass, elemParent) {
  const elem = document.createElement(tag);
  elem.className = elemClass;
  elemParent.append(elem);
  return elem;
} // функция для создания элемента

function createRow(tag, rowParent, cellCount, content) {
  const row = document.createElement('div');

  row.className = 'game__row';

  for (let i = 0; i < cellCount; i++) {
    const cell = document.createElement(tag);
    cell.className = 'game__cell';
    if (content && tag !== 'button') {
      cell.textContent = content[i];
    } else if (tag === 'button') {
      const board = document.querySelector('.game__board');
      const rowCount = board.querySelectorAll('.game__row').length;
      cell.setAttribute('id', `${rowCount}-${i}`);
    }

    if (content[i] === 1) {
      cell.classList.add('game__cell_yep');
    }
    row.append(cell);
  }
  rowParent.append(row);
}

function createSelect(id) {
  const select = createElement('div', 'modal__select select', modalContent);
  select.setAttribute('id', id);
  const button = createElement('div', 'select__btn', select);
  const span = createElement('span', 'select__text', button);
  span.textContent = 'Select:';
  const icon = createElement('img', '', button);
  icon.src = 'assets/arrow-down.svg';
  icon.alt = '';
} // функция для создания кнопок выбора уровня, шаблона игры

function createList(parent, liArr, liCount) {
  const list = createElement('ul', 'select__options', parent);
  
  for (let i = 0; i < liCount; i++) {
    const li = createElement('li', 'select__option', list);
    li.textContent = liArr[i];
  }
} // функция для создания выпадающего меню выбора уровня, шаблона игры

function clrInterval() {
  timerIsRunning = false;
  clearInterval(interval);
  minutes = 0;
  seconds = 0;
}

function startTimer() {
  const secondSpan = document.querySelector('.game__sec');
  const minuteSpan = document.querySelector('.game__min');

  seconds++;

  secondSpan.innerHTML = '0' + seconds;
  if (seconds > 9) {
    secondSpan.innerHTML = seconds;
  }
  if (seconds > 59) {
    minutes++;
    minuteSpan.innerHTML = '0' + minutes;
    seconds = 0;
    secondSpan.innerHTML = '0' + seconds;
  }
  if (minutes > 9) {
    minuteSpan.innerHTML = minutes;
  }
}

function checkSize(size) {
  const sizeOption = sizeWrapper.querySelector('.select__options');
  const sizes = sizeOption.querySelectorAll('.select__option');
  sizeOption.style.display = 'block';

  const tempOptions = tempWrapper.querySelectorAll('.select__options');
  tempOptions.forEach((item) => item.classList.remove('select__options-active'));

  switch (size) {
    case '5x5': tempOptions[0].classList.add('select__options-active'); 
      break;
    case '10x10': tempOptions[1].classList.add('select__options-active');
      break;
    case '15x15': tempOptions[2].classList.add('select__options-active');
      break;
  }
  selectButtons[0].querySelector('span').textContent = 'Select:' + size;

  sizes.forEach((el) => {
    el.classList.remove('select__option-active');
    if (el.textContent === size) {
      el.classList.add('select__option-active');
    }
  });
}

function checkTemp(tempName) {
  const gameWrapper = document.querySelector('.game__wrapper');
  if (gameWrapper) gameWrapper.innerHTML = '';
  let temp = '';

  const size = selectSize.querySelector('.select__option-active').textContent;
  console.log(size);

  const activeOpt = document.querySelector('.select__options-active');
  const options = activeOpt.querySelectorAll('.select__option');

  for (let i = 0; i < options.length; i++) {
    if (options[i].textContent === tempName) {
      initTemp(data[size][i]);
      temp = data[size][i];
    }
  }
  clickBoardCell(temp);
  localStorage.setItem('match', JSON.stringify([]));
  localStorage.setItem('falsy', JSON.stringify([]));
  localStorage.setItem('cross', JSON.stringify([]));
  localStorage.setItem('temp', JSON.stringify(temp));
}

function initTemp(temp) {
  const header = createElement('div', 'game__header', wrapper);
  const gameBody = createElement('div', 'game__body', wrapper);
  const aside = createElement('div', 'game__aside', gameBody);
  const board = createElement('div', 'game__board', gameBody);

  createRow('div', header, temp.header.length, temp.header);

  for (let i = 0; i < temp.aside.length; i++) {
    createRow('div', aside, temp.aside[i].length, temp.aside[i]);
  }

  for (let i = 0; i < temp.board.length; i++) {
    createRow('button', board, temp.board[i].length, temp.board[i]);
  }

  const desk = window.innerWidth > 700;
  const mobile = window.innerWidth > 500 && window.innerWidth <= 700;
  const small = window.innerWidth <= 500;
  
  if (desk) {
    updateCell(temp, 40, 40, 25);
  } else if (mobile) {
    updateCell(temp, 40, 25, 20);
  } else if (small) {
    updateCell(temp, 40, 20, 16);
  }

  addBorder(temp.board.length);

  const timer = createElement('div', 'game__timer', header.querySelector('.game__row'));
  const spanMinute = createElement('span', 'game__min', timer);
  const colon = createElement('span', 'game__colon', timer);
  const spanSec = createElement('span', 'game__sec', timer);

  spanMinute.textContent = '00';
  colon.textContent = ':';
  spanSec.textContent = '00';
}

function updateCell(temp, size1, size2, size3) {
  const board = document.querySelector('.game__board');
  const header = document.querySelector('.game__header');
  const allCell = document.querySelectorAll('.game__cell');

  const gameRow = board.querySelectorAll('.game__row');
  const headerRow = header.querySelectorAll('.game__row');
  
  if (temp.board.length === 5) {
    gameRow.forEach((row) => row.style.width = (temp.board.length * size1) + 'px');
    headerRow.forEach((row) => row.style.width = (temp.board.length * size1) + 'px');
  } else if (temp.board.length === 10) {
    gameRow.forEach((row) => row.style.width = (temp.board.length * size2) + 'px');
    headerRow.forEach((row) => row.style.width = (temp.board.length * size2) + 'px');
    allCell.forEach((cell) => {
      cell.style.width = size2 + 'px'
      cell.style.height = size2 + 'px';
    });
  } else {
    gameRow.forEach((row) => row.style.width = (temp.board.length * size3) + 'px');
    headerRow.forEach((row) => row.style.width = (temp.board.length * size3) + 'px');
    allCell.forEach((cell) => {
      cell.style.width = size3 + 'px'
      cell.style.height = size3 + 'px';
    });
  }
}

function updateSize() {
  const temp = JSON.parse(localStorage.getItem('temp'));
  const desk = window.innerWidth > 700;
  const mobile = window.innerWidth > 500 && window.innerWidth <= 700;
  const small = window.innerWidth <= 500;
  
  if (desk) {
    updateCell(temp, 40, 40, 25);
  } else if (mobile) {
    updateCell(temp, 40, 25, 20);
  } else if (small) {
    updateCell(temp, 40, 20, 16);
  }
}

window.addEventListener('resize', updateSize);

function addBorder(size) {
  const theme = localStorage.getItem('theme');
  const header = document.querySelector('.game__header');
  const headerRow = header.querySelector('.game__row');
  const headerCells = headerRow.querySelectorAll('.game__cell');
  const aside = document.querySelector('.game__aside');
  const asideRows = aside.querySelectorAll('.game__row');
  const gameBoard = wrapper.querySelector('.game__board');
  const gameBoardRows = gameBoard.querySelectorAll('.game__row');
  const gameCells = gameBoard.querySelectorAll('.game__cell');
  const index = size - 1;

  for (let i = 0; i < headerCells.length; i++) {
    if (i % size === 0) {
      headerCells[i].style.borderLeft = theme === 'light' ? '2px solid #000' : '2px solid #f9fbf2';
    }
    if (i % 5 === 4) {
      headerCells[i].style.borderRight = theme === 'light' ? '2px solid #000' : '2px solid #f9fbf2';
    }
  }

  asideRows[index].querySelectorAll('.game__cell').forEach((cell) => {
    cell.style.borderBottom = theme === 'light' ? '2px solid #000' : '2px solid #f9fbf2';
  });

  for (let i = 0; i < asideRows.length; i += 5) {
    const asideCells = asideRows[i].querySelectorAll('.game__cell');
    asideCells.forEach((cell) => {
      cell.style.borderTop = theme === 'light' ? '2px solid #000' : '2px solid #f9fbf2';
    });
  }

  for (let i = 4; i < gameCells.length; i += 5) {
    gameCells[i].style.borderRight = theme === 'light' ? '2px solid #000' : '2px solid #f9fbf2';
  }

  gameBoardRows.forEach((row) => {
    const cell = row.querySelectorAll('.game__cell')[0];
    cell.style.borderLeft = theme === 'light' ? '2px solid #000' : '2px solid #f9fbf2';
  });

  gameBoardRows[index].querySelectorAll('.game__cell').forEach((cell) => {
    cell.style.borderBottom = theme === 'light' ? '2px solid #000' : '2px solid #f9fbf2';
  });

  const step = gameBoardRows.length < 6 ? 1 : 5;

  for (let i = 0; i < gameBoardRows.length; i += step) {
    if (step === 1) {
      gameBoardRows[0].querySelectorAll('.game__cell').forEach((cell) => {
        cell.style.borderTop = theme === 'light' ? '2px solid #000' : '2px solid #f9fbf2';
      });
    } else {
      gameBoardRows[i].querySelectorAll('.game__cell').forEach((cell) => {
        cell.style.borderTop = theme === 'light' ? '2px solid #000' : '2px solid #f9fbf2';
      });
    }
  }
}

function clickBoardCell(temp) {
  const boardBtns = document.querySelectorAll('button.game__cell'); // ячейки

  boardBtns.forEach((btn) => btn.addEventListener('click', () => {
    if (btn.style.backgroundColor === 'black') {
      audioEmpty.currentTime = 0;
      audioEmpty.play();
      btn.style.backgroundColor = '';
    } else {
      audioPkm.currentTime = 0;
      audioPkm.play();
      btn.style.backgroundColor = 'black';
    }

    if (btn.className.includes('game__cell game__cell_yep')) {
      writeLS(btn, 'match', temp);
    } else {
      writeLS(btn, 'falsy', temp);
    }

    if (btn.classList.contains('game__cell_mod')) {
      btn.classList.remove('game__cell_mod');
      writeLS(btn, 'cross');
    };

    if (!timerIsRunning) {
      interval = setInterval(startTimer, 1000);
      timerIsRunning = true;
    }

  }));

  boardBtns.forEach((btn) => btn.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    audioLkm.currentTime = 0;
    audioLkm.play();

    if (btn.style.backgroundColor === 'black') {
      if (btn.className.includes('game__cell game__cell_yep')) {
        writeLS(btn, 'match');
      } else {
        writeLS(btn, 'falsy');
      }
    }

    btn.classList.toggle('game__cell_mod');
    btn.style.backgroundColor = '';
    writeLS(btn, 'cross');
  }));
}

function writeLS(button, lsKey, temp) {
  let arr = JSON.parse(localStorage.getItem(lsKey));
  const id = button.getAttribute('id');

  if (arr.length !== null && arr.includes(id)) {
    arr.splice(arr.indexOf(id), 1);
  } else {
    arr.push(id);
  }

  localStorage.setItem(lsKey, JSON.stringify(arr));
  if (temp) {
    checkWin(temp);
  }
}

function checkWin(temp) {
  if (!localStorage.getItem('results')) {
    localStorage.setItem('results', JSON.stringify([]));
  }

  const resArr = JSON.parse(localStorage.getItem('results'));

  const match = JSON.parse(localStorage.getItem('match'));
  const falsy = JSON.parse(localStorage.getItem('falsy'));

  const onesCount = temp.board.flat(1).filter((el) => el === 1).length; // !

  const min = minutes.toString();
  const sec = seconds.toString();

  const time = `${min.length < 2 ? '0' + min : min}:${sec.length < 2 ? '0' + sec : sec}`;

  if (match.length === onesCount && falsy.length === 0) {
    audioWin.play();
    document.querySelector('.modal__win').textContent = time;

    resArr.push([temp.name, `${temp.board.length}x${temp.board.length}`, time]);
    localStorage.setItem('results', JSON.stringify(resArr));
    checkTable();

    modalOpen(modalWin);
    clearInterval(interval);
  }
}

function checkTable() {
  const lsResArr = JSON.parse(localStorage.getItem('results'));
  const tableBody = document.querySelector('tbody');
  tableBody.innerHTML = '';

  lsResArr.sort(function (a, b) {
    var timeA = a[2];
    var timeB = b[2];

    if (timeA < timeB) {
      return -1;
    } else if (timeA > timeB) {
      return 1;
    } else {
      return 0;
    }
  });

  // console.log(lsResArr);

  for (let i = 0; i < lsResArr.length; i++) {
    const tableRow = createElement('tr', 'table__row', tableBody);
    tableRow.innerHTML = `
  <tr class="table__row">
    <td class="table__cell table__cell-temp">${lsResArr[i][0]}</td>
    <td class="table__cell table__cell-size">${lsResArr[i][1]}</td>
    <td class="table__cell table__cell-time">${lsResArr[i][2]}</td>
  </tr>
  `;
  }

  localStorage.setItem('results', JSON.stringify(lsResArr));
}  // функция для генерации таблицы результатов

function resetGame() {
  localStorage.setItem('match', JSON.stringify([]));
  localStorage.setItem('falsy', JSON.stringify([]));
  localStorage.setItem('cross', JSON.stringify([]));
  clrInterval();
  const gameWrapper = document.querySelector('.game__wrapper');
  if (gameWrapper) gameWrapper.innerHTML = '';
}

function modalOpen(modal) {
  modal.classList.add('modal__open');
  body.classList.add('lock');
}

function modalClose(modal) {
  modal.classList.remove('modal__open');
  body.classList.remove('lock');

  const selectBtns = document.querySelectorAll('.select');
  selectBtns.forEach((select) => {
    select.classList.remove('select-active');
  });
}

function setActiveClassOption(parent, size) {
  parent.querySelectorAll('.select__option').forEach((li) => li.classList.remove('select__option-active'));
  parent.querySelectorAll('.select__option').forEach((li) => {
    if (li.textContent === size) {
      li.classList.add('select__option-active');
    }
  });
}

function toogleTheme() {
  const theme = localStorage.getItem('theme');
  checkTheme();  
  // document.body.classList.toggle('dark');
  document.querySelector('.game__container').classList.toggle('game__container_dark');
  document.querySelectorAll('.btn').forEach((btn) => {
    btn.classList.toggle('btn_dark');
  });

  document.querySelector('.sidebar__reset-btn').classList.toggle('sidebar__reset-btn_dark');
  document.querySelector('.sidebar__solution-btn').classList.toggle('sidebar__solution-btn_dark');
  document.querySelector('.sidebar__result-btn').classList.toggle('sidebar__result-btn_dark');

  document.querySelector('.sidebar-right__save-btn').classList.toggle('sidebar-right__save-btn_dark');
  document.querySelector('.sidebar-right__continue-btn').classList.toggle('sidebar-right__continue-btn_dark');
  document.querySelector('.modal__content').classList.toggle('modal__content_dark');
  document.querySelector('.modal__random-btn').classList.toggle('modal__random-btn_dark');

  document.querySelectorAll('.select__btn').forEach((btn) => {
    btn.classList.toggle('select__btn_dark');
  });

  const timer = document.querySelector('.game__timer');

  if (theme === 'dark') {
    if (timer) {
      timer.classList.add('game__timer_dark');
    }
  
    document.querySelectorAll('.game__cell').forEach((el) => {
      el.classList.add('game__cell_dark');
    });
  }

  if (theme === 'light') {
    if (timer) {
      timer.classList.remove('game__timer_dark');
    }
  
    document.querySelectorAll('.game__cell').forEach((el) => {
      el.classList.remove('game__cell_dark');
    });
  }
}  // функция для смены темы страницы

function checkTheme() {
  const theme = localStorage.getItem('theme');
  if (theme === 'light') {
    document.body.classList.add('light');
    document.body.classList.remove('dark');
  } else if (theme === 'dark') {
    document.body.classList.remove('light');
    document.body.classList.add('dark');
  }
} // функция для смены темы бэкграунда