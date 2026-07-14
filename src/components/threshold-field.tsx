"use client";

import { useEffect, useRef } from "react";

const vertexShaderSource = `
  attribute vec2 aPosition;
  varying vec2 vUv;

  void main() {
    vUv = aPosition * 0.5 + 0.5;
    gl_Position = vec4(aPosition, 0.0, 1.0);
  }
`;

const fragmentShaderSource = `
  precision highp float;

  varying vec2 vUv;
  uniform vec2 uResolution;
  uniform vec2 uPointer;
  uniform float uTime;
  uniform float uScroll;
  uniform float uMotion;

  float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);

    float a = hash21(i);
    float b = hash21(i + vec2(1.0, 0.0));
    float c = hash21(i + vec2(0.0, 1.0));
    float d = hash21(i + vec2(1.0, 1.0));

    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    mat2 rotation = mat2(0.80, -0.60, 0.60, 0.80);

    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p);
      p = rotation * p * 2.03 + 11.7;
      amplitude *= 0.5;
    }

    return value;
  }

  float lineDistance(vec2 p, float y) {
    return abs(p.y - y);
  }

  void main() {
    vec2 resolution = max(uResolution, vec2(1.0));
    vec2 uv = (gl_FragCoord.xy - 0.5 * resolution.xy) / resolution.y;
    vec2 pointer = (uPointer - 0.5) * vec2(resolution.x / resolution.y, 1.0);

    float time = uTime * uMotion;
    float phase = smoothstep(0.04, 0.88, uScroll);
    float thresholdMoment = 1.0 - smoothstep(0.0, 0.22, abs(uScroll - 0.50));

    vec2 warped = uv;
    warped.x += 0.11 * sin(uv.y * 3.2 + time * 0.16);
    warped.y += 0.08 * sin(uv.x * 2.4 - time * 0.12);

    float pointerWell = exp(-3.2 * dot(uv - pointer, uv - pointer));
    float field = fbm(warped * mix(2.0, 4.8, phase) + vec2(time * 0.035, -time * 0.026));
    field += 0.14 * sin((uv.x + field * 0.22) * 12.0 - time * 0.25);
    field += pointerWell * 0.16;

    float contour = abs(fract(field * mix(3.6, 8.0, phase)) - 0.5);
    contour = 1.0 - smoothstep(0.012, 0.055, contour);

    vec2 cells = fract((uv + 1.0) * mix(7.0, 15.0, phase)) - 0.5;
    vec2 cellId = floor((uv + 1.0) * mix(7.0, 15.0, phase));
    float nodeSeed = hash21(cellId);
    float nodes = 1.0 - smoothstep(0.010, 0.055, length(cells));
    nodes *= smoothstep(0.58, 0.96, nodeSeed + field * 0.22);
    nodes *= mix(0.24, 0.88, phase);

    float branchEnvelope = smoothstep(0.24, 0.47, uScroll) * (1.0 - smoothstep(0.57, 0.78, uScroll));
    float branchX = uv.x + 0.24;
    float branchBase = -0.03 + 0.035 * sin(branchX * 8.0 - time * 0.18);
    float split = smoothstep(-0.15, 0.52, branchX) * 0.34;
    float upperBranch = branchBase + split;
    float lowerBranch = branchBase - split * 0.72;
    float branchA = 1.0 - smoothstep(0.006, 0.026, lineDistance(uv, upperBranch));
    float branchB = 1.0 - smoothstep(0.006, 0.026, lineDistance(uv, lowerBranch));
    float branches = max(branchA, branchB) * branchEnvelope;

    float horizon = 1.0 - smoothstep(0.004, 0.025, abs(uv.y + 0.15 - 0.03 * sin(uv.x * 5.0)));
    horizon *= smoothstep(0.58, 0.95, phase);

    vec3 graphite = vec3(0.027, 0.025, 0.023);
    vec3 mineral = vec3(0.89, 0.25, 0.10);
    vec3 cyan = vec3(0.56, 0.91, 0.95);
    vec3 bone = vec3(0.92, 0.89, 0.83);

    vec3 signal = mix(mineral, cyan, smoothstep(0.47, 0.68, uScroll));
    vec3 color = graphite;

    float haze = smoothstep(0.18, 0.92, field) * 0.10;
    color += mix(mineral, cyan, phase) * haze;
    color += signal * contour * mix(0.08, 0.22, phase);
    color += mix(mineral, bone, phase) * nodes * 0.42;
    color += mix(mineral, cyan, step(0.0, uv.y)) * branches * (0.35 + thresholdMoment * 0.55);
    color += cyan * horizon * 0.20;

    float verticalRays = pow(max(0.0, sin((uv.x + field * 0.05) * 36.0)), 22.0);
    color += cyan * verticalRays * phase * 0.035;

    float vignette = 1.0 - smoothstep(0.22, 1.18, length(uv * vec2(0.80, 1.0)));
    color *= mix(0.34, 1.0, vignette);

    float grain = hash21(gl_FragCoord.xy + floor(time * 12.0)) - 0.5;
    color += grain * 0.022;

    float edgeFade = smoothstep(0.0, 0.12, vUv.y) * smoothstep(0.0, 0.12, 1.0 - vUv.y);
    color *= 0.82 + 0.18 * edgeFade;

    gl_FragColor = vec4(color, 1.0);
  }
`;

function compileShader(
  gl: WebGLRenderingContext,
  type: number,
  source: string,
): WebGLShader {
  const shader = gl.createShader(type);
  if (!shader) throw new Error("Unable to create WebGL shader.");

  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const message = gl.getShaderInfoLog(shader) ?? "Unknown shader compilation error.";
    gl.deleteShader(shader);
    throw new Error(message);
  }

  return shader;
}

function createProgram(gl: WebGLRenderingContext): WebGLProgram {
  const vertex = compileShader(gl, gl.VERTEX_SHADER, vertexShaderSource);
  const fragment = compileShader(gl, gl.FRAGMENT_SHADER, fragmentShaderSource);
  const program = gl.createProgram();

  if (!program) throw new Error("Unable to create WebGL program.");

  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  gl.deleteShader(vertex);
  gl.deleteShader(fragment);

  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    const message = gl.getProgramInfoLog(program) ?? "Unknown WebGL link error.";
    gl.deleteProgram(program);
    throw new Error(message);
  }

  return program;
}

export function ThresholdField() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });

    if (!gl) {
      canvas.dataset.failed = "true";
      return;
    }

    let program: WebGLProgram;

    try {
      program = createProgram(gl);
    } catch (error) {
      console.error("Threshold field failed to initialize:", error);
      canvas.dataset.failed = "true";
      return;
    }

    const buffer = gl.createBuffer();
    if (!buffer) return;

    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );

    gl.useProgram(program);

    const position = gl.getAttribLocation(program, "aPosition");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolutionLocation = gl.getUniformLocation(program, "uResolution");
    const pointerLocation = gl.getUniformLocation(program, "uPointer");
    const timeLocation = gl.getUniformLocation(program, "uTime");
    const scrollLocation = gl.getUniformLocation(program, "uScroll");
    const motionLocation = gl.getUniformLocation(program, "uMotion");

    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const coarsePointer = window.matchMedia("(pointer: coarse)");
    const pointer = { x: 0.5, y: 0.5 };
    const pointerTarget = { x: 0.5, y: 0.5 };
    let scroll = 0;
    let scrollTarget = 0;
    let animationFrame = 0;
    let visible = true;
    let lastTime = performance.now();
    const startedAt = lastTime;

    const maxDpr = coarsePointer.matches ? 1.15 : 1.6;

    const resize = () => {
      const width = Math.max(1, window.innerWidth);
      const height = Math.max(1, window.innerHeight);
      const dpr = Math.min(window.devicePixelRatio || 1, maxDpr);
      const renderWidth = Math.floor(width * dpr);
      const renderHeight = Math.floor(height * dpr);

      if (canvas.width !== renderWidth || canvas.height !== renderHeight) {
        canvas.width = renderWidth;
        canvas.height = renderHeight;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
      }

      gl.viewport(0, 0, renderWidth, renderHeight);
    };

    const readScroll = () => {
      const root = document.documentElement;
      const distance = Math.max(1, root.scrollHeight - window.innerHeight);
      scrollTarget = Math.min(1, Math.max(0, window.scrollY / distance));
      root.style.setProperty("--site-progress", scrollTarget.toFixed(4));
    };

    const onPointerMove = (event: PointerEvent) => {
      pointerTarget.x = event.clientX / Math.max(1, window.innerWidth);
      pointerTarget.y = 1 - event.clientY / Math.max(1, window.innerHeight);
    };

    const onVisibility = () => {
      visible = document.visibilityState === "visible";
      if (visible && !animationFrame) {
        lastTime = performance.now();
        animationFrame = requestAnimationFrame(render);
      }
    };

    const render = (now: number) => {
      animationFrame = 0;
      if (!visible) return;

      const delta = Math.min(40, now - lastTime);
      lastTime = now;
      const easing = 1 - Math.pow(0.001, delta / 1000);

      pointer.x += (pointerTarget.x - pointer.x) * easing;
      pointer.y += (pointerTarget.y - pointer.y) * easing;
      scroll += (scrollTarget - scroll) * Math.min(1, easing * 1.45);

      gl.useProgram(program);
      gl.uniform2f(resolutionLocation, canvas.width, canvas.height);
      gl.uniform2f(pointerLocation, pointer.x, pointer.y);
      gl.uniform1f(timeLocation, (now - startedAt) / 1000);
      gl.uniform1f(scrollLocation, scroll);
      gl.uniform1f(motionLocation, reducedMotion.matches ? 0 : 1);
      gl.drawArrays(gl.TRIANGLES, 0, 3);

      animationFrame = requestAnimationFrame(render);
    };

    resize();
    readScroll();

    window.addEventListener("resize", resize, { passive: true });
    window.addEventListener("scroll", readScroll, { passive: true });
    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("visibilitychange", onVisibility);

    animationFrame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animationFrame);
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", readScroll);
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("visibilitychange", onVisibility);
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="threshold-field"
      aria-hidden="true"
    />
  );
}
