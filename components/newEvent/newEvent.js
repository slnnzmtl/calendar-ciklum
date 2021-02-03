import * as WcMixin from '/WcMixin.js'

import './newEvent.scss';

const me = 'new-event'



customElements.define(me, class extends HTMLElement {
    _but = null

	connectedCallback() {
        WcMixin.addAdjacentHTML(this, `
            <div class="new-event">
                <Label 
                    class="new-event__item" 
                >Name: 
                    <input 
                        class="new-event__input"
                        w-id="inputName/name"
                    ></input>
                </Label>
                <Label 
                    class="new-event__item" 
                >Participants: 
                    <select 
                        class="new-event__input"
                        w-id="inputParticipant/participant"
                    >
                        <option value="John" selected>John</option>
                        <option value="Eddard">Eddard</option>
                        <option value="Robbert">Robbert</option>
                        <option value="Jaime">Jaime</option>
                        <option value="Cersei">Cersei</option>
                    </select>
                </Label>
                <Label 
                    class="new-event__item" 
                >Day
                    <select 
                        class="new-event__input"
                        w-id="inputDay/day"
                    >
                        <option value="mon" selected>Monday</option>
                        <option value="tue">Tuesday</option>
                        <option value="wed">Wednesday</option>
                        <option value="thu">Thursday</option>
                        <option value="fri">Friday</option>
                    </select>
                </Label>
                <Label 
                    class="new-event__item" 
                >Time
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
            <style>
                ${me} {
                    
                }
            </style>
        `);

    this.buttonCreate.onclick = () => this.createEvent();
    this.buttonCancel.onclick = () => this.cancel();
    window.newEvent = this;
        
    }

     createEvent() {
        let object = {};
        object.name = this.name;
        object.participants = this.participants;
        object.day = this.day;
        object.time = this.time;

        this.setCookie('calendar', JSON.stringify(object))
        location.reload()
     }

    setCookie(name, value) {
        let events = decodeURIComponent(this.getCookie(name))
        if (events && events !== 'undefined') {
            let data = events += ',' + value;
            document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(data);
            console.log(encodeURIComponent(data))
        } else {
            document.cookie = name + '='  +  encodeURIComponent(value);
        }
    }

    getCookie(name) {
        var matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined
    }

     cancel() {
         console.log('canceled')
         window.newEvent.style = "display: none"
     }
});