const sounds = {
  click: () => playTone(800, 50),
  upload: () => playTone(600, 100),
  generate: () => playTone(400, 200),
  success: () => {
    playTone(523, 100);
    setTimeout(() => playTone(659, 100), 100);
    setTimeout(() => playTone(784, 150), 200);
  },
  error: () => playTone(200, 300),
  copy: () => playTone(1000, 80),
  tts: () => playTone(700, 100)
};

function playTone(frequency, duration) {
  const audioContext = new (window.AudioContext || window.webkitAudioContext)();
  const oscillator = audioContext.createOscillator();
  const gainNode = audioContext.createGain();

  oscillator.connect(gainNode);
  gainNode.connect(audioContext.destination);

  oscillator.frequency.value = frequency;
  oscillator.type = "sine";

  gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + duration / 1000);

  oscillator.start(audioContext.currentTime);
  oscillator.stop(audioContext.currentTime + duration / 1000);
}

export function playSound(name) {
  if (sounds[name]) sounds[name]();
}
