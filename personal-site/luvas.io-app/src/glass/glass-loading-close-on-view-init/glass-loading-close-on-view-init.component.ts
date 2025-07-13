import { Component, inject } from '@angular/core';

import { GlassLoadingService } from './../services/glass-loading/glass-loading.service';

@Component({
  selector: 'glass-loading-close-on-view-init',
  imports: [],
  templateUrl: './glass-loading-close-on-view-init.component.html',
  styleUrl: './glass-loading-close-on-view-init.component.scss'
})
export class GlassLoadingCloseOnViewInitComponent {
  
  private loadingService: GlassLoadingService = inject(GlassLoadingService);

  ngAfterViewInit(){
    this.loadingService.hideLoadingScreen();
  }

}
