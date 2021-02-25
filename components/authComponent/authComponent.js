import authComponent from "./authComponent.html";
import {participants} from "../../assets/data";
import ComponentsHelper from "../../utils/ComponentsHelper";
import * as Roles from "../../utils/roles";
import * as Cookies from "../../utils/cookies";
import { publish } from "../../utils/eventBus";
import  "./authComponent.scss";


export default class Auth extends HTMLElement {

    constructor() {
        super();

        this.data = {
            participants
        };
    }

    connectedCallback() {
        this.appendChild(ComponentsHelper.parseElement(authComponent));
        this.classList.add("auth-wrapper");
        
        this.select = this.querySelector(".auth__select");
        this.button = this.querySelector(".auth__button");
        
        ComponentsHelper.elementMultiplier('option', ['value'], this.select, this.data.participants.map(item => item.name)); 
        this.select.querySelectorAll("option").forEach(item => {
            item.innerText = item.value;
        })

        this.button.onclick = () => this.confirm(this.select.value);
    }

    confirm(user) {

        let userObject = this.data.participants.find(item => {
            return item.name === user;
        });
        let newUser = userObject.isAdmin ? new Roles.Admin(userObject) : new Roles.User(userObject);

        Cookies.setCookie("currentUser", JSON.stringify(newUser));
        
        publish("login");
        this.remove();
    }
}

