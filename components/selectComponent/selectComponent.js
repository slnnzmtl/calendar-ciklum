import * as WcMixin from "/WcMixin.js";
import "./selectComponent.scss";
import {subscribe} from "../../plugins/eventBus.js";

let selectedItems = [];

customElements.define("select-multiply", class extends HTMLElement {
  
  connectedCallback() {
    WcMixin.addAdjacentHTML(this, `
      <p class="select-multiply__value" 
        w-id="selectValue/selectValueData"
        >Choose members
      </p>
      <div class="select-multiply__dropdown" 
        w-id="dropdownList/dropdownListValue">
          <p class="select-multiply__dropdown-item" 
            w-id="selectAll/selectAllValue" 
            value="all"
            >Select All
          </p>
      </div>
    `);

    this.dropdownList.appendChild(this.getList(this));

    document.querySelector(".new-event").onclick = () => this.showDropDown(this); 
    this.querySelectorAll(".select-multiply__dropdown-item").forEach(elem => {
      elem.onclick = () => this.choose(elem);
    });

    subscribe("resetForm", () => {
      selectedItems = [];
    });
  }


  getList(_this) {
    let template = _this.querySelector("div[data-name=template]");
    let list = document.createDocumentFragment();

    if (template) {
      let slots = Array.from(template.children);

      slots.forEach((slot, index) => {
        let elem = document.createElement("p");
        elem.innerHTML = slot.innerHTML;
        elem.dataset.name = slot.name;
        elem.dataset.value = slot.innerHTML;
        elem.className = _this.tagName.toLowerCase() + "__dropdown-item";

        list.appendChild(elem);
      });

      template.remove();
    } 
    return list;
  }

  choose(elem) {
    let value = elem.dataset.value;
    let selected = elem.classList.contains("selected");

    if (value !== "all") {

      if (!selected) {
        elem.classList.add("selected");
        selectedItems.push(value);
      } else {
        elem.classList.remove("selected");
        this.selectAll.classList.remove("selected");

        selectedItems.forEach((item, index) => {
          if (item === value) {
            selectedItems.splice(index, 1);
          }
        });
      }

    } else {
      let all = Array.from(elem.parentNode.children);

      if (!selected) {
        selectedItems = [];

        all.forEach((item, index) => {
          if (index > 0) {
            selectedItems.push(item.dataset.value);
          }
          
          item.classList.add("selected");
        });
      } else {
        all.forEach(item => {
          item.classList.remove("selected");
        });

        selectedItems = [];
      }
    }
    this.selectValueData = selectedItems.length ? selectedItems.join(", ") : "Choose members";    
  }

  showDropDown(elem) {
    let classList = event.target.classList;
    if (classList.contains("select-multiply") || classList.contains("select-multiply__value")) {
      elem.classList.toggle("open");
    } else if (classList.contains("select-multiply__dropdown-item")) {

    } else {
      elem.classList.remove("open");
    } 
  }

});

