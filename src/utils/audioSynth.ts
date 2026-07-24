// Audio Engine for Bennu Coffee: Super Chill Lo-Fi Background Instrumental Music

class CafeAudioEngine {
  private audio: HTMLAudioElement | null = null;
  private isAudioActive = false;
  private ctx: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private musicInterval: number | null = null;
  private beatStep = 0;
  private chordIndex = 0;

  // Reliable lo-fi background streams & MP3 tracks
  private tracks = [
    'https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112191.mp3',
    'https://stream.zeno.fm/f3wvbbqmdg8uv', // Live Lo-Fi Radio Stream
    'https://cdn.pixabay.com/download/audio/2022/03/15/audio_c8c8a73467.mp3?filename=chill-lofi-song-8444.mp3'
  ];

  // Chill Lo-Fi Jazz Chords (Hz)
  private chords = [
    { bass: 130.81, notes: [261.63, 329.63, 392.00, 493.88, 587.33] }, // Cmaj9
    { bass: 110.00, notes: [220.00, 261.63, 329.63, 392.00, 493.88] }, // Am9
    { bass: 87.31,  notes: [174.61, 220.00, 261.63, 329.63, 440.00] }, // Fmaj7
    { bass: 98.00,  notes: [196.00, 246.94, 293.66, 349.23, 440.00] }  // G13
  ];

  constructor() {
    if (typeof window !== 'undefined') {
      this.initAudioElement();
    }
  }

  private initAudioElement() {
    if (!this.audio) {
      this.audio = new Audio(this.tracks[0]);
      this.audio.loop = true;
      this.audio.volume = 0.45; // Pleasant, audible volume
      this.audio.crossOrigin = 'anonymous';

      // Fallback to Web Audio Synth if audio element errors out
      this.audio.onerror = () => {
        console.log('Audio element stream fallback to Web Audio Synth');
        if (this.isAudioActive) {
          this.startWebAudioSynth();
        }
      };
    }
  }

  async toggleAudio(): Promise<boolean> {
    if (this.isAudioActive) {
      this.stopAll();
      this.isAudioActive = false;
      return false;
    } else {
      this.isAudioActive = true;
      await this.startMusic();
      return true;
    }
  }

  getIsAudioActive(): boolean {
    return this.isAudioActive;
  }

  // Click sounds disabled as requested
  playClickSound() {}
  playSteamSipSound() {}

  private async startMusic() {
    this.initAudioElement();

    // 1. Try HTML5 Audio Stream first
    if (this.audio) {
      try {
        await this.audio.play();
        return;
      } catch (err) {
        console.warn('HTML5 Audio play prevented/failed, starting Web Audio Synth fallback:', err);
      }
    }

    // 2. Fallback to Web Audio Synthesizer
    await this.startWebAudioSynth();
  }

  private async startWebAudioSynth() {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!this.ctx) {
        this.ctx = new AudioCtx();
      }

      if (this.ctx.state === 'suspended') {
        await this.ctx.resume();
      }

      const now = this.ctx.currentTime;
      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.5, now);

      const filter = this.ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1200, now);

      filter.connect(this.masterGain);
      this.masterGain.connect(this.ctx.destination);

      // Trigger immediate chord
      this.playSynthStep(filter);

      if (this.musicInterval !== null) {
        clearInterval(this.musicInterval);
      }
      this.musicInterval = window.setInterval(() => {
        if (filter) this.playSynthStep(filter);
      }, 500);
    } catch (e) {
      console.error('Web Audio Synth error:', e);
    }
  }

  private playSynthStep(filter: BiquadFilterNode) {
    if (!this.isAudioActive || !this.ctx) return;

    if (this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    const t = this.ctx.currentTime;
    const step = this.beatStep % 16;

    if (step === 0) {
      this.chordIndex = (this.chordIndex + 1) % this.chords.length;
    }

    const chord = this.chords[this.chordIndex];

    // Rhodes piano chords
    if (step === 0 || step === 8 || step === 14) {
      chord.notes.forEach((freq, i) => {
        if (!this.ctx) return;
        const noteTime = t + i * 0.03;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, noteTime);

        gain.gain.setValueAtTime(0.001, noteTime);
        gain.gain.linearRampToValueAtTime(0.18, noteTime + 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, noteTime + 2.2);

        osc.connect(gain);
        gain.connect(filter);

        osc.start(noteTime);
        osc.stop(noteTime + 2.2);
      });
    }

    // Deep sub bass
    if (step === 0 || step === 6 || step === 10) {
      const bassOsc = this.ctx.createOscillator();
      const bassGain = this.ctx.createGain();

      bassOsc.type = 'sine';
      bassOsc.frequency.setValueAtTime(chord.bass, t);

      bassGain.gain.setValueAtTime(0.001, t);
      bassGain.gain.linearRampToValueAtTime(0.3, t + 0.05);
      bassGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);

      bassOsc.connect(bassGain);
      bassGain.connect(filter);

      bassOsc.start(t);
      bassOsc.stop(t + 0.8);
    }

    // Lo-fi kick
    if (step === 0 || step === 8) {
      const kick = this.ctx.createOscillator();
      const kickGain = this.ctx.createGain();

      kick.type = 'sine';
      kick.frequency.setValueAtTime(130, t);
      kick.frequency.exponentialRampToValueAtTime(45, t + 0.12);

      kickGain.gain.setValueAtTime(0.35, t);
      kickGain.gain.exponentialRampToValueAtTime(0.001, t + 0.15);

      kick.connect(kickGain);
      kickGain.connect(this.masterGain || this.ctx.destination);

      kick.start(t);
      kick.stop(t + 0.15);
    }

    this.beatStep++;
  }

  private stopAll() {
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0;
    }

    if (this.musicInterval !== null) {
      clearInterval(this.musicInterval);
      this.musicInterval = null;
    }

    if (this.ctx && this.masterGain) {
      try {
        this.masterGain.gain.linearRampToValueAtTime(0.0001, this.ctx.currentTime + 0.1);
        setTimeout(() => {
          this.masterGain?.disconnect();
          this.masterGain = null;
        }, 150);
      } catch {
        // Ignore
      }
    }
  }
}

export const cafeAudio = new CafeAudioEngine();
