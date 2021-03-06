import './calendarComponent.scss';
import * as Data from '../../assets/data';
import '../../utils/draggable';
import * as EventBus from '../../utils/eventBus';
import Store from '../../utils/store';
import TableColumn from '../tableColumn/tableColumn';

const me = "calendar-component";
let filter = "All members";

 export default class calendarComponent extends HTMLElement {

  constructor() {
    super();

    this.data = {
      isAdmin: Cookies.getCookie("currentUser") ? JSON.parse(Cookies.getCookie("currentUser")).isAdmin : "null",
    }
  }

  connectedCallback() {
    this.classList.add('calendar');

    this.appendChild(this.createTable(Data.workingHours));
    const _this = this; 
    this.classList.add("calendar");
    
    EventBus.subscribe("participantFilterChanged", value => {
      filter = value;
      this.clearTable();
      this.insertData();
    });

    EventBus.subscribe('refreshEvents', () => {
      this.clearTable();
      this.insertData();
    });

    this.insertData();
  }

  clearTable() {
    const container = this.querySelector('.table-container');
    if (container) container.remove();
  }

  insertData() {
    this.appendChild(
      this.createTable(Data.workingDays, Data.workingHours)
    );
  }

  createTable(days, hours) {
    const table = document.createElement('div');
    let rowHeader = document.createElement("div");
    let header = document.createElement("div");

    table.classList.add('table-container');

    header.classList.add("table-cell");
    header.classList.add("table-header");

    header.textContent = "Time";
    rowHeader.appendChild(header);
    rowHeader.classList.add("table-column");
    rowHeader.classList.add("row-header");

    hours.forEach(item => {
      let elem = document.createElement("div");
          elem.classList.add("table-cell");
          elem.classList.add("table-header");
          elem.textContent = `${item}:00`;
          rowHeader.appendChild(elem);
    })

    table.appendChild(rowHeader);

    this.filterEvents()
      .then((res) => {
        days.forEach((day) => {
          const filtered = res.filter(
            event => event.data.day === day
          );

          table.appendChild(
            new TableColumn(
              hours,
              day,
              filtered.length > 0 ? filtered : null,
            ),
          );
        });        
      });

    return table;
  }

  async filterEvents() {
    let result = [];
    await Store.getEvents()
      .then(async () => {
        const { events } = Store;
        const value = filter === 'Choose members' ? '' : filter;

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
      });
    return result;
  }

  removeButtonsAddSettings() {
    const _this = this;
    const buttons = this.querySelectorAll(".event-flag__button");

    buttons.forEach((button) => {
      button.style.display = this.data.isAdmin ? "block" : "none";
      button.addEventListener("click", (e) => {
        _this.showRemoveWindow(e.target);
      });
    });
  }
};