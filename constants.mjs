export const ALLOWEDNUMBERS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
export const BCDTO7SEG = [
  [1, 1, 1, 1, 1, 1, 0],
  [0, 1, 1, 0, 0, 0, 0],
  [1, 1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 0, 0, 1],
  [0, 1, 1, 0, 0, 1, 1],
  [1, 0, 1, 1, 0, 1, 1],
  [1, 0, 1, 1, 1, 1, 1],
  [1, 1, 1, 0, 0, 0, 0],
  [1, 1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 0, 1, 1],
];

export const DEFAULT_VARS = {
  decimalNumber : 0,
  "--width":      "7rem",
  "--color-on":         "red",
};


export const DIGIT_TEMPLATE = `
  <style>
    :host { display:inline-block; 
      --width:7rem; 
      --height: calc(var(--width) * (24 / 14));
      --width-segment: calc(var(--width) * (2 / 15));
      --triangle: var(--width-segment);
      --gap:      calc(var(--width-segment) * (2 / 14));
      --margin-principal: calc(var(--width) * (2 / 14))
     --color-on:red}
    .digit {
      position: relative;
      width: var(--width);
      height: var(--height);
      /*background: none;*/
      margin: --margin-principal;
    }
    .segment {
      position: absolute;
      background: none;
      transition: background 0.2s;
    }
    .segment.on { background: var(--color-on); }
    .segment.off { background: none; }
    /* horizontal triangle */
    .segment.horizontal {
      width: calc(var(--width) - 2 * var(--gap) - 2 * var(--triangle));
      height: var(--triangle);
      left: calc(var(--width-segment) + var(--gap));
    }
    .segment.horizontal::before,
    .segment.horizontal::after {
      content:""; position:absolute; width:0; height:0;
      border-top: calc(var(--triangle) / 2 + var(--gap) / 14) solid transparent; /*0.5rem*/
      border-bottom:calc(var(--triangle) / 2 + var(--gap) / 14) solid transparent; /*0.5rem*/
    }
    .segment.horizontal::before {
      left:calc(var(--width-segment) / -2); border-right:calc(var(--width-segment) / 2) solid transparent;
    }
    .segment.horizontal::after {
      right:calc(var(--width-segment) / -2); border-left:calc(var(--width-segment) / 2) solid transparent;
    }
    .segment.horizontal.on::before  { border-right-color:var(--color-on); }
    .segment.horizontal.on::after   { border-left-color:var(--color-on); }
     .segment.horizontal.off::before  { border-right-color:transparent; }
    .segment.horizontal.off::after   { border-left-color:transparent; }

    /* vertical triangle */
    .segment.vertical {
      position: absolute;
      width: var(--width-segment);
      height: calc(var(--width) - 5 * var(--gap) - 2 * var(--triangle));
      transition: background .2s;
    }
    .segment.vertical::before,
    .segment.vertical::after {
      content:""; position:absolute; bottom:0; width:0; height:0;
      border-left:calc(var(--width-segment) / 2) solid transparent;
      border-right:calc(var(--width-segment) / 2) solid transparent;
    }
    .segment.vertical::before {
      top:calc(var(--width-segment) / -2); border-bottom:calc(var(--width-segment) / 2 + var(--gap) / 2) solid transparent;
    }
    .segment.vertical::after {
      bottom:calc(var(--width-segment) / -2); border-top:calc(var(--width-segment) / 2 + var(--gap) / 2) solid transparent;
    }
    .segment.vertical.on::before {border-bottom-color:var(--color-on); ;  }
    .segment.vertical.on::after  {border-top-color:var(--color-on); transform: translateY(calc(-var(--gap) / 30 )); }

    /* posiciones */
    .a { top:0; }
    .b { top:calc(var(--width-segment) + var(--gap)); right:0; }
    .c { bottom: calc(var(--width-segment) / 2 + 3 * var(--gap) ); right:  0;}
    .d { bottom: calc(-2 * var(--gap))} 
    .e { bottom: calc(var(--width-segment) / 2 + 3 * var(--gap)); left: 0; }
    .f { top:calc(var(--width-segment) + var(--gap)); left:0; }
    .g { top:calc(var(--height) - var(--width) + 5 * var(--gap)) }
  </style>

  <div class="digit">
    <div class="segment horizontal a"></div>
    <div class="segment vertical   b"></div>
    <div class="segment vertical   c"></div>
    <div class="segment horizontal d"></div>
    <div class="segment vertical   e"></div>
    <div class="segment vertical   f"></div>
    <div class="segment horizontal g"></div>
  </div>
`;
