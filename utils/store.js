import Events from "./api/events";
import Users from "./api/users";
import * as Cookies  from "../utils/cookies";

import { publish } from "./eventBus";

class Store {
    constructor() {
        this.state = {
            currentUser: {},
            // isAdmin: Cookies.getCookie("currentUser") ? JSON.parse(Cookies.getCookie("currentUser")).isAdmin : 'false'
        };

        this.getCurrentUser();
    }

    getCurrentUser() {
        this.state.currentUser = Cookies.getCookie("currentUser") ? JSON.parse(Cookies.getCookie("currentUser")) : {};
    }

    clearCurrentUser() {
        Cookies.deleteCookie("currentUser");
        this.state.isAdmin = false;
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

    async getUsers() {
        let response = await Users.get();
        this.state.users = response;
    }

    pushUser(data) {
        Events.post(data)
        .then(() => {
            this.state.users.push(data);
            publish("refreshUsers");
        })
        .catch(error => {
            console.log(error)
        })
    }

    get events() {
        if (this.state.events) {
            return this.state.events;
        } else {
            return new Error("No events in store");
        }
    }

    get users() {
        if (this.state.users) {
            return this.state.users;
        } else {
            return new Error("No users in store");
        }
    }

    get isAdmin() {
        if (this.state.currentUser) {
            return this.state.currentUser.isAdmin;
        } else {
            return new Error("No info in store");
        }
    }
}

export default new Store();