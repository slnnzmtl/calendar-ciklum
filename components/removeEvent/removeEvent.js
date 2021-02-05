import * as WcMixin from '/WcMixin.js';
import * as Cookies from '/plugins/cookies.js';
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
    let day = this.getAttribute('day');
    let time = this.getAttribute('time');
    const events = Cookies.getEvents();
    events.forEach((item, index) => {
      if (item.day === day && item.time === time) {
        events.splice(index, 1);
      }
    });

    const eventString = JSON.stringify(events).replace('[{', '{').replace('}]', '}');
    if (eventString !== '[]') {
      Cookies.setCookie('calendar', eventString);
    } else {
      Cookies.deleteCookie('calendar');
    }
    location.reload();
  }

  closeTab() {
    this.remove();
  }
});