import * as WcMixin from '../../utils/WcMixin.js';
import * as Cookies from '../../utils/cookies.js';
import EventBus from "../../utils/eventBus.js";

import './removeEvent.scss';

customElements.define('remove-event', class extends HTMLElement {
  
  connectedCallback() {
    WcMixin.addAdjacentHTML(this, `
    <div class="remove-event">
      <p class="remove-event__title">Are you sure you want to delete «${this.dataset.name}» event?</p>
      <div class="remove-event__buttons">
        <button class="remove-event__button" w-id="buttonYes/yes">Yes</button>
        <button class="remove-event__button" w-id="buttonNo/no">No</button
      </div>
    </div>
    `);

    this.buttonYes.onclick = () => this.removeEvent();
    this.buttonNo.onclick = () => this.closeTab();
  }

  removeEvent() {
    let _this = this;
    const cookies = Cookies.getCookie('calendar');
    const events = cookies ? JSON.parse(cookies) : [];
    
    let day = this.dataset.day;
    let time = this.dataset.time;

    events.forEach((item, index) => {
      if (item.day === day && item.time === time) {
        events.splice(index, 1);
      }
    });

    if (events.length > 0) {
      Cookies.setCookie('calendar', JSON.stringify(events));
    } else {
      Cookies.deleteCookie('calendar');
    }

    _this.closeTab();
    EventBus.publish("refreshEvents");    
  }
  closeTab() {
    this.remove();
  }
});