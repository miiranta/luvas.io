import { Component } from '@angular/core';

import { GlassLoadingCloseOnViewInitComponent } from './../../../glass/glass-loading-close-on-view-init/glass-loading-close-on-view-init.component';
import { GlassPresentationComponent } from '../../../glass/glass-presentation/glass-presentation.component';

@Component({
  selector: 'luvasio-proj-page',
  imports: [GlassLoadingCloseOnViewInitComponent, GlassPresentationComponent],
  templateUrl: './luvasio-proj-page.component.html',
  styleUrl: './luvasio-proj-page.component.scss'
})
export class LuvasioProjPageComponent {

}
