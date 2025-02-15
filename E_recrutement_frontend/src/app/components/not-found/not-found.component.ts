import { Component, AfterViewInit } from '@angular/core';
import gsap from 'gsap';
@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.scss']
})
export class NotFoundComponent implements AfterViewInit {

  ngAfterViewInit() {
    // Define GSAP timelines
    let t1 = gsap.timeline();
    let t2 = gsap.timeline();
    let t3 = gsap.timeline();

    // Animation for the first cog
    t1.to(".cog1", {
      transformOrigin: "50% 50%",
      rotation: "+=360",
      repeat: -1,
      ease: "linear",
      duration: 8
    });

    // Animation for the second cog
    t2.to(".cog2", {
      transformOrigin: "50% 50%",
      rotation: "-=360",
      repeat: -1,
      ease: "linear",
      duration: 8
    });

    // Blinking effect for the text
    t3.fromTo(".wrong-para",
      { opacity: 0 },
      {
        opacity: 1,
        duration: 1,
        stagger: {
          repeat: -1,
          yoyo: true
        }
      }
    );
  }
}
