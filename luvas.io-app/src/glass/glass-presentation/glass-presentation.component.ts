import { Component, Input } from '@angular/core';

import { GlassPresentationMediaComponent } from '../../glass/glass-presentation-media/glass-presentation-media.component';
import { GlassPresentationTextComponent } from '../../glass/glass-presentation-text/glass-presentation-text.component';
import { GlassPresentationLinkComponent } from '../../glass/glass-presentation-link/glass-presentation-link.component';

interface presentationContent {
  type: string;
  config?: any;
  content?: any;
};

@Component({
  selector: 'glass-presentation',
  imports: [GlassPresentationMediaComponent, GlassPresentationTextComponent, GlassPresentationLinkComponent],
  templateUrl: './glass-presentation.component.html',
  styleUrl: './glass-presentation.component.scss'
})
export class GlassPresentationComponent {

  @Input() content: presentationContent[][] = [
    [
      {
        type: 'text',
        content: 'Add some content with the [content] param.'
      }
    ]
  ];

}
