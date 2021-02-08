import * as WcMixin from '/WcMixin.js';
import * as Cookies from '/plugins/cookies.js';
import './newEvent.scss';

const me = 'new-event';

customElements.define(me, class extends HTMLElement {
  
  connectedCallback() {
    WcMixin.addAdjacentHTML(this, `
      <div class="new-event">
        <Label 
          class="new-event__item" 
        >Name: 
          <input autofocus
            class="new-event__input"
            w-id="inputName/name"
          ></input>
        </Label>
        <Label 
          class="new-event__item"
        >Members:
        <select-multiply class="new-event__input select-multiply" id="select-participants">
        <template>
          <slot name="John">John</slot>
          <slot name="Cercei">Cersei</slot>
          <slot name="Robert">Robbert</slot>
          <slot name="Eddard">Eddard</slot>
          <slot name="Jaime">Jaime</slot>
        </template>
        </select-multiply>
        </Label>
        
        <Label 
          class="new-event__item" 
        >Day:
          <select 
            class="new-event__input"
            w-id="inputDay/day"
          >
            <option value="Monday" selected>Monday</option>
            <option value="Tuesday">Tuesday</option>
            <option value="Wednesday">Wednesday</option>
            <option value="Thursday">Thursday</option>
            <option value="Friday">Friday</option>
          </select>
        </Label>
        <Label 
          class="new-event__item" 
        >Time:
          <select 
            class="new-event__input"
            w-id="inputTime/time"
          >
            <option value="10">10:00</option>
            <option value="11">11:00</option>
            <option value="12">12:00</option>
            <option value="13">13:00</option>
            <option value="14">14:00</option>
            <option value="15">15:00</option>
            <option value="16">16:00</option>
            <option value="17">17:00</option>
            <option value="18">18:00</option>
          </select>
        </Label>
        <div class="new-event__button-wrapper">
          <button w-id="buttonCreate/create" class="new-event__button">Create</button>
          <button w-id="buttonCancel/cancel" class="new-event__button">Cancel</button>
        </div>
      </div>
    `);

    this.buttonCreate.onclick = () => this.createEvent();
    this.buttonCancel.onclick = () => this.cancel();
    window.newEvent = this;

    // new vanillaSelectBox('#selectParticipant');
  }

  createEvent() {
    const object = {};
    object.name = this.name;
    object.day = this.day;
    object.time = this.time;
    object.participants = this.querySelector('#select-participants').selectValueData.split(',');
    console.log(object)

    if (this.checkFields(object)) {
      const cookies = Cookies.getCookie('calendar'); 
      let replaced;
      let events;

      if (cookies) {
        replaced = cookies.replaceAll('},', '}},');
      }
      events = replaced && replaced !== 'undefined' ? replaced.split('},') : undefined;

      if (!this.checkIfExist(events, object)) {
        if (events && events !== 'undefined') {
          const data = `${events},${JSON.stringify(object)}`;
          Cookies.setCookie('calendar', data);
        } else {
          Cookies.setCookie('calendar', JSON.stringify(object));
        }
        location.reload();
      }
    } 
  }

  checkFields(data) {
    this.clearErrors();
    console.log(data)
    let error = 0;
    if (data.name === '') {
      this.showError("Name cannot be empty.");
      error = error + 1;
    } 
    if (data.participants.length === 0 || data.participants[0] === 'Choose members' ) {
      this.showError("Please, choose members");
      error = error + 1;
    }

    if (error > 0) {
      return false;
    } else {
      return true;
    }
  }

  checkIfExist(data, object) {
    if (data) {
      let result = false;
      data.forEach((item) => {
        if (item) {
          item = JSON.parse(item);
          if (item.day === object.day && item.time === object.time) {
            result = true;
            this.showError('This time is already taken.');
          }
        }
      });
      return result;
    }
    return false;
  }

  showError(text) {
    this.insertAdjacentHTML('afterbegin', `<span class="error-message">${text}</span>`);
  }

  clearErrors() {
    let errors = this.querySelectorAll('.error-message');
    errors.forEach(item => {
      item.remove();
    })
  }

  cancel() {
    this.remove();
  }
});
