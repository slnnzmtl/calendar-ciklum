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
    
    EventBus.subscribe("participantFilterChanged", value => {
      filter = value;
      _this.fillTable();
    });
  
    EventBus.subscribe("refreshEvents", () => {
      _this.fillTable();
    });

    _this.fillTable()
  }

  createTable(startTime, endTime) {
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

    for (var hour = startTime; hour <= endTime; hour = hour + 1) {
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
    const table = this.querySelector("table");
    
    let events = this.filterEvents();
    let tableClone = table.cloneNode(true);
    let tableCells = tableClone.querySelectorAll("tr td");

    if (!events.length) throw new Error("No events")

    events.forEach((event) => {
      tableCells.forEach((cell) => {  
        if (cell.dataset.day === event.day && cell.dataset.time === event.time) {
          let flagElement = document.createElement("div");
          let flagElementName = document.createElement("p");
          let flagElementButton = document.createElement("button");

          flagElement.classList.add("event-flag");
          flagElement.draggable = "true";
          flagElement.setAttribute("ondragstart", "onDragStart(event)");
          flagElement.dataset.day = event.day;
          flagElement.dataset.time = event.time;

          flagElementName.classList.add("event-flag__name");
          flagElementName.innerText = event.name;

          flagElementButton.classList.add("event-flag__button");
          flagElementButton.innerText = "X";

          flagElement.appendChild(flagElementName);
          flagElement.appendChild(flagElementButton);

          cell.insertAdjacentElement('afterbegin', flagElement);
        }
      });
    });

    table.replaceWith(tableClone);
    this.addRemoveEventListeners();
    return table;
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

      console.log(removeWindow)

      main.insertAdjacentElement("afterbegin", removeWindow);
  }

  filterEvents() {
    let value = filter;
    this.clearTable();
    console.log('filter')

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