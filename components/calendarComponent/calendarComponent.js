import '/components/calendarComponent/calendarComponent.scss';
import * as WcMixin from '/WcMixin.js'

const me = 'calendar-component';

customElements.define(me, class extends HTMLElement {
    _but = null

	connectedCallback() {
        WcMixin.addAdjacentHTML(this, this.createCalendar(10, 18))
        let _this = this

        _this.fillTable(_this.getEvents())

        let buttons = this.querySelectorAll('.event-flag__button');
        buttons.forEach(button => {
            button.addEventListener('click', function(e) {
                _this.removeEvent(e.target.getAttribute('day'), e.target.getAttribute('time'))
            })
        })
    }
    
    createCalendar(start, end) {
        var table = '<table><tr><th class="row-header">Time</th><th>Monday</th><th>Tuesday</th><th>Wednesday</th><th>Thursday</th><th>Friday</th></tr>';
        for (let i = start; i <= end; i++) {
            table += `<tr><th class="row-header">`+ i + ':00' +`</th><td day="mon" time="` + i + `"></td><td day="tues" time="` + i + `"></td><td day="wed" time="` + i + `"></td><td day="thu" time="` + i + `"></td><td day="fri" time="` + i + `"></td></tr>`
        }
        return table
    }

    fillTable(events) { 
        
        
        let elements = this.querySelectorAll('table tr td')
        elements.forEach(elem => {
            events.forEach(item => {
                if (elem.getAttribute('day') === item.day  && elem.getAttribute('time') === item.time) {
                    WcMixin.addAdjacentHTML(elem, `
                        <div class="event-flag">
                            <p class="event-flag__name">`+ item.name +`</p>
                            <button class="event-flag__button" day="`+ item.day +`" time="`+ item.time +`">X</button>
                        </div>
                    `)
                }
            })
        })
    }

    removeEvent(day, time) {
        let events = this.getEvents();
        events.forEach((item, index) => {
            if (item.day === day && item.time === time) {
                events.splice(index, 1)
            }
        })
        this.setCookie('calendar', JSON.stringify(events))
        location.reload()
        
    }

    setCookie(name, value) {
        let replaced = value.replace('[', '').replace(']', '');
        document.cookie = encodeURIComponent(name) + '=' + encodeURIComponent(replaced);
    }

    getEvents() {
        let replaced = this.getCookie('calendar').replaceAll('},', '}},');
        let events = this.getCookie('calendar')
        let arr = replaced.split('},');
        // let arr = JSON.parse(events)
        console.log(arr)
        arr.forEach((item, index) => {
            if (item) {
                arr[index] = JSON.parse(item);
            }   
        })
        return arr;
    }

    getCookie(name) {
        var matches = document.cookie.match(new RegExp(
          "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
        ))
        return matches ? decodeURIComponent(matches[1]) : undefined;
    }

    
    
})

