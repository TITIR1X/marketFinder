import { Injectable, Renderer2, RendererFactory2 } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class MenuService {

    private renderer: Renderer2;
    constructor(private rendererFactory: RendererFactory2) {
        this.renderer = this.rendererFactory.createRenderer(null, null);
      }
    displayOptions: boolean = false;
    displaySidebar: boolean = false;

    handleDisplayOptions() {
        this.displayOptions = !this.displayOptions;
    }

    handleDisplaySidebar() {
        if (this.displayOptions) {
            this.displayOptions = false;
        }
        if (!(this.displaySidebar)) {}
        this.displaySidebar = !this.displaySidebar;
    }
}