// Deterministic picsum seeds so the "AI generated" grid looks consistent
// across reloads instead of jumping every render.
export const HISTORY_SEEDS = [
  "fomi-h1", "fomi-h2", "fomi-h3", "fomi-h4", "fomi-h5",
  "fomi-h6", "fomi-h7", "fomi-h8", "fomi-h9", "fomi-h10",
  "fomi-h11", "fomi-h12",
];

export const STYLES = ["Cinematic", "Portrait", "Anime", "3D Render", "Product", "Editorial"];
export const MODELS = ["Fomi Core v2", "Fomi Portrait", "Fomi Fast", "Fomi HD"];
export const IMAGE_COUNTS = [1, 2, 4, 8];

export const DEFAULT_PROMPT =
  "A professional portrait photograph of a smiling 31-year-old redheaded woman with warm brown eyes and softly tousled auburn hair framing her face. She is turned slightly towards the viewer, offering a genuine and approachable expression. She is wearing a cream-colored cashmere sweater with delicate gold earrings. The background is a softly blurred expanse of muted gray and beige tones, suggesting a modern art gallery. There is subtle directional lighting.";
