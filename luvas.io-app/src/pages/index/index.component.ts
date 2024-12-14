import { Component, inject } from '@angular/core';

import { GlassBackgroundComponent } from './../../glass/glass-background/glass-background.component';
import { GlassNavbarComponent } from './../../glass/glass-navbar/glass-navbar.component';

import { GlassLoadingService } from './../../glass/services/glass-loading/glass-loading.service';

@Component({
  selector: 'index-page',
  imports: [GlassBackgroundComponent, GlassNavbarComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {

  private loadingService: GlassLoadingService = inject(GlassLoadingService);

  ngAfterViewInit(){
    this.loadingService.hideLoadingScreen();
  }

}
