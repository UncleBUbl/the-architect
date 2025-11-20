export enum GenerationStatus {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING', // Uploading/Thinking
  GENERATING = 'GENERATING', // Streaming/Receiving
  COMPLETED = 'COMPLETED',
  ERROR = 'ERROR'
}

export interface GeneratedResult {
  html: string;
  thinkingProcess?: string;
}

export interface VibePreset {
  id: string;
  label: string;
  description: string;
  promptModifier: string;
}
