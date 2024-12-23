import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlassDoceventsService {
  
  private mouseX: number = 0;
  private mouseY: number = 0;

  constructor() {

    // Mouse move event
    window.addEventListener('mousemove', (event) => {
      this.mouseMoveCallbacks.forEach( (callback) => { 
        if(callback !== null) callback(event);
      });
    });
    window.addEventListener('touchmove', (event) => {
      this.mouseMoveCallbacks.forEach( (callback) => { 
        if(callback !== null) callback(event);
      });
    });
    
    // Mouse click event
    window.addEventListener('click', (event) => {
      this.mouseClickCallbacks.forEach(callback => { 
        if(callback !== null) callback(event);
      });
    });

    // Scroll event
    window.addEventListener('wheel', (event) => {
      this.scrollCallbacks.forEach(callback => { 
        if(callback !== null) callback(event);
      });
    });
    
    // Touch move
    window.addEventListener('touchmove', (event) => {
      this.touchMoveCallbacks.forEach(callback => { 
        if(callback !== null) callback(event);
      });
    });

    // Touch end
    window.addEventListener('touchend', (event) => {
      this.touchEndCallbacks.forEach(callback => { 
        if(callback !== null) callback(event);
      });
    });

    // Touch start
    window.addEventListener('touchstart', (event) => {
      this.touchStartCallbacks.forEach(callback => { 
        if(callback !== null) callback(event);
      });
    });

    // Window resize event
    window.addEventListener('resize', (event) => {
      this.windowResizeCallbacks.forEach(callback => { 
        if(callback !== null) callback(event);
      });
    });

    // -----------------------------------------

    this.addCallbackToMouseMove((event) => {
      this.getMousePositionUpdate(event);
    });

  }

  private mouseMoveCallbacks: ((event: any) => void)[] = [];
  private mouseClickCallbacks: ((event: any) => void)[] = [];
  private scrollCallbacks: ((event: any) => void)[] = [];
  private windowResizeCallbacks: ((event: any) => void)[] = [];
  private touchMoveCallbacks: ((event: any) => void)[] = [];
  private touchEndCallbacks: ((event: any) => void)[] = [];
  private touchStartCallbacks: ((event: any) => void)[] = [];

  addCallbackToMouseMove(callback: (event: any) => void) {
    this.mouseMoveCallbacks.push(callback);
  }

  addCallbackToMouseClick(callback: (event: any) => void) {
    this.mouseClickCallbacks.push(callback);
  }

  addCallbackToScroll(callback: (event: any) => void) {
    this.scrollCallbacks.push(callback);
  }

  addCallbackToWindowResize(callback: (event: any) => void) {
    this.windowResizeCallbacks.push(callback);
  }

  addCallbackToTouchMove(callback: (event: any) => void) {
    this.touchMoveCallbacks.push(callback);
  }

  addCallbackToTouchEnd(callback: (event: any) => void) {
    this.touchEndCallbacks.push(callback);
  }

  addCallbackToTouchStart(callback: (event: any) => void) {
    this.touchStartCallbacks.push(callback);
  }

  // Auxiliary functions
  isInViewport(element: HTMLElement, x: number, y: number) {
    const rect = element.getBoundingClientRect();
  
    return (
      rect.top <= y &&
      rect.bottom >= y &&
      rect.left <= x &&
      rect.right >= x
    );
  }

  getMousePosition() {
    return {
      x: this.mouseX,
      y: this.mouseY
    };
  }

  private getMousePositionUpdate(event: any) {
    
    if(event.type === 'mousemove') {
      this.mouseX = event.clientX;
      this.mouseY = event.clientY;
    }

    else if(event.type === 'touchmove') {
      this.mouseX = event.touches[0].clientX;
      this.mouseY = event.touches[0].clientY;
    }

  }

}
