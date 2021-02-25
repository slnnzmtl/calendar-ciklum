import * as WcMixin from "../../utils/WcMixin.js";
import * as Cookies from "../../utils/cookies.js";
import * as EventBus from "../../utils/eventBus";
import { participants, workingDays, workingHours } from "../../assets/data";
import ComponentsHelper from "../../utils/ComponentsHelper";
import newEvent from "./newEvent.html";
import selectComponent from "../selectComponent/selectComponent";

import "./newEvent.scss";

export default class NewEvent extends HTMLElement {

  constructor() {
    super();

        this.data = {
            participants,
            days: workingDays,
            hours: workingHours
        };
  }

  connectedCallback() {

    this.classList.add("new-event-container");
    this.appendChild(ComponentsHelper.parseElement(newEvent));

    this.buttonCancel = this.querySelector(".button-cancel");
    this.buttonSubmit = this.querySelector(".button-submit");
    this.participants = this.querySelector("#select-participants");
    this.days = this.querySelector("#select-days");
    this.time = this.querySelector("#select-time");

    this.buttonSubmit.onclick = () => this.createEvent();
    this.buttonCancel.onclick = () => this.closeTab();

    let multiSelect = new selectComponent(this.data.participants);
    this.participants.appendChild(multiSelect);
    multiSelect.classList.add("new-event__input");


    ComponentsHelper.elementMultiplier("option", ["data-value"], this.days, this.data.days)
    this.days.querySelectorAll("option").forEach(item => {
      item.innerText = item.dataset.value;
    })

    ComponentsHelper.elementMultiplier("option", ["data-value"], this.time, this.data.hours) 
    this.time.querySelectorAll("option").forEach(item => {
      item.innerText = `${item.dataset.value}:00`;
    })

  }

  createEvent() {
    let object = {};
    object.name = this.name;
    object.day = this.day;
    object.time = this.time;
    object.participants = this.querySelector("#select-participants").selectValueData.split(",");

    if (this.checkFields(object)) {
      const cookies = Cookies.getCookie("calendar");
      const events = cookies ? JSON.parse(cookies) : [];

      if (!this.checkIfExist(events, object)) {
        if (events && events !== "undefined") {
          events.push(object);
          Cookies.setCookie("calendar", JSON.stringify(events));
        } else {
          events[0] = object;
          Cookies.setCookie("calendar", JSON.stringify(events));
        }

        object = {};
        this.closeTab();
        EventBus.publish("refreshEvents");
      }
    }
  }

  checkFields(data) {
    this.clearErrors();
    let error = 0;
    console.log(data)
    if (data.name === "") {
      this.showError("Name cannot be empty.");
      error += 1;
    }
    if (data.participants.length === 0 || data.participants[0].includes("Choose members")) {
      this.showError("Please, choose members");
      error += 1;
    }

    if (error > 0) {
      return false;
    }
    return true;
  }

  checkIfExist(data, object) {
    let result = false;
    data.forEach((item) => {
      if (item) {
        if (item.day === object.day && item.time === object.time) {
          result = true;
          this.showError("This time is already taken.");
        }
      }
    });
    return result;
  }

  showError(text) {
    let span = document.createElement("span");
    span.classList.add("error-message");
    span.innerText = text;

    this.insertAdjacentElement("afterbegin", span);
  }

  clearErrors() {
    const errors = this.querySelectorAll(".error-message");
    errors.forEach((item) => {
      item.remove();
    });
  }

  closeTab() {
    this.remove();
    EventBus.publish("resetForm");
  }
}


//   formSetData() {
//     const participants = document.createElement("select-multiply");
//     participants.className = "new-event__input select-multiply";
//     participants.id = "select-participants";
//     participants
//       .appendChild(
//         this.getParticipants(Data.participants),
//       );
//     this.participantsLabel
//       .appendChild(participants);

    
  // }

//   getParticipants(array) {
//     const template = document.createElement("div");
//     template.dataset.name = "template";

//     array.forEach((item) => {
//       let slot = document.createElement("slot");
//       slot.dataset.name = item;
//       slot.innerText = item;

//       template.appendChild(slot);
//     });

//     return template;
//   }


// });
