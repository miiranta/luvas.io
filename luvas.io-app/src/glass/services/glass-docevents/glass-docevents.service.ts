import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlassDoceventsService {
  
  constructor() {

    // Mouse move event
    window.addEventListener('mousemove', (event) => {
      this.mouseMoveCallbacks.forEach(callback => { callback(event); });
    });

    // Mouse click event
    window.addEventListener('click', (event) => {
      this.mouseClickCallbacks.forEach(callback => { callback(event); });
    });

    // Window resize event
    window.addEventListener('resize', (event) => {
      this.windowResizeCallbacks.forEach(callback => { callback(event); });
    });

  }

  private mouseMoveCallbacks: ((event: any) => void)[] = [];
  private mouseClickCallbacks: ((event: any) => void)[] = [];
  private windowResizeCallbacks: ((event: any) => void)[] = [];

  addCallbackToMouseMove(callback: (event: any) => void) {
    this.mouseMoveCallbacks.push(callback);
  }

  addCallbackToMouseClick(callback: (event: any) => void) {
    this.mouseClickCallbacks.push(callback);
  }

  addCallbackToWindowResize(callback: (event: any) => void) {
    this.windowResizeCallbacks.push(callback);
  }

}
