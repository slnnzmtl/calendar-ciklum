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
  const { events } = Store;

<<<<<<< Updated upstream
  // element.day = element.dataset.day;
  // element.time = element.dataset.time;

  drop.day = dropzone.dataset.day;
  drop.time = dropzone.dataset.time;
=======
  drop.day = dropzone.data.day;
  drop.time = dropzone.data.time;
>>>>>>> Stashed changes

  if (dropzoneCheck(events, dropzone)) {
    dropzone.appendChild(element);

<<<<<<< Updated upstream
    element.dataset.day = drop.day;
    element.dataset.time = drop.time;
=======
    console.log(drop)
    element.data.day = drop.day;
    element.data.time = drop.time;
>>>>>>> Stashed changes

    Store.updatePosition(element.dataset.id, drop);
  }
}

function dropzoneCheck(events, drop) {
  let result = true;
  if (drop.tagName === "TABLE-CELL") { 
    
    events.forEach(item => {

      if (item.data.day === drop.data.day &&
          item.data.time === drop.data.time) {
        result = false;
      }
    });
    return result;
  }
}

window.onDragStart = onDragStart;
window.onDragOver = onDragOver;
window.onDrop = onDrop;
