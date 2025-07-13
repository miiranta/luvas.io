import { Component } from '@angular/core';

import { GlassLoadingCloseOnViewInitComponent } from '../../../glass/glass-loading-close-on-view-init/glass-loading-close-on-view-init.component';
import { GlassPresentationComponent } from '../../../glass/glass-presentation/glass-presentation.component';

@Component({
  selector: 'start-proj-page',
  imports: [GlassLoadingCloseOnViewInitComponent, GlassPresentationComponent],
  templateUrl: './start-proj-page.component.html',
  styleUrl: './start-proj-page.component.scss'
})
export class StartProjPageComponent {

}
