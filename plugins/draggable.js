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
  const events = Cookies.getEvents();

  element.day = element.getAttribute('day');
  element.time = element.getAttribute('time');

  drop.day = dropzone.getAttribute('day');
  drop.time = dropzone.getAttribute('time');

  if (dropzoneCheck(events, drop)) {
    dropzone.appendChild(element);

    events.forEach((item) => {
      if (item.day === element.day && item.time === element.time) {
        item.day = drop.day;
        item.time = drop.time;
      }
      element.setAttribute('day', drop.day);
      element.setAttribute('time', drop.time);
    });

    savePosition(events);
  }
}

function dropzoneCheck(events, drop) {
  if (drop.day) {
    events.forEach(item => {
      if (item.day === drop.day && item.time === drop.time) {
        return false;
      }
    });
    return true;
  }
  return false;
}

function savePosition(events) {
  const eventString = JSON.stringify(events).replace('[{', '{').replace('}]', '}');
  Cookies.setCookie('calendar', eventString);
}

window.onDragStart = onDragStart;
window.onDragOver = onDragOver;
window.onDrop = onDrop;
