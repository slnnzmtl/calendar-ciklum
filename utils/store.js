import Events from "./api/events";
import { publish } from "./eventBus";

const store = new class Store {
    constructor() {
        this.state = {};
    }

    async getEvents() {
        let response = await Events.get();
        this.state.events = response;
    }

    pushEvent(data) {
        Events.post(data)
        .then(() => {
            this.state.events.push(data);
            publish("refreshEvents");
        })
    }

    deleteEvent(id) {
        return Events.delete(id)
        .then(() => {
            let target;
            this.state.events.forEach((item, index) => {
                if (item.id === id) {
                  target = index;
                } 
            })

            this.state.events.splice(target, target);
            publish("refreshEvents");   
        })
    }

    updatePosition(id, drop) {
        this.state.events.forEach((item) => {
            if (item.id === id) {
                item.data.day = drop.day;
                item.data.time = drop.time;
                drop.participants = item.data.participants;
                drop.name = item.data.name;

                Events.put(id, drop);
            }
        });
    }

    get events() {
        if (this.state.events) {
            return this.state.events;
        } else {
            return new Error("No events in store");
        }
    }
}

export default store;