import Store from "./store";

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
  const events = Store.events;

  // element.day = element.dataset.day;
  // element.time = element.dataset.time;

  drop.day = dropzone.dataset.day;
  drop.time = dropzone.dataset.time;

  if (dropzoneCheck(events, dropzone)) {
    dropzone.appendChild(element);

    element.dataset.day = drop.day;
    element.dataset.time = drop.time;

    Store.updatePosition(element.dataset.id, drop);
  }
}

function dropzoneCheck(events, drop) {
  let result = 0;
  if (drop.tagName === "TD") { 
    events.forEach(item => {
      if (item.data.day === drop.dataset.day && item.data.time === drop.dataset.time) {
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

window.onDragStart = onDragStart;
window.onDragOver = onDragOver;
window.onDrop = onDrop;
