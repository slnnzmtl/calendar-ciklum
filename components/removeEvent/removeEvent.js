import * as Cookies from '../../utils/cookies.js';
import EventBus from "../../utils/eventBus.js";
import removeEvent from "./removeEvent.html";
import ComponentsHelper from "../../utils/ComponentsHelper";
import Store from "../../utils/store";

import './removeEvent.scss';

export default class RemoveEvent extends HTMLElement {

  constructor(options) {
    super();

    this.classList.add("remove-event-wrapper");

    this.data = {
      name: options.name,
      id: options.id
    }
  }
  
  connectedCallback() {
    this.appendChild(ComponentsHelper.parseElement(removeEvent));

    this.buttonYes = this.querySelector("#button-yes");
    this.buttonNo = this.querySelector("#button-no");
    
    this.buttonYes.onclick = () => this.removeEvent(this.data.id);
    this.buttonNo.onclick = () => this.closeTab();

    this.eventName = this.querySelector("#event-name");
    this.eventName.innerText = this.data.name;
  }

  async removeEvent(id) {
    
    Store.deleteEvent(id)
    .then(() => {
      console.log('deleted');
    })
    
    // const events = await Store.getEvents(); 
    
    // let day = this.data.day;
    // let time = this.data.time;

    // events.forEach((item, index) => {
    //   if (item.day === day && item.time === time) {
    //     events.splice(index, 1);
    //   }
    // });

    // if (events.length > 0) {
    //   Cookies.setCookie('calendar', JSON.stringify(events));
    // } else {
    //   Cookies.deleteCookie('calendar');
    // }

    this.closeTab();
    EventBus.publish("refreshEvents");    
  }
  closeTab() {
    this.remove();
  }
};