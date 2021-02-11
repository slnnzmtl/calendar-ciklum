import * as WcMixin from "../../WcMixin.js";
import * as Cookies from "../../plugins/cookies.js";
import "./newEvent.scss";
import * as Data from "../../assets/data";
import * as EventBus from "../../plugins/eventBus";

customElements.define("new-event", class extends HTMLElement {
  connectedCallback() {
    WcMixin.addAdjacentHTML(this, `
    <div class="new-event">
      <Label class="new-event__item">
        Name: 
        <input autofocus
          class="new-event__input"
          w-id="inputName/name"
        ></input>
      </Label>

      <Label 
        class="new-event__item"
        w-id="participantsLabel/participantsLabelValue"
      >Members:
      </Label>

      <Label 
          class="new-event__item" 
      >Day:
        <select 
          class="new-event__input"
          w-id="inputDay/day"
        ></select>
      </label>

      <Label 
          class="new-event__item" 
        >Time:
          <select 
            class="new-event__input"
            w-id="inputTime/time"
          ></select>
      </label>

      <div class="new-event__button-wrapper">
        <button w-id="buttonCreate/create" class="new-event__button">Create</button>
        <button w-id="buttonCancel/buttonCancelValue" class="new-event__button">Cancel</button>
      </div>
    </div>
  `);

    this.formSetData();
    this.buttonCreate.onclick = () => this.createEvent();
    this.buttonCancel.onclick = () => this.closeTab();
    window.newEvent = this;
  }

  formSetData() {
    const participants = document.createElement("select-multiply");
    participants.className = "new-event__input select-multiply";
    participants.id = "select-participants";
    participants
      .appendChild(
        this.getParticipants(Data.participants),
      );
    this.participantsLabel
      .appendChild(participants);

    Data.workingDays.forEach((item) => {
      let option = document.createElement("option");
      option.dataset.value = item;
      option.innerText = item;

      this.inputDay.appendChild(option);
    });

    for (let i = Data.workingHours.start; i <= Data.workingHours.end; i = i + 1) {

        let option = document.createElement("option");
        option.setAttribute("value", i);
        option.innerText = `${i}:00`;

        this.inputTime.appendChild(option);
    }
  }

  getParticipants(array) {
    const template = document.createElement("div");
    template.dataset.name = "template";

    array.forEach((item) => {
      let slot = document.createElement("slot");
      slot.dataset.name = item;
      slot.innerText = item;

      template.appendChild(slot);
    });

    return template;
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
      }
    }
  }

  checkFields(data) {
    this.clearErrors();
    let error = 0;
    if (data.name === "") {
      this.showError("Name cannot be empty.");
      error += 1;
    }
    if (data.participants.length === 0 || data.participants[0] === "Choose members") {
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
    EventBus.publish("refreshEvents");
    EventBus.publish("resetForm");
    this.remove();
  }
});
