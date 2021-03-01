import eventFlag from "../eventFlag/eventFlag";
import removeEvent from "../removeEvent/removeEvent";
import "./calendarComponent.scss";
import * as Cookies from "../../utils/cookies";
import * as Data from "../../assets/data";
import "../../utils/draggable";
import * as EventBus from "../../utils/eventBus";
import Store from "../../utils/store";

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

    this.appendChild(this.createTable(Data.workingHours));
    const _this = this; 
    this.classList.add("calendar");
    
    EventBus.subscribe("participantFilterChanged", value => {
      filter = value;
      _this.fillTable();
    });
  
    EventBus.subscribe("refreshEvents", () => {
      this.getData();
    });

    this.fillTable();
  }

  getData() {
    Store.getEvents()
    .then (() => {
      this.fillTable()
    })
  }

  createTable(hours) {
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

    hours.forEach((hour) => {
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
    })

    return table;
  }

  async fillTable() {
    const table = this.querySelector("table");
  
    let events = await this.filterEvents();
    console.log(events)
  
    let tableClone = table.cloneNode(true);
    let tableCells = tableClone.querySelectorAll("tr td");

    if (!events.length) throw new Error("No events")

    events.forEach((event) => {
  
      tableCells.forEach((cell) => {  
        if (cell.dataset.day === event.data.day && cell.dataset.time === event.data.time) {

          // let flag = new eventFlag({
          //   id: event.id,
          //   name: event.data.name,
          //   day: event.data.day,
          //   time: event.data.time
          // });

          // cell.appendChild(flag);
          let flagElement = document.createElement("div");
          let flagElementName = document.createElement("p");
          let flagElementButton = document.createElement("button");

          flagElement.classList.add("event-flag");
          if (this.data.isAdmin) {
            flagElement.draggable = "true";
            flagElement.setAttribute("ondragstart", "onDragStart(event)");
          }
          flagElement.dataset.day = event.data.day;
          flagElement.dataset.time = event.data.time;
          flagElement.dataset.id = event.id;

          flagElementName.classList.add("event-flag__name");
          flagElementName.innerText = event.data.name;

          flagElementButton.classList.add("event-flag__button");
          flagElementButton.innerText = "X";

          flagElement.appendChild(flagElementName);
          flagElement.appendChild(flagElementButton);

          cell.insertAdjacentElement('afterbegin', flagElement);
        }
      });
    });

    table.replaceWith(tableClone);
    this.removeButtonsAddSettings();
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
    let removeWindow;
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

    parent.id = target
      .parentElement
      .dataset.id;

      removeWindow = new removeEvent(parent);

      main.insertAdjacentElement("afterbegin", removeWindow);
  }

  async filterEvents() {

    let events = Store.events;
    let value = filter === "Choose members" ? "" : filter;
    this.clearTable();

    let result = [];

    if (value !== "All members") {
      if (events && events !== "undefined") {
    
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