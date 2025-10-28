export type AnimationScene = {
  duration: number;
  render: (ctx: CanvasRenderingContext2D, progress: number, width: number, height: number) => void;
};

export class AnimationEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private scenes: AnimationScene[] = [];
  private isPlaying = false;
  private startTime = 0;
  private animationFrameId: number | null = null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d')!;
  }

  setScenes(scenes: AnimationScene[]) {
    this.scenes = scenes;
  }

  play(onComplete?: () => void) {
    if (this.isPlaying) return;

    this.isPlaying = true;
    this.startTime = performance.now();

    const animate = (currentTime: number) => {
      const elapsed = (currentTime - this.startTime) / 1000;

      let totalDuration = 0;
      let currentScene: AnimationScene | null = null;
      let sceneStartTime = 0;

      for (const scene of this.scenes) {
        if (elapsed < totalDuration + scene.duration) {
          currentScene = scene;
          sceneStartTime = totalDuration;
          break;
        }
        totalDuration += scene.duration;
      }

      if (!currentScene) {
        this.isPlaying = false;
        if (onComplete) onComplete();
        return;
      }

      const sceneProgress = (elapsed - sceneStartTime) / currentScene.duration;

      this.ctx.fillStyle = '#000000';
      this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

      currentScene.render(this.ctx, sceneProgress, this.canvas.width, this.canvas.height);

      this.animationFrameId = requestAnimationFrame(animate);
    };

    this.animationFrameId = requestAnimationFrame(animate);
  }

  stop() {
    this.isPlaying = false;
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  reset() {
    this.stop();
    this.ctx.fillStyle = '#000000';
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export const easeInOutCubic = (t: number): number => {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
};

export const easeOutBounce = (t: number): number => {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
};
