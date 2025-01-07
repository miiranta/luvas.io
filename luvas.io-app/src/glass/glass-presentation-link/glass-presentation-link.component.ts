import { Component, inject, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlassRedirectService } from '../services/glass-redirect/glass-redirect.service';

interface presentationLinkContent {
  type: string;
  content: string;
  onclick: string;
  classes?: string[];
}

interface presentationLinkConfig {
  orientation: string;
}

@Component({
  selector: 'glass-presentation-link',
  imports: [CommonModule],
  templateUrl: './glass-presentation-link.component.html',
  styleUrl: './glass-presentation-link.component.scss'
})
export class GlassPresentationLinkComponent {

  @Input() content:presentationLinkContent[] = [];
  @Input() config:presentationLinkConfig = {orientation: 'horizontal'};

  private redirectService: GlassRedirectService = inject(GlassRedirectService);

  orientationClass: string = 'f-col';

  ngOnInit() {
    if(this.config.orientation == 'horizontal') {
      this.orientationClass = 'f-row';
    }
  }

  navigateTo(url: string) {
    this.redirectService.navigateTo(url);
  }

  emailTo(email: string) {
    this.redirectService.emailTo(email);
  }

  download(url: string) {
    this.redirectService.download(url);
  }
  
  run(command: string) {
    if(command == "") return;

    const func_name = command.split('(')[0];
    const func_args = command.split('(')[1].split(')')[0].split(',');

    // Remove excess string nesting " ' "
    func_args.forEach((arg, i) => {
      func_args[i] = arg.replace(/'/g, '');
      func_args[i] = arg.replace(/"/g, '');
      func_args[i] = arg.replace(/`/g, '');
    });

    (this as any)[func_name](...func_args);
  }
}
