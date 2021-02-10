import * as WcMixin from '/WcMixin.js';
import * as Cookies from '/plugins/cookies.js';
import EventBus from "/plugins/eventBus.js";

import './removeEvent.scss';

customElements.define('remove-event', class extends HTMLElement {
  
  connectedCallback() {
    WcMixin.addAdjacentHTML(this, `
    <div class="remove-event">
      <p class="remove-event__title">Are you sure you want to delete «${this.getAttribute('name')}» event?</p>
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
    
    let day = this.getAttribute('day');
    let time = this.getAttribute('time');

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
    
    EventBus.publish("refreshEvents");    
    _this.closeTab();

  }
  closeTab() {
    this.remove();
  }
});