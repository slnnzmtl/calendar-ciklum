import * as Cookies from '../../utils/cookies.js';
import EventBus from "../../utils/eventBus.js";
import removeEvent from "./removeEvent.html";
import ComponentsHelper from "../../utils/ComponentsHelper";
import Store from "../../utils/store";

import './removeEvent.scss';

export default class RemoveEvent extends HTMLElement {

  constructor(options, parent) {
    super();

    this.parent = parent;

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
      this.parent.remove();
      this.closeTab();
    });
  }

  closeTab() {
    this.remove();
  }
};