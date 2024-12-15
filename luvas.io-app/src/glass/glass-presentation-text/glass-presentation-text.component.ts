import { Component, Input, input } from '@angular/core';

interface presentationTextContent {
  type: string;
  content: string;
  classes?: string[];
}

@Component({
  selector: 'glass-presentation-text',
  imports: [],
  templateUrl: './glass-presentation-text.component.html',
  styleUrl: './glass-presentation-text.component.scss'
})
export class GlassPresentationTextComponent {

  @Input() content:presentationTextContent[] = [];

}
