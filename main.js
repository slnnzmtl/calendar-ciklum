import calendarHeader from './components/calendarHeader/calendarHeader.js';
import newEvent from './components/newEvent/newEvent.js';
import authComponent from './components/authComponent/authComponent.js';
import SelectComponent from './components/selectComponent/selectComponent';
import calendarComponent from './components/calendarComponent/calendarComponent';
import removeEvent from "./components/removeEvent/removeEvent";
import eventFlag from "./components/eventFlag/eventFlag";

import { subscribe } from "./utils/eventBus";
import * as Cookies from "./utils/cookies";
import Store from "./utils/store";


import '/styles/main.scss';

let main = document.querySelector("#main");

customElements.define('auth-component', authComponent);
customElements.define('calendar-header', calendarHeader);
customElements.define('new-event', newEvent);
customElements.define('select-multiply', SelectComponent);
customElements.define('calendar-component', calendarComponent);
customElements.define('remove-event', removeEvent);
customElements.define('event-flag', eventFlag);

Store.getUsers()
.then(() => {
    Store.getEvents()
    .then(() => {
        render();
    })
})


subscribe("logout", () => {
    render();
});

subscribe("login", () => {
    render();
});


function render() {
    let currentUser = Cookies.getCookie("currentUser");

    if (!currentUser) {
        main.innerHTML = new authComponent().outerHTML;
    } else {
        main.innerHTML = new calendarComponent().outerHTML;
        main.appendChild(new calendarHeader());
    }    
}

