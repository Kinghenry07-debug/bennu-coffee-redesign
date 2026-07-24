// 100% Local Web Audio API Synthesizer for Bennu Coffee: Super Chill Lo-Fi Music Generator
// Uses native browser audio context (no external MP3 downloads or CORS restrictions)

class CafeAudioEngine {
  private ctx: AudioContext | null = null;
  private isAudioActive = false;
  private masterGain: GainNode | null = null;
  private filterNode: BiquadFilterNode | null = null;
  private musicInterval: number | null = null;
  private beatStep = 0;
  private volume = 0.4; // Clearly audible master volume

  // Lo-Fi Jazz Chord Progression (Hz)
  // Cmaj9 -> Am9 -> Fmaj7 -> G13
  private chords = [
    { bass: 130.81, notes: [261.63, 329.63, 392.00, 493.88, 587.33] }, // C3 + C4, E4, G4, B4, D5
    { bass: 110.00, notes: [220.00, 261.63, 329.63, 392.00, 493.88] }, // A2 + A3, C4, E4, G4, B4
    { bass: 87.31,  notes: [174.61, 220.00, 261.63, 329.63, 440.00] }, // F2 + F3, A3, C4, E4, A4
    { bass: 98.00,  notes: [196.00, 246.94, 293.66, 349.23, 440.00] }  // G2 + G3, B3, D4, F4, A4
  ];
  private chordIndex = 0;

  private initContext() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
  }

  toggleAudio(): boolean {
    try {
      this.initContext();
      if (!this.ctx) return false;

      // Crucial for browser audio unlock policy
      if (this.ctx.state === 'suspended') {
        this.ctx.resume();
      }

      if (this.isAudioActive) {
        this.stopMusic();
        this.isAudioActive = false;
        return false;
      } else {
        this.isAudioActive = true;
        this.startMusic();
        return true;
      }
    } catch (err) {
      console.error('Audio initialization error:', err);
      return false;
    }
  }

  getIsAudioActive(): boolean {
    return this.isAudioActive;
  }

  setVolume(newVol: number) {
    this.volume = Math.max(0, Math.min(1, newVol));
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.volume, this.ctx.currentTime);
    }
  }

  // No-op click sounds as requested
  playClickSound() {}
  playSteamSipSound() {}

  private startMusic() {
    if (!this.ctx) return;

    const now = this.ctx.currentTime;

    // Master Gain
    this.masterGain = this.ctx.createGain();
    this.masterGain.gain.setValueAtTime(this.volume, now);

    // Warm Lowpass Filter for Lo-Fi Vibe (cuts harsh high frequencies)
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(1400, now);

    this.filterNode.connect(this.masterGain);
    this.masterGain.connect(this.ctx.destination);

    // Play immediate warm confirmation chord so user hears it instantly
    this.playBeatStep();

    // Loop beat & chord generator every 400ms (75 BPM lo-fi tempo, 16 steps per pattern)
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
    }
    this.musicInterval = window.setInterval(() => {
      this.playBeatStep();
    }, 400);
  }

  private playBeatStep() {
    if (!this.isAudioActive || !this.ctx || !this.filterNode) return;

    // Ensure AudioContext is running
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }

    const t = this.ctx.currentTime;
    const step = this.beatStep % 16;

    // Every 16 steps (6.4s), advance chord
    if (step === 0) {
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
    }

    const currentChord = this.chords[this.chordIndex];

    // 1. Warm Electric Piano Chord (Strummed on step 0 and step 8, plus subtle offbeats)
    if (step === 0 || step === 8 || step === 14) {
      currentChord.notes.forEach((freq, idx) => {
        if (!this.ctx || !this.filterNode) return;

        const noteTime = t + (idx * 0.03); // Slight arpeggiated human strum
        const osc = this.ctx.createOscillator();
        const noteGain = this.ctx.createGain();

        // Sine wave with soft triangle harmonic blend for Rhodes piano feel
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        noteGain.gain.setValueAtTime(0.001, noteTime);
        noteGain.gain.linearRampToValueAtTime(0.12, noteTime + 0.08);
        noteGain.gain.exponentialRampToValueAtTime(0.001, noteTime + 1.8);

        osc.connect(noteGain);
        noteGain.connect(this.filterNode);

        osc.start(noteTime);
        osc.stop(noteTime + 1.8);
      });
    }

    // 2. Warm Sub-Bass (Steps 0, 6, 10, 12)
    if (step === 0 || step === 6 || step === 10 || step === 12) {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(currentChord.bass, t);

      bassGain.gain.setValueAtTime(0.001, t);
      bassGain.gain.linearRampToValueAtTime(0.25, t + 0.05);
      bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.7);

      bassOsc.connect(bassGain);
      bassGain.connect(this.filterNode);

      bassOsc.start(t);
      bassOsc.stop(t + 0.7);
    }

    // 3. Soft Lo-Fi Kick Drum (Steps 0, 8, 11)
    if (step === 0 || step === 8 || step === 11) {
      const kickOsc = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();

      kickOsc.type = 'sine';
      kickOsc.frequency.setValueAtTime(120, t);
      kickOsc.frequency.exponentialRampToValueAtTime(40, t + 0.12);

      kickGain.gain.setValueAtTime(0.3, t);
      kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      kickOsc.connect(kickGain);
      kickGain.connect(this.masterGain || this.ctx.destination);

      kickOsc.start(t);
      kickOsc.stop(t + 0.15);
    }

    // 4. Soft Rim/Snare Drum (Steps 4, 12)
    if (step === 4 || step === 12) {
      const snareOsc = this.ctx.createOscillator();
      const snareGain = this.ctx.createGain();

      snareOsc.type = 'triangle';
      snareOsc.frequency.setValueAtTime(180, t);

      snareGain.gain.setValueAtTime(0.12, t);
      snareGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);

      snareOsc.connect(snareGain);
      snareGain.connect(this.filterNode);

      snareOsc.start(t);
      snareOsc.stop(t + 0.1);
    }

    // 5. Soft Lo-Fi Hi-Hat (Every 2 steps)
    if (step % 2 === 0) {
      const bufSize = this.ctx.sampleRate * 0.04;
      const buffer = this.ctx.createBuffer(1, bufSize, this.ctx.sampleRate);
      const data = buffer.getChannelData(0);
      for (let i = 0; i < bufSize; i++) {
        data[i] = (Math.random() * 2 - 1) * 0.05;
      }

      const hatSource = this.ctx.createBufferSource();
      hatSource.buffer = buffer;

      const hatFilter = this.ctx.createBiquadFilter();
      hatFilter.type = 'highpass';
      hatFilter.frequency.setValueAtTime(5000, t);

      const hatGain = this.ctx.createGain();
      hatGain.gain.setValueAtTime(step % 4 === 2 ? 0.08 : 0.04, t);
      hatGain.gain.exponentialRampToValueAtTime(0.001, t + 0.04);

      hatSource.connect(hatFilter);
      hatFilter.connect(hatGain);
      hatGain.connect(this.masterGain || this.ctx.destination);

      hatSource.start(t);
      hatSource.stop(t + 0.04);
    }

    this.beatStep++;
  }

  private stopMusic() {
    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }

    if (this.ctx && this.masterGain) {
      try {
        const t = this.ctx.currentTime;
        this.masterGain.gain.linearRampToValueAtTime(0.0001, t + 0.2);
        setTimeout(() => {
          this.masterGain?.disconnect();
          this.masterGain = null;
          this.filterNode = null;
        }, 200);
      } catch {
        // Ignore
      }
    }
  }
}

export const cafeAudio = new CafeAudioEngine();
