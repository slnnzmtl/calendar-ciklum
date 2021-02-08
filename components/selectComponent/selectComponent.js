import * as WcMixin from '/WcMixin.js';
import './selectComponent.scss';

let items = [];

customElements.define('select-multiply', class extends HTMLElement {
  
  connectedCallback() {
    WcMixin.addAdjacentHTML(this, `
      <p class="select-multiply__value" w-id="selectValue/selectValueData">${items.length > 0 ? items : 'Choose members'}</p>
      <div class="select-multiply__dropdown" w-id="dropdownList/dropdownListValue">
        <p class="select-multiply__dropdown-item" w-id="selectAll/selectAllValue" value="all">Select All</p>
      </div>
    `);

    this.dropdownList.appendChild(this.getList(this));

    document.querySelector('.new-event').onclick = () => this.showDropDown(this); 
    this.querySelectorAll('.select-multiply__dropdown-item').forEach(elem => {
      elem.onclick = () => this.choose(elem);
    })
  }

  
  getList(_this) {
    let template = _this.querySelector('template');
    let slots = Array.from(template.content.children);
    let list = document.createDocumentFragment();

    slots.forEach((slot, index) => {
      let elem = document.createElement('p');
      elem.innerHTML = slot.innerHTML;
      elem.setAttribute('name', slot.name)
      elem.setAttribute('value', slot.innerHTML)
      elem.className = _this.tagName.toLowerCase() + '__dropdown-item';
      list.appendChild(elem);
    })
    template.remove();
    
    return list;
  }

  choose(elem) {
    let value = elem.getAttribute('value');
    if (value !== 'all') {
      if (!elem.classList.contains('selected')) {
        elem.classList.add('selected');
        items.push(value);
      } else {
        elem.classList.remove('selected');
        this.selectAll.classList.remove('selected');
        items.forEach((item, index) => {
          if (item === value) {
            items.splice(index, 1)
          }
        })
        
      }
    } else {
      let all = Array.from(elem.parentNode.children);
      if (!elem.classList.contains('selected')) {
        items = [];
        all.forEach((item, index) => {
          if (index > 0) {
            items.push(item.getAttribute('value'));
          }
          item.classList.add('selected');
        })
      } else {
        all.forEach(item => {
          item.classList.remove('selected');
        })
        items = [];
      }
    }
    this.selectValueData = items;
  }

  showDropDown(elem) {
    let classList = event.target.classList;
    if (classList.contains('select-multiply') || classList.contains('select-multiply__dropdown-item')) {
      elem.classList.add('open');
    }  else {
      elem.classList.remove('open');
    }
    
  }

});

