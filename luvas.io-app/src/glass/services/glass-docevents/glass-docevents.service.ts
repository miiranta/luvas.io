import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GlassDoceventsService {
  private mouseMoveCallbacks: ((x: number, y: number) => void)[] = [];

  constructor() {

    //Mouse move event
    document.addEventListener('mousemove', (event) => {
      this.mouseMoveCallbacks.forEach(callback => {
        callback(event.clientX, event.clientY);
      });
    });

  }

  addCallbackToMouseMove(callback: (x: number, y: number) => void) {
    this.mouseMoveCallbacks.push(callback);
  }

}
