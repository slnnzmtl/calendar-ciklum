import * as WcMixin from "/WcMixin.js";
import * as Data from "../../assets/data";
import {publish} from "../../plugins/eventBus";

import "./calendarHeader.scss";

customElements.define("calendar-header", class extends HTMLElement {

  connectedCallback() {
    WcMixin.addAdjacentHTML(this, `
      <h1 class="calendar-header__header">Meeting Room #1</h1>
      <div class="calendar-header__options">
        <select 
          class="calendar-header__filter"
          w-id="filterParticipant/participant"    
        ></select>
        <button w-id="buttonElem/button" class="calendar-header__button">+</button>
      </div>
    `);

    this.filterParticipant.appendChild(this.getParticipants(Data.participants));
    this.filterParticipant.onchange = () => publish("participantFilterChanged", this.participant);

    this.buttonElem.onclick = () => this.newEvent();
  }

  newEvent() {
    let main = document.querySelector("#main");
    let containerElement = document.createElement('new-event'); 
    containerElement.classList.add('new-event-container');

    main.appendChild(containerElement);
  }

  getParticipants(array) {
    const template = document.createDocumentFragment();
    let allMembersOption = document.createElement('option');

    allMembersOption.innerText = "All members";
    template.appendChild(allMembersOption);

    array.forEach((item) => {
      let option = document.createElement("option");
      option.dataset.name = item;
      option.innerText = item;

      template.appendChild(option);
    });

    return template;
  }
});
