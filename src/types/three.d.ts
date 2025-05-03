import * as THREE from 'three';

declare module 'three' {
  interface Intersection {
    faceIndex?: number;
  }
  
  interface Event {
    stopPropagation: () => void;
    intersection?: Intersection;
  }
}