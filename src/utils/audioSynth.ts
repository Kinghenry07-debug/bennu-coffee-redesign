// Web Audio API helper for cafe ambient atmosphere & micro-sound effects
class CafeAudioEngine {
  private ctx: AudioContext | null = null;
  private isPlayingAmbience = false;
  private ambienceNodes: { gain: GainNode; sources: AudioNode[] } | null = null;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  // Play a subtle espresso steam / pour sound effect on click or action
  playSteamSipSound() {
    try {
      this.initContext();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      
      // White noise generator for steam hiss
      const bufferSize = this.ctx.sampleRate * 0.15;
      const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufferSize; i++) {
        data[i] = Math.random() * 2 - 1;
      }

      const noise = this.ctx.createBufferSource();
      noise.buffer = buffer;

      // Bandpass filter for coffee steam tone
      const filter = this.ctx.createBiquadFilter();
      filter.type = 'bandpass';
      filter.frequency.setValueAtTime(1800, now);
      filter.Q.setValueAtTime(3.0, now);

      const gain = this.ctx.createGain();
      gain.gain.setValueAtTime(0.001, now);
      gain.gain.exponentialRampToValueAtTime(0.08, now + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.15);

      noise.connect(filter);
      filter.connect(gain);
      gain.connect(this.ctx.destination);

      noise.start(now);
      noise.stop(now + 0.15);
    } catch {
      // Graceful fallback if Web Audio is blocked
    }
  }

  // Toggle warm ambient coffee house background sound (pink noise + gentle rain filters)
  toggleAmbience(): boolean {
    try {
      this.initContext();
      if (!this.ctx) return false;

      if (this.isPlayingAmbience && this.ambienceNodes) {
        this.ambienceNodes.gain.gain.exponentialRampToValueAtTime(0.0001, this.ctx.currentTime + 0.5);
        setTimeout(() => {
          this.ambienceNodes?.sources.forEach(s => {
            if ('stop' in s && typeof (s as AudioBufferSourceNode).stop === 'function') {
              (s as AudioBufferSourceNode).stop();
            }
          });
          this.ambienceNodes = null;
        }, 500);
        this.isPlayingAmbience = false;
        return false;
      } else {
        const now = this.ctx.currentTime;
        const masterGain = this.ctx.createGain();
        masterGain.gain.setValueAtTime(0.001, now);
        masterGain.gain.exponentialRampToValueAtTime(0.04, now + 1.0); // Gentle background volume

        // Pink noise buffer
        const bufferSize = 2 * this.ctx.sampleRate;
        const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
        for (let i = 0; i < bufferSize; i++) {
          const white = Math.random() * 2 - 1;
          b0 = 0.99886 * b0 + white * 0.0555179;
          b1 = 0.99332 * b1 + white * 0.0750759;
          b2 = 0.96900 * b2 + white * 0.1538520;
          b3 = 0.86650 * b3 + white * 0.3104856;
          b4 = 0.55000 * b4 + white * 0.5329522;
          b5 = -0.7616 * b5 - white * 0.0168980;
          output[i] = b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362;
          output[i] *= 0.11;
          b6 = white * 0.115926;
        }

        const whiteNoise = this.ctx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        // Warm lowpass filter for rain & cozy cafe murmur
        const lpFilter = this.ctx.createBiquadFilter();
        lpFilter.type = 'lowpass';
        lpFilter.frequency.setValueAtTime(600, now);

        whiteNoise.connect(lpFilter);
        lpFilter.connect(masterGain);
        masterGain.connect(this.ctx.destination);

        whiteNoise.start(now);

        this.ambienceNodes = { gain: masterGain, sources: [whiteNoise] };
        this.isPlayingAmbience = true;
        return true;
      }
    } catch {
      return false;
    }
  }

  getIsAmbiencePlaying(): boolean {
    return this.isPlayingAmbience;
  }
}

export const cafeAudio = new CafeAudioEngine();
