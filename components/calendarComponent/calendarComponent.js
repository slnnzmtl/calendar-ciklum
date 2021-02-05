import './calendarComponent.scss';
import * as WcMixin from '/WcMixin.js';
import * as Cookies from '/plugins/cookies.js';
import  '/plugins/draggable.js';

const me = 'calendar-component';
const days = [
  'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday',
];

customElements.define(me, class extends HTMLElement {

  connectedCallback() {
    WcMixin.addAdjacentHTML(this, this.createCalendar(10, 18));
    const _this = this;

    document.querySelector('#filterParticipant').addEventListener('change', (ev) => {
      _this.fillTable(_this.filterEvents(ev.target.value));
    });

    _this.fillTable(Cookies.getEvents());
  }

  createCalendar(start, end) {
    let table = '<table><tr><th class="row-header">Time</th>';
    days.forEach((day) => {
      table += `<th>${day}</th>`;
    });
    table += '</tr>';
    for (let i = start; i <= end; i += 1) {
      table += `<tr><th class="row-header">${i}:00</th>`;
      days.forEach((day) => {
        table += `<td day="${day}" time="${i}" ondragover="onDragOver(event)" ondrop="onDrop(event)"></td>`;
      });
      table += '</tr>';
    }
    table += '</table>';
    return table;
  }

  fillTable(events) {
    const elements = this.querySelectorAll('table tr td');
    events.forEach((item) => {
      elements.forEach((elem) => {  
        if (elem.getAttribute('day') === item.day && elem.getAttribute('time') === item.time) {
          WcMixin.addAdjacentHTML(elem, `
            <div class="event-flag" 
              draggable="true" 
              ondragstart="onDragStart(event)" 
              day="${item.day}" 
              time="${item.time}"
            >
              <p class="event-flag__name">${item.name}</p>
              <button class="event-flag__button">X</button>
            </div>
          `);
        }
      });
    });
    this.addRemoveEventListeners();
  }

  clearTable() {
    const flags = document.querySelectorAll('.event-flag');
    flags.forEach((item) => {
      item.remove();
    });
  }

  showRemoveWindow(target) {
    let main = document.querySelector('#main');
    let parent = {};
    
    parent.name = target
      .parentElement
      .querySelector('.event-flag__name')
      .textContent;

    parent.day = target
      .parentElement
      .getAttribute('day');
      
    parent.time = target
      .parentElement
      .getAttribute('time');

      main.insertAdjacentHTML('afterbegin', `
        <remove-event class="remove-event-wrapper" 
          name="${parent.name}" 
          day="${parent.day}" 
          time="${parent.time}"
        ></remove-event>
      `)
  }

  filterEvents(value) {
    this.clearTable();
    const events = Cookies.getEvents();
    let result = [];
    if (value !== '') {
      if (events && events !== 'undefined') {
        events.forEach((item) => {
          if (item.participants.includes(value)) {
            result.push(item);
          }
        });
      }
    } else {
      result = events;
    }
    return result;
  }

  addRemoveEventListeners() {
    const _this = this;
    const buttons = this.querySelectorAll('.event-flag__button');
    buttons.forEach((button) => {
      button.addEventListener('click', (e) => {
        _this.showRemoveWindow(e.target);
      });
    });
  }
});
