export declare class ViewportUtil {
    static gi(): ViewportUtil;
    private currentViewport;
    private currentRetina;
    private retinaQuery;
    constructor();
    registerListeners(): void;
    updateViewport(): void;
    getViewport(): string;
    updateRetina(): void;
}
