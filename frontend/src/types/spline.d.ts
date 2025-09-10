declare module 'https://esm.sh/@splinetool/runtime' {
  export class Application {
    constructor(canvas: HTMLCanvasElement);
    load(url: string): Promise<void>;
    renderer?: any;
    scene?: any;
    camera?: any;
    controls?: any;
    setBackground?: (color: string) => void;
  }
}

declare module 'https://esm.sh/three' {
  export class Color {
    constructor(color: number);
  }
  export class Scene {
    background?: any;
  }
  export class WebGLRenderer {
    setClearColor(color: number): void;
    render(scene: any, camera: any): void;
  }
}
