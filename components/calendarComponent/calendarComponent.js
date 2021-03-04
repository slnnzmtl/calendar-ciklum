import EventFlag from '../eventFlag/eventFlag';
import './calendarComponent.scss';
import * as Data from '../../assets/data';
import '../../utils/draggable';
import * as EventBus from '../../utils/eventBus';
import Store from '../../utils/store';

let filter = 'All members';

export default class calendarComponent extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(this.createTable(Data.workingHours, Data.workingDays));
    this.classList.add('calendar');

    EventBus.subscribe('participantFilterChanged', (value) => {
      filter = value;
      this.fillTable();
    });

    EventBus.subscribe('refreshEvents', () => {
      this.getData();
    });

    this.fillTable();
  }

  getData() {
    Store.getEvents()
      .then(() => {
        this.fillTable();
      });
  }

  createTable(hours, days) {
    const table = document.createElement('table');
    const tableHeader = document.createElement('tr');

    tableHeader.insertAdjacentHTML('afterbegin', `
      <th>Time</th>
    `);

    days.forEach((item) => {
      const th = document.createElement('th');

      th.innerText = item;
      tableHeader.appendChild(th);
    });
    tableHeader.classList.add('table-header');
    table.appendChild(tableHeader);

    hours.forEach((hour) => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      th.classList.add('row-header');
      th.innerText = `${hour}:00`;
      tr.appendChild(th);

      days.forEach((item) => {
        const td = document.createElement('td');

        td.dataset.day = item;
        td.dataset.time = hour;
        td.setAttribute('ondragover', 'onDragOver(event)');
        td.setAttribute('ondrop', 'onDrop(event)');

        tr.appendChild(td);
      });

      table.appendChild(tr);
    });

    return table;
  }

  async fillTable() {
    const table = this.querySelector('table');

    const events = await this.filterEvents();
    const tableClone = table.cloneNode(true);
    const tableCells = tableClone.querySelectorAll('tr td');

    if (!events.length) throw new Error('No events');

    events.forEach((event) => {
      tableCells.forEach((cell) => {
        if (cell.dataset.day === event.data.day && cell.dataset.time === event.data.time) {
          const flag = new EventFlag({
            id: event.id,
            name: event.data.name,
            day: event.data.day,
            time: event.data.time,
          });

          cell.appendChild(flag);
        }
      });
    });

    table.replaceWith(tableClone);
    return table;
  }

  clearTable() {
    const flags = document.querySelectorAll('.event-flag');

    flags.forEach((item) => {
      item.remove();
    });
  }

  async filterEvents() {
    const { events } = Store;
    const value = filter === 'Choose members' ? '' : filter;
    this.clearTable();

    let result = [];

    if (value !== 'All members') {
      if (events && events !== 'undefined') {
        events.forEach((item) => {
          if (item.data.participants.includes(value)) {
            result.push(item);
          }
        });
      }
    } else {
      result = events;
    }
    return result;
  }
}
