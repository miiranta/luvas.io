import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlassDoceventsService {
  
  constructor() {

    // Mouse move event
    window.addEventListener('mousemove', (event) => {
      this.mouseMoveCallbacks.forEach(callback => { callback(event.clientX, event.clientY); });
    });

  }

  private mouseMoveCallbacks: ((x: number, y: number) => void)[] = [];

  addCallbackToMouseMove(callback: (x: number, y: number) => void) {
    this.mouseMoveCallbacks.push(callback);
  }

}
