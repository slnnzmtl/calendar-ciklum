import ComponentsHelper from '../../utils/ComponentsHelper';
import eventFlag from './eventFlag.html';
import RemoveEvent from '../removeEvent/removeEvent';
import Store from '../../utils/store';

import './eventFlag.scss';

export default class EventFlag extends HTMLElement {
  constructor(id, options) {
    super();

    this.data = {
      time: options.time,
      day: options.day,
      name: options.name,
      id
    };

    this.fields = {};

    this.appendChild(ComponentsHelper.parseElement(eventFlag));
    this.classList.add('event-flag');
  }

  connectedCallback() {
    this.fields.name = this.querySelector('.event-flag__name');
    this.fields.button = this.querySelector('.event-flag__button');

    this.fields.name.innerText = this.data.name;

    if (Store.isAdmin) {
      this.draggable = true;
      this.setAttribute('ondragstart', 'onDragStart(event)');
      this.fields.button.style.display = 'block';
      this.fields.button.onclick = () => this.showRemoveWindow();
    }
  }

  showRemoveWindow() {
    const main = document.querySelector('#main');

    main.insertAdjacentElement('afterbegin', new RemoveEvent(
      {
        name: this.data.name,
        day: this.data.day,
        time: this.data.time,
        id: this.data.id,
      },
      this
    ));
  }
}
