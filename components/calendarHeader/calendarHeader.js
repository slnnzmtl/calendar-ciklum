import * as WcMixin from '/WcMixin.js';
import './calendarHeader.scss';

const me = 'calendar-header';

customElements.define(me, class extends HTMLElement {

  connectedCallback() {
    WcMixin.addAdjacentHTML(this, `
      <h1 class="calendar-header__header">Calendar</h1>
      <div class="calendar-header__options">
        <select 
          class="calendar-header__filter"
          w-id="filterParticipant/participant"    
        >
          <option value="" selected>All members</option>
          <option value="John">John</option>
          <option value="Eddard">Eddard</option>
          <option value="Robbert">Robbert</option>
          <option value="Jaime">Jaime</option>
          <option value="Cersei">Cersei</option>
        </select>
        <button w-id="buttonElem/button" class="calendar-header__button">New Event+</button>
      </div>
    `);

    this.buttonElem.onclick = () => this.newEvent();
  }

  newEvent() {
    let main = document.querySelector('#main');

    main.insertAdjacentHTML('afterbegin', `
      <new-event class="new-event-container"></new-event>
    `)
  }
});
