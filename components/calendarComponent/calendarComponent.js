import "./calendarComponent.scss";
import * as WcMixin from "../../WcMixin.js";
import * as Cookies from "../../plugins/cookies.js";
import * as Data from "../../assets/data.js";
import "../../plugins/draggable.js";
import * as EventBus from "../../plugins/eventBus.js";

const me = "calendar-component";
let filter = "All members";

customElements.define(me, class extends HTMLElement {

  connectedCallback() {
    WcMixin.addAdjacentHTML(this, this.createTable(Data.workingHours.start, Data.workingHours.end));
    const _this = this; 

    document.querySelector("#filterParticipant").addEventListener("change", (ev) => {
      filter = ev.target.value;
      _this.fillTable();
    });

    _this.fillTable()
    
    EventBus.subscribe("refreshEvents", () => {
      _this.fillTable();
    });

  }

  createTable(start, end) {
    let table = document.createElement("table");
    let tableHeader = document.createElement("tr");
    let workingDays = Data.workingDays;
    
    tableHeader.insertAdjacentHTML("afterbegin", `
      <th>Time</th>
    `)

    workingDays.forEach(item => {
      let th = document.createElement("th");

      th.innerText = item;
      tableHeader.appendChild(th);
    })
    tableHeader.classList.add("table-header");
    table.appendChild(tableHeader);

    for (var hour = start; hour <= end; hour = hour + 1) {
      let tr = document.createElement("tr");      
      let th = document.createElement("th");
      th.classList.add("row-header");
      th.innerText = `${hour}:00`;
      tr.appendChild(th);
      
      workingDays.forEach(item => {
        let td = document.createElement("td");

        td.dataset.day = item;
        td.dataset.time = hour;
        td.setAttribute("ondragover", "onDragOver(event)");
        td.setAttribute("ondrop", "onDrop(event)");

        tr.appendChild(td);
      })

      table.appendChild(tr);
    }
    return table.outerHTML;
  }

  fillTable() {
    let events = this.filterEvents();
    if (!events) throw new Error("No events")

    const tableCells = this.querySelectorAll("table tr td");

    events.forEach((event) => {
      tableCells.forEach((cell) => {  
        if (cell.dataset.day === event.day && cell.dataset.time === event.time) {
          let flagElement = document.createElement("div");
          let flagNameElement = document.createElement("p");
          let flagButtonElement = document.createElement("button");

          flagElement.classList.add("event-flag");
          flagElement.draggable = "true";
          flagElement.setAttribute("ondragstart", "onDragStart(event)");
          flagElement.dataset.day = event.day;
          flagElement.dataset.time = event.time;

          flagNameElement.classList.add("event-flag__name");
          flagNameElement.innerText = event.name;

          flagButtonElement.classList.add("event-flag__button");
          flagButtonElement.innerText = "X";

          flagElement.appendChild(flagNameElement);
          flagElement.appendChild(flagButtonElement);

          WcMixin.addAdjacentHTML(cell, flagElement.outerHTML);
        }
      });
    });

    this.addRemoveEventListeners();
  }

  clearTable() {
    const flags = document.querySelectorAll(".event-flag");

    flags.forEach((item) => {
      item.remove();
    });
  }

  showRemoveWindow(target) {
    let main = document.querySelector("#main");
    let removeWindow = document.createElement("remove-event");
    let parent = {};
    
    parent.name = target
      .parentElement
      .querySelector(".event-flag__name")
      .textContent;

    parent.day = target
      .parentElement
      .dataset.day;
      
    parent.time = target
      .parentElement
      .dataset.time;

      removeWindow.classList.add("remove-event-wrapper");
      removeWindow.dataset.name = parent.name;
      removeWindow.dataset.day = parent.day;
      removeWindow.dataset.time = parent.time;

      main.insertAdjacentElement("afterbegin", removeWindow);
  }

  filterEvents() {
    let value = filter;
    this.clearTable();

    const cookies = Cookies.getCookie("calendar");
    const events = cookies !== undefined ? JSON.parse(cookies) : [];
    let result = [];

    if (value !== "All members") {
      if (events && events !== "undefined") {
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
    const buttons = this.querySelectorAll(".event-flag__button");

    buttons.forEach((button) => {
      button.addEventListener("click", (e) => {
        _this.showRemoveWindow(e.target);
      });
    });
  }
});