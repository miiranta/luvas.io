import { Component, Input, ViewChild } from '@angular/core';

import anime from 'animejs';

interface presentationMediaContent {
  src: string;
}

interface presentationMediaConfig {
  height: string;
  width: string;
}

@Component({
  selector: 'glass-presentation-media',
  imports: [],
  templateUrl: './glass-presentation-media.component.html',
  styleUrl: './glass-presentation-media.component.scss'
})
export class GlassPresentationMediaComponent {

  @Input() content:presentationMediaContent[] = [];
  @Input() config:presentationMediaConfig = {height: '100px', width: '100px'};

  @ViewChild('imageViewport') viewport: any;

  image_index = 0;
  image_total = 1;
  image_translate = 0;
  image_inital_translate = 0;
  image_width = 0;

  private image_wrapper_width = 0;

  ngAfterViewInit() {
    const image_wrapper = this.viewport.nativeElement.querySelector('.glass-p-image-wrap');
    this.image_wrapper_width = image_wrapper.getBoundingClientRect().width;

    this.image_width = this.image_wrapper_width / this.image_total;
    
    // Translate to the first image
    this.image_translate = (this.image_wrapper_width/2 - this.image_width/2);
    image_wrapper.style.left = `${this.image_translate}px`;

    this.image_inital_translate = this.image_translate;
  }

  ngAfterContentInit() {
    this.image_total = this.content.length;
  }

  goLeft(viewport: any) {
    if(this.image_index <= 0) {
      this.image_index = this.image_total - 1;
    } else {
      this.image_index--;
    }

    this.image_translate = this.image_inital_translate - (this.image_width * this.image_index);

    anime({
      targets: viewport.querySelector('.glass-p-image-wrap'),
      left: this.image_translate,
      duration: 500,
      easing: 'easeInOutQuad'
    });

  }

  goRight(viewport: any) {
    if(this.image_index >= this.image_total - 1) {
      this.image_index = 0;
    } else {
      this.image_index++;
    }
    
    this.image_translate = this.image_inital_translate - (this.image_width * this.image_index);

    anime({
      targets: viewport.querySelector('.glass-p-image-wrap'),
      left: this.image_translate,
      duration: 500,
      easing: 'easeInOutQuad'
    });

  } 

  isVideo(src: string) {
    return src.includes('.mp4') || src.includes('.webm') || src.includes('.ogg') || src.includes('.avi') || src.includes('.mov');
  }

  isImage(src: string) {
    return src.includes('.jpg') || src.includes('.jpeg') || src.includes('.png') || src.includes('.gif') || src.includes('.svg') || src.includes('.webp') || src.includes('.bmp') || src.includes('.ico') || src.includes('.tiff') || src.includes('.tif');
  }

  shouldBeLoaded(index: number) {
    // Load index image and its neighbors
    // Its circular
    if (this.image_index === index) {
      return true;
    }

    if(this.image_index === (index + 1) % this.image_total) {
      return true;
    }

    if(this.image_index === (index - 1 + this.image_total) % this.image_total) {
      return true;
    }

    return false;
  }

}
