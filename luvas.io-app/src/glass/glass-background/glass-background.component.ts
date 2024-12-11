import { Component, Input } from '@angular/core';

@Component({
  selector: 'glass-background',
  imports: [],
  templateUrl: './glass-background.component.html',
  styleUrl: './glass-background.component.scss'
})
export class GlassBackgroundComponent {

  @Input() type: string = "";

}
