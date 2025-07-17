import { ALLOWEDNUMBERS, BCDTO7SEG, DEFAULT_VARS, DIGIT_TEMPLATE } from "./constants.mjs";

// memory template
const createTemplate = document.createElement("template");
createTemplate.innerHTML = DIGIT_TEMPLATE;

class SevenSegmentsDisplay extends HTMLElement {
  static get observedAttributes() {
    return ["value","options"];
  }

  constructor() {
    super();
    this._shadow = this.attachShadow({ mode: "open" });
    // clone template created in memory
    this._shadow.appendChild(createTemplate.content.cloneNode(true));
    this._segments = Array.from(this._shadow.querySelectorAll(".segment"));
    this.classList.add("digit");
  }

  attributeChangedCallback(name, oldVal, newVal) {
    if (name === "options" && newVal) {
      try {
        this._userOptions = JSON.parse(newVal);
      } catch {
        console.error("options no es JSON:", newVal);
        this._userOptions = {};
      }
      const currentValue = this.getAttribute("value") || DEFAULT_VARS.decimalNumber;
      this._render({
        ...this._userOptions,
        decimalNumber: currentValue
      });
    }
  
    if (name === "value") {
      this._render({
        ...this._userOptions,
        decimalNumber: newVal
      });
    }
  }
  
  connectedCallback() {
    // first render
    const opts = this.getAttribute("options");
    const initialOptions = opts ? JSON.parse(opts) : {};
    const initialValue   = this.getAttribute("value") || DEFAULT_VARS.decimalNumber;
    //mix optional atributes
    this._render({ ...initialOptions, decimalNumber: initialValue });
  }
  _render(options) {
    //mix with spread operator optional setters for css variables
    const vars = {...DEFAULT_VARS, ...options};
    let decimalNumber =0;
    Object.entries(vars).forEach(([key, value])=>{
      if(key==="decimalNumber"){
        decimalNumber=value;
        console.log(decimalNumber)
      }else{
        //stay deep webcomponent, so dont need set in root
        this.style.setProperty(key, value);
      }
    })
    // here pass matrix number
    const sevenSegments = BCDTO7SEG[parseInt(decimalNumber, 10)];
    //are off each render
    this._segments.forEach((bit) => {
      bit.classList.add("off");
      bit.classList.remove("on");
    });
    //on depends their number
    sevenSegments.forEach((bit, idx) => {
      if (bit) {
        this._segments[idx].classList.add("on");
        this._segments[idx].classList.remove("off");
      }
    });
  }
}

customElements.define("bcd-7seg", SevenSegmentsDisplay);
