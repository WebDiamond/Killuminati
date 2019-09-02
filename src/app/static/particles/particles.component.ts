import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-particles',
  templateUrl: './particles.component.html',
  styleUrls: ['./particles.component.css']
})
export class ParticlesComponent implements OnInit {
  public static instance;
  myStyle: Object = {};
  myParams: Object = {};
  width: number = 100;
  height: number = 100;
  constructor() {
    ParticlesComponent.instance = this;
  }
  public show(): void{
    window.document.getElementById('particles').style.display='block';
  }
  public hide(): void{
    window.document.getElementById('particles').style.display='none';
  }
  ngOnInit() {
    window.document.getElementById('particles').style.display='none';
    this.myStyle = {
      'position': 'fixed',
      'width': '100%',
      'height': '100%',
      'z-index': 3,
      'top': 0,
      'left': 0,
      'right': 0,
      'bottom': 0,
      'display': 'block'
    };
    this.myParams = {
      particles: {
        "number": {
          "value": 80,
          "density": {
            "enable": true,
            "value_area": 800
          }
        },
        color: {
          value: '#82fffd'
        },
        shape: {
          "type": "circle",
          "stroke": {
            "width": 0,
            "color": "#000000"
          },
          "polygon": {
            "nb_sides": 5
          },
          "image": {
            "src": "img/github.svg",
            "width": 100,
            "height": 100
          }
        },
        opacity: {
          "value": 0.5,
          "random": false,
          "anim": {
            "enable": false,
            "speed": 1,
            "opacity_min": 0.1,
            "sync": false
          }
        },
        size: {
          "value": 3,
          "random": true,
          "anim": {
            "enable": false,
            "speed": 40,
            "size_min": 0.1,
            "sync": false
          }
        },
        line_linked: {
          "enable": true,
          "distance": 150,
          "color": "#2c95ff",
          "opacity": 0.4,
          "width": 1
        },
        move: {
          "enable": true,
          "speed": 6,
          "direction": "none",
          "random": false,
          "straight": false,
          "out_mode": "out",
          "bounce": false,
          "attract": {
            "enable": false,
            "rotateX": 600,
            "rotateY": 1200
          }
        },
        interactivity: {

          "detect_on": "canvas",
          "events": {
            "onhover": {
              "enable": true,
              "mode": "repulse"
            },

            "onclick": {
              "enable": true,
              "mode": "push"
            },
            "resize": true
          },

          modes: {
            "grab": {
              "distance": 400,
              "line_linked": {
                "opacity": 1
              }
            },
            "bubble": {
              "distance": 400,
              "size": 40,
              "duration": 2,
              "opacity": 8,
              "speed": 3
            },
            "repulse": {
              "distance": 200,
              "duration": 0.4
            },
            "push": {
              "particles_nb": 4
            },
            "remove": {
              "particles_nb": 2
            }
          }
        },

      }
    };
  }

}
