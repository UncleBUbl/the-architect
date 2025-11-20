import { VibePreset } from './types';

export const VIBE_PRESETS: VibePreset[] = [
  {
    id: 'modern-clean',
    label: 'Modern SaaS',
    description: 'Clean, ample whitespace, Inter font, rounded corners, subtle shadows.',
    promptModifier: 'Use a Modern SaaS aesthetic: clean white/gray background, slate text, primary blue buttons, rounded-lg corners, ample padding, and a focus on readability and hierarchy.'
  },
  {
    id: 'cyberpunk',
    label: 'Cyberpunk',
    description: 'Dark mode, neon accents, angular shapes, glitch effects.',
    promptModifier: 'Use a Cyberpunk aesthetic: dark background (#0f0f0f), neon pink/cyan accents, glitch effects on hover, angular buttons, monospace fonts, and high contrast borders.'
  },
  {
    id: 'playful',
    label: 'Playful & Pop',
    description: 'Vibrant colors, large typography, brutalist touches.',
    promptModifier: 'Use a Playful aesthetic: vibrant pastel background, bold black borders (neobrutalism), large bubbly typography, distinct drop shadows, and high-saturation accent colors.'
  },
  {
    id: 'luxury',
    label: 'Luxury Minimal',
    description: 'Serif headings, gold/monochrome, refined spacing.',
    promptModifier: 'Use a Luxury Minimal aesthetic: cream or charcoal background, serif headings (Playfair Display), gold or silver thin accents, generous letter spacing, and sharp corners.'
  }
];

export const INITIAL_HTML_TEMPLATE = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;600&family=Playfair+Display:wght@400;600&family=Space+Mono:wght@400;700&display=swap" rel="stylesheet">
</head>
<body class="flex items-center justify-center min-h-screen bg-gray-50 text-gray-400">
    <div class="text-center">
        <h1 class="text-2xl font-semibold mb-2">Ready to Architect</h1>
        <p>Upload a sketch and define your vibe to generate the interface.</p>
    </div>
</body>
</html>`;
