import '/components/calendarComponent/calendarComponent.js';
import calendarHeader from './components/calendarHeader/calendarHeader.js';
import newEvent from './components/newEvent/newEvent.js';
import './components/removeEvent/removeEvent.js';
import './components/selectComponent/selectComponent.js';
import authComponent from './components/authComponent/authComponent.js';
import { subscribe } from "./utils/eventBus";
import * as Cookies from "./utils/cookies";
import SelectComponent from './components/selectComponent/selectComponent';
import calendarComponent from './components/calendarComponent/calendarComponent';

import '/styles/main.scss';

let main = document.querySelector("#main");

customElements.define('auth-component', authComponent);
customElements.define('calendar-header', calendarHeader);
customElements.define('new-event', newEvent);
customElements.define('select-multiply', SelectComponent);
customElements.define('calendar-component', calendarComponent);

subscribe("logout", () => {
    render();
});

subscribe("login", () => {
    render();
});

render();

function render() {
    let currentUser = Cookies.getCookie("currentUser");

    if (!currentUser) {
        main.innerHTML = new authComponent().outerHTML;
    } else {
        main.innerHTML = new calendarComponent().outerHTML;
        main.appendChild(new calendarHeader());
    }    
}

