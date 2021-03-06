import EventFlag from '../eventFlag/eventFlag';
import './tableCell.scss';

export default class TableCell extends HTMLElement {
  constructor(data, flag = false) {
    super();

    this.data = {
      day: data.day,
      time: data.time,
      flag,
    };

    this.classList.add('table-cell');
    this.setAttribute('ondragover', 'onDragOver(event)');
    this.setAttribute('ondrop', 'onDrop(event)');
  }

  connectedCallback() {
    if (typeof this.data.flag === "object") {
      this.appendChild(
        new EventFlag(
          this.data.flag.id,
          this.data.flag.data,
        ),
      );
    }
  }
}
