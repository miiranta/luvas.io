import { Component } from '@angular/core';

import { GlassLoadingCloseOnViewInitComponent } from './../../glass/glass-loading-close-on-view-init/glass-loading-close-on-view-init.component';
import { GlassPresentationComponent } from '../../glass/glass-presentation/glass-presentation.component';

@Component({
  selector: 'index-page',
  imports: [GlassLoadingCloseOnViewInitComponent, GlassPresentationComponent],
  templateUrl: './index.component.html',
  styleUrl: './index.component.scss'
})
export class IndexComponent {}
