import { Component } from '@angular/core';

import { GlassBackgroundComponent } from './../../glass/glass-background/glass-background.component';
import { GlassNavbarComponent } from './../../glass/glass-navbar/glass-navbar.component';
import { GlassLoadingCloseOnViewInitComponent } from './../../glass/glass-loading-close-on-view-init/glass-loading-close-on-view-init.component';
import { GlassPresentationMediaComponent } from '../../glass/glass-presentation-media/glass-presentation-media.component';
import { GlassPresentationTextComponent } from '../../glass/glass-presentation-text/glass-presentation-text.component';

@Component({
  selector: 'index-page',
  imports: [GlassBackgroundComponent, GlassNavbarComponent, GlassLoadingCloseOnViewInitComponent, GlassPresentationMediaComponent, GlassPresentationTextComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {}
