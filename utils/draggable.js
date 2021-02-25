import * as Cookies from './cookies.js';

export function onDragStart(event) {
  event
    .target
    .id = Math.random();

  event
    .dataTransfer
    .setData('text/plain', event.target.id);
}

export function onDragOver(event) {
  event.preventDefault();
}

export function onDrop(event) {
  const id = event
    .dataTransfer
    .getData('text');

  event
    .dataTransfer
    .clearData();

  const draggableElement = document.getElementById(id);

  const dropzone = event.target;
  putElement(draggableElement, dropzone);
}

function putElement(element, dropzone) {
  
  const drop = {};
  const events = JSON.parse(Cookies.getCookie('calendar'));

  element.day = element.dataset.day;
  element.time = element.dataset.time;

  drop.day = dropzone.dataset.day;
  drop.time = dropzone.dataset.time;

  if (dropzoneCheck(events, dropzone)) {
    dropzone.appendChild(element);
    console.log(dropzone)

    events.forEach((item) => {
      if (item.day === element.day && item.time === element.time) {
        item.day = drop.day;
        item.time = drop.time;
      }
      element.dataset.day = drop.day;
      element.dataset.time = drop.time;
    });

    savePosition(events);
  }
}

function dropzoneCheck(events, drop) {
  let result = 0;
  if (drop.tagName === "TD") { 
    events.forEach(item => {
      if (item.day === drop.dataset.day && item.time === drop.dataset.time) {
        result += 1;
      }
    });
    
    if (result > 0) {
      return false;
    } else {
      return true;
    }
  }
}

function savePosition(events) {
  Cookies.setCookie('calendar', JSON.stringify(events));
}

window.onDragStart = onDragStart;
window.onDragOver = onDragOver;
window.onDrop = onDrop;
