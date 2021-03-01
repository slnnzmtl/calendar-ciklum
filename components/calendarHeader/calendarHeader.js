import { publish } from "../../utils/eventBus";
import calendarHeader from "./calendarHeader.html";
import { participants } from "../../assets/data";
import ComponentsHelper from "../../utils/ComponentsHelper";
import newEventComponent from "../../components/newEvent/newEvent";
import * as Cookies from "../../utils/cookies";

import "./calendarHeader.scss";

export default class CalendarHeader extends HTMLElement {
  constructor() {
    super();

    this.data = {
        participants,
        isAdmin: Cookies.getCookie("currentUser") ? JSON.parse(Cookies.getCookie("currentUser")).isAdmin : "null"
    };
  }

  connectedCallback() {

    this.appendChild(ComponentsHelper.parseElement(calendarHeader));
    this.classList.add("calendar-header");

    this.select = this.querySelector(".calendar-header__filter");
    this.createButton = this.querySelector(".calendar-header__button");
    this.logoutButton = this.querySelector(".calendar-header__logout");

    this.createButton.style.display = this.data.isAdmin ? "block" : "none";

    this.select.insertAdjacentHTML("afterbegin", `
      <option value="All members">All members</option>
    `);

    this.select.onchange = () => publish("participantFilterChanged", this.select.value);

    this.createButton.onclick = () => this.newEvent();
    this.logoutButton.onclick = () => this.logout();
    
    ComponentsHelper.elementMultiplier("option", ["value"], this.select, this.data.participants.map(item => item.name)); 

    this.select.querySelectorAll("option").forEach(item => {
      item.innerText = item.value;
    })

  }

  newEvent() {
    let main = document.querySelector("#main");
    main.appendChild(new newEventComponent());
  }

  logout() {
    Cookies.deleteCookie("currentUser");
    publish("logout");
  }
}
