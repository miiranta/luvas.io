import { Component, Input, NgModule, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { GlassDoceventsService } from '../services/glass-docevents/glass-docevents.service';

import anime from 'animejs';

interface GlassBackgroundCongif {
  type: string;
  mouse_follow: boolean;
  gradient: string;
}

@Component({
  selector: 'glass-background',
  imports: [CommonModule],
  templateUrl: './glass-background.component.html',
  styleUrl: './glass-background.component.scss'
})
export class GlassBackgroundComponent {

  @Input() config: GlassBackgroundCongif = {
    type: "default",
    mouse_follow: true,
    gradient: "radial"
  };

  private eventService: GlassDoceventsService = inject(GlassDoceventsService);
  
  private animation_duration_ms: number = 250;
  private animation_delay_ms: number = 0;
  private update_cooldown_ms: number = 50;

  private last_animation_update: number = 0;
  private animation_running: anime.AnimeInstance | null = null;

  private gradientX: number = 0;
  private gradientY: number = 0;
  radial_gradient: string = "";
  extra_classes: string = "";

  ngOnInit() {

    // Add mouse follow event
    if(this.config.mouse_follow) {
      this.eventService.addCallbackToMouseMove((event) => {
        this.updateAnimation(event);
      });
    }

    this.updateRadialGradient(0, 0);
  }

  updateAnimation(event: any): void {
    const now = Date.now();

    const x = event.clientX;
    const y = event.clientY;

    if(now - this.last_animation_update < this.update_cooldown_ms) {
      return;
    }

    this.last_animation_update = now;

    if(this.animation_running != null) {
      this.cancelAnimation(this.animation_running);
    }

    //Radial -- the only type of gradient for now
    this.animation_running = this.updateRadialGradient(x, y);
  }

  updateRadialGradient(x: number, y: number): anime.AnimeInstance | null {
    const animation = anime({
      targets: this,
      gradientX: x,
      gradientY: y,
      duration: this.animation_duration_ms,
      delay: this.animation_delay_ms,
      easing: 'easeOutQuad',
      update: () => {
        this.radial_gradient = 'radial-gradient(circle at ' + this.gradientX + 'px ' + this.gradientY + 'px, rgba(255, 255, 255, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))';
      }
    });

    return animation;
  }

  cancelAnimation (animation: anime.AnimeInstance) {
    let activeInstances = anime.running;
    activeInstances = activeInstances.filter((instance) => instance !== animation);
  }

}
