'use strict';

/** 
    
1. '+' 버튼을 클릭하면 모달창이 뜨고, 모달창의 input에 할일을 적고 submit 하면 새로운 list가 생성된다
2. list의 삭제버튼을 누르면 list가 삭제된다

3. list의 체크박스를 클릭하면 리스트가 비활성화 된다    
3-1) 체크박스를 다시 클릭하면 활성화 상태로 돌아간다

4. list의 중요버튼을 누른 항목들만 모아서 중요tab 에서 확인 할 수 있다

*/

const todoList = document.querySelector('.todo-list');
const importantList = document.querySelector('.important-list');

const addBtn = document.querySelector('.add-todo-btn');
const addTodoModal = document.querySelector('.add-todo-wrap');
const modalAddBtn = document.querySelector('.add-li-btn');
const modalCloseBtn = document.querySelector('.close-btn');
const modalInput = document.querySelector('.add-li-input');

const todoTab = document.querySelector('.todo-tab');
const importantTab = document.querySelector('.important-todo-tab');
const todoBox = document.querySelector('.todo-box');
const mainBox = document.querySelector('.main-todo-box');
const importantBox = document.querySelector('.important-todo-box');

const topDate = document.querySelector('.date');
const topMonth = document.querySelector('.month');
const topYear = document.querySelector('.year');

const entireBox = document.querySelector('.wrapper');
const lightDarkToggle = document.querySelector('.dark-light input');

let AllTodo = [
  {
    text: 'js 공부하기',
    id: Date.now(),
    done: false,
    important: true,
  },
  {
    text: '치과 방문',
    id: Date.now() + 1,
    done: true,
    important: false,
  },
];
let importantTodo = AllTodo.filter((todo) => todo.important);

// 오늘 날짜 표시
const setDate = () => {
  const today = new Date();
  topDate.innerHTML = today.getDate();
  topMonth.innerHTML = new Intl.DateTimeFormat('en-US', {
    month: 'short',
  }).format(today);
  topYear.innerHTML = today.getFullYear();
};
setDate();

const toggleProperty = (target, property) => {
  const selectedTodo = AllTodo.find(
    (todo) => todo.id == target.getAttribute('data-id')
  );
  selectedTodo[property] = !selectedTodo[property];
};

const paintLists = () => {
  importantTodo = AllTodo.filter((todo) => todo.important);
  paintList(todoList, AllTodo);
  paintList(importantList, importantTodo);
};

const paintList = (target, todoArr) => {
  target.innerHTML = '';
  todoArr.forEach((todo) => {
    const newTodoLi = document.createElement('li');
    newTodoLi.setAttribute('class', 'todo-li');
    newTodoLi.setAttribute('data-id', todo.id);
    if (todo.done) {
      newTodoLi.classList.add('done');
    }
    if (todo.important) {
      newTodoLi.classList.add('important');
    }

    newTodoLi.innerHTML = `<div class='check-box'><span class="material-icons-outlined">done</span></div>
    <span class='txt'>${todo.text}</span>
    <span class='material-icons-outlined mark'>${
      todo.important ? 'bookmark' : 'bookmark_border'
    }</span>
    <span class='material-icons delete'>delete</span>`;

    target.append(newTodoLi);

    // 이벤트 위임
    newTodoLi.addEventListener('click', (e) => {
      // 완료버튼 기능
      if (e.target.innerHTML === 'done') {
        toggleProperty(e.currentTarget, 'done');
      }
      // 북마크버튼 기능
      if (e.target.classList.contains('mark')) {
        toggleProperty(e.currentTarget, 'important');
      }
      // 삭제버튼 기능
      if (e.target.innerHTML === 'delete') {
        AllTodo = AllTodo.filter(
          (todo) => todo.id != e.currentTarget.getAttribute('data-id')
        );
      }
      paintLists();
    });
  });
};

paintList(todoList, AllTodo);
paintList(importantList, importantTodo);

// add new todo
const addNewTodo = (newTodo) => {
  // 배열에 추가
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
    done: false,
    important: false,
  };
  AllTodo.push(newTodoObj);

  // 돔 재구성
  paintLists();
};

// modal
addBtn.addEventListener('click', () => {
  addTodoModal.classList.add('active');
});
modalCloseBtn.addEventListener('click', () => {
  addTodoModal.classList.remove('active');
});
modalAddBtn.addEventListener('click', () => {
  const modalValue = modalInput.value;
  if (modalValue.trim() === '') {
    return;
  }
  addNewTodo(modalInput.value);
  addTodoModal.classList.remove('active');
  modalInput.value = '';
});

//tab
const tabToggle = (target, sibling, targetBox, siblingBox) => {
  if (!target.classList.contains('active')) {
    target.classList.add('active');
    sibling.classList.remove('active');
    targetBox.classList.add('active');
    siblingBox.classList.remove('active');
  }
};

todoTab.addEventListener('click', () => {
  tabToggle(todoTab, importantTab, mainBox, importantBox);
});
importantTab.addEventListener('click', () => {
  tabToggle(importantTab, todoTab, importantBox, mainBox);
});

// light, dark toggle
lightDarkToggle.addEventListener('click', () => {
  entireBox.classList.toggle('dark-mode');
});
