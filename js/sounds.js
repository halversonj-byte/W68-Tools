// ========================================
// W68 Teacher Tools - Sound Effects
// Uses Web Audio API - no external files needed
// ========================================

const AudioCtx = window.AudioContext || window.webkitAudioContext;
let audioCtx = null;

function getAudioCtx() {
    if (!audioCtx) {
        audioCtx = new AudioCtx();
    }
    return audioCtx;
}

function playTone(frequency, duration, type = 'sine', volume = 0.3) {
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = type;
        osc.frequency.value = frequency;
        gain.gain.value = volume;
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + duration);
    } catch (e) {
        // Audio not supported - fail silently
    }
}

function playAlarm() {
    // Three ascending tones
    playTone(523, 0.3, 'sine', 0.4);
    setTimeout(() => playTone(659, 0.3, 'sine', 0.4), 300);
    setTimeout(() => playTone(784, 0.5, 'sine', 0.4), 600);
}

function playTick() {
    playTone(800, 0.05, 'sine', 0.15);
}

function playClick() {
    playTone(600, 0.08, 'sine', 0.2);
}

function playWhoosh() {
    try {
        const ctx = getAudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(200, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(800, ctx.currentTime + 0.3);
        gain.gain.setValueAtTime(0.2, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.3);
    } catch (e) {}
}

function playDrumroll(duration, callback) {
    const intervalMs = 60;
    let elapsed = 0;
    const id = setInterval(() => {
        elapsed += intervalMs;
        const freq = 100 + Math.random() * 100;
        playTone(freq, 0.05, 'triangle', 0.15);
        if (elapsed >= duration) {
            clearInterval(id);
            if (callback) callback();
        }
    }, intervalMs);
    return id;
}

function playDiceRoll() {
    for (let i = 0; i < 6; i++) {
        setTimeout(() => {
            playTone(200 + Math.random() * 200, 0.06, 'triangle', 0.15);
        }, i * 80);
    }
}

function playChime() {
    playTone(523, 0.4, 'sine', 0.3);
    setTimeout(() => playTone(659, 0.4, 'sine', 0.3), 150);
    setTimeout(() => playTone(784, 0.6, 'sine', 0.3), 300);
}

function playWarning() {
    playTone(440, 0.2, 'square', 0.2);
    setTimeout(() => playTone(440, 0.2, 'square', 0.2), 300);
}
