import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { GlassRedirectService } from '../services/glass-redirect/glass-redirect.service';

interface presentationTextContent {
  type: string;
  content: string | SafeHtml;
  classes?: string[];
}

@Component({
  selector: 'glass-presentation-text',
  imports: [],
  templateUrl: './glass-presentation-text.component.html',
  styleUrl: './glass-presentation-text.component.scss'
})
export class GlassPresentationTextComponent {
  @Input() content: presentationTextContent[] = [];

  private sanitizer = inject(DomSanitizer);
  private redirectService: GlassRedirectService = inject(GlassRedirectService);
  
  constructor() {
    // Bind the functions to the component instance
    (window as any)['navigateTo'] = this.navigateTo.bind(this);
    (window as any)['emailTo'] = this.emailTo.bind(this);
  }

  ngOnInit() { 

    // Parse content
    this.content.forEach((item) => {

      if (typeof item.content === 'string') {

        // Print anything inside *...* as bold
        item.content = item.content.replace(/\*(.*?)\*/g, '<b>$1</b>');

        // Convert to safe html
        item.content = this.sanitizer.bypassSecurityTrustHtml(item.content as string);

      }

    });

  }

  navigateTo(url: string): void {
    this.redirectService.navigateTo(url);
  }

  emailTo(email: string): void {
    this.redirectService.emailTo(email);
  }

  

}

