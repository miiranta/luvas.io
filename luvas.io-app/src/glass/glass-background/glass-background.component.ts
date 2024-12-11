import { Component, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

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
  
  mouse_x: number = 0;
  mouse_y: number = 0;

  private last_animation_update: number = 0;
  private animation_running: anime.AnimeInstance | null = null;
  private gradientX: number = 0;
  private gradientY: number = 0;

  radial_gradient: string = "";

  extra_classes: string = "";

  ngOnInit() {
    this.updateRadialGradient();
  }

  onMouseMove(event: MouseEvent) {
    this.mouse_x = event.clientX;
    this.mouse_y = event.clientY;

    this.animation_running = this.updateRadialGradient();
  }

  updateRadialGradient(): anime.AnimeInstance | null {
    const animation_duration_ms = 200;
    const animation_delay_ms = 0;
    const update_cooldown_ms = 100;

    const now = Date.now();

    if(now - this.last_animation_update < update_cooldown_ms) {
      return this.animation_running;
    }

    this.last_animation_update = now;
    
    if(this.animation_running != null) {
      this.cancelAnimation(this.animation_running);
    }
    
    const endx = this.mouse_x;
    const endy = this.mouse_y;

    const animation = anime({
      targets: this,
      gradientX: endx,
      gradientY: endy,
      duration: animation_duration_ms,
      delay: animation_delay_ms,
      easing: 'easeOutQuad',
      update: () => {
        this.radial_gradient = 'radial-gradient(circle at ' + this.gradientX + 'px ' + this.gradientY + 'px, rgba(255, 255, 255, 1), rgba(0, 0, 0, 1), rgba(0, 0, 0, 1))';
      }
    });

    return animation;

  }

  cancelAnimation (animation: anime.AnimeInstance) {
    let activeInstances = anime.running;
    let index = activeInstances.indexOf(animation);
    activeInstances.splice(index, 1);
  }

}
