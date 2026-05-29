// wave-effect.js
document.addEventListener('DOMContentLoaded', () => {
    // 1. ACCESSIBILITY & PERFORMANCE CHECK
    // If the user's OS has "Reduce Motion" enabled or is in a strict battery-saving mode,
    // we bypass the heavy SVG distortion wave entirely to save GPU and prevent motion sickness.
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
        console.log('Neuge: Reduced motion preferred. Bypassing heavy wave graphics.');
        return;
    }

    const displacementMap = document.getElementById('displacement-map');
    const turbulence = document.querySelector('#wave-distortion feTurbulence');
    if (!displacementMap || !turbulence) return;

    function animateWave(time) {
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
