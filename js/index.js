"use strict";
/**
 * Listen for window resize and dispatch changes to viewport
 */
Object.defineProperty(exports, "__esModule", { value: true });
var _instance;
var RETINA_QUERY = 'only screen and (-webkit-min-device-pixel-ratio: 1.5), screen and (min-resolution: 1.5dppx), screen and (min-resolution: 144dpi)';
var VIEWPORTS = {
    small: 480,
    medium: 950,
    large: 1030
};
var ViewportUtil = /** @class */ (function () {
    function ViewportUtil() {
        this.registerListeners();
    }
    ViewportUtil.gi = function () {
        if (!_instance) {
            _instance = new ViewportUtil();
        }
        return _instance;
    };
    ViewportUtil.prototype.registerListeners = function () {
        window.addEventListener('resize', this.updateViewport.bind(this));
        window.addEventListener('orientationchange', this.updateViewport.bind(this));
        // setup retina listeners
        this.retinaQuery = window.matchMedia(RETINA_QUERY);
        this.updateRetina();
        if (this.retinaQuery.addListener) {
            this.retinaQuery.addListener(this.updateRetina);
        }
    };
    ViewportUtil.prototype.updateViewport = function () {
        // set flags and dispatch changes
        var lastViewport = this.currentViewport;
        this.currentViewport = this.getViewport();
        if (this.currentViewport !== lastViewport) {
            console.log('ViewportUtil: updateViewport: this.currentViewport:', this.currentViewport);
        }
    };
    ViewportUtil.prototype.getViewport = function () {
        var viewport;
        var viewportWidth = window.innerWidth;
        for (var key in VIEWPORTS) {
            if (viewportWidth <= VIEWPORTS[key]) {
                viewport = key;
                break;
            }
        }
        return viewport;
    };
    ViewportUtil.prototype.updateRetina = function () {
        // set flags and dispatch changes
        var lastRetina = this.currentRetina;
        this.currentRetina = this.retinaQuery.matches;
        if (lastRetina !== this.currentRetina) {
            console.log('ViewportUtil: updateRetina: this.currentRetina:', this.currentRetina);
        }
    };
    return ViewportUtil;
}());
exports.ViewportUtil = ViewportUtil;
//# sourceMappingURL=index.js.map