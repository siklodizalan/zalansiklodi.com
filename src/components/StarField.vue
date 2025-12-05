<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue';

// Define the type for a single star object
interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  speed: number; // Controls the rate of opacity change for twinkling
}

// 1. Setup the canvas reference
const canvasRef = ref<HTMLCanvasElement | null>(null);

// 2. Setup variables for the animation
let stars: Star[] = [];
let animationFrameId: number;

// 3. Main component logic runs on mount
onMounted(() => {
  const canvas = canvasRef.value;
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  if (!ctx) return;

  // Function to set canvas dimensions
  const setCanvasSize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };

  // Set initial size
  setCanvasSize();

  // Create stars (runs only once)
  for (let i = 0; i < 150; i++) {
    stars.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 1.5,
      opacity: Math.random(),
      speed: Math.random() * 0.5,
    });
  }

  // Animation Loop Function
  const animate = () => {
    // Clear the canvas for the next frame
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw and update each star
    stars.forEach((star) => {
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
      ctx.fill();

      // Twinkle effect: change opacity and reverse speed at boundaries
      star.opacity += star.speed * 0.02;
      if (star.opacity > 1 || star.opacity < 0.2) {
        star.speed *= -1;
      }
    });

    // Request the next frame
    animationFrameId = requestAnimationFrame(animate);
  };

  // Start the animation
  animate();

  // Handle Window Resize
  const handleResize = () => {
    setCanvasSize();
    // Re-create stars for the new dimensions if desired, 
    // but for simplicity, we just resize the canvas here.
  };

  window.addEventListener('resize', handleResize);

  // 4. Cleanup function runs on unmount
  onUnmounted(() => {
    window.removeEventListener('resize', handleResize);
    cancelAnimationFrame(animationFrameId); // Stop the animation loop
  });
});
</script>

<template>
  <canvas
    ref="canvasRef"
    class="fixed inset-0 pointer-events-none bg-black"
    style="z-index: 0;"
  />
</template>

<style scoped>
/* You might want a slightly dark blue/black background for a night sky effect */
.bg-black {
  background-color: #000022; /* A dark navy/indigo color */
}
</style>