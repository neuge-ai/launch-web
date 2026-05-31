// wave-effect.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. ACCESSIBILITY & PERFORMANCE CHECK
    // If the user's OS has "Reduce Motion" enabled or is in a strict battery-saving mode,
    // we bypass the heavy SVG distortion wave entirely to save GPU and prevent motion sickness.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isLowHardware = (navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4);

    if (prefersReducedMotion || isLowHardware) {
        console.log('Neuge: Reduced motion or low hardware detected. Bypassing heavy wave graphics.');
        document.documentElement.classList.add('low-power-mode');
        return;
    }

    const displacementMap = document.getElementById('displacement-map');
    const turbulence = document.querySelector('#wave-distortion feTurbulence');
    if (!displacementMap || !turbulence) return;

    let lastTime = 0;
    let frameCount = 0;
    let slowFrames = 0;

    function animateWave(time) {
        // Battery saver check (monitors FPS for the first few seconds)
        if (lastTime !== 0) {
            const dt = time - lastTime;
            if (dt > 30) { // ~33 FPS or lower
                slowFrames++;
                if (slowFrames > 5 && frameCount < 120) {
                    console.log('Neuge: Battery saver mode detected (low fps). Halting wave graphics.');
                    document.documentElement.classList.add('low-power-mode');
                    return; // Stop the animation loop
                }
            } else {
                slowFrames = Math.max(0, slowFrames - 0.5);
            }
        }
        lastTime = time;
        frameCount++;

        // The wave cycle runs every 12 seconds
        const cycle = (time / 12000) * Math.PI * 2;
        
        // Using a high power (8) creates a long calm period and a soft, gentle swelling peak
        let intensity = Math.pow(Math.sin(cycle), 8); 
        
        // Max distortion scale of 35
        let currentScale = intensity * 35;
        
        displacementMap.setAttribute('scale', currentScale);
        
        // Gently flow the turbulence noise itself over time for a living water effect
        const freqX = 0.004 + (Math.sin(time / 8000) * 0.002);
        const freqY = 0.004 + (Math.cos(time / 7000) * 0.002);
        turbulence.setAttribute('baseFrequency', `${freqX.toFixed(5)} ${freqY.toFixed(5)}`);
        
        requestAnimationFrame(animateWave);
    }
    
    requestAnimationFrame(animateWave);
});
