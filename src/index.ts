/**
 * Listen for window resize and dispatch changes to viewport
 */

let _instance      : ViewportUtil;
const RETINA_QUERY : string = 'only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)';
const VIEWPORTS    : any = {
  small  : 480,
  medium : 950,
  large  : 1030
};

class ViewportUtil {

  static gi() {
    if(!_instance) {
      _instance = new ViewportUtil();
    }
    return _instance;
  }

  private currentViewport : string;
  private currentRetina   : boolean;
  private retinaQuery     : MediaQueryList;

  constructor() {
    this.registerListeners();
  }

  registerListeners() {
    window.addEventListener('resize', this.updateViewport.bind(this));
    window.addEventListener('orientationchange', this.updateViewport.bind(this));

    // setup retina listeners
    this.retinaQuery = window.matchMedia(RETINA_QUERY);
    this.updateRetina();
    if(this.retinaQuery.addListener) {
      this.retinaQuery.addListener(this.updateRetina);
    }
  }

  updateViewport() {
    // set flags and dispatch changes
    const lastViewport: string = this.currentViewport;
    this.currentViewport = this.getViewport();
    if(this.currentViewport !== lastViewport) {
      console.log('ViewportUtil: updateViewport: this.currentViewport:', this.currentViewport);
    }
  }

  getViewport() {
    let viewport: string;
    const viewportWidth: number = window.innerWidth;
    for(let key in VIEWPORTS) {
      if( viewportWidth <= VIEWPORTS[key]) {
        viewport = key;
        break;
      }
    }
    return viewport;
  }

  updateRetina() {
    // set flags and dispatch changes
    const lastRetina: boolean = this.currentRetina;
    this.currentRetina = this.retinaQuery.matches;

    if (lastRetina !== this.currentRetina) {
      console.log('ViewportUtil: updateRetina: this.currentRetina:', this.currentRetina);
    }
  }

}

export = ViewportUtil;
