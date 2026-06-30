import { useState, useRef, useCallback, useEffect } from "react";

// ─── Design tokens (dark / black) ────────────────────────────────────────────
const T = {
  bg:        "#0a0a0a",   // page background
  surface:   "#111111",   // card / sidebar background
  surfaceB:  "#161616",   // slightly lighter surface
  border:    "#252525",   // default border
  borderMd:  "#333333",   // medium border
  text:      "#f0f0f0",   // primary text
  textMid:   "#999999",   // secondary text
  textFaint: "#555555",   // placeholder / count text
  divider:   "#1e1e1e",   // dividers
  chipOff:   "#181818",   // inactive chip background
  btnOff:    "#1e1e1e",   // inactive toggle btn
  btnOffTxt: "#444444",   // inactive toggle btn text
  input:     "#141414",   // input backgrounds
  shadow:    "0 1px 4px rgba(0,0,0,0.5)",

  // ── Category accent colors ──────────────────────────────────────────────────
  scene:     "#22c55e",   // Scene    → vivid green
  angle:     "#f59e0b",   // Angle    → amber
  lighting:  "#a78bfa",   // Lighting → violet
  comp:      "#38bdf8",   // Composition → sky blue
  arColor:   "#e879f9",   // Aspect Ratio → fuchsia
  resColor:  "#fb7185",   // Resolution → rose
};

// ─── Products ────────────────────────────────────────────────────────────────
const PRODUCTS = [
  {
    id: "super_greens", label: "Super Greens Demon", icon: "🌿", color: "#4ade80",
    container: "black cylindrical tub, 250g, black ribbed lid",
    label_desc: `"DEMON LABZ" in small spaced lettering at top center; "SUPER GREENS" in large bold distressed white lettering; "DEMON" in very large cracked grunge-texture white type below; bright acid-green rectangular banner reading "FOOD SUPPLEMENT"; dark panel with text "SUPER GREENS POWDER – 50 SERVINGS X 5 GRAMS"; dark panel with "PLANT BASED INGREDIENTS – VEGAN PRODUCT – NO ADDED SUGAR"; bottom text "NET WEIGHT: 250 Ge". Label background is black with vivid green paint-splatter and ink-blot graphic texture covering the entire label. Label colors: black background, white text, acid-green accents.`,
  },
  {
    id: "testo_demon", label: "Testo Demon", icon: "🔱", color: "#f87171",
    container: "black glossy pill/capsule bottle with silver metallic screw lid",
    label_desc: `"DEMON LABZ" in small spaced silver lettering at top center; "TESTO" in very large bold distressed white cracked-texture lettering; "DEMON" in equally large bold cracked grunge white type below; coral/salmon-pink rectangular banner reading "FOOD SUPPLEMENT"; dark banner with white text "WITH D-ASPARTIC ACID, ZINC AND MAGNESIUM"; smaller dark banner "WITH MAGNESIUM WHICH CONTRIBUTES TO THE MAINTENANCE OF NORMAL MUSCLE FUNCTION"; bottom text "120 CAPSULES / NET WEIGHT: 96 G e". Label background is black with dark red blood-splatter and horror grunge texture. Label colors: black background, white text, coral-pink/red accents.`,
  },
  {
    id: "pre_berry", label: "Pre Workout · Berry", icon: "⚡", color: "#f87171",
    container: "dark brown/dark chocolate cylindrical tub, 360g, matching dark brown ribbed lid",
    label_desc: `"DEMON LABZ" in small spaced white lettering at top center; "PRE WORKOUT" in large bold distressed white lettering two lines; "DEMON" in very large cracked grunge white type; bright red rectangular banner reading "BERRY FLAVOR"; dark panel "FOOD SUPPLEMENT WITH BERRY FLAVOUR, SUGAR AND SWEETENER"; red-outlined warning panel with caffeine warning text; bottom text "40 SERVINGS (NET WEIGHT 360Ge)". Label background is dark charcoal/near-black with vivid red blood-splatter and ink-blot graphic texture. Label colors: dark background, white text, red accents.`,
  },
  {
    id: "pre_berry_super", label: "Pre Workout · Berry Supersize", icon: "⚡", color: "#fca5a5",
    container: "black cylindrical tub, larger 720g supersize format, black ribbed lid",
    label_desc: `"DEMON LABZ" in small spaced white lettering at top center; "PRE WORKOUT" in large bold distressed white lettering; "DEMON" in very large cracked grunge white type; red rectangular banner reading "BERRY FLAVOUR"; red spaced text "SUPERSIZE EDITION" below banner; dark panel "FOOD SUPPLEMENT WITH BERRY FLAVOUR, SUGAR AND SWEETENER"; warning panel with caffeine warning; bottom text "80 REGULAR SERVINGS (NET WEIGHT 720g)". Label background is black with dark red paint-splatter grunge texture. Label colors: black background, white text, red accents.`,
  },
  {
    id: "pre_raspberry", label: "Pre Workout · Blue Raspberry", icon: "⚡", color: "#38bdf8",
    container: "dark brown/dark chocolate cylindrical tub, 360g, matching dark brown ribbed lid",
    label_desc: `"DEMON LABZ" in small spaced white lettering at top center; "PRE WORKOUT" in large bold distressed white lettering; "DEMON" in very large cracked grunge white type; bright cyan/sky-blue rectangular banner reading "BLUE RASPBERRY FLAVOR"; dark panel "FOOD SUPPLEMENT WITH BERRY FLAVOUR, SUGAR AND SWEETENER"; warning panel with caffeine warning text; bottom text "40 SERVINGS (NET WEIGHT 360Ge)". Label background is dark charcoal with vivid cyan-blue paint-splatter ink-blot grunge texture. Label colors: dark background, white text, bright cyan-blue accents.`,
  },
  {
    id: "pre_raspberry_super", label: "Pre Workout · Blue Raspberry Supersize", icon: "⚡", color: "#7dd3fc",
    container: "black cylindrical tub, larger 720g supersize format, black ribbed lid",
    label_desc: `"DEMON LABZ" in small spaced white lettering at top center; "PRE WORKOUT" in large bold distressed white lettering; "DEMON" in very large cracked grunge white type; cyan/sky-blue rectangular banner reading "BLUE RASPBERRY FLAVOUR"; cyan spaced text "SUPERSIZE EDITION" below banner; dark panel "FOOD SUPPLEMENT WITH BLUE RASPBERRY FLAVOUR, SUGAR AND SWEETENER"; warning panel with caffeine warning; bottom text "80 REGULAR SERVINGS (NET WEIGHT 720g)". Label background is black with vivid cyan-blue paint-splatter grunge texture. Label colors: black background, white text, bright cyan-blue accents.`,
  },
  {
    id: "pre_tropical", label: "Pre Workout · Tropical", icon: "⚡", color: "#fb923c",
    container: "dark brown/dark chocolate cylindrical tub, 360g, matching dark brown ribbed lid",
    label_desc: `"DEMON LABZ" in small spaced white lettering at top center; "PRE WORKOUT" in large bold distressed white lettering; "DEMON" in very large cracked grunge white type; orange rectangular banner reading "TROPICAL FLAVOR"; dark panel "FOOD SUPPLEMENT WITH BERRY FLAVOUR, SUGAR AND SWEETENER"; warning panel with caffeine warning text; bottom text "40 SERVINGS (NET WEIGHT 360Ge)". Label background is dark charcoal with warm orange-gold and bronze paint-splatter grunge texture. Label colors: dark background, white text, orange/amber accents.`,
  },
  {
    id: "creatine_gummies", label: "Creatine Gummies", icon: "🍬", color: "#22d3ee",
    container: "clear transparent wide-mouth cylindrical jar, black ribbed screw lid, filled with blue gummy bears visible through the jar",
    label_desc: `"DEMON LABZ" in small spaced white lettering at top center; "CREATINE" in very large bold white distressed lettering; "GUMMIES" in large bold cracked grunge white type below; cyan/sky-blue rectangular banner reading "RASPBERRY FLAVOUR"; dark banner "FOOD SUPPLEMENT – 3000MG CREATINE HCL PER SERVING"; bottom text "90 VEGAN GUMMIES". Label background is dark near-black with vivid teal/cyan paint-splatter and ink-blot grunge texture. Two blue gummy bears visible outside jar at bottom-right. Label colors: dark background, white text, cyan-teal accents.`,
  },
  {
    id: "shaker", label: "DLZ Shaker", icon: "🥤", color: "#94a3b8",
    container: "semi-transparent white/frosted plastic shaker bottle with black flip-top lid and black carry loop, tapered cylindrical shape wider at top",
    label_desc: `Red rectangular stamp-style logo "DEMON LABZ" at top of label; vertical bold black distressed text reading "RELEASE YOUR INNER" (smaller) above "DEMON" (very large bold cracked grunge type). Text is printed vertically rotated 90 degrees, reading bottom-to-top. Label is printed directly on the frosted white bottle. Colors: white/frosted bottle, black text, red accent logo.`,
  },
  {
    id: "custom", label: "Custom / Other", icon: "✏️", color: "#6b7280",
    container: "", label_desc: "",
  },
];

// ─── Models ──────────────────────────────────────────────────────────────────
const MODELS = [
  { id: "gpt_image_2",   label: "GPT Image 2",                vendor: "openai",       color: "#34d399", icon: "⬡", hasNegative: false, notes: "Natural language prose. Clear descriptive sentences. Inline exclusions (e.g. 'no extra text on label'). No separate negative prompt." },
  { id: "gpt_image_15",  label: "GPT Image 1.5",              vendor: "openai",       color: "#34d399", icon: "⬡", hasNegative: false, notes: "Concise directive prose. Slightly less detail-aware than v2. Inline exclusions. No separate negative prompt." },
  { id: "gemini_31",     label: "Gemini 3.1 (Nano Banana 2)", vendor: "google",       color: "#60a5fa", icon: "G", hasNegative: false, notes: "Structured sections: subject, environment, lighting, mood, camera. Multi-concept handling. Inline exclusions preferred." },
  { id: "gemini_3",      label: "Gemini 3 (Nano Banana Pro)", vendor: "google",       color: "#60a5fa", icon: "G", hasNegative: false, notes: "Photorealistic and cinematic. Layer scene: foreground, midground, background. Emphasize material textures and light." },
  { id: "gemini_25",     label: "Gemini 2.5 (Nano Banana)",   vendor: "google",       color: "#60a5fa", icon: "G", hasNegative: false, notes: "Clear descriptive prompts: scene, subject, lighting, style. Adjective-rich descriptions for materials and atmosphere." },
  { id: "flux2_pro",     label: "FLUX.2 [pro]",               vendor: "black_forest", color: "#fbbf24", icon: "▲", hasNegative: true,  notes: "Keyword+phrase comma-separated. Technical camera specs (lens, aperture). Style qualifiers: 'hyperdetailed', 'cinematic', 'RAW photo'. Supports negative prompt." },
  { id: "flux1_kontext", label: "FLUX.1 Kontext [max]",       vendor: "black_forest", color: "#fbbf24", icon: "▲", hasNegative: true,  notes: "Reference-based generation. Directive language: 'keep label exactly as shown', 'replace background with…'. Best with reference images. Supports negative prompt." },
];

// ─── Aspect Ratios ────────────────────────────────────────────────────────────
const ASPECT_RATIOS = [
  { id: "8:1",  label: "Cinematic banner", ratio: "8:1",  shape: [80, 10] },
  { id: "4:1",  label: "Panorama",         ratio: "4:1",  shape: [80, 20] },
  { id: "21:9", label: "Ultra Wide",       ratio: "21:9", shape: [63, 27] },
  { id: "16:9", label: "Widescreen",       ratio: "16:9", shape: [64, 36] },
  { id: "5:4",  label: "Classic",          ratio: "5:4",  shape: [50, 40] },
  { id: "4:3",  label: "Landscape",        ratio: "4:3",  shape: [52, 39] },
  { id: "3:2",  label: "Wide",             ratio: "3:2",  shape: [54, 36] },
  { id: "1:1",  label: "Square",           ratio: "1:1",  shape: [44, 44] },
  { id: "4:5",  label: "Standard",         ratio: "4:5",  shape: [40, 50] },
  { id: "3:4",  label: "Portrait",         ratio: "3:4",  shape: [36, 48] },
  { id: "2:3",  label: "Tall",             ratio: "2:3",  shape: [30, 45] },
  { id: "9:16", label: "Vertical",         ratio: "9:16", shape: [25, 44] },
  { id: "1:4",  label: "Vert. banner",     ratio: "1:4",  shape: [18, 72] },
  { id: "1:8",  label: "Vert. strip",      ratio: "1:8",  shape: [11, 88] },
];

const RESOLUTIONS = [
  { id: "1k", label: "1K", detail: "1024px",       px: "~1024px on longest edge" },
  { id: "2k", label: "2K", detail: "2048px",       px: "~2048px on longest edge" },
  { id: "3k", label: "3K", detail: "3072px",       px: "~3072px on longest edge" },
  { id: "4k", label: "4K", detail: "4096px / UHD", px: "~4096px on longest edge, ultra high resolution" },
];

// ─── Scene / Angle / Lighting ─────────────────────────────────────────────────
const SCENES = [
  { id: "gym_dark",         label: "Dark Gym",         icon: "🏋️", detail: "moody dark gym interior, blurred heavy iron weight racks, rubber floor, concrete walls, pools of shadow, dark matte rubber surface" },
  { id: "gym_rack",         label: "Weight Rack",      icon: "🔩", detail: "blurred barbell rack with stacked iron plates, industrial gym, overhead strip lighting, raw iron bench surface" },
  { id: "outdoor_fog",      label: "Outdoor / Fog",    icon: "🌫️", detail: "misty forest trail at dawn, low fog rolling through trees, diffused cool natural light, mossy rock surface" },
  { id: "ecomm_clean",      label: "E-comm Clean",     icon: "📦", detail: "pure gradient dark near-black to charcoal background, seamless dark matte surface with subtle product reflection" },
  { id: "nature_forest",    label: "Nature / Forest",  icon: "🌿", detail: "dense green forest canopy, lush vegetation, dappled organic sunlight through leaves, forest floor with ferns and moss" },
  { id: "urban_rooftop",    label: "Urban Rooftop",    icon: "🌆", detail: "city rooftop at golden hour, blurred skyline, warm ambient light, rough concrete surface with city bokeh" },
  { id: "desert_cracked",   label: "Desert / Cracked", icon: "🏜️", detail: "sun-bleached cracked earth desert, heat haze, harsh directional sunlight, raw weathered surface" },
  { id: "ice_cold",         label: "Ice / Cold",       icon: "🧊", detail: "frosted ice surface, condensation droplets, cold blue-white ambient light, crystalline frost texture around product" },
  { id: "smoke_studio",     label: "Smoke / Studio",   icon: "💨", detail: "dark studio with smoke machine wisps, spotlight cutting through haze, near-black background" },
  { id: "neon_underground", label: "Neon Underground",  icon: "🔮", detail: "underground club corridor, neon tube lights in green and cyan, wet reflective floor, urban nightlife atmosphere" },
  { id: "mountain_peak",    label: "Mountain Peak",    icon: "⛰️", detail: "rocky mountain peak at sunrise, dramatic sky, cool crisp air, rugged stone surface, expansive landscape bokeh" },
  { id: "minimalist_white", label: "Minimalist White", icon: "⬜", detail: "pure white seamless studio background, clean soft wrap light, high-key product hero shot" },
];

const ANGLES = [
  { id: "front",         label: "Front",        detail: "straight-on front face, centered, label fully visible and legible" },
  { id: "three_quarter", label: "3/4 Angle",    detail: "slight 3/4 angle showing label and container depth" },
  { id: "hero_low",      label: "Hero Low",     detail: "low camera angle 10–15° from ground, heroic upward perspective" },
  { id: "top_down",      label: "Top Down",     detail: "overhead flat-lay with slight tilt, label fully readable" },
  { id: "side_profile",  label: "Side Profile", detail: "pure side profile 90°, showing container silhouette and lid" },
  { id: "45_above",      label: "45° Above",    detail: "camera 45 degrees above and slightly to the side, balanced view" },
  { id: "worm_eye",      label: "Worm's Eye",   detail: "extreme low angle nearly flush with surface, dramatic upward shot" },
  { id: "dutch_tilt",    label: "Dutch Tilt",   detail: "slight camera roll 10–15°, dynamic tension in composition" },
];

const LIGHTING = [
  { id: "rim_green",    label: "Green Rim",        detail: "strong acid-green rim light from behind-left, glowing product edge" },
  { id: "dramatic_low", label: "Dramatic Low-key", detail: "single key light from below-right, deep cinematic shadows" },
  { id: "studio_soft",  label: "Studio Soft",      detail: "large softbox diffused light, clean even illumination, professional white balance" },
  { id: "neon_moody",   label: "Neon Moody",       detail: "cyan and green neon environmental bounce, urban underground feel" },
  { id: "golden_hour",  label: "Golden Hour",      detail: "warm orange-golden directional sunlight, long soft shadows, magic hour glow" },
  { id: "cold_blue",    label: "Cold Blue",        detail: "cold blue-white moonlight or ice-light, clinical and sharp, cool shadows" },
  { id: "split_tone",   label: "Split Tone",       detail: "two-tone lighting: warm fill one side, cool rim opposite, color tension" },
  { id: "underlighting",label: "Underlighting",    detail: "light source below the product, dramatic upward shadows, mysterious atmosphere" },
  { id: "backlit_halo", label: "Backlit Halo",     detail: "strong backlight creating product silhouette halo, lens flare, dramatic glow" },
  { id: "gobo_pattern", label: "Gobo / Pattern",   detail: "shaped light through venetian blind or leaf gobo, graphic shadow pattern" },
];

const COMPOSITION = [
  { id: "pos_center",  label: "Center",           icon: "⊕", group: "POSITION", detail: "product centered horizontally and vertically in frame" },
  { id: "pos_left",   label: "Left Third",        icon: "⬅", group: "POSITION", detail: "product placed in left third of frame, negative space to the right" },
  { id: "pos_right",  label: "Right Third",       icon: "➡", group: "POSITION", detail: "product placed in right third of frame, negative space to the left" },
  { id: "pos_offset", label: "Foreground Offset", icon: "↗", group: "POSITION", detail: "product placed slightly off-center toward foreground, dynamic tension" },
];

const SLOT_ROLES = {
  style:     { label: "STYLE",       color: "#a78bfa", desc: "Color grade, mood, people & composition — embedded into prompt" },
  product:   { label: "PRODUCT REF", color: "#fbbf24", desc: "Your product — preserves sizing & identity" },
};

// ─── Helpers ─────────────────────────────────────────────────────────────────
function buildBasePrompt(product, customDesc, activeScenes, activeAngles, activeLighting, activeComp, hasProductRef, aspectRatio, resolution, extra) {
  const scenes   = SCENES.filter(s => activeScenes.includes(s.id)).map(s => s.detail).join("; ");
  const lighting = LIGHTING.filter(l => activeLighting.includes(l.id)).map(l => l.detail).join("; ");
  const arStr    = aspectRatio ? `Aspect ratio: ${aspectRatio}.` : "";
  const resStr   = resolution  ? `Output resolution: ${RESOLUTIONS.find(r => r.id === resolution)?.px || resolution}.` : "";

  // ── Standard single product ───────────────────────────────────────────────
  const prod = product.id === "custom"
    ? customDesc || "Demon Labz supplement product"
    : `Demon Labz "${product.label}" — ${product.container}. Label shows: ${product.label_desc}`;
  const angles   = ANGLES.filter(a => activeAngles.includes(a.id)).map(a => a.detail).join("; ");
  const posComp   = activeComp.filter(c => COMPOSITION.find(x => x.id === c)?.group === "POSITION");
  const posDetail = COMPOSITION.filter(c => posComp.includes(c.id)).map(c => c.detail).join("; ");
  const sizingBlock = hasProductRef
    ? `CRITICAL SIZING RULE — PRODUCT REFERENCE UPLOADED: The product MUST match the exact physical scale shown in the product reference image. Do NOT enlarge the product. Do NOT make it fill the frame. Do NOT hero-crop. Treat the reference image as ground truth for scale.`
    : `CRITICAL SIZING RULE: The product must NOT fill the frame or appear oversized. It must appear at natural real-world scale. The product should occupy at most 50–60% of frame height unless a specific proportion is set.`;
  const posBlock = posDetail ? `POSITION: ${posDetail}.` : "";
  return [
    `Professional commercial product photography of ${prod}.`,
    product.id !== "custom" ? `The product label text, colors, typography, and design are 100% preserved, sharp, and legible — do not alter, distort, or regenerate any label elements.` : "",
    sizingBlock,
    posBlock,
    scenes   ? `SCENE: ${scenes}.` : "",
    angles   ? `ANGLE: ${angles}.` : "",
    lighting ? `LIGHTING: ${lighting}.` : "",
    arStr, resStr,
    extra ? `ADDITIONAL: ${extra}.` : "",
    `Photorealistic commercial product photography, 85mm lens equivalent, shallow depth of field f/2.8, crisp product in sharp focus, background softly blurred. Hyperdetailed label texture. No text hallucination. No warped packaging.`,
  ].filter(Boolean).join(" ");
}
function buildNegative() {
  return "distorted text, blurry label, changed logo, altered packaging, wrong colors, deformed container, extra objects, watermark, low quality, oversaturated, duplicate products, warped letters, missing text, product too large, product filling entire frame, hero crop, oversized product, product occupying more than 80% of frame, extreme close-up of product, product touching frame edges, product scaled up, zoomed in product, macro product shot";
}
function fileToBase64(file) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result.split(",")[1]); r.onerror = rej; r.readAsDataURL(file); });
}
function fileToDataUrl(file) {
  return new Promise((res, rej) => { const r = new FileReader(); r.onload = () => res(r.result); r.onerror = rej; r.readAsDataURL(file); });
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionHeader({ label, color, count, total }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "7px", marginBottom: "8px" }}>
      <span style={{ fontSize: "9.5px", fontWeight: "700", letterSpacing: "0.12em", color }}>{label}</span>
      {total != null && <span style={{ fontSize: "9px", color: T.textFaint }}>{count}/{total}</span>}
    </div>
  );
}

function ToggleChip({ item, active, onToggle, accentColor }) {
  return (
    <div style={{
      display: "flex", alignItems: "stretch",
      border: `1px solid ${active ? accentColor + "88" : T.border}`,
      borderRadius: "6px", overflow: "hidden", marginBottom: "3px",
      background: active ? accentColor + "14" : T.chipOff,
      transition: "all 0.12s", boxShadow: active ? "none" : T.shadow,
    }}>
      <div style={{ flex: 1, padding: "6px 8px", fontSize: "11px", color: active ? T.text : T.textMid, display: "flex", alignItems: "center", gap: "5px", transition: "color 0.12s" }}>
        {item.icon && <span style={{ fontSize: "12px" }}>{item.icon}</span>}
        <span>{item.label}</span>
      </div>
      <button onClick={onToggle} style={{
        padding: "0 10px", minWidth: "40px", flexShrink: 0,
        background: active ? accentColor : T.btnOff,
        border: "none", borderLeft: `1px solid ${active ? accentColor + "66" : T.border}`,
        color: active ? "#fff" : T.btnOffTxt,
        fontSize: "9px", fontWeight: "700", letterSpacing: "0.06em",
        cursor: "pointer", transition: "all 0.12s",
      }}>{active ? "ON" : "OFF"}</button>
    </div>
  );
}

function ImageSlot({ role, image, onUpload, onClear }) {
  const ref = useRef();
  const cfg = SLOT_ROLES[role];
  const onDrop = useCallback(e => { e.preventDefault(); const f = e.dataTransfer.files[0]; if (f && f.type.startsWith("image/")) onUpload(f); }, [onUpload]);
  return (
    <div style={{ flex: 1 }}>
      <div style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.12em", color: cfg.color, marginBottom: "3px" }}>{cfg.label}</div>
      <div style={{ fontSize: "8.5px", color: T.textFaint, marginBottom: "6px" }}>{cfg.desc}</div>
      {image ? (
        <div style={{ position: "relative" }}>
          <img src={image.dataUrl} alt={role} style={{ width: "100%", height: "100px", objectFit: "cover", borderRadius: "6px", border: `1px solid ${cfg.color}44`, display: "block" }} />
          <button onClick={onClear} style={{ position: "absolute", top: "4px", right: "4px", background: "#00000099", border: "none", borderRadius: "50%", width: "17px", height: "17px", color: "#fff", fontSize: "9px", cursor: "pointer", display: "flex", alignItems: "center", justifyContent: "center" }}>✕</button>
          <div style={{ position: "absolute", bottom: "4px", left: "4px", background: "#000000bb", borderRadius: "3px", padding: "1px 5px", fontSize: "7.5px", color: "#fff" }}>{image.name.length > 13 ? image.name.slice(0, 11) + "…" : image.name}</div>
        </div>
      ) : (
        <div onDrop={onDrop} onDragOver={e => e.preventDefault()} onClick={() => ref.current.click()}
          style={{ height: "100px", border: `1.5px dashed ${cfg.color}55`, borderRadius: "6px", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", cursor: "pointer", background: T.input, gap: "4px", transition: "border-color 0.12s" }}>
          <div style={{ fontSize: "20px", color: cfg.color, opacity: 0.35 }}>+</div>
          <div style={{ fontSize: "8px", color: T.textFaint }}>Drop or click</div>
        </div>
      )}
      <input ref={ref} type="file" accept="image/*" style={{ display: "none" }} onChange={e => { if (e.target.files[0]) onUpload(e.target.files[0]); }} />
    </div>
  );
}

function SideCard({ color, icon, label, sublabel, selected, onClick }) {
  return (
    <div onClick={onClick} style={{
      padding: "8px 10px", borderRadius: "7px", cursor: "pointer", marginBottom: "3px",
      border: `1px solid ${selected ? color + "88" : T.border}`,
      background: selected ? color + "12" : T.chipOff,
      transition: "all 0.12s", display: "flex", alignItems: "center", gap: "8px",
      boxShadow: selected ? "none" : T.shadow,
    }}>
      <div style={{
        width: "24px", height: "24px", borderRadius: "5px", flexShrink: 0,
        background: selected ? color : T.btnOff,
        display: "flex", alignItems: "center", justifyContent: "center",
        fontSize: "13px", transition: "all 0.12s",
        boxShadow: selected ? `0 1px 4px ${color}55` : "none",
      }}>{icon}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: "10.5px", color: selected ? T.text : T.textMid, fontWeight: selected ? "600" : "400", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{label}</div>
        {selected && sublabel && <div style={{ fontSize: "7.5px", color, marginTop: "1px", opacity: 0.8 }}>{sublabel}</div>}
      </div>
      <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: selected ? color : T.borderMd, flexShrink: 0, transition: "all 0.12s" }} />
    </div>
  );
}

function RatioBox({ shape, active, color }) {
  const [w, h] = shape;
  const maxW = 34, maxH = 26;
  const scale = Math.min(maxW / w, maxH / h);
  const bw = Math.round(w * scale), bh = Math.round(h * scale);
  return (
    <div style={{ width: maxW, height: maxH, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
      <div style={{ width: bw, height: bh, border: `1.5px solid ${active ? color : T.borderMd}`, borderRadius: "2px", background: active ? color + "18" : "transparent", transition: "all 0.12s" }} />
    </div>
  );
}

// ─── App ─────────────────────────────────────────────────────────────────────
export default function App() {
  const [selectedProduct, setSelectedProduct] = useState("super_greens");
  const [customDesc,      setCustomDesc]      = useState("");
  const [selectedModel,   setSelectedModel]   = useState("flux2_pro");
  const [activeScenes,    setActiveScenes]    = useState(["gym_dark"]);
  const [activeAngles,    setActiveAngles]    = useState(["three_quarter"]);
  const [activeLighting,  setActiveLighting]  = useState(["rim_green"]);
  const [activeComp,      setActiveComp]      = useState([]);
  const [aspectRatio,     setAspectRatio]     = useState("16:9");
  const [customRatio,     setCustomRatio]     = useState("");
  const [useCustomRatio,  setUseCustomRatio]  = useState(false);
  const [resolution,      setResolution]      = useState("2k");
  const [extra,           setExtra]           = useState("");
  // ── Scale guide state ──
  const [scaleGuideOpen,  setScaleGuideOpen]  = useState(false);
  const [amazonPreset,    setAmazonPreset]    = useState(null);
  const [productBox,      setProductBox]      = useState({ x: 30, y: 20, w: 40, h: 60 }); // % of canvas
  const [dragging,        setDragging]        = useState(null); // {type:'move'|'resize', startX, startY, startBox}
  const scaleCanvasRef = useRef(null);
  const [loading,         setLoading]         = useState(false);
  const [result,          setResult]          = useState(null);
  const [copied,          setCopied]          = useState(null);
  const [images,          setImages]          = useState({ style: null, product: null });
  const [leftTab,         setLeftTab]         = useState("product");
  const [history,         setHistory]         = useState([]);
  const [historyLoaded,   setHistoryLoaded]   = useState(false);
  const [expandedEntry,   setExpandedEntry]   = useState(null);

  // ── LoRA state ──
  const [loraEnabled,   setLoraEnabled]   = useState(false);
  const [loraTrigger,   setLoraTrigger]   = useState("");
  const [loraWeight,    setLoraWeight]    = useState(0.8);
  const [loraPlatform,  setLoraPlatform]  = useState("comfyui");

  // ── Dataset state ──
  const [datasetEnabled,  setDatasetEnabled]  = useState(false);
  const [datasetProduct,  setDatasetProduct]  = useState("super_greens");
  const [datasetResult,   setDatasetResult]   = useState(null);
  const [datasetLoading,  setDatasetLoading]  = useState(false);
  const [datasetCopied,   setDatasetCopied]   = useState(null);

  // Load history from storage on mount
  useEffect(() => {
    async function loadHistory() {
      try {
        const stored = await window.storage?.get("dlz:prompt-history");
        if (stored?.value) setHistory(JSON.parse(stored.value));
      } catch { /* no history yet */ }
      setHistoryLoaded(true);
    }
    loadHistory();
  }, []);

  // Persist history whenever it changes
  useEffect(() => {
    if (!historyLoaded) return;
    window.storage?.set("dlz:prompt-history", JSON.stringify(history))?.catch(() => {});
  }, [history, historyLoaded]);

  function saveToHistory(entry) {
    setHistory(prev => {
      const updated = [entry, ...prev].slice(0, 30); // keep last 30
      return updated;
    });
  }

  function deleteHistoryEntry(id) {
    setHistory(prev => prev.filter(e => e.id !== id));
  }

  function loadFromHistory(entry) {
    setSelectedProduct(entry.product);
    setSelectedModel(entry.model);
    setActiveScenes(entry.scenes);
    setActiveAngles(entry.angles);
    setActiveLighting(entry.lighting);
    setActiveComp(entry.comp);
    setAspectRatio(entry.ratio);
    setUseCustomRatio(false);
    setResolution(entry.resolution);
    setExtra(entry.extra || "");
    setResult({ positive: entry.positive, negative: entry.negative || "", image_analysis: "" });
    setLeftTab("product");
  }

  function buildLoraSyntax() {
    const t = loraTrigger.trim();
    const w = loraWeight.toFixed(2);
    if (!t) return "";
    switch (loraPlatform) {
      case "comfyui":   return `<lora:${t}:${w}>`;
      case "a1111":     return `<lora:${t}:${w}>`;
      case "fal":       return `lora_trigger:${t}, lora_weight:${w}`;
      case "replicate": return `[lora: ${t}, ${w}]`;
      default:          return `<lora:${t}:${w}>`;
    }
  }

  async function handleGenerateDataset() {
    const prod = PRODUCTS.find(p => p.id === datasetProduct);
    if (!prod || prod.id === "custom") return;
    setDatasetLoading(true); setDatasetResult(null);
    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1500,
          messages: [{ role: "user", content:
`You are an expert in LoRA training dataset preparation for AI image models (Stable Diffusion / FLUX).
Generate a complete dataset preparation guide for this product:
PRODUCT: ${prod.label}
CONTAINER: ${prod.container}
LABEL: ${prod.label_desc}
Return ONLY valid JSON, no markdown, no backticks:
{"trigger_word":"short unique lowercase no-spaces word e.g. dlzsupergreens","total_images":number,"shot_list":[{"angle":"name","count":number,"notes":"lighting/setup","caption":"full training caption starting with trigger word"}],"caption_format":"template with [TRIGGER] placeholder","training_notes":"2-3 sentences on settings for this product type"}`
          }],
        }),
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();
      const text = data.content?.map(b => b.text || "").join("") || "";
      setDatasetResult(JSON.parse(text.replace(/```json|```/g, "").trim()));
    } catch (err) {
      setDatasetResult({ error: err.message });
    }
    setDatasetLoading(false);
  }

  function copyDataset(text, key) {
    navigator.clipboard.writeText(text);
    setDatasetCopied(key);
    setTimeout(() => setDatasetCopied(null), 2000);
  }

  const finalRatio = useCustomRatio ? customRatio : aspectRatio;
  const product    = PRODUCTS.find(p => p.id === selectedProduct);
  const model      = MODELS.find(m => m.id === selectedModel);

  function toggle(setter, id) { setter(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]); setResult(null); }

  async function handleUpload(role, file) {
    const [dataUrl, base64] = await Promise.all([fileToDataUrl(file), fileToBase64(file)]);
    setImages(prev => ({ ...prev, [role]: { dataUrl, base64, name: file.name, type: file.type } }));
    setResult(null);
  }
  function clearImage(role) { setImages(prev => ({ ...prev, [role]: null })); setResult(null); }
  function copyText(text, key) {
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
      }).catch(() => {
        // fallback
        const el = document.createElement("textarea");
        el.value = text;
        el.style.position = "fixed";
        el.style.opacity = "0";
        document.body.appendChild(el);
        el.focus();
        el.select();
        document.execCommand("copy");
        document.body.removeChild(el);
        setCopied(key);
        setTimeout(() => setCopied(null), 2000);
      });
    } else {
      const el = document.createElement("textarea");
      el.value = text;
      el.style.position = "fixed";
      el.style.opacity = "0";
      document.body.appendChild(el);
      el.focus();
      el.select();
      document.execCommand("copy");
      document.body.removeChild(el);
      setCopied(key);
      setTimeout(() => setCopied(null), 2000);
    }
  }

  const abortRef = useRef(null);

  const basePrompt  = buildBasePrompt(product, customDesc, activeScenes, activeAngles, activeLighting, activeComp, !!images.product, finalRatio, resolution, extra);
  const negative    = buildNegative();
  const imgCount    = Object.values(images).filter(Boolean).length;
  const selCount    = activeScenes.length + activeAngles.length + activeLighting.length + activeComp.length;
  const canGenerate = selCount > 0 && (product.id !== "custom" || customDesc.trim().length > 0);

  async function handleGenerate() {
    setLoading(true); setResult(null);
    abortRef.current = new AbortController();
    const contentParts = [];

    // Style image
    if (images.style) {
      contentParts.push({ type: "text", text: "[STYLE IMAGE — extract color palette, mood, grain, aesthetic tone]" });
      contentParts.push({ type: "image", source: { type: "base64", media_type: images.style.type, data: images.style.base64 } });
    }
    // Product ref image — most important for sizing/identity
    if (images.product) {
      contentParts.push({ type: "text", text: "[PRODUCT REFERENCE IMAGE — this is the actual product. Preserve exact proportions, sizing relative to frame, label design, container shape, and visual identity. Use this as the ground truth for the product appearance.]" });
      contentParts.push({ type: "image", source: { type: "base64", media_type: images.product.type, data: images.product.base64 } });
    }

    const hasImages = imgCount > 0;
    const compSummary = activeComp.length > 0
      ? `COMPOSITION CONTROLS ACTIVE: ${COMPOSITION.filter(c => activeComp.includes(c.id)).map(c => `${c.group}: ${c.label}`).join(", ")}.`
      : "";

    const hasMatchStyle = activeComp.includes("prop_match_style") && images.style;
    const scaleConstraint = scaleGuideOpen
      ? `SCALE GUIDE ACTIVE — HARD SIZING CONSTRAINT: ${buildScaleOutput().prompt}`
      : "";
    const loraNote = loraEnabled && loraTrigger.trim()
      ? `LORA ACTIVE: Trigger word "${loraTrigger.trim()}" weight ${loraWeight.toFixed(2)} (${loraPlatform}). Place trigger word at the very start of positive prompt. Append this syntax at end: ${buildLoraSyntax()}`
      : "";

    contentParts.push({ type: "text", text:
`You are an expert AI image prompt engineer.
TARGET MODEL: ${model.label}
MODEL GUIDANCE: ${model.notes}
PRODUCT: ${product.label}
ASPECT RATIO: ${finalRatio || "not specified"}
RESOLUTION: ${resolution ? RESOLUTIONS.find(r => r.id === resolution)?.px : "not specified"}
${compSummary}
${scaleConstraint}
${loraNote}
${images.product ? `PRODUCT REFERENCE IMAGE UPLOADED: You must analyze the uploaded product reference image and measure the product's scale relative to the frame. Estimate the product height as a percentage of the total image height. This exact percentage MUST be replicated in the generated image. Write the sizing constraint explicitly into the prompt using a specific percentage (e.g. "product occupies approximately 45% of frame height"). Do not increase this scale. Do not make the product larger than it appears in the reference.` : ""}

HARD SIZING CONSTRAINT: AI image generators default to filling the frame with the product. This is WRONG. Write explicit, numerical size constraints into the prompt. Use phrases like "product height is 40% of frame height", "wide-angle establishing shot with product small in frame". Vague phrases like "natural proportions" DO NOT WORK — use hard numbers and camera distance language.

${hasMatchStyle ? `STYLE REF PROPORTION: Analyze the style reference image. Measure the product-to-frame ratio. Write this exact ratio as a hard numerical constraint in the prompt (e.g. "product occupies 35% of frame height, centered, with 65% visible background").` : ""}

CRITICAL STYLE INSTRUCTION: ${images.style
  ? `A STYLE reference image has been provided. Extract and embed DIRECTLY into the positive prompt body:
  - Exact color palette and dominant tones (name colors specifically)
  - Color grading style (desaturated, high contrast, warm/cool tint, faded, punchy, etc.)
  - Film grain, texture, or noise level
  - Overall mood and atmosphere
  - Lighting quality (hard/soft, directional, ambient ratio)
  - Any visual treatment (cinematic, editorial, commercial, raw, analog)
  - Product's size relative to frame — replicate this as a hard percentage
  - HUMAN ELEMENTS: If the style image contains a person or people, you MUST describe them as compositional elements and include them in the prompt. Describe: body framing (full body / torso / hands only), pose and posture, camera distance relative to subject, clothing tone and style (dark/light, fitted/loose, athletic/casual), skin tone in relation to lighting, and the spatial relationship between the person and the product (holding it, beside it, in background, etc.). Do NOT identify or name anyone — describe only visual and compositional attributes. The generated image should contain a person with matching characteristics in the same compositional role.
  Weave all of these naturally into the prompt body, not as a separate appended note.`
  : `No style image provided. Use scene and lighting selections to define visual tone.`}

Rewrite the base prompt optimized for ${model.label}. The single most important thing is that the generated prompt contains EXPLICIT NUMERICAL SIZE CONSTRAINTS for the product scale. Do not use vague language. Write "product height = X% of frame" or "shot from Y meters distance" — concrete, measurable terms. Then preserve label and packaging details exactly.

${model.hasNegative
  ? `Return ONLY valid JSON: {"positive":"...","negative":"...","image_analysis":"${hasImages ? "per-image: what scale % was measured from product ref, what style qualities were extracted" : ""}"}`
  : `Return ONLY valid JSON: {"positive":"...","negative":"","image_analysis":"${hasImages ? "per-image: what scale % was measured from product ref, what style qualities were extracted" : ""}"}`}
No markdown, no backticks.
BASE PROMPT: ${basePrompt}
NEGATIVE (ref only): ${buildNegative()}` });

    try {
      const res = await fetch("/api/claude", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: "claude-sonnet-4-6", max_tokens: 1500, messages: [{ role: "user", content: contentParts }] }),
        signal: abortRef.current.signal,
      });

      // HTTP-level error
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const code    = errBody?.error?.type || `HTTP ${res.status}`;
        const msg     = errBody?.error?.message || res.statusText;
        throw new Error(`API error [${code}]: ${msg}`);
      }

      const data = await res.json();

      // API returned an error object
      if (data.error) {
        throw new Error(`Anthropic error [${data.error.type}]: ${data.error.message}`);
      }

      // Empty response
      const rawText = data.content?.map(b => b.text || "").join("") || "";
      if (!rawText.trim()) {
        throw new Error("Empty response from API — model returned no content. Try again.");
      }

      // JSON parse
      let parsed;
      try {
        parsed = JSON.parse(rawText.replace(/```json|```/g, "").trim());
      } catch {
        throw new Error(`JSON parse failed — model returned unexpected format. Raw: "${rawText.slice(0, 120)}…"`);
      }

      // Missing positive prompt
      if (!parsed.positive) {
        throw new Error("Response parsed but missing 'positive' field. Try regenerating.");
      }

      setResult(parsed);

      // ── Save to history ──
      saveToHistory({
        id:        Date.now(),
        ts:        new Date().toLocaleString("el-GR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" }),
        product:   selectedProduct,
        model:     selectedModel,
        scenes:    activeScenes,
        angles:    activeAngles,
        lighting:  activeLighting,
        comp:      activeComp,
        ratio:     finalRatio,
        resolution,
        extra,
        positive:  parsed.positive,
        negative:  parsed.negative || "",
        imgCount,
      });

    } catch (err) {
      if (err.name === "AbortError") {
        // User stopped — clear loading silently, no error shown
        setLoading(false);
        return;
      }
      setResult({
        positive: basePrompt,
        negative: model.hasNegative ? buildNegative() : "",
        error: err.message || "Unknown error — check console.",
        isError: true,
      });
    }
    setLoading(false);
  }

  function handleStop() {
    if (abortRef.current) {
      abortRef.current.abort();
      abortRef.current = null;
    }
    setLoading(false);
  }

  // ── Scale guide helpers ──
  function getCanvasRect() {
    return scaleCanvasRef.current?.getBoundingClientRect() || { width: 1, height: 1, left: 0, top: 0 };
  }

  function onCanvasMouseDown(e) {
    const rect  = getCanvasRect();
    const mx    = ((e.clientX - rect.left) / rect.width)  * 100;
    const my    = ((e.clientY - rect.top)  / rect.height) * 100;
    const b     = productBox;
    const onRight  = mx >= b.x + b.w - 4 && mx <= b.x + b.w + 4;
    const onBottom = my >= b.y + b.h - 4 && my <= b.y + b.h + 4;
    const inside   = mx >= b.x && mx <= b.x + b.w && my >= b.y && my <= b.y + b.h;
    if (onRight || onBottom) {
      setDragging({ type: "resize", startX: mx, startY: my, startBox: { ...b } });
    } else if (inside) {
      setDragging({ type: "move",   startX: mx, startY: my, startBox: { ...b } });
    }
  }

  function onCanvasMouseMove(e) {
    if (!dragging) return;
    const rect = getCanvasRect();
    const mx   = ((e.clientX - rect.left) / rect.width)  * 100;
    const my   = ((e.clientY - rect.top)  / rect.height) * 100;
    const dx   = mx - dragging.startX;
    const dy   = my - dragging.startY;
    const sb   = dragging.startBox;
    if (dragging.type === "move") {
      setProductBox({
        ...sb,
        x: Math.max(0, Math.min(100 - sb.w, sb.x + dx)),
        y: Math.max(0, Math.min(100 - sb.h, sb.y + dy)),
      });
    } else {
      setProductBox({
        ...sb,
        w: Math.max(5, Math.min(100 - sb.x, sb.w + dx)),
        h: Math.max(5, Math.min(100 - sb.y, sb.h + dy)),
      });
    }
  }

  function buildScaleOutput() {
    const b       = productBox;
    const wPct    = Math.round(b.w);
    const hPct    = Math.round(b.h);
    const xPct    = Math.round(b.x + b.w / 2);
    const yPct    = Math.round(b.y + b.h / 2);
    const resPx   = { "1k": 1024, "2k": 2048, "3k": 3072, "4k": 4096 }[resolution] || 2048;
    // Compute actual pixel dims based on aspect ratio
    const [arW, arH] = (finalRatio || "1:1").split(":").map(Number);
    const ratio    = arW / arH;
    let canvasW, canvasH;
    if (ratio >= 1) { canvasW = resPx; canvasH = Math.round(resPx / ratio); }
    else            { canvasH = resPx; canvasW = Math.round(resPx * ratio); }
    const pxW = Math.round(canvasW * b.w / 100);
    const pxH = Math.round(canvasH * b.h / 100);
    const pxX = Math.round(canvasW * b.x / 100);
    const pxY = Math.round(canvasH * b.y / 100);

    const posLabel = xPct < 38 ? "left third" : xPct > 62 ? "right third" : "center";
    const vertLabel = yPct < 40 ? "upper" : yPct > 60 ? "lower" : "middle";

    return {
      prompt: `Product occupies ${wPct}% of frame width and ${hPct}% of frame height. Product is positioned at ${posLabel} of the frame, ${vertLabel} area. Product top-left corner at ${Math.round(b.x)}% from left, ${Math.round(b.y)}% from top. Camera distance and focal length must produce this exact product scale.`,
      composite: `Canvas: ${canvasW}×${canvasH}px. Place product PNG at X:${pxX}px Y:${pxY}px, sized ${pxW}×${pxH}px.`,
      wPct, hPct, pxW, pxH, canvasW, canvasH,
    };
  }

  const tabStyle = (active) => ({
    flex: 1, padding: "7px", fontSize: "9px", fontWeight: "700", letterSpacing: "0.1em",
    background: active ? T.surfaceB : T.surface,
    border: "none", borderBottom: `2px solid ${active ? "#444" : "transparent"}`,
    color: active ? T.text : T.textFaint, cursor: "pointer", transition: "all 0.12s",
  });

  const arColor  = T.arColor;
  const resColor = T.resColor;

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'Inter', system-ui, sans-serif" }}>

      {/* ── Header ── */}
      <div style={{ borderBottom: `1px solid ${T.divider}`, padding: "12px 20px", display: "flex", alignItems: "center", gap: "10px", background: T.surface, boxShadow: T.shadow }}>
        <div style={{ width: "30px", height: "30px", background: "linear-gradient(135deg, #7f1d1d, #ef4444)", borderRadius: "7px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "17px", boxShadow: "0 2px 6px #ef444444" }}>😈</div>
        <div>
          <div style={{ fontSize: "12px", fontWeight: "700", letterSpacing: "0.05em", color: T.text }}>DEMON LABZ — IMAGE GEN TOOL</div>
          <div style={{ fontSize: "8px", color: T.textFaint, letterSpacing: "0.1em", marginTop: "1px" }}>v8 · MULTI-PRODUCT · MULTI-MODEL · ASPECT RATIO · RESOLUTION</div>
        </div>
        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: "10px" }}>
          <span style={{ fontSize: "9px", color: product.color, fontWeight: "700" }}>{product.icon} {product.label}</span>
          <div style={{ width: "1px", height: "12px", background: T.divider }} />
          <span style={{ fontSize: "9px", color: model.color, fontWeight: "600" }}>{model.icon} {model.label}</span>
          <div style={{ width: "1px", height: "12px", background: T.divider }} />
          <span style={{ fontSize: "9px", color: arColor, fontWeight: "600" }}>{finalRatio || "—"} · {RESOLUTIONS.find(r => r.id === resolution)?.label || "—"}</span>
        </div>
      </div>

      {/* ── Layout ── */}
      <div style={{ display: "flex", maxWidth: "1180px", margin: "0 auto" }}>

        {/* ── Sidebar: vertical nav rail + panel ── */}
        <div style={{ display: "flex", flexShrink: 0, borderRight: `1px solid ${T.divider}`, minHeight: "calc(100vh - 54px)" }}>

          {/* ── Nav rail ── */}
          <div style={{ width: "48px", background: T.bg, borderRight: `1px solid ${T.divider}`, display: "flex", flexDirection: "column", alignItems: "center", paddingTop: "10px", gap: "4px" }}>
            {[
              { id: "product", icon: "📦", label: "PRODUCT", dot: null },
              { id: "model",   icon: "🤖", label: "MODEL",   dot: null },
              { id: "lora",    icon: "⚙",  label: "LORA",    dot: loraEnabled ? "#f59e0b" : null },
              { id: "dataset", icon: "📁", label: "DATA",    dot: datasetEnabled ? "#22d3ee" : null },
              { id: "history", icon: "🕐", label: "HISTORY", dot: history.length > 0 ? "#ef4444" : null },
            ].map(nav => {
              const isActive = leftTab === nav.id;
              return (
                <div key={nav.id} title={nav.label} onClick={() => setLeftTab(nav.id)}
                  style={{ position: "relative", width: "36px", height: "36px", borderRadius: "8px", display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", fontSize: "15px", background: isActive ? T.surfaceB : "transparent", border: `1px solid ${isActive ? T.borderMd : "transparent"}`, transition: "all 0.12s" }}>
                  {nav.icon}
                  {nav.dot && <div style={{ position: "absolute", top: "5px", right: "5px", width: "6px", height: "6px", borderRadius: "50%", background: nav.dot }} />}
                </div>
              );
            })}
          </div>

          {/* ── Panel ── */}
          <div style={{ width: "186px", background: T.surface, display: "flex", flexDirection: "column" }}>
            <div style={{ padding: "9px 12px 8px", borderBottom: `1px solid ${T.divider}`, flexShrink: 0 }}>
              <div style={{ fontSize: "8.5px", fontWeight: "700", letterSpacing: "0.12em", color: T.textFaint }}>
                {{ product: "DEMON LABZ SKU", model: "TARGET MODEL", lora: "LORA", dataset: "DATASET PREP", history: "SAVED PROMPTS" }[leftTab]}
              </div>
            </div>
            <div style={{ padding: "12px", flex: 1, overflowY: "auto" }}>

            {leftTab === "product" ? (
              <>
                <div style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.12em", color: T.textFaint, marginBottom: "9px" }}>DEMON LABZ SKU</div>
                {PRODUCTS.map(p => (
                  <SideCard key={p.id} color={p.color} icon={p.icon} label={p.label}
                    sublabel={p.id !== "custom" ? p.container.slice(0, 28) + "…" : undefined}
                    selected={selectedProduct === p.id}
                    onClick={() => { setSelectedProduct(p.id); setResult(null); }} />
                ))}
                {selectedProduct === "custom" && (
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ fontSize: "8px", fontWeight: "700", color: T.textFaint, marginBottom: "5px", letterSpacing: "0.1em" }}>PRODUCT DESCRIPTION</div>
                    <textarea value={customDesc} onChange={e => { setCustomDesc(e.target.value); setResult(null); }}
                      placeholder="Container type, size, label colors, text, key design elements…" rows={5}
                      style={{ width: "100%", boxSizing: "border-box", background: T.input, border: `1px solid ${T.borderMd}`, borderRadius: "5px", padding: "7px 9px", color: T.text, fontSize: "10px", outline: "none", resize: "vertical", lineHeight: "1.5", fontFamily: "inherit" }} />
                  </div>
                )}
                {selectedProduct !== "custom" && (
                  <div style={{ marginTop: "10px", padding: "8px 10px", background: product.color + "0e", border: `1px solid ${product.color}33`, borderRadius: "5px" }}>
                    <div style={{ fontSize: "7.5px", color: product.color, fontWeight: "700", letterSpacing: "0.08em", marginBottom: "3px" }}>CONTAINER</div>
                    <div style={{ fontSize: "8.5px", color: T.textMid, lineHeight: "1.5" }}>{product.container}</div>
                  </div>
                )}
              </>
            ) : leftTab === "model" ? (
              <>
                <div style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.12em", color: T.textFaint, marginBottom: "9px" }}>TARGET MODEL</div>
                {MODELS.map(m => (
                  <SideCard key={m.id} color={m.color} icon={m.icon} label={m.label}
                    sublabel={m.hasNegative ? "POS + NEG" : "INLINE"}
                    selected={selectedModel === m.id}
                    onClick={() => { setSelectedModel(m.id); setResult(null); }} />
                ))}
                <div style={{ marginTop: "10px", padding: "8px 10px", background: model.color + "0e", border: `1px solid ${model.color}33`, borderRadius: "5px" }}>
                  <div style={{ fontSize: "7.5px", color: model.color, fontWeight: "700", letterSpacing: "0.08em", marginBottom: "3px" }}>MODEL TIP</div>
                  <div style={{ fontSize: "8.5px", color: T.textMid, lineHeight: "1.5" }}>{model.notes}</div>
                </div>
              </>
            ) : leftTab === "lora" ? (
              /* ── LORA TAB ── */
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.12em", color: T.textFaint }}>LORA SETTINGS</span>
                  <button onClick={() => setLoraEnabled(v => !v)} style={{
                    padding: "3px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "8px", fontWeight: "700",
                    background: loraEnabled ? "#f59e0b" : T.chipOff,
                    border: `1px solid ${loraEnabled ? "#f59e0b" : T.border}`,
                    color: loraEnabled ? "#000" : T.btnOffTxt,
                    transition: "all 0.15s",
                  }}>{loraEnabled ? "ON" : "OFF"}</button>
                </div>

                {/* Status banner */}
                {!loraEnabled ? (
                  <div style={{ padding: "8px 10px", background: T.chipOff, border: `1px solid ${T.border}`, borderRadius: "6px", fontSize: "8.5px", color: T.textFaint, marginBottom: "12px", lineHeight: "1.5" }}>
                    LoRA is OFF — toggle ON to inject trigger word &amp; syntax into generated prompts.
                  </div>
                ) : !loraTrigger.trim() ? (
                  <div style={{ padding: "8px 10px", background: "#431407", border: "1px solid #f59e0b44", borderRadius: "6px", fontSize: "8.5px", color: "#fbbf24", marginBottom: "12px", lineHeight: "1.5" }}>
                    ⚠ Train your LoRA first — then add the trigger word below.
                  </div>
                ) : (
                  <div style={{ padding: "8px 10px", background: "#f59e0b11", border: "1px solid #f59e0b33", borderRadius: "6px", fontSize: "8.5px", color: "#f59e0b", marginBottom: "12px", lineHeight: "1.5", fontFamily: "monospace" }}>
                    ✦ {buildLoraSyntax()}
                  </div>
                )}

                {/* Trigger word */}
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.1em", color: "#f59e0b", marginBottom: "5px" }}>TRIGGER WORD</div>
                  <input
                    value={loraTrigger}
                    onChange={e => setLoraTrigger(e.target.value)}
                    placeholder="e.g. dlzsupergreens"
                    style={{ width: "100%", boxSizing: "border-box", background: T.input, border: `1px solid ${loraTrigger.trim() ? "#f59e0b55" : T.borderMd}`, borderRadius: "5px", padding: "7px 9px", color: T.text, fontSize: "11px", outline: "none", fontFamily: "monospace" }}
                  />
                </div>

                {/* Weight slider */}
                <div style={{ marginBottom: "12px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "6px" }}>
                    <span style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.1em", color: "#f59e0b" }}>WEIGHT</span>
                    <span style={{ fontSize: "11px", fontWeight: "700", color: T.text, fontFamily: "monospace" }}>{loraWeight.toFixed(2)}</span>
                  </div>
                  <input type="range" min="0.1" max="1.5" step="0.05" value={loraWeight}
                    onChange={e => setLoraWeight(parseFloat(e.target.value))}
                    style={{ width: "100%", accentColor: "#f59e0b", cursor: "pointer" }} />
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "7.5px", color: T.textFaint, marginTop: "3px" }}>
                    <span>0.1 subtle</span><span>0.8 std</span><span>1.5 strong</span>
                  </div>
                </div>

                {/* Platform */}
                <div style={{ marginBottom: "10px" }}>
                  <div style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.1em", color: "#f59e0b", marginBottom: "6px" }}>PLATFORM</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                    {[
                      { id: "comfyui",   label: "ComfyUI",   syntax: "<lora:name:w>" },
                      { id: "a1111",     label: "Automatic1111", syntax: "<lora:name:w>" },
                      { id: "fal",       label: "Fal.ai",    syntax: "lora_trigger:name" },
                      { id: "replicate", label: "Replicate", syntax: "[lora: name, w]" },
                    ].map(p => (
                      <div key={p.id} onClick={() => setLoraPlatform(p.id)}
                        style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "6px 9px", borderRadius: "5px", cursor: "pointer", border: `1px solid ${loraPlatform === p.id ? "#f59e0b66" : T.border}`, background: loraPlatform === p.id ? "#f59e0b11" : T.chipOff, transition: "all 0.12s" }}>
                        <span style={{ fontSize: "10px", fontWeight: loraPlatform === p.id ? "700" : "400", color: loraPlatform === p.id ? "#f59e0b" : T.textMid }}>{p.label}</span>
                        <span style={{ fontSize: "8px", color: T.textFaint, fontFamily: "monospace" }}>{p.syntax}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* How it works note */}
                <div style={{ padding: "8px 10px", background: T.chipOff, border: `1px solid ${T.border}`, borderRadius: "5px", fontSize: "8px", color: T.textFaint, lineHeight: "1.6" }}>
                  When ON + trigger word set, every generated prompt will start with the trigger word and append the LoRA syntax at the end.
                </div>
              </>
            ) : leftTab === "dataset" ? (
              /* ── DATASET TAB ── */
              <>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "12px" }}>
                  <span style={{ fontSize: "8px", color: T.textFaint }}>Captions &amp; shot list</span>
                  <button onClick={() => setDatasetEnabled(v => !v)} style={{
                    padding: "3px 10px", borderRadius: "4px", cursor: "pointer", fontSize: "8px", fontWeight: "700",
                    background: datasetEnabled ? "#22d3ee" : T.chipOff,
                    border: `1px solid ${datasetEnabled ? "#22d3ee" : T.border}`,
                    color: datasetEnabled ? "#000" : T.btnOffTxt, transition: "all 0.15s",
                  }}>{datasetEnabled ? "ON" : "OFF"}</button>
                </div>

                {!datasetEnabled ? (
                  <div style={{ padding: "8px 10px", background: T.chipOff, border: `1px solid ${T.border}`, borderRadius: "6px", fontSize: "8.5px", color: T.textFaint, lineHeight: "1.5" }}>
                    Toggle ON to generate training captions &amp; shot lists for LoRA dataset preparation.
                  </div>
                ) : (
                  <>
                    {/* Product selector */}
                    <div style={{ marginBottom: "10px" }}>
                      <div style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.1em", color: "#22d3ee", marginBottom: "6px" }}>SELECT PRODUCT</div>
                      <div style={{ display: "flex", flexDirection: "column", gap: "3px" }}>
                        {PRODUCTS.filter(p => p.id !== "custom").map(p => (
                          <div key={p.id} onClick={() => { setDatasetProduct(p.id); setDatasetResult(null); }}
                            style={{ display: "flex", alignItems: "center", gap: "7px", padding: "6px 8px", borderRadius: "5px", cursor: "pointer", border: `1px solid ${datasetProduct === p.id ? p.color + "66" : T.border}`, background: datasetProduct === p.id ? p.color + "11" : T.chipOff, transition: "all 0.12s" }}>
                            <span style={{ fontSize: "12px" }}>{p.icon}</span>
                            <span style={{ fontSize: "9px", color: datasetProduct === p.id ? p.color : T.textMid, fontWeight: datasetProduct === p.id ? "600" : "400", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.label}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                {/* Generate button */}
                <button onClick={handleGenerateDataset} disabled={datasetLoading} style={{
                  width: "100%", padding: "9px", marginBottom: "10px",
                  background: datasetLoading ? T.chipOff : "linear-gradient(135deg, #0891b2, #22d3ee)",
                  border: "none", borderRadius: "6px",
                  color: datasetLoading ? T.textFaint : "#000",
                  fontSize: "9.5px", fontWeight: "700", letterSpacing: "0.07em",
                  cursor: datasetLoading ? "not-allowed" : "pointer",
                  opacity: datasetLoading ? 0.6 : 1,
                }}>
                  {datasetLoading ? "⏳ GENERATING…" : "📋 GENERATE DATASET"}
                </button>

                {/* Error */}
                {datasetResult?.error && (
                  <div style={{ padding: "8px 10px", background: "#2d0a0a", border: "1px solid #f8717133", borderRadius: "5px", fontSize: "8.5px", color: "#f87171", marginBottom: "8px" }}>
                    ⚠ {datasetResult.error}
                  </div>
                )}

                {/* Results */}
                {datasetResult && !datasetResult.error && (
                  <div style={{ display: "flex", flexDirection: "column", gap: "8px" }}>

                    {/* Trigger word */}
                    <div style={{ padding: "8px 10px", background: "#f59e0b0d", border: "1px solid #f59e0b33", borderRadius: "6px" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "3px" }}>
                        <span style={{ fontSize: "7.5px", fontWeight: "700", color: "#f59e0b", letterSpacing: "0.08em" }}>TRIGGER WORD</span>
                        <button onClick={() => { setLoraTrigger(datasetResult.trigger_word); copyDataset(datasetResult.trigger_word, "trigger"); setLeftTab("lora"); }}
                          style={{ fontSize: "7px", padding: "2px 6px", background: datasetCopied === "trigger" ? "#14532d" : T.chipOff, border: `1px solid ${datasetCopied === "trigger" ? "#4ade8055" : T.border}`, borderRadius: "3px", color: datasetCopied === "trigger" ? "#4ade80" : T.textMid, cursor: "pointer" }}>
                          {datasetCopied === "trigger" ? "✓ SET" : "→ USE IN LORA"}
                        </button>
                      </div>
                      <div style={{ fontSize: "12px", fontWeight: "700", color: T.text, fontFamily: "monospace" }}>{datasetResult.trigger_word}</div>
                    </div>

                    {/* Total images */}
                    <div style={{ fontSize: "8.5px", color: T.textMid, padding: "5px 9px", background: T.chipOff, border: `1px solid ${T.border}`, borderRadius: "5px" }}>
                      📸 Recommended: <strong style={{ color: T.text }}>{datasetResult.total_images} images</strong>
                    </div>

                    {/* Shot list */}
                    <div>
                      <div style={{ fontSize: "7.5px", fontWeight: "700", letterSpacing: "0.1em", color: "#22d3ee", marginBottom: "5px" }}>SHOT LIST</div>
                      {datasetResult.shot_list?.map((shot, i) => (
                        <div key={i} style={{ marginBottom: "5px", padding: "8px 9px", background: T.surfaceB, border: `1px solid ${T.border}`, borderRadius: "6px" }}>
                          <div style={{ display: "flex", alignItems: "center", gap: "5px", marginBottom: "3px" }}>
                            <span style={{ fontSize: "8.5px", fontWeight: "700", color: T.text }}>{shot.angle}</span>
                            <span style={{ fontSize: "7.5px", padding: "1px 5px", background: "#22d3ee22", border: "1px solid #22d3ee44", borderRadius: "7px", color: "#22d3ee" }}>{shot.count}×</span>
                          </div>
                          <div style={{ fontSize: "7.5px", color: T.textMid, marginBottom: "5px" }}>{shot.notes}</div>
                          <div style={{ display: "flex", alignItems: "flex-start", gap: "4px" }}>
                            <div style={{ flex: 1, fontSize: "7.5px", color: "#e2e8f0", fontFamily: "monospace", background: "#0d1117", border: `1px solid ${T.border}`, borderRadius: "4px", padding: "4px 6px", lineHeight: "1.5", wordBreak: "break-all" }}>
                              {shot.caption}
                            </div>
                            <button onClick={() => copyDataset(shot.caption, `s${i}`)}
                              style={{ padding: "4px 6px", background: datasetCopied === `s${i}` ? "#14532d" : T.chipOff, border: `1px solid ${datasetCopied === `s${i}` ? "#4ade8055" : T.border}`, borderRadius: "4px", color: datasetCopied === `s${i}` ? "#4ade80" : T.textMid, fontSize: "8px", cursor: "pointer", flexShrink: 0 }}>
                              {datasetCopied === `s${i}` ? "✓" : "📋"}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Caption template */}
                    <div>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "4px" }}>
                        <span style={{ fontSize: "7.5px", fontWeight: "700", letterSpacing: "0.1em", color: "#22d3ee" }}>CAPTION TEMPLATE</span>
                        <button onClick={() => copyDataset(datasetResult.caption_format, "tpl")}
                          style={{ fontSize: "7px", padding: "2px 6px", background: datasetCopied === "tpl" ? "#14532d" : T.chipOff, border: `1px solid ${datasetCopied === "tpl" ? "#4ade8055" : T.border}`, borderRadius: "3px", color: datasetCopied === "tpl" ? "#4ade80" : T.textMid, cursor: "pointer" }}>
                          {datasetCopied === "tpl" ? "✓ COPIED" : "COPY"}
                        </button>
                      </div>
                      <div style={{ fontSize: "7.5px", color: "#e2e8f0", fontFamily: "monospace", background: "#0d1117", border: `1px solid ${T.border}`, borderRadius: "5px", padding: "6px 8px", lineHeight: "1.6", wordBreak: "break-all" }}>
                        {datasetResult.caption_format}
                      </div>
                    </div>

                    {/* Training notes */}
                    <div style={{ padding: "8px 10px", background: "#14532d22", border: "1px solid #4ade8033", borderRadius: "6px", fontSize: "8px", color: "#86efac", lineHeight: "1.6" }}>
                      <span style={{ fontWeight: "700", color: "#4ade80" }}>TRAINING — </span>{datasetResult.training_notes}
                    </div>
                  </div>
                )}
                  </>
                )}
              </>
            ) : (              /* ── HISTORY TAB ── */
              <>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "9px" }}>
                  <span style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.12em", color: T.textFaint }}>SAVED PROMPTS</span>
                  {history.length > 0 && (
                    <button onClick={() => { if (window.confirm("Clear all history?")) setHistory([]); }}
                      style={{ fontSize: "7.5px", padding: "2px 6px", background: T.chipOff, border: `1px solid ${T.border}`, borderRadius: "3px", color: T.textFaint, cursor: "pointer" }}>
                      CLEAR ALL
                    </button>
                  )}
                </div>
                {!historyLoaded && <div style={{ fontSize: "9px", color: T.textFaint }}>Loading…</div>}
                {historyLoaded && history.length === 0 && (
                  <div style={{ fontSize: "9px", color: T.textFaint, lineHeight: "1.6", padding: "10px", background: T.chipOff, borderRadius: "5px", textAlign: "center" }}>
                    No saved prompts yet.<br />Generate one and it'll appear here.
                  </div>
                )}
                {history.map(entry => {
                  const entryProduct = PRODUCTS.find(p => p.id === entry.product);
                  const entryModel   = MODELS.find(m => m.id === entry.model);
                  const isExpanded   = expandedEntry === entry.id;
                  return (
                    <div key={entry.id} style={{ marginBottom: "6px", border: `1px solid ${T.border}`, borderRadius: "7px", overflow: "hidden", background: T.surfaceB, boxShadow: T.shadow }}>
                      {/* Header row */}
                      <div style={{ padding: "7px 9px", display: "flex", alignItems: "center", gap: "6px", cursor: "pointer", background: isExpanded ? "#1e1e1e" : T.surfaceB }}
                        onClick={() => setExpandedEntry(isExpanded ? null : entry.id)}>
                        <span style={{ fontSize: "13px" }}>{entryProduct?.icon || "📦"}</span>
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ fontSize: "9.5px", fontWeight: "600", color: T.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                            {entryProduct?.label || entry.product}
                          </div>
                          <div style={{ fontSize: "7.5px", color: T.textFaint, marginTop: "1px" }}>
                            {entryModel?.label || entry.model} · {entry.ratio} · {entry.ts}
                          </div>
                        </div>
                        <span style={{ fontSize: "9px", color: T.textFaint }}>{isExpanded ? "▲" : "▼"}</span>
                      </div>

                      {/* Expanded content */}
                      {isExpanded && (
                        <div style={{ borderTop: `1px solid ${T.divider}`, padding: "8px 9px" }}>
                          {/* Prompt preview */}
                          <div style={{ fontSize: "8.5px", color: T.textMid, lineHeight: "1.55", marginBottom: "8px", maxHeight: "80px", overflow: "hidden", maskImage: "linear-gradient(to bottom, black 60%, transparent 100%)" }}>
                            {entry.positive.slice(0, 180)}…
                          </div>
                          {/* Tags */}
                          <div style={{ display: "flex", flexWrap: "wrap", gap: "3px", marginBottom: "8px" }}>
                            {entry.scenes.slice(0,2).map(id => { const s = SCENES.find(x => x.id === id); return s ? <span key={id} style={{ fontSize: "7px", padding: "1px 5px", background: T.scene + "22", border: `1px solid ${T.scene}44`, borderRadius: "8px", color: T.scene }}>{s.icon}</span> : null; })}
                            {entry.lighting.slice(0,2).map(id => { const l = LIGHTING.find(x => x.id === id); return l ? <span key={id} style={{ fontSize: "7px", padding: "1px 5px", background: T.lighting + "22", border: `1px solid ${T.lighting}44`, borderRadius: "8px", color: T.lighting }}>{l.label}</span> : null; })}
                            {entry.imgCount > 0 && <span style={{ fontSize: "7px", padding: "1px 5px", background: "#fbbf2422", border: "1px solid #fbbf2444", borderRadius: "8px", color: "#fbbf24" }}>📸 {entry.imgCount} img</span>}
                          </div>
                          {/* Action buttons */}
                          <div style={{ display: "flex", gap: "5px" }}>
                            <button onClick={() => loadFromHistory(entry)} style={{ flex: 1, padding: "5px", fontSize: "8px", fontWeight: "700", background: (entryModel?.color || "#555") + "22", border: `1px solid ${(entryModel?.color || "#555")}44`, borderRadius: "4px", color: entryModel?.color || T.textMid, cursor: "pointer" }}>
                              ↩ LOAD
                            </button>
                            <button onClick={() => { navigator.clipboard.writeText(entry.negative ? `POSITIVE:\n${entry.positive}\n\nNEGATIVE:\n${entry.negative}` : entry.positive); }}
                              style={{ flex: 1, padding: "5px", fontSize: "8px", fontWeight: "700", background: T.chipOff, border: `1px solid ${T.border}`, borderRadius: "4px", color: T.textMid, cursor: "pointer" }}>
                              📋 COPY
                            </button>
                            <button onClick={() => deleteHistoryEntry(entry.id)}
                              style={{ padding: "5px 7px", fontSize: "8px", background: "#2d0a0a", border: "1px solid #f8717133", borderRadius: "4px", color: "#f87171", cursor: "pointer" }}>
                              ✕
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </>
            )}

            </div>
          </div>
        </div>

        {/* ── Main ── */}
        <div style={{ flex: 1, padding: "16px 20px", overflowY: "auto" }}>

          {/* Image slots */}
          <div style={{ marginBottom: "14px" }}>
            <div style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.12em", color: T.textFaint, marginBottom: "8px" }}>IMAGE REFERENCES</div>
            <div style={{ display: "flex", gap: "10px" }}>
              {["style", "product"].map(role => (
                <ImageSlot key={role} role={role} image={images[role]} onUpload={f => handleUpload(role, f)} onClear={() => clearImage(role)} />
              ))}
            </div>
            {images.product && (
              <div style={{ marginTop: "6px", padding: "5px 9px", background: "#fbbf2411", border: "1px solid #fbbf2433", borderRadius: "5px", fontSize: "8px", color: "#fbbf24" }}>
                ✦ Product ref active — sizing, proportions &amp; label identity will be locked to this image
              </div>
            )}
            {images.style && (
              <div style={{ marginTop: "4px", padding: "5px 9px", background: "#a78bfa11", border: "1px solid #a78bfa33", borderRadius: "5px", fontSize: "8px", color: "#a78bfa" }}>
                ✦ Style ref active — color grade, mood &amp; texture will be extracted and embedded directly into the prompt
              </div>
            )}
          </div>

          <div style={{ height: "1px", background: T.divider, margin: "0 0 14px" }} />

          {/* ── Aspect Ratio ── */}
          <div style={{ marginBottom: "14px" }}>
            <SectionHeader label="ASPECT RATIO" color={arColor} />
            <div style={{ display: "flex", flexWrap: "wrap", gap: "4px", marginBottom: "7px" }}>
              {ASPECT_RATIOS.map(ar => {
                const isActive = !useCustomRatio && aspectRatio === ar.id;
                return (
                  <div key={ar.id} onClick={() => { setAspectRatio(ar.id); setUseCustomRatio(false); setAmazonPreset(null); setResult(null); }}
                    style={{ display: "flex", alignItems: "center", gap: "5px", padding: "5px 8px", borderRadius: "5px", cursor: "pointer", border: `1px solid ${isActive ? arColor + "77" : T.border}`, background: isActive ? arColor + "13" : T.chipOff, transition: "all 0.12s", flexShrink: 0 }}>
                    <RatioBox shape={ar.shape} active={isActive} color={arColor} />
                    <div>
                      <div style={{ fontSize: "8.5px", fontWeight: isActive ? "700" : "400", color: isActive ? T.text : T.textMid, whiteSpace: "nowrap" }}>{ar.label}</div>
                      <div style={{ fontSize: "7.5px", color: isActive ? arColor : T.textFaint }}>{ar.ratio}</div>
                    </div>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <div style={{ flex: 1, display: "flex", alignItems: "center", gap: "6px", padding: "6px 9px", borderRadius: "5px", border: `1px solid ${useCustomRatio ? arColor + "77" : T.borderMd}`, background: useCustomRatio ? arColor + "10" : T.input, boxShadow: T.shadow }}>
                <span style={{ fontSize: "8px", color: T.textFaint, whiteSpace: "nowrap", fontWeight: "700", letterSpacing: "0.06em" }}>MANUAL</span>
                <input value={customRatio} onChange={e => { setCustomRatio(e.target.value); if (e.target.value) setUseCustomRatio(true); setResult(null); }} onFocus={() => setUseCustomRatio(true)}
                  placeholder="e.g. 7:2"
                  style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: T.text, fontSize: "11px", minWidth: 0, fontFamily: "inherit" }} />
              </div>
              {useCustomRatio && (
                <button onClick={() => { setUseCustomRatio(false); setCustomRatio(""); }} style={{ padding: "5px 8px", background: T.btnOff, border: `1px solid ${T.border}`, borderRadius: "4px", color: T.textMid, fontSize: "8px", cursor: "pointer" }}>CLEAR</button>
              )}
            </div>
          </div>

          {/* ── Amazon Presets (ON/OFF chips) ── */}
          <div style={{ marginBottom: "14px" }}>
            {(() => {
              const amzColor = "#ff9900";
              const AMAZON_PRESETS = [
                { id: "header",        label: "Header",          w: 3000, h: 600,  ratio: "5:1",  res: "4k", icon: "🏷", note: "3000×600" },
                { id: "shoppable",     label: "Shoppable",       w: 1920, h: 1920, ratio: "1:1",  res: "2k", icon: "🛍", note: "1920×1920+" },
                { id: "image",         label: "Image",           w: 3000, h: 1200, ratio: "5:2",  res: "4k", icon: "🖼", note: "3000×16–2400" },
                { id: "main",          label: "Main Image",      w: 2400, h: 2400, ratio: "1:1",  res: "4k", icon: "⭐", note: "2400×2400" },
                { id: "desktop_aplus", label: "Desktop A+",      w: 1464, h: 600,  ratio: "2:1",  res: "2k", icon: "🖥", note: "1464×600 min" },
                { id: "mobile_aplus",  label: "Mobile A+",       w: 600,  h: 450,  ratio: "4:3",  res: "2k", icon: "📱", note: "600×450 min" },
              ];
              return (
                <>
                  <SectionHeader label="AMAZON PRESETS" color={amzColor} />
                  <div style={{ display: "flex", flexWrap: "wrap", gap: "4px" }}>
                    {AMAZON_PRESETS.map(p => {
                      const isActive = amazonPreset === p.id;
                      return (
                        <div key={p.id} style={{
                          display: "flex", alignItems: "stretch",
                          border: `1px solid ${isActive ? amzColor + "88" : T.border}`,
                          borderRadius: "6px", overflow: "hidden",
                          background: isActive ? amzColor + "11" : T.chipOff,
                          transition: "all 0.12s",
                        }}>
                          <div style={{ padding: "6px 9px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                              <span style={{ fontSize: "11px" }}>{p.icon}</span>
                              <span style={{ fontSize: "9.5px", fontWeight: "700", color: isActive ? amzColor : T.textMid }}>{p.label}</span>
                            </div>
                            <div style={{ fontSize: "8px", color: isActive ? T.text : T.textFaint, fontFamily: "monospace", marginTop: "1px" }}>{p.note}</div>
                          </div>
                          <button onClick={() => {
                            if (isActive) {
                              setAmazonPreset(null);
                            } else {
                              setAmazonPreset(p.id);
                              setAspectRatio(p.ratio);
                              setUseCustomRatio(false);
                              setResolution(p.res);
                            }
                            setResult(null);
                          }} style={{
                            padding: "0 10px", minWidth: "40px", flexShrink: 0,
                            background: isActive ? amzColor : T.btnOff,
                            border: "none", borderLeft: `1px solid ${isActive ? amzColor + "55" : T.border}`,
                            color: isActive ? "#000" : T.btnOffTxt,
                            fontSize: "9px", fontWeight: "700", letterSpacing: "0.06em",
                            cursor: "pointer", transition: "all 0.12s",
                          }}>{isActive ? "ON" : "OFF"}</button>
                        </div>
                      );
                    })}
                  </div>
                </>
              );
            })()}
          </div>

          {/* ── Product Scale Guide ── */}
          <div style={{ marginBottom: "14px", border: `1px solid ${scaleGuideOpen ? "#38bdf855" : T.border}`, borderRadius: "8px", overflow: "hidden" }}>
            {/* Header */}
            <div onClick={() => setScaleGuideOpen(v => !v)}
              style={{ display: "flex", alignItems: "center", gap: "8px", padding: "9px 13px", background: scaleGuideOpen ? "#38bdf808" : T.surfaceB, cursor: "pointer" }}>
              <span style={{ fontSize: "13px" }}>📐</span>
              <div style={{ flex: 1 }}>
                <span style={{ fontSize: "9.5px", fontWeight: "700", letterSpacing: "0.1em", color: scaleGuideOpen ? "#38bdf8" : T.textMid }}>PRODUCT SCALE GUIDE</span>
                <span style={{ fontSize: "8px", color: T.textFaint, marginLeft: "8px" }}>drag to set exact product size & position</span>
              </div>
              {scaleGuideOpen && (
                <span style={{ fontSize: "8px", padding: "2px 7px", background: "#38bdf822", border: "1px solid #38bdf844", borderRadius: "8px", color: "#38bdf8" }}>
                  {Math.round(productBox.w)}% × {Math.round(productBox.h)}%
                </span>
              )}
              <span style={{ fontSize: "9px", color: T.textFaint }}>{scaleGuideOpen ? "▲" : "▼"}</span>
            </div>

            {scaleGuideOpen && (() => {
              const out = buildScaleOutput();
              // Parse aspect ratio for canvas shape
              const [arW, arH] = (finalRatio || "1:1").split(":").map(Number);
              const ratio = arW / arH;
              const CANVAS_W = 420;
              const CANVAS_H = Math.round(CANVAS_W / ratio);
              const b = productBox;

              return (
                <div style={{ padding: "12px 14px", borderTop: `1px solid ${T.divider}` }}>
                  <div style={{ fontSize: "8px", color: T.textFaint, marginBottom: "8px" }}>
                    Drag the product box to position · Drag bottom-right corner to resize
                  </div>

                  {/* Canvas */}
                  <div
                    ref={scaleCanvasRef}
                    onMouseDown={onCanvasMouseDown}
                    onMouseMove={onCanvasMouseMove}
                    onMouseUp={() => setDragging(null)}
                    onMouseLeave={() => setDragging(null)}
                    style={{
                      position: "relative", width: "100%", maxWidth: CANVAS_W,
                      paddingBottom: `${(1 / ratio) * 100}%`,
                      background: "#0d1117",
                      border: "1px solid #38bdf833",
                      borderRadius: "6px",
                      cursor: dragging ? (dragging.type === "resize" ? "nwse-resize" : "grabbing") : "default",
                      overflow: "hidden", userSelect: "none",
                    }}
                  >
                    {/* Grid lines */}
                    {[33.3, 66.6].map(p => (
                      <div key={`v${p}`} style={{ position: "absolute", left: `${p}%`, top: 0, bottom: 0, width: "1px", background: "#ffffff08" }} />
                    ))}
                    {[33.3, 66.6].map(p => (
                      <div key={`h${p}`} style={{ position: "absolute", top: `${p}%`, left: 0, right: 0, height: "1px", background: "#ffffff08" }} />
                    ))}

                    {/* Center crosshair */}
                    <div style={{ position: "absolute", left: "50%", top: 0, bottom: 0, width: "1px", background: "#ffffff14" }} />
                    <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: "1px", background: "#ffffff14" }} />

                    {/* Product box */}
                    <div style={{
                      position: "absolute",
                      left: `${b.x}%`, top: `${b.y}%`,
                      width: `${b.w}%`, height: `${b.h}%`,
                      background: "#38bdf822",
                      border: "2px solid #38bdf8",
                      borderRadius: "3px",
                      cursor: "grab",
                      boxShadow: "0 0 12px #38bdf844",
                    }}>
                      {/* Product label */}
                      <div style={{
                        position: "absolute", top: "50%", left: "50%",
                        transform: "translate(-50%,-50%)",
                        textAlign: "center", pointerEvents: "none",
                      }}>
                        <div style={{ fontSize: "18px" }}>{product.icon}</div>
                        <div style={{ fontSize: "8px", color: "#38bdf8", fontWeight: "700", whiteSpace: "nowrap", marginTop: "2px" }}>
                          {Math.round(b.w)}% × {Math.round(b.h)}%
                        </div>
                      </div>
                      {/* Resize handle */}
                      <div style={{
                        position: "absolute", bottom: "-1px", right: "-1px",
                        width: "14px", height: "14px",
                        background: "#38bdf8", borderRadius: "2px 0 3px 0",
                        cursor: "nwse-resize",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}>
                        <span style={{ fontSize: "8px", color: "#000", lineHeight: 1 }}>↘</span>
                      </div>
                    </div>

                    {/* Dimension labels */}
                    <div style={{ position: "absolute", bottom: "4px", left: "4px", fontSize: "7.5px", color: "#38bdf8aa", background: "#00000088", padding: "1px 4px", borderRadius: "3px" }}>
                      {out.canvasW}×{out.canvasH}px
                    </div>
                  </div>

                  {/* Reset button */}
                  <button onClick={() => setProductBox({ x: 30, y: 20, w: 40, h: 60 })}
                    style={{ marginTop: "7px", padding: "4px 10px", background: T.chipOff, border: `1px solid ${T.border}`, borderRadius: "4px", fontSize: "8px", color: T.textFaint, cursor: "pointer" }}>
                    RESET
                  </button>

                  {/* Output cards */}
                  <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: "6px", marginTop: "10px" }}>
                    {[
                      { label: "WIDTH",    value: `${out.wPct}%`,      sub: `${out.pxW}px` },
                      { label: "HEIGHT",   value: `${out.hPct}%`,      sub: `${out.pxH}px` },
                      { label: "X POS",    value: `${Math.round(productBox.x)}%`, sub: `${Math.round(out.canvasW * productBox.x / 100)}px` },
                      { label: "Y POS",    value: `${Math.round(productBox.y)}%`, sub: `${Math.round(out.canvasH * productBox.y / 100)}px` },
                    ].map(card => (
                      <div key={card.label} style={{ padding: "7px 9px", background: T.surfaceB, border: `1px solid ${T.border}`, borderRadius: "6px", textAlign: "center" }}>
                        <div style={{ fontSize: "7px", color: T.textFaint, letterSpacing: "0.1em", marginBottom: "3px" }}>{card.label}</div>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: "#38bdf8", lineHeight: 1 }}>{card.value}</div>
                        <div style={{ fontSize: "8px", color: T.textMid, marginTop: "2px" }}>{card.sub}</div>
                      </div>
                    ))}
                  </div>

                  {/* Prompt output */}
                  <div style={{ marginTop: "10px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                      <span style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.1em", color: "#38bdf8" }}>PROMPT SIZING CONSTRAINT</span>
                      <button onClick={() => copyText(out.prompt, "scale-prompt")}
                        style={{ padding: "3px 8px", background: copied === "scale-prompt" ? "#14532d" : T.chipOff, border: `1px solid ${copied === "scale-prompt" ? "#4ade8055" : T.border}`, borderRadius: "3px", fontSize: "8px", color: copied === "scale-prompt" ? "#4ade80" : T.textMid, cursor: "pointer" }}>
                        {copied === "scale-prompt" ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                    <div style={{ fontSize: "9.5px", color: T.text, background: "#0d1117", border: `1px solid ${T.border}`, borderRadius: "5px", padding: "8px 10px", lineHeight: "1.6" }}>
                      {out.prompt}
                    </div>
                  </div>

                  {/* Composite output */}
                  <div style={{ marginTop: "8px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                      <span style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.1em", color: "#a78bfa" }}>COMPOSITE GUIDE (Photoshop / Canva)</span>
                      <button onClick={() => copyText(out.composite, "scale-comp")}
                        style={{ padding: "3px 8px", background: copied === "scale-comp" ? "#14532d" : T.chipOff, border: `1px solid ${copied === "scale-comp" ? "#4ade8055" : T.border}`, borderRadius: "3px", fontSize: "8px", color: copied === "scale-comp" ? "#4ade80" : T.textMid, cursor: "pointer" }}>
                        {copied === "scale-comp" ? "✓ COPIED" : "COPY"}
                      </button>
                    </div>
                    <div style={{ fontSize: "9.5px", color: "#a78bfa", background: "#0d1117", border: "1px solid #a78bfa33", borderRadius: "5px", padding: "8px 10px", lineHeight: "1.6", fontFamily: "monospace" }}>
                      {out.composite}
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>

          {/* Scene / Angle / Lighting / Position — horizontal rows */}
          <div style={{ display: "flex", flexDirection: "column", gap: "14px", marginBottom: "14px" }}>

            {/* POSITION */}
            <div>
              <SectionHeader label="POSITION" color={T.comp} count={activeComp.length} total={COMPOSITION.length} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px" }}>
                {COMPOSITION.map(c => <ToggleChip key={c.id} item={c} active={activeComp.includes(c.id)} onToggle={() => toggle(setActiveComp, c.id)} accentColor={T.comp} />)}
              </div>
            </div>

            {/* SCENE */}
            <div>
              <SectionHeader label="SCENE" color={T.scene} count={activeScenes.length} total={SCENES.length} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px" }}>
                {SCENES.map(s => <ToggleChip key={s.id} item={s} active={activeScenes.includes(s.id)} onToggle={() => toggle(setActiveScenes, s.id)} accentColor={T.scene} />)}
              </div>
            </div>

            {/* ANGLE */}
            <div>
              <SectionHeader label="ANGLE" color={T.angle} count={activeAngles.length} total={ANGLES.length} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "4px" }}>
                {ANGLES.map(a => <ToggleChip key={a.id} item={a} active={activeAngles.includes(a.id)} onToggle={() => toggle(setActiveAngles, a.id)} accentColor={T.angle} />)}
              </div>
            </div>

            {/* LIGHTING */}
            <div>
              <SectionHeader label="LIGHTING" color={T.lighting} count={activeLighting.length} total={LIGHTING.length} />
              <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "4px" }}>
                {LIGHTING.map(l => <ToggleChip key={l.id} item={l} active={activeLighting.includes(l.id)} onToggle={() => toggle(setActiveLighting, l.id)} accentColor={T.lighting} />)}
              </div>
            </div>

            {/* RESOLUTION */}
            <div>
              <SectionHeader label="RESOLUTION" color={resColor} />
              <div style={{ display: "flex", gap: "6px" }}>
                {[
                  { id: "2k", label: "2K", detail: "2048px" },
                  { id: "4k", label: "4K", detail: "4096px / UHD" },
                ].map(res => {
                  const isActive = resolution === res.id;
                  return (
                    <div key={res.id} onClick={() => { setResolution(res.id); setResult(null); }}
                      style={{ flex: 1, display: "flex", alignItems: "center", gap: "10px", padding: "10px 12px", borderRadius: "6px", cursor: "pointer", border: `1px solid ${isActive ? resColor + "77" : T.border}`, background: isActive ? resColor + "10" : T.chipOff, transition: "all 0.12s" }}>
                      <div style={{ display: "flex", alignItems: "flex-end", gap: "2px", height: "18px", flexShrink: 0 }}>
                        {[1,2,3,4].map(n => {
                          const lit = res.id === "2k" ? n <= 2 : n <= 4;
                          return <div key={n} style={{ width: "4px", height: `${n * 4 + 2}px`, background: lit ? (isActive ? resColor : T.textMid) : T.borderMd, borderRadius: "1px", transition: "all 0.12s" }} />;
                        })}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: "15px", fontWeight: "700", color: isActive ? T.text : T.textMid, letterSpacing: "0.04em", lineHeight: 1 }}>{res.label}</div>
                        <div style={{ fontSize: "7.5px", color: isActive ? resColor : T.textFaint, marginTop: "2px" }}>{res.detail}</div>
                      </div>
                      <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: isActive ? resColor : T.borderMd, flexShrink: 0 }} />
                    </div>
                  );
                })}
              </div>
            </div>

          </div>

          {/* Notes */}
          <div style={{ marginBottom: "12px" }}>
            <div style={{ fontSize: "8px", fontWeight: "700", letterSpacing: "0.12em", color: T.textFaint, marginBottom: "5px" }}>ADDITIONAL NOTES</div>
            <input value={extra} onChange={e => { setExtra(e.target.value); setResult(null); }}
              placeholder="e.g. condensation on tub, chalk dust, smoke machine haze…"
              style={{ width: "100%", boxSizing: "border-box", background: T.input, border: `1px solid ${T.borderMd}`, borderRadius: "5px", padding: "7px 11px", color: T.text, fontSize: "11px", outline: "none", fontFamily: "inherit", boxShadow: T.shadow }} />
          </div>

          {/* Active tags */}
          {selCount > 0 && (
            <div style={{ marginBottom: "12px", display: "flex", flexWrap: "wrap", gap: "4px" }}>
              <span style={{ fontSize: "7.5px", padding: "2px 8px", background: product.color + "22", border: `1px solid ${product.color}55`, borderRadius: "10px", color: product.color, fontWeight: "600" }}>{product.icon} {product.label}</span>
              {finalRatio && <span style={{ fontSize: "7.5px", padding: "2px 8px", background: arColor + "22", border: `1px solid ${arColor}55`, borderRadius: "10px", color: arColor }}>⬛ {finalRatio}</span>}
              {resolution && <span style={{ fontSize: "7.5px", padding: "2px 8px", background: resColor + "22", border: `1px solid ${resColor}55`, borderRadius: "10px", color: resColor }}>◈ {RESOLUTIONS.find(r => r.id === resolution)?.label}</span>}
              {activeScenes.map(id => { const s = SCENES.find(x => x.id === id); return s ? <span key={id} style={{ fontSize: "7.5px", padding: "2px 8px", background: T.scene + "22", border: `1px solid ${T.scene}55`, borderRadius: "10px", color: T.scene }}>{s.icon} {s.label}</span> : null; })}
              {activeAngles.map(id => { const a = ANGLES.find(x => x.id === id); return a ? <span key={id} style={{ fontSize: "7.5px", padding: "2px 8px", background: T.angle + "22", border: `1px solid ${T.angle}55`, borderRadius: "10px", color: T.angle }}>{a.label}</span> : null; })}
              {activeLighting.map(id => { const l = LIGHTING.find(x => x.id === id); return l ? <span key={id} style={{ fontSize: "7.5px", padding: "2px 8px", background: T.lighting + "22", border: `1px solid ${T.lighting}55`, borderRadius: "10px", color: T.lighting }}>{l.label}</span> : null; })}
              {activeComp.map(id => { const c = COMPOSITION.find(x => x.id === id); return c ? <span key={id} style={{ fontSize: "7.5px", padding: "2px 8px", background: T.comp + "22", border: `1px solid ${T.comp}55`, borderRadius: "10px", color: T.comp }}>{c.icon} {c.label}</span> : null; })}
              {images.product && <span style={{ fontSize: "7.5px", padding: "2px 8px", background: "#fbbf2422", border: "1px solid #fbbf2455", borderRadius: "10px", color: "#fbbf24" }}>📸 Product ref</span>}
            </div>
          )}


          {/* Generate / Stop */}
          <div style={{ display: "flex", gap: "8px", marginBottom: "18px" }}>
            <button onClick={handleGenerate} disabled={loading || !canGenerate} style={{
              flex: 1, padding: "11px",
              background: loading || !canGenerate ? T.chipOff : `linear-gradient(135deg, ${model.color}cc, ${model.color})`,
              border: `1px solid ${!canGenerate ? T.borderMd : "transparent"}`,
              borderRadius: "7px",
              color: !canGenerate ? T.textFaint : model.vendor === "black_forest" ? "#1a1a00" : "#fff",
              fontSize: "11px", fontWeight: "700", letterSpacing: "0.08em",
              cursor: loading || !canGenerate ? "not-allowed" : "pointer",
              opacity: loading ? 0.6 : 1, transition: "all 0.2s",
              boxShadow: canGenerate && !loading ? `0 2px 8px ${model.color}44` : "none",
            }}>
              {loading
                ? `⚡ ${imgCount > 0 ? "ANALYZING IMAGES & " : ""}GENERATING…`
                : !canGenerate
                  ? selectedProduct === "custom" && !customDesc.trim() ? "DESCRIBE YOUR PRODUCT FIRST" : "SELECT AT LEAST ONE OPTION"
                  : `⚡ GENERATE — ${product.label} · ${model.label} · ${finalRatio || "—"} · ${RESOLUTIONS.find(r => r.id === resolution)?.label || ""}${imgCount > 0 ? ` · ${imgCount} IMG` : ""}`
              }
            </button>

            {loading && (
              <button onClick={handleStop} style={{
                padding: "11px 16px", flexShrink: 0,
                background: "#2d0a0a",
                border: "1px solid #f8717155",
                borderRadius: "7px",
                color: "#f87171",
                fontSize: "11px", fontWeight: "700",
                cursor: "pointer", transition: "all 0.15s",
              }}>
                ■ STOP
              </button>
            )}
          </div>

          {/* Result */}
          {result && (
            <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>

              {/* ── Error block ── */}
              {result.error && (
                <div style={{ padding: "10px 13px", background: "#2d0a0a", border: "1px solid #f8717155", borderRadius: "7px" }}>
                  <div style={{ fontSize: "9px", fontWeight: "700", color: "#f87171", letterSpacing: "0.08em", marginBottom: "4px" }}>⚠ GENERATION ERROR</div>
                  <div style={{ fontSize: "10.5px", color: "#fca5a5", lineHeight: "1.6" }}>{result.error}</div>
                  {result.isError && (
                    <div style={{ marginTop: "7px", fontSize: "9px", color: "#f8717177", lineHeight: "1.5" }}>
                      Base prompt shown below as fallback — you can copy it manually.
                    </div>
                  )}
                </div>
              )}
              {result.image_analysis && (
                <div style={{ fontSize: "9.5px", color: "#a78bfa", padding: "8px 11px", background: "#1e1533", border: "1px solid #a78bfa33", borderRadius: "5px", lineHeight: "1.55" }}>
                  <span style={{ fontWeight: "700" }}>IMAGES ANALYZED — </span>{result.image_analysis}
                </div>
              )}

              {/* Positive */}
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                  <span style={{ fontSize: "8.5px", fontWeight: "700", letterSpacing: "0.12em", color: model.color }}>✦ PROMPT · {model.label.toUpperCase()}</span>
                  <button onClick={() => copyText(result.positive, "pos")} style={{ padding: "3px 9px", background: copied === "pos" ? "#14532d" : T.chipOff, border: `1px solid ${copied === "pos" ? "#4ade8066" : T.border}`, borderRadius: "4px", color: copied === "pos" ? "#4ade80" : T.textMid, fontSize: "8.5px", cursor: "pointer" }}>
                    {copied === "pos" ? "✓ COPIED" : "COPY"}
                  </button>
                </div>
                <div style={{ background: model.color + "11", border: `1px solid ${model.color}33`, borderRadius: "7px", padding: "12px", fontSize: "11.5px", color: T.text, lineHeight: "1.75", whiteSpace: "pre-wrap" }}>
                  {result.positive}
                </div>
              </div>

              {/* Negative */}
              {model.hasNegative && result.negative && (
                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "5px" }}>
                    <span style={{ fontSize: "8.5px", fontWeight: "700", letterSpacing: "0.12em", color: "#f87171" }}>✦ NEGATIVE PROMPT</span>
                    <button onClick={() => copyText(result.negative, "neg")} style={{ padding: "3px 9px", background: copied === "neg" ? "#14532d" : T.chipOff, border: `1px solid ${copied === "neg" ? "#4ade8066" : T.border}`, borderRadius: "4px", color: copied === "neg" ? "#4ade80" : T.textMid, fontSize: "8.5px", cursor: "pointer" }}>
                      {copied === "neg" ? "✓ COPIED" : "COPY"}
                    </button>
                  </div>
                  <div style={{ background: "#2d0a0a", border: "1px solid #f8717133", borderRadius: "7px", padding: "12px", fontSize: "11.5px", color: "#fca5a5", lineHeight: "1.75" }}>
                    {result.negative}
                  </div>
                </div>
              )}

              {!model.hasNegative && (
                <div style={{ fontSize: "8.5px", color: T.textFaint, padding: "5px 9px", background: T.chipOff, border: `1px solid ${T.border}`, borderRadius: "4px" }}>
                  ℹ {model.label} — inline exclusions only, no separate negative field
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
