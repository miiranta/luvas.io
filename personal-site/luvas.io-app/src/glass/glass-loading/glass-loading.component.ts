import { Component, inject, ViewChild } from '@angular/core';

import { GlassLoadingService } from './../services/glass-loading/glass-loading.service';

import anime, { set } from 'animejs';

@Component({
  selector: 'glass-loading',
  imports: [],
  templateUrl: './glass-loading.component.html',
  styleUrl: './glass-loading.component.scss'
})
export class GlassLoadingComponent {
  private loadingService: GlassLoadingService = inject(GlassLoadingService);

  @ViewChild('loadingScreen') glassLoading: any;

  ngOnInit() {
    // Subscribe to loading service (just 9.99 a month)
    this.loadingService.addLoadingScreenCallback(this);
  }

  ngAfterViewInit() {
    // Initial state
    this.animateFadeOut();
  }

  updateScreen(command: string) {
    if(this.glassLoading === undefined) {
      console.error('Glass Loading Component not initialized!');
      return false;
    }

    if (command === 'show') {
      return this.animateFadeIn();
    } 
    else if (command === 'hide') {
      return this.animateFadeOut();
    }

    return false;
  }

  animateFadeIn() {
    this.glassLoading.nativeElement.style.display = 'flex';
    anime({
      targets: this.glassLoading.nativeElement,
      opacity: 1,
      duration: 150,
      easing: 'easeInOutQuad',
      complete: () => {}
    });

    return true;
  }

  animateFadeOut() {
    anime({
      targets: this.glassLoading.nativeElement,
      opacity: 0,
      duration: 150,
      easing: 'easeInOutQuad',
      complete: () => {
        this.glassLoading.nativeElement.style.display = 'none';  
      }
    });

    return true;
  }

}
