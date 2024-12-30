import { Component, inject, Input } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

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

}
