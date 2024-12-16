import { Component } from '@angular/core';

import { GlassBackgroundComponent } from './../../glass/glass-background/glass-background.component';
import { GlassNavbarComponent } from './../../glass/glass-navbar/glass-navbar.component';
import { GlassLoadingCloseOnViewInitComponent } from './../../glass/glass-loading-close-on-view-init/glass-loading-close-on-view-init.component';
import { GlassPresentationComponent } from '../../glass/glass-presentation/glass-presentation.component';

@Component({
  selector: 'index-page',
  imports: [GlassBackgroundComponent, GlassNavbarComponent, GlassLoadingCloseOnViewInitComponent, GlassPresentationComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {}
