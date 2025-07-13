import { Injectable } from '@angular/core';

import { GlassLoadingComponent } from '../../glass-loading/glass-loading.component';

@Injectable({
  providedIn: 'root'
})
export class GlassLoadingService {

  private loadingScreens: GlassLoadingComponent[] = [];

  addLoadingScreenCallback( screen: GlassLoadingComponent ) {
    this.loadingScreens.push(screen);
  }

  showLoadingScreen() {
    this.loadingScreens.forEach( (instance) => {
      let res = instance.updateScreen('show');
    });
  }

  hideLoadingScreen() {
    this.loadingScreens.forEach( (instance) => {
      instance.updateScreen('hide');
    });
  }

}
