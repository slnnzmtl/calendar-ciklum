import { publish } from '../../utils/eventBus';
import calendarHeader from './calendarHeader.html';
import ComponentsHelper from '../../utils/ComponentsHelper';
import NewEventComponent from '../newEvent/newEvent';
import Store from '../../utils/store';

import './calendarHeader.scss';

export default class CalendarHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.appendChild(ComponentsHelper.parseElement(calendarHeader));
    this.classList.add('calendar-header');

    this.select = this.querySelector('.calendar-header__filter');
    this.createButton = this.querySelector('.calendar-header__button');
    this.logoutButton = this.querySelector('.calendar-header__logout');

    this.createButton.style.display = Store.isAdmin ? 'block' : 'none';

    this.select.insertAdjacentHTML('afterbegin', `
      <option value="All members">All members</option>
    `);

    this.select.onchange = () => publish('participantFilterChanged', this.select.value);

    this.createButton.onclick = () => this.newEvent();
    this.logoutButton.onclick = () => this.logout();

    this.fillParticipants(this.select, Store.users);
  }

  fillParticipants(select, data = []) {
    ComponentsHelper.elementMultiplier('option', ['value'], select, data.map((item) => item.data.name));

    this.select.querySelectorAll('option').forEach((item) => {
      item.innerText = item.value;
    });
  }

  newEvent() {
    this.appendChild(new NewEventComponent());
  }

  logout() {
    Store.clearCurrentUser();
    publish('logout');
  }
}
