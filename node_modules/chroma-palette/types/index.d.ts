/**
 * A module that creates a tool for implementing color and formatting for the terminal.
 * @module chroma-palette
 */

/**
 * Class ChromaPalette - creates a tool for implementing color and formatting in strings.
 */
declare class ChromaPalette {
  private elements: string;
  private Reset: string;
  private Bold: string;
  private Dim: string;
  private Underscore: string;
  private Blink: string;
  private Reverse: string;
  private Hidden: string;

  private FgOrange: string;
  private FgPurple: string;
  private FgBlack: string;
  private FgRed: string;
  private FgGreen: string;
  private FgYellow: string;
  private FgBlue: string;
  private FgMagenta: string;
  private FgCyan: string;
  private FgWhite: string;

  private BgOrange: string;
  private BgPurple: string;
  private BgBlack: string;
  private BgRed: string;
  private BgGreen: string;
  private BgYellow: string;
  private BgBlue: string;
  private BgMagenta: string;
  private BgCyan: string;
  private BgWhite: string;
  ChromaPalette: ChromaPalette;
  chromaPalette: ChromaPalette;
  default: ChromaPalette;

  constructor(
    color?: { 
      orange: string | undefined; 
      purple: string | undefined; 
      black: string | undefined; 
      profile: string | undefined;
      red: string | undefined;
      green: string | undefined;
      yellow: string | undefined;
      blue: string | undefined;
      magenta: string | undefined;
      cyan: string | undefined;
      white: string | undefined;
    }
  )
  /** Adds a space to elements */
  get space(): ChromaPalette; 
  /** Adds \n to elements */
  get enter(): ChromaPalette; 

  /** Adds dim attribute to elements */
  get dim(): ChromaPalette; 
  /** Adds underscore attribute to elements */
  get underscore(): ChromaPalette;
  /** Adds blink attribute to elements */
  get blink(): ChromaPalette;
  /** Adds reverse attribute to elements */
  get reverse(): ChromaPalette;
  /** Adds hidden attribute to elements */
  get hidden(): ChromaPalette;
  /** Adds bold attribute to elements */
  get bold(): ChromaPalette;
  
  /** Adds blue attribute to elements */
  get blue(): ChromaPalette;
  /** Adds cyan attribute to elements */
  get cyan(): ChromaPalette;
  /** Adds purple attribute to elements */
  get purple(): ChromaPalette;
  /** Adds magenta attribute to elements */
  get magenta(): ChromaPalette;
  /** Adds red attribute to elements */
  get red(): ChromaPalette;
  /** Adds orange attribute to elements */
  get orange(): ChromaPalette;
  /** Adds yellow attribute to elements */
  get yellow(): ChromaPalette;
  /** Adds green attribute to elements */
  get green(): ChromaPalette;
  /** Adds white attribute to elements */
  get white(): ChromaPalette;
  /** Adds black attribute to elements */
  get black(): ChromaPalette;
  /** Adds blink attribute to elements */
  
  /** Adds blueBg attribute to elements */
  get blueBg(): ChromaPalette;
  /** Adds cyanBg attribute to elements */
  get cyanBg(): ChromaPalette;
  /** Adds purpleBg attribute to elements */
  get purpleBg(): ChromaPalette;
  /** Adds magentaBg attribute to elements */
  get magentaBg(): ChromaPalette;
  /** Adds redBg attribute to elements */
  get redBg(): ChromaPalette;
  /** Adds orangeBg attribute to elements */
  get orangeBg(): ChromaPalette;
  /** Adds yellowBg attribute to elements */
  get yellowBg(): ChromaPalette;
  /** Adds greenBg attribute to elements */
  get greenBg(): ChromaPalette;
  /** Adds whiteBg attribute to elements */
  get whiteBg(): ChromaPalette;
  /** Adds blackBg attribute to elements */
  get blackBg(): ChromaPalette;
  /** 
   * Get all 256 colors in palette
   */
  get palette(): ChromaPalette;
  /** 
   * push content to elements and reset attributes
   * @param {* | undefined} content - user content to add
   * @returns ChromaPalette
   */
  push(content: any | undefined): ChromaPalette;
  /** 
   * Execute output of painting elements and reset
   * @param {* | undefined} content - user content to add
   * @returns string
   */
  paint(content: any | undefined): string;
}

declare var chromaPalette: ChromaPalette;

export = chromaPalette;
