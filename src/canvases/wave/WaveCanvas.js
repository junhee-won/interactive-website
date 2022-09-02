import { useEffect, useState } from "react";
import styled from "styled-components";
import { Wave } from "./Wave";

export default function WaveCanvas() {
  useEffect(() => {
    const canvas = document.querySelector("#wave");
    const ctx = canvas.getContext("2d");
    const waveContainer = document.querySelector("#waveContainer");
    const stageWidth = waveContainer.clientWidth;
    const stageHeight = waveContainer.clientHeight;
    canvas.width = stageWidth;
    canvas.height = stageHeight;
    const canvasWidth = canvas.width;
    const canvasHeight = canvas.height;

    if (window.devicePixelRatio > 1) {
      canvas.width = window.devicePixelRatio * canvasWidth;
      canvas.height = window.devicePixelRatio * canvasHeight;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
      canvas.style.width = canvasWidth + "px";
      canvas.style.height = canvasHeight + "px";
    }

    const colors = [
      "rgba(255, 0, 0, 0.4)",
      "rgba(0, 255, 0, 0.4)",
      "rgba(0, 0, 255, 0.4)",
    ];
    const waves = [];
    for (let i = 0; i < 3; i++) {
      waves.push(
        new Wave({
          beginX: 0,
          endX: canvasWidth,
          y: canvasHeight / 2,
          color: colors[i],
          index: i,
        })
      );
    }

    const draw = () => {
      for (let i = 0; i < 3; i++) {
        waves[i].draw(ctx);
      }
    };

    draw();

    let animationId = null;

    const animate = () => {
      ctx.clearRect(0, 0, canvasWidth, canvasHeight);
      draw();
      animationId = requestAnimationFrame(animate);
    };

    const startAnimation = () => {
      if (animationId) return;
      animate();
    };

    const stopAnimation = () => {
      if (!animationId) return;
      cancelAnimationFrame(animationId);
      animationId = null;
    };

    const waveEsc = document.querySelector("#waveEsc");
    waveEsc.addEventListener("click", stopAnimation);
    waveContainer.addEventListener("click", startAnimation);

    return () => {
      waveEsc.removeEventListener("click", stopAnimation);
      waveContainer.removeEventListener("click", startAnimation);
    };
  });

  return (
    <div>
      <button id="waveEsc">esc</button>
      <Container id="waveContainer">
        <Canvas id="wave" />
      </Container>
    </div>
  );
}

const Container = styled.div`
  width: 500px;
  height: 500px;
  margin: 50px;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;
