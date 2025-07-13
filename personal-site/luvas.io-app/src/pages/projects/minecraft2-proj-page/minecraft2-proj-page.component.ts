import { Component } from '@angular/core';

import { GlassLoadingCloseOnViewInitComponent } from '../../../glass/glass-loading-close-on-view-init/glass-loading-close-on-view-init.component';
import { GlassPresentationComponent } from '../../../glass/glass-presentation/glass-presentation.component';

@Component({
  selector: 'minecraft2-proj-page',
  imports: [GlassLoadingCloseOnViewInitComponent, GlassPresentationComponent],
  templateUrl: './minecraft2-proj-page.component.html',
  styleUrl: './minecraft2-proj-page.component.scss'
})
export class Minecraft2ProjPageComponent {

}
