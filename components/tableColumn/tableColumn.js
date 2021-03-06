import TableCell from '../tableCell/tableCell';
import './tableColumn.scss';

export default class TableColumn extends HTMLElement {
  constructor(hoursArray = null, day = null, events = null) {
    super();

    this.data = {
      hoursArray,
      day,
      events,
    };

    this.classList.add('table-column');
  }

  connectedCallback() {

		let header = document.createElement("div");
		header.classList.add("table-cell");
		header.classList.add("table-header");
		header.textContent = this.data.day;

		this.appendChild(header);
    this.appendChild(
      this.calc(),
    );
  }

  calc() {
		
    const container = document.createDocumentFragment();
    let content;

		this.data.hoursArray.forEach((time) => {
      const data = {
        day: this.data.day,
        time,
      };

      if (this.data.events) {
        content = this.data.events.find((item) => item.data.time === time);
      }

      container.appendChild(
        new TableCell(
          data,
          content || false,
        ),
      );
    });

    return container;
  }
}
