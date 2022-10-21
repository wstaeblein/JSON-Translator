/**
 * A module that creates a tool for implementing color and formatting for the terminal.
 * @module chroma-palette
 */

/**
 * Class ChromaPalette - creates a tool for implementing color and formatting in strings.
 */

class ChromaPalette {
  /**
   * Create a ChromaPalette
   * 
   * @param {Object | undefined} color - contains color options
   * @param {string | undefined} color.profile
   * @param {string | undefined} color.orange
   * @param {string | undefined} color.purple
   * @param {string | undefined} color.black
   * @param {string | undefined} color.red
   * @param {string | undefined} color.green
   * @param {string | undefined} color.yellow
   * @param {string | undefined} color.blue
   * @param {string | undefined} color.magenta
   * @param {string | undefined} color.cyan
   * @param {string | undefined} color.white
   */
  constructor(color) {
    /** @private */
    this.elements = '';
  
    /** @private */
    this.Reset = "\x1b[0m";
    /** @private */
    this.Bold = "\x1b[1m";
    /** @private */
    this.Dim = "\x1b[2m";
    /** @private */
    this.Underscore = "\x1b[4m";
    /** @private */
    this.Blink = "\x1b[5m";
    /** @private */
    this.Reverse = "\x1b[7m";
    /** @private */
    this.Hidden = "\x1b[8m";
    
    /** @private */
    this.FgOrange = color !== undefined && color.orange !== undefined 
      ? `\x1b[38;5;${color.orange}m`
      : "\x1b[38;5;208m";
    /** @private */
    this.FgPurple = color !== undefined && color.purple !== undefined 
      ? `\x1b[38;5;${color.purple}m`
      : "\x1b[38;5;141m";
    /** @private */
    this.FgBlack = color !== undefined && color.black !== undefined 
      ? `\x1b[38;5;${color.black}m`
      : "\x1b[30m";
    /** @private */
    this.FgRed = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[31m" 
      : color !== undefined && color.red !== undefined 
      ? `\x1b[38;5;${color.red}m`
      : "\x1b[38;5;9m";
    /** @private */
    this.FgGreen = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[32m" 
      : color !== undefined && color.green !== undefined 
      ? `\x1b[38;5;${color.green}m`
      : "\x1b[38;5;10m";
    /** @private */
    this.FgYellow = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[33m" 
      : color !== undefined && color.yellow !== undefined 
      ? `\x1b[38;5;${color.yellow}m`
      : "\x1b[38;5;221m";
    /** @private */
    this.FgBlue = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[34m" 
      : color !== undefined && color.blue !== undefined 
      ? `\x1b[38;5;${color.blue}m`
      : "\x1b[38;5;75m";
    /** @private */
    this.FgMagenta = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[35m" 
      : color !== undefined && color.magenta !== undefined 
      ? `\x1b[38;5;${color.magenta}m`
      : "\x1b[38;5;213m";
    /** @private */
    this.FgCyan = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[36m" 
      : color !== undefined && color.cyan !== undefined 
      ? `\x1b[38;5;${color.cyan}m`
      : "\x1b[38;5;123m";
    /** @private */
    this.FgWhite = color !== undefined && color.white !== undefined 
      ? `\x1b[38;5;${color.white}m`
      : "\x1b[37m";
    
    /** @private */
    this.BgOrange = color !== undefined && color.orange !== undefined 
      ? `\x1b[48;5;${color.orange}m`
      : "\x1b[48;5;208m";
    /** @private */
    this.BgPurple = color !== undefined && color.purple !== undefined 
      ? `\x1b[48;5;${color.purple}m`
      : "\x1b[48;5;141m";
    /** @private */
    this.BgBlack = color !== undefined && color.black !== undefined 
      ? `\x1b[48;5;${color.black}m`
      : "\x1b[40m";
    /** @private */
    this.BgRed = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[41m" 
      : color !== undefined && color.red !== undefined 
      ? `\x1b[48;5;${color.red}m`
      : "\x1b[48;5;9m";
    /** @private */
    this.BgGreen = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[42m" 
      : color !== undefined && color.green !== undefined 
      ? `\x1b[48;5;${color.green}m`
      : "\x1b[48;5;10m";
    /** @private */
    this.BgYellow = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[43m" 
      : color !== undefined && color.yellow !== undefined 
      ? `\x1b[48;5;${color.yellow}m`
      : "\x1b[48;5;221m";
    /** @private */
    this.BgBlue = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[44m" 
      : color !== undefined && color.blue !== undefined 
      ? `\x1b[48;5;${color.blue}m`
      : "\x1b[48;5;75m";
    /** @private */
    this.BgMagenta = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[45m" 
      : color !== undefined && color.magenta !== undefined 
      ? `\x1b[48;5;${color.magenta}m`
      : "\x1b[48;5;213m";
    /** @private */
    this.BgCyan = color !== undefined && color.profile !== undefined && color.profile === '16' 
      ? "\x1b[46m" 
      : color !== undefined && color.cyan !== undefined 
      ? `\x1b[48;5;${color.cyan}m`
      : "\x1b[48;5;123m";
    /** @private */
    this.BgWhite = color !== undefined && color.white !== undefined 
      ? `\x1b[48;5;${color.white}m`
      : "\x1b[47m";
  }
  
  /** Adds a space to elements */
  get space() {
    this.elements += ' '; 
    return this;
  }
  /** Adds \n to elements */
  get enter() {
    this.elements += '\n'; 
    return this;
  }

  /** @returns this - after adding dim to elements */
  get dim() {
    this.elements += this.Dim; 
    return this;
  }
  /** @returns this - after adding underscore to elements */
  get underscore() {
    this.elements += this.Underscore; 
    return this;
  }
  /** @returns this - after adding blink to elements */
  get blink() {
    this.elements += this.Blink; 
    return this;
  }
  /** @returns this - after adding reverse to elements */
  get reverse() {
    this.elements += this.Reverse; 
    return this;
  }
  /** @returns this - after adding hidden to elements */
  get hidden() {
    this.elements += this.Hidden; 
    return this;
  }
  /** @returns this - after adding bold to elements */
  get bold() {
    this.elements += this.Bold; 
    return this;
  }
  // Text color
  /** @returns this - after adding blue to elements */
  get blue() {
    this.elements += this.FgBlue; 
    return this;
  }
  /** @returns this - after adding cyan to elements */
  get cyan() { 
    this.elements += this.FgCyan; 
    return this;
  }
  /** @returns this - after adding purple to elements */
  get purple() { 
    this.elements += this.FgPurple; 
    return this;
  }
  /** @returns this - after adding magenta to elements */
  get magenta() { 
    this.elements += this.FgMagenta; 
    return this;
  }
  /** @returns this - after adding red to elements */
  get red() { 
    this.elements += this.FgRed; 
    return this;
  }
  /** @returns this - after adding orange to elements */
  get orange() { 
    this.elements += this.FgOrange; 
    return this;
  }
  /** @returns this - after adding yellow to elements */
  get yellow() { 
    this.elements += this.FgYellow; 
    return this;
  }
  /** @returns this - after adding green to elements */
  get green() { 
    this.elements += this.FgGreen; 
    return this;
  }
  /** @returns this - after adding white to elements */
  get white() { 
    this.elements += this.FgWhite; 
    return this;
  }
  /** @returns this - after adding black to elements */
  get black() { 
    this.elements += this.FgBlack; 
    return this;
  }
  // Get background color
  /** @returns this - after adding blueBg to elements */
  get blueBg() {
    this.elements += this.BgBlue; 
    return this;
  }
  /** @returns this - after adding cyanBg to elements */
  get cyanBg() { 
    this.elements += this.BgCyan; 
    return this;
  }
  /** @returns this - after adding purpleBg to elements */
  get purpleBg() { 
    this.elements += this.BgPurple; 
    return this;
  }
  /** @returns this - after adding magentaBg to elements */
  get magentaBg() { 
    this.elements += this.BgMagenta; 
    return this;
  }
  /** @returns this - after adding redBg to elements */
  get redBg() { 
    this.elements += this.BgRed; 
    return this;
  }
  /** @returns this - after adding orangeBg to elements */
  get orangeBg() { 
    this.elements += this.BgOrange; 
    return this;
  }
  /** @returns this - after adding yellowBg to elements */
  get yellowBg() { 
    this.elements += this.BgYellow; 
    return this;
  }
  /** @returns this - after adding greenBg to elements */
  get greenBg() { 
    this.elements += this.BgGreen; 
    return this;
  }
  /** @returns this - after adding whiteBg to elements */
  get whiteBg() { 
    this.elements += this.BgWhite; 
    return this;
  }
  /** @returns this - after adding blackBg to elements */
  get blackBg() { 
    this.elements += this.BgBlack; 
    return this;
  }
  // Get all colors in 256 palette
  /** @returns this - after adding each color in palette to elements */
  get palette() {
    const colors = [...Array(256 - 1 + 1).keys()].map(x => x + 1);
    colors.forEach((color)=> {
      let colorStr = color.toString();
      this.elements += ` \u001b[38;5;${colorStr}m${colorStr} `
    })
    return this;
  }
  /** 
   * Push content to elements and reset attributes
   * @param {* | undefined} content - user content to add
   * @returns {this}
   */
  push(content) {
    this.elements = `${this.elements}${content !== undefined ? content : ''}${this.Reset}`;
    return this;
  }
  /** 
   * Execute output of painting elements and reset
   * @param {* | undefined} content - user content to add
   * @returns {string}
   */
  paint(content) {
    let returnContent = `${this.elements}${content !== undefined ? content : ''}${this.Reset}`;
    this.elements = '';
    return returnContent;
  }
  
}

/**
 * @type {ChromaPalette}
 */
var chromaPalette = new ChromaPalette();

chromaPalette.ChromaPalette = ChromaPalette;
chromaPalette.chromaPalette = chromaPalette;
chromaPalette.default = chromaPalette;

module.exports = chromaPalette;
