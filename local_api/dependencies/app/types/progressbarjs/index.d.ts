// declare let ProgressBar: ProgressBar;
// export = grapesjs;
// declare module "progressbar.js" {
export interface ProgressBar {
  // export class ProgressBar {
  // }
  // export class offsetPlugin {
  // }
  Circle(element: HTMLElement, options: any): Circle;
}

export interface Shape {
  set(progress: number): void;
}

export interface Circle extends Shape {}
// }
