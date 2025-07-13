import { Component } from '@angular/core';
import { set } from 'animejs';

@Component({
  selector: 'glass-redirect',
  imports: [],
  templateUrl: './glass-redirect.component.html',
  styleUrl: './glass-redirect.component.scss'
})
export class GlassRedirectComponent {

  seconds: number = 10;

  constructor() { 

    // On window click, close
    window.onclick = () => {
      window.close();
    }

    const segments = window.location.href.split('/');

    switch(segments[segments.length - 2])
    {
      case 'redirect':
        window.open(decodeURIComponent(segments[segments.length - 1]), '_self');
        break;

      case 'mailto':
        window.location.href = 'mailto:' + decodeURIComponent(segments[segments.length - 1]);
        break;

      case 'download':
        this.download(decodeURIComponent(segments[segments.length - 1]));
        break;
      
      default:
        console.log('Invalid redirect URL');
        window.close();
        break;
    }

  }

  ngAfterViewInit() {

    setInterval(() => {
      this.seconds--;

      if(this.seconds === 0) {
        window.close();
      }

    }, 1000);

  }

  download(url: string) {
    const link = document.createElement('a');
    link.href = url;

    if(url.includes('/') || url.includes('\\')) {
      link.download = url.split('/').pop() || 'download';
    }
    else {
      link.download = url;
    }

    link.click();
    link.remove();
  }

}
