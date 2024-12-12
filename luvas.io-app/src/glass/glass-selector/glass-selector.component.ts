import { Component, Input } from '@angular/core';

interface GlassSelectorConfig {
  title: string;
  description: string;
  img_src: string;
  link: string;
}

@Component({
  selector: 'glass-selector',
  imports: [],
  templateUrl: './glass-selector.component.html',
  styleUrl: './glass-selector.component.scss'
})
export class GlassSelectorComponent {

  @Input() config: GlassSelectorConfig[] = [];

}
