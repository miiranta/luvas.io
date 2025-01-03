import { Component, inject, Input, ViewChild } from '@angular/core';

import anime from 'animejs';
import { GlassDoceventsService } from '../services/glass-docevents/glass-docevents.service';

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

  private eventService: GlassDoceventsService = inject(GlassDoceventsService);

  @Input() content:presentationMediaContent[] = [];
  @Input() config:presentationMediaConfig = {height: '100px', width: '100px'};

  @ViewChild('imageViewport') viewport: any;

  image_index = 0;
  image_total = 1;
  image_translate = 0;
  image_inital_translate = 0;
  image_width = 0;
  image_initial_width = this.config.width;
  image_initial_height = this.config.height;
  image_aspect_ratio = 1;

  private image_wrapper: any;
  private image_wrapper_width = 0;

  private window_minimal_margin = 30;

  ngOnInit() {
    this.image_total = this.content.length;

    this.eventService.addCallbackToWindowResize(this.onWindowResize_imgs.bind(this));

    

    const window_width = window.innerWidth - this.window_minimal_margin;
    this.image_initial_width = this.config.width;
    if(parseInt(this.image_initial_width, 10) > window_width) {
      this.config.width = window_width.toString() + 'px';
    } else {
      this.config.width = this.image_initial_width;
    }

    this.image_initial_height = this.config.height;

    this.image_aspect_ratio = parseInt(this.image_initial_height, 10) / parseInt(this.image_initial_width, 10);
    this.config.height = this.image_aspect_ratio * parseInt(this.config.width, 10) + 'px';
  }

  ngAfterViewInit() {
    this.setup_imgs();
  }

  setup_imgs() {
    // No of images * width
    this.image_wrapper_width = this.image_total * parseInt(this.config.width, 10);
    
    this.image_width = this.image_wrapper_width / this.image_total; // or just this.config.width
    
    // Translate to the first image
    this.image_translate = (this.image_wrapper_width/2 - this.image_width/2);
    this.image_wrapper = this.viewport.nativeElement.querySelector('.glass-p-image-wrap');
    this.image_wrapper.style.left = `${this.image_translate}px`;

    this.image_inital_translate = this.image_translate;
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

  onWindowResize_imgs() {
    const window_width = window.innerWidth - this.window_minimal_margin;

    if(parseInt(this.image_initial_width, 10) > window_width) {
      this.config.width = window_width.toString() + 'px';
    } else {
      this.config.width = this.image_initial_width;
    }

    this.updateFrameDimensions();
  }

  updateFrameDimensions() {
    const height = this.image_aspect_ratio * parseInt(this.config.width, 10) + 'px';

    this.viewport.nativeElement.style.max_width = this.config.width;
    this.viewport.nativeElement.style.height = height;

    let img_wrap = this.viewport.nativeElement.querySelector('.glass-p-image-wrap');
    img_wrap.style.max_width = this.config.width;
    img_wrap.style.height = height;

    let wrap2 = this.viewport.nativeElement.querySelectorAll('.glass-p-image-wrap2');
    wrap2.forEach((wrap: any) => {
      wrap.style.max_width = this.config.width;
      wrap.style.height = height;
    });

    let images = this.viewport.nativeElement.querySelectorAll('.glass-p-image-wrap2 img');
    images.forEach((img: any) => {
      img.style.max_width = this.config.width;
      img.style.max_height = height;
    });

    this.setup_imgs();

    this.image_translate = this.image_inital_translate - (this.image_width * this.image_index);

    anime({
      targets: img_wrap,
      left: this.image_translate,
      duration: 500,
      easing: 'easeInOutQuad'
    });
  }

}
