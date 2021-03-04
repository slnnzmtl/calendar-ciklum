import authComponent from './authComponent.html';
// import {participants} from "../../assets/data";
import ComponentsHelper from '../../utils/ComponentsHelper';
import * as Roles from '../../utils/roles';
import * as Cookies from '../../utils/cookies';
import Store from '../../utils/store';
import { publish } from '../../utils/eventBus';
import './authComponent.scss';

export default class Auth extends HTMLElement {
  constructor() {
    super();

    this.data = {
      participants: [],
    };
  }

  connectedCallback() {
    this.data.participants = Store.users;

    this.appendChild(ComponentsHelper.parseElement(authComponent));
    this.classList.add('auth-wrapper');

    this.select = this.querySelector('.auth__select');
    this.button = this.querySelector('.auth__button');
    this.fillUsers(this.select, this.data.participants);

    this.button.onclick = () => this.confirm(this.select.value);
  }

  fillUsers(select, users) {
    ComponentsHelper.elementMultiplier('option', ['value'], select, users.map((item) => item.data.name));
    this.select.querySelectorAll('option').forEach((item) => {
      item.innerText = item.value;
    });
  }

  confirm(user) {
    let userObject = this.data.participants.find((item) => item.data.name === user);
    userObject = userObject.data;
    const newUser = userObject.isAdmin === 'true' ? new Roles.Admin(userObject) : new Roles.User(userObject);

    Cookies.setCookie('currentUser', JSON.stringify(newUser));
    publish('login');
    this.remove();
  }
}
