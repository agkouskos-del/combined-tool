import { useState, useCallback, useRef } from "react";

// ── DATA ────────────────────────────────────────────────────────────────────

const KETCHUP_THUMB = "data:image/jpeg;base64,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";
const HERBS_THUMB = "data:image/jpeg;base64,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";
const GINGER_THUMB = "data:image/jpeg;base64,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";
const PLAIN_THUMB = "data:image/jpeg;base64,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";

const SKUS = [
  { id: "crushed_ginger", label: "Crushed Tomatoes", sub: "Ginger & Turmeric, 340g", thumb: GINGER_THUMB },
  { id: "crushed_herbs",  label: "Crushed Tomatoes", sub: "Cretan Herbs, 340g",       thumb: HERBS_THUMB },
  { id: "crushed_plain",  label: "Crushed Tomatoes", sub: "480g",                     thumb: PLAIN_THUMB },
  { id: "ketchup",        label: "Ketchup",          sub: "230g",                     thumb: KETCHUP_THUMB },
  { id: "custom",         label: "Custom / Other",   sub: "",                         thumb: null },
];

const MODELS = [
  { id: "gpt_image_2",       label: "GPT Image 2",                   icon: "openai",  note: "",                   hasNegative: false },
  { id: "gpt_image_15",      label: "GPT Image 1.5",                 icon: "openai",  note: "",                   hasNegative: false },
  { id: "gemini_31_nano2",   label: "Gemini 3.1",                    icon: "google",  note: "w/ Nano Banana 2",   hasNegative: false },
  { id: "gemini_3_pro",      label: "Gemini 3",                      icon: "google",  note: "w/ Nano Banana Pro", hasNegative: false },
  { id: "gemini_25_nano",    label: "Gemini 2.5",                    icon: "google",  note: "w/ Nano Banana",     hasNegative: false },
  { id: "flux2_pro",         label: "FLUX.2 [pro]",                  icon: "flux",    note: "",                   hasNegative: true  },
  { id: "flux1_kontext",     label: "FLUX.1 Kontext [max]",          icon: "flux",    note: "",                   hasNegative: true  },
  { id: "gpt_image_1",       label: "GPT Image 1",                   icon: "openai",  note: "",                   hasNegative: false },
  { id: "flux11_ultra_raw",  label: "FLUX1.1 [pro] Ultra Raw",       icon: "flux",    note: "",                   hasNegative: true  },
];

const MODEL_PROMPTING = {
  gpt_image_2:      "Optimize this prompt for GPT Image 2: use natural language descriptions, rich scene context, vivid detail. GPT Image 2 responds well to descriptive sentences rather than comma-separated tags.",
  gpt_image_15:     "Optimize this prompt for GPT Image 1.5: use clear descriptive language, specify lighting and composition explicitly.",
  gemini_31_nano2:  "Optimize this prompt for Gemini 3.1 with Nano Banana 2 LoRA: leverage the LoRA's style conditioning. Use concise descriptive tags combined with natural language. Include style weight hints.",
  gemini_3_pro:     "Optimize this prompt for Gemini 3 with Nano Banana Pro LoRA: use the LoRA's strengths for product photography. Balanced tag and sentence structure.",
  gemini_25_nano:   "Optimize this prompt for Gemini 2.5 with Nano Banana LoRA: concise, tag-forward prompt with natural scene description.",
  flux2_pro:        "Optimize this prompt for FLUX.2 [pro]: use detailed comma-separated descriptors, specify technical camera terms (focal length, aperture, sensor), and include quality boosters like 'professional product photography, sharp focus, 8K'.",
  flux1_kontext:    "Optimize this prompt for FLUX.1 Kontext [max]: this model excels at contextual product placement. Include strong environment descriptions and lighting details. Use tag-style prompting with scene context.",
  gpt_image_1:      "Optimize this prompt for GPT Image 1: use clear, direct natural language descriptions. Specify composition, lighting and mood explicitly.",
  flux11_ultra_raw: "Optimize this prompt for FLUX1.1 [pro] Ultra Raw: this model produces hyper-realistic raw-style images. Use photography-accurate language: ISO, aperture, shutter speed metaphors, RAW file aesthetic descriptors, minimal post-processing look.",
};

const STYLES = [
  { id: "studio",        label: "Studio Product" },
  { id: "lifestyle",     label: "Lifestyle / In-Use" },
  { id: "flatlay",       label: "Flat Lay" },
  { id: "dark_moody",    label: "Dark & Moody" },
  { id: "bright",        label: "Bright & Airy" },
  { id: "rustic",        label: "Rustic / Farmhouse" },
  { id: "mediterranean", label: "Mediterranean" },
  { id: "white_bg",      label: "White Seamless" },
  { id: "textured",      label: "Textured Surface" },
  { id: "editorial",     label: "Editorial / Magazine" },
];

const ASPECT_RATIOS = [
  { id: "21_9", label: "Ultra Wide",  ratio: "21:9", w: 84, h: 36 },
  { id: "16_9", label: "Widescreen",  ratio: "16:9", w: 72, h: 40 },
  { id: "4_3",  label: "Classic",     ratio: "4:3",  w: 60, h: 45 },
  { id: "3_2",  label: "Landscape",   ratio: "3:2",  w: 60, h: 40 },
  { id: "5_4",  label: "Wide",        ratio: "5:4",  w: 55, h: 44 },
  { id: "1_1",  label: "Square",      ratio: "1:1",  w: 48, h: 48 },
  { id: "4_5",  label: "Standard",    ratio: "4:5",  w: 44, h: 55 },
  { id: "3_4",  label: "Portrait",    ratio: "3:4",  w: 42, h: 56 },
  { id: "2_3",  label: "Tall",        ratio: "2:3",  w: 38, h: 57 },
  { id: "9_16", label: "Vertical",    ratio: "9:16", w: 34, h: 60 },
  { id: "1_2",  label: "Vert. Strip", ratio: "1:2",  w: 30, h: 60 },
];

const AMAZON_PRESETS = [
  { id: "header",     label: "Header",      dims: "3000×600"       },
  { id: "shoppable",  label: "Shoppable",   dims: "1920×1080+"     },
  { id: "image",      label: "Image",       dims: "3000×16:2400"   },
  { id: "main",       label: "Main Image",  dims: "2400×2400"      },
  { id: "desktop_a",  label: "Desktop A+",  dims: "1464×600 min"   },
  { id: "mobile_a",   label: "Mobile A+",   dims: "600×450 min"    },
];

const SCENES = [
  { id: "white_studio", label: "White Studio"          },
  { id: "marble",       label: "Marble Counter"        },
  { id: "wood",         label: "Rustic Wood Table"     },
  { id: "med_kitchen",  label: "Mediterranean Kitchen" },
  { id: "outdoor",      label: "Outdoor Terrace"       },
  { id: "market",       label: "Farmers Market"        },
  { id: "restaurant",   label: "Restaurant Kitchen"    },
  { id: "linen",        label: "Linen Tablecloth"      },
  { id: "stone",        label: "Stone Surface"         },
  { id: "dark_slate",   label: "Dark Slate"            },
  { id: "herb_garden",  label: "Herb Garden"           },
  { id: "tomato_field", label: "Tomato Field / Farm"   },
];

const ANGLES = [
  { id: "front",    label: "Front"       },
  { id: "3_4",      label: "3/4 Angle"  },
  { id: "hero_low", label: "Hero Low"   },
  { id: "top_down", label: "Top Down"   },
  { id: "side",     label: "Side Profile"},
  { id: "45_above", label: "45° Above"  },
  { id: "worms_eye",label: "Worm's Eye" },
  { id: "dutch",    label: "Dutch Tilt" },
];

const LIGHTING = [
  { id: "natural_soft", label: "Natural Soft"       },
  { id: "dramatic",     label: "Dramatic Low-key"   },
  { id: "studio_soft",  label: "Studio Soft"        },
  { id: "golden_hour",  label: "Golden Hour"        },
  { id: "rim_light",    label: "Rim / Backlit"      },
  { id: "side_light",   label: "Side Light"         },
  { id: "high_key",     label: "High-Key Bright"    },
  { id: "overcast",     label: "Overcast Diffused"  },
  { id: "candlelight",  label: "Candlelight Warm"   },
  { id: "neon",         label: "Neon / Colored Gel" },
];

const POSITIONS = [
  { id: "center",      label: "Center"           },
  { id: "left_third",  label: "Left Third"       },
  { id: "right_third", label: "Right Third"      },
  { id: "fg_offset",   label: "Foreground Offset"},
];

const SCALE_OPTIONS = [
  { id: "full",          label: "Full Product",     sub: "entire label visible" },
  { id: "three_quarter", label: "3/4 View",         sub: "partial crop"         },
  { id: "hero_crop",     label: "Hero Crop",        sub: "top 2/3 only"         },
  { id: "detail",        label: "Detail / Close-up",sub: "macro"               },
  { id: "mini_scene",    label: "Mini in Scene",    sub: "ambient prop"         },
  { id: "oversized",     label: "Oversized",        sub: "dominant frame"       },
];

const RESOLUTIONS = [
  { id: "1k",    label: "1K",  sub: "1024×1024"  },
  { id: "15_10", label: "1.5K",sub: "1536×1024"  },
  { id: "10_15", label: "1.5K",sub: "1024×1536"  },
  { id: "2k",    label: "2K",  sub: "2048×2048"  },
  { id: "4k",    label: "4K",  sub: "4096×4096"  },
];




// ── LABEL PLACEMENT ──────────────────────────────────────────────────────────
const LABEL_WRAP = [
  { id: "wrap_full",    label: "Full Wrap",       sub: "360° around bottle" },
  { id: "wrap_front",   label: "Front Panel",     sub: "front-facing only" },
  { id: "wrap_center",  label: "Centered Band",   sub: "horizontal mid-band" },
  { id: "wrap_top",     label: "Upper Body",      sub: "above shoulder" },
  { id: "wrap_bottom",  label: "Lower Body",      sub: "below equator" },
];

const LABEL_ALIGNMENT = [
  { id: "align_center", label: "Center",    sub: "horizontally centered" },
  { id: "align_left",   label: "Left",      sub: "left-aligned" },
  { id: "align_right",  label: "Right",     sub: "right-aligned" },
  { id: "align_slight", label: "Slight Tilt", sub: "natural slight rotation" },
];

const LABEL_CONDITION = [
  { id: "cond_pristine", label: "Pristine",      sub: "perfect, no imperfections" },
  { id: "cond_natural",  label: "Natural",        sub: "subtle real-world micro-wrinkles" },
  { id: "cond_worn",     label: "Worn / Rustic",  sub: "aged, slightly worn edges" },
];

const LABEL_FINISH = [
  { id: "finish_matte",   label: "Matte",       sub: "no gloss, flat finish" },
  { id: "finish_gloss",   label: "Glossy",      sub: "high-gloss laminate" },
  { id: "finish_semi",    label: "Semi-Gloss",  sub: "soft sheen" },
  { id: "finish_kraft",   label: "Kraft Paper", sub: "natural uncoated paper" },
];

const FLUX_MODELS = new Set(["flux2_pro", "flux1_kontext", "flux11_ultra_raw"]);

// ── PALETTE ──────────────────────────────────────────────────────────────────
const C = {
  bg:          "#111111",
  sidebar:     "#161616",
  card:        "#1e1e1e",
  border:      "#2a2a2a",
  borderLight: "#333",
  accent:      "#c0392b",
  accentGlow:  "#e74c3c",
  accentDim:   "#7a1f18",
  green:       "#27ae60",
  text:        "#e8e8e8",
  textDim:     "#888",
  textMuted:   "#555",
};

// ── DROP ZONE ─────────────────────────────────────────────────────────────────
function DropZone({ label, sublabel, image, onImage, onClear }) {
  const [dragging, setDragging] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef();

  const handleFile = (file) => {
    if (!file || !file.type.startsWith("image/")) return;
    setLoading(true);
    const reader = new FileReader();
    reader.onload = (e) => {
      onImage(e.target.result, file.name);
      setLoading(false);
    };
    reader.onerror = () => setLoading(false);
    reader.readAsDataURL(file);
  };

  const onDrop = (e) => {
    e.preventDefault(); setDragging(false);
    handleFile(e.dataTransfer.files[0]);
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
      <div style={{
        fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em",
        color: C.accent, textTransform: "uppercase",
        display: "flex", alignItems: "baseline", gap: "8px",
      }}>
        {label}
        {sublabel && <span style={{ fontSize: "11px", color: C.textDim, fontWeight: "400", letterSpacing: 0, textTransform: "none" }}>{sublabel}</span>}
      </div>
      <div
        onClick={() => !image && inputRef.current.click()}
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={onDrop}
        style={{
          position: "relative",
          height: "130px",
          border: `1.5px dashed ${dragging ? C.accentGlow : image ? C.accent : C.borderLight}`,
          borderRadius: "8px",
          background: dragging ? "rgba(192,57,43,0.08)" : image ? "transparent" : C.card,
          cursor: image ? "default" : "pointer",
          overflow: "hidden",
          transition: "all 0.15s",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}
      >
        {loading ? (
          <div style={{ textAlign: "center", pointerEvents: "none" }}>
            <div style={{ fontSize: "11px", color: C.textDim }}>Loading...</div>
          </div>
        ) : image ? (
          <>
            <img src={image} alt="" style={{ width: "100%", height: "100%", objectFit: "contain", padding: "8px" }} />
            <button
              onClick={(e) => { e.stopPropagation(); onClear(); inputRef.current.value = ""; }}
              style={{
                position: "absolute", top: "6px", right: "6px",
                background: "rgba(0,0,0,0.75)", border: `1px solid ${C.borderLight}`,
                borderRadius: "4px", color: "#fff", fontSize: "10px",
                padding: "2px 7px", cursor: "pointer", fontFamily: "inherit",
              }}
            >✕</button>
          </>
        ) : (
          <div style={{ textAlign: "center", pointerEvents: "none" }}>
            <div style={{ fontSize: "22px", marginBottom: "8px", opacity: 0.25 }}>+</div>
            <div style={{ fontSize: "11px", color: C.textMuted }}>Drop or click</div>
          </div>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => { handleFile(e.target.files[0]); e.target.value = ""; }}
      />
    </div>
  );
}

// ── HELPERS ───────────────────────────────────────────────────────────────────
function Grid({ cols = 4, gap = 6, children }) {
  return (
    <div style={{ display: "grid", gridTemplateColumns: `repeat(${cols}, 1fr)`, gap }}>
      {children}
    </div>
  );
}

function SectionLabel({ children, count, total, sub }) {
  return (
    <div style={{
      fontSize: "11px", fontWeight: "700", letterSpacing: "0.1em",
      color: C.accent, textTransform: "uppercase", marginBottom: "10px",
      display: "flex", alignItems: "baseline", gap: "8px",
    }}>
      {children}
      {(count !== undefined && total !== undefined) &&
        <span style={{ fontSize: "10px", color: C.textDim, fontWeight: "400", letterSpacing: 0 }}>{count}/{total}</span>}
      {sub && <span style={{ fontSize: "11px", color: C.textDim, fontWeight: "400", letterSpacing: 0, textTransform: "none" }}>{sub}</span>}
    </div>
  );
}

function OnOff({ label, sub, on, onClick }) {
  return (
    <div
      onClick={onClick}
      style={{
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "9px 12px",
        background: on ? "rgba(192,57,43,0.18)" : C.card,
        border: `1px solid ${on ? C.accent : C.border}`,
        borderRadius: "6px", cursor: "pointer",
        transition: "all 0.15s", gap: "8px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column", gap: "1px", minWidth: 0 }}>
        <span style={{ fontSize: "12.5px", fontWeight: on ? "600" : "400", color: on ? "#fff" : C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {label}
        </span>
        {sub && <span style={{ fontSize: "10px", color: C.textDim }}>{sub}</span>}
      </div>
      <span style={{
        fontSize: "9px", fontWeight: "700", letterSpacing: "0.08em",
        padding: "2px 6px", borderRadius: "3px", flexShrink: 0,
        background: on ? C.green : C.border,
        color: on ? "#fff" : C.textDim,
      }}>{on ? "ON" : "OFF"}</span>
    </div>
  );
}

const Divider = () => <div style={{ borderBottom: `1px solid ${C.border}`, margin: "20px 0" }} />;

function ModelIcon({ type }) {
  if (type === "openai") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, opacity: 0.85 }}>
      <path d="M22.282 9.821a5.985 5.985 0 0 0-.516-4.91 6.046 6.046 0 0 0-6.51-2.9A6.065 6.065 0 0 0 4.981 4.18a5.985 5.985 0 0 0-3.998 2.9 6.046 6.046 0 0 0 .743 7.097 5.98 5.98 0 0 0 .51 4.911 6.051 6.051 0 0 0 6.515 2.9A5.985 5.985 0 0 0 13.26 24a6.056 6.056 0 0 0 5.772-4.206 5.99 5.99 0 0 0 3.997-2.9 6.056 6.056 0 0 0-.747-7.073zM13.26 22.43a4.476 4.476 0 0 1-2.876-1.04l.141-.081 4.779-2.758a.795.795 0 0 0 .392-.681v-6.737l2.02 1.168a.071.071 0 0 1 .038.052v5.583a4.504 4.504 0 0 1-4.494 4.494zM3.6 18.304a4.47 4.47 0 0 1-.535-3.014l.142.085 4.783 2.759a.771.771 0 0 0 .78 0l5.843-3.369v2.332a.08.08 0 0 1-.033.062L9.74 19.95a4.5 4.5 0 0 1-6.14-1.646zM2.34 7.896a4.485 4.485 0 0 1 2.366-1.973V11.6a.766.766 0 0 0 .388.677l5.815 3.355-2.02 1.168a.076.076 0 0 1-.071 0l-4.83-2.786A4.504 4.504 0 0 1 2.34 7.872zm16.597 3.855l-5.843-3.371 2.019-1.164a.076.076 0 0 1 .071 0l4.83 2.786a4.494 4.494 0 0 1-.676 8.105v-5.677a.79.79 0 0 0-.4-.68zm2.010-3.023l-.141-.085-4.774-2.782a.776.776 0 0 0-.785 0L9.409 9.23V6.897a.066.066 0 0 1 .028-.061l4.83-2.787a4.5 4.5 0 0 1 6.68 4.66zm-12.64 4.135l-2.02-1.164a.08.08 0 0 1-.038-.057V6.075a4.5 4.5 0 0 1 7.375-3.453l-.142.08L8.704 5.46a.795.795 0 0 0-.393.681zm1.097-2.365l2.602-1.5 2.607 1.5v2.999l-2.597 1.5-2.607-1.5z"/>
    </svg>
  );
  if (type === "google") return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
      <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
      <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
      <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
      <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
    </svg>
  );
  // flux / black forest labs
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style={{ flexShrink: 0, opacity: 0.75 }}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
    </svg>
  );
}

// ── APP ───────────────────────────────────────────────────────────────────────
export default function APSOGOGenerator() {
  const [activeSku, setActiveSku]     = useState("crushed_ginger");
  const [activeModel, setActiveModel] = useState("flux2_pro");
  const [productImg, setProductImg]   = useState(null);
  const [labelImg, setLabelImg]       = useState(null);
  const [labelNotes, setLabelNotes]   = useState("");
  const [additionalNotes, setAdditionalNotes] = useState("");
  const [manualRatio, setManualRatio] = useState("");
  const [generating, setGenerating]   = useState(false);
  const [output, setOutput]           = useState("");
  const [negOutput, setNegOutput]     = useState("");
  const [copied, setCopied]           = useState(false);
  const [copiedNeg, setCopiedNeg]     = useState(false);
  const abortRef = useRef(null);

  const [styleOn, setStyleOn]   = useState({});
  const [arOn, setArOn]         = useState({});
  const [amazonOn, setAmazonOn] = useState({});
  const [scaleOn, setScaleOn]   = useState({});
  const [posOn, setPosOn]       = useState({});
  const [sceneOn, setSceneOn]   = useState({});
  const [angleOn, setAngleOn]   = useState({});
  const [lightOn, setLightOn]   = useState({});
  const [resOn, setResOn]       = useState({});
  const [labelWrap, setLabelWrap]         = useState("");
  const [labelAlign, setLabelAlign]       = useState("");
  const [labelCondition, setLabelCondition] = useState("");
  const [labelFinish, setLabelFinish]     = useState("");

  const toggle = (setter) => (id) => setter(p => ({ ...p, [id]: !p[id] }));
  const countOn = (obj) => Object.values(obj).filter(Boolean).length;
  const getOn = (dict, data) => data.filter(d => dict[d.id]).map(d => d.label).join(", ");

  const activeSKU = SKUS.find(s => s.id === activeSku);

  const buildBrief = useCallback(() => {
    const parts = [];
    const sku = SKUS.find(s => s.id === activeSku);
    if (sku) parts.push(`Product: ${sku.label}${sku.sub ? ` (${sku.sub})` : ""}`);
    const styleStr = getOn(styleOn, STYLES);
    if (styleStr) parts.push(`Style: ${styleStr}`);
    if (productImg) parts.push(`Product reference image: uploaded`);
    if (labelImg) parts.push(`Label reference image: uploaded`);
    if (labelNotes) parts.push(`Label notes: ${labelNotes}`);
    const arStr = getOn(arOn, ASPECT_RATIOS);
    if (arStr) parts.push(`Aspect ratio: ${arStr}`);
    if (manualRatio) parts.push(`Custom ratio: ${manualRatio}`);
    const amzStr = getOn(amazonOn, AMAZON_PRESETS);
    if (amzStr) parts.push(`Amazon preset: ${amzStr}`);
    const scaleStr = getOn(scaleOn, SCALE_OPTIONS);
    if (scaleStr) parts.push(`Scale: ${scaleStr}`);
    const posStr = getOn(posOn, POSITIONS);
    if (posStr) parts.push(`Position: ${posStr}`);
    const sceneStr = getOn(sceneOn, SCENES);
    if (sceneStr) parts.push(`Scene: ${sceneStr}`);
    const angleStr = getOn(angleOn, ANGLES);
    if (angleStr) parts.push(`Angle: ${angleStr}`);
    const lightStr = getOn(lightOn, LIGHTING);
    if (lightStr) parts.push(`Lighting: ${lightStr}`);
    const resStr = getOn(resOn, RESOLUTIONS);
    if (resStr) parts.push(`Resolution: ${resStr}`);
    // Label placement
    const labelPlacementParts = [];
    if (labelWrap)      { const f = LABEL_WRAP.find(x=>x.id===labelWrap);       if(f) labelPlacementParts.push(`wrap: ${f.label} (${f.sub})`); }
    if (labelAlign)     { const f = LABEL_ALIGNMENT.find(x=>x.id===labelAlign); if(f) labelPlacementParts.push(`alignment: ${f.label}`); }
    if (labelCondition) { const f = LABEL_CONDITION.find(x=>x.id===labelCondition); if(f) labelPlacementParts.push(`condition: ${f.label}`); }
    if (labelFinish)    { const f = LABEL_FINISH.find(x=>x.id===labelFinish);   if(f) labelPlacementParts.push(`finish: ${f.label}`); }
    if (labelPlacementParts.length) parts.push(`Label placement — ${labelPlacementParts.join(", ")}`);
    if (additionalNotes) parts.push(`Additional: ${additionalNotes}`);
    return parts.join(". ");
  }, [activeSku, activeModel, styleOn, productImg, labelImg, labelNotes, arOn, manualRatio, amazonOn, scaleOn, posOn, sceneOn, angleOn, lightOn, resOn, labelWrap, labelAlign, labelCondition, labelFinish, additionalNotes]);

  const liveBrief = buildBrief();

  // Strip the data:image/xxx;base64, prefix and return { type, data }
  const parseDataUrl = (dataUrl) => {
    const match = dataUrl.match(/^data:(image\/[a-zA-Z+]+);base64,(.+)$/);
    if (!match) return null;
    return { mediaType: match[1], data: match[2] };
  };

  const handleGenerate = async () => {
    if (generating) { abortRef.current?.abort(); setGenerating(false); return; }
    if (!liveBrief.trim()) return;
    setGenerating(true); setOutput(""); setNegOutput("");
    const controller = new AbortController();
    abortRef.current = controller;
    try {
      // Build multipart content — images first, then text brief
      const userContent = [];

      if (productImg) {
        const parsed = parseDataUrl(productImg);
        if (parsed) {
          userContent.push({ type: "text", text: "Product reference image (use this to describe the exact bottle shape, label design, colors, and typography):" });
          userContent.push({ type: "image", source: { type: "base64", media_type: parsed.mediaType, data: parsed.data } });
        }
      }

      if (labelImg) {
        const parsed = parseDataUrl(labelImg);
        if (parsed) {
          userContent.push({ type: "text", text: "Label reference image (use this for exact label colors, text, and graphic elements):" });
          userContent.push({ type: "image", source: { type: "base64", media_type: parsed.mediaType, data: parsed.data } });
        }
      }

      userContent.push({
        type: "text",
        text: `Target model: ${MODELS.find(m => m.id === activeModel)?.label}

Generate image prompt from this brief:
${liveBrief}`
      });

      const res = await fetch("/api/claude", {
        method: "POST", signal: controller.signal,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-6", max_tokens: 1000,
          system: `You are an expert AI image generation prompt engineer for APSOGO, a premium Greek organic tomato brand.
Transform the user's product brief into a rich, highly detailed, ready-to-use image generation prompt.
${MODEL_PROMPTING[activeModel] || ""}
If reference images are provided, study them carefully and describe the exact product appearance — bottle shape, label colors, typography, graphic elements, and any text visible — so the AI image model can reproduce them accurately.
Emphasize product accuracy, organic/Mediterranean brand identity, and professional food photography craft.
If a label placement brief is included, describe precisely how the label wraps around the bottle — its curvature, alignment, finish, and condition — so the AI model can render it physically accurately on the 3D surface of the bottle.
${FLUX_MODELS.has(activeModel) ? `Output EXACTLY two lines. Line 1 starts with "POSITIVE:" followed by the positive prompt. Line 2 starts with "NEGATIVE:" followed by a negative prompt listing what to avoid (blurry, deformed label, wrong colors, distorted text, plastic look, fake product, low quality, watermark, oversaturated, bad lighting, ugly, unrealistic). No other text.` : "Output ONLY the final prompt string — no preamble, no explanation, no markdown."}`,
          messages: [{ role: "user", content: userContent }],
        }),
      });
      if (!res.ok) {
        const errBody = await res.json().catch(() => ({}));
        const code = errBody?.error?.type || `HTTP ${res.status}`;
        const msg  = errBody?.error?.message || res.statusText;
        setOutput(`Error [${code}]: ${msg}`);
        return;
      }
      const data = await res.json();
      if (data.error) {
        setOutput(`Error [${data.error.type}]: ${data.error.message}`);
        return;
      }
      const text = data.content?.map(b => b.text || "").join("") || "Error: empty response from API.";
      if (FLUX_MODELS.has(activeModel)) {
        const posMatch = text.match(/POSITIVE:\s*(.+?)(?=NEGATIVE:|$)/si);
        const negMatch = text.match(/NEGATIVE:\s*(.+)/si);
        setOutput(posMatch ? posMatch[1].trim() : text);
        setNegOutput(negMatch ? negMatch[1].trim() : "");
      } else {
        setOutput(text);
        setNegOutput("");
      }
    } catch (e) {
      if (e.name !== "AbortError") setOutput("Stopped.");
    } finally { setGenerating(false); }
  };

  const doCopy = (text, onDone) => {
    const tryClipboard = () => {
      if (navigator.clipboard && navigator.clipboard.writeText) {
        return navigator.clipboard.writeText(text);
      }
      return Promise.reject("no clipboard API");
    };
    tryClipboard().catch(() => {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.cssText = "position:fixed;top:0;left:0;opacity:0;pointer-events:none;";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      try { document.execCommand("copy"); } catch(e) {}
      document.body.removeChild(ta);
    }).finally(onDone);
  };

  const handleCopy    = () => doCopy(output,    () => { setCopied(true);    setTimeout(() => setCopied(false),    2000); });
  const handleCopyNeg = () => doCopy(negOutput, () => { setCopiedNeg(true); setTimeout(() => setCopiedNeg(false), 2000); });

  return (
    <div style={{ display: "flex", height: "100vh", background: C.bg, fontFamily: "'Inter', -apple-system, sans-serif", color: C.text, overflow: "hidden", fontSize: "13px" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 5px; height: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: #333; border-radius: 3px; }
        @keyframes spin { to { transform: rotate(360deg); } }
      `}</style>

      {/* ── SIDEBAR ── */}
      <div style={{ width: "216px", minWidth: "216px", background: C.sidebar, borderRight: `1px solid ${C.border}`, display: "flex", flexDirection: "column", overflow: "hidden", height: "calc(100vh - 54px)", position: "sticky", top: "54px", alignSelf: "flex-start" }}>

        {/* MODEL SELECTOR */}
        <div style={{ padding: "14px 14px 10px", borderBottom: `1px solid ${C.border}`, fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em", color: C.textMuted, textTransform: "uppercase" }}>
          MODEL
        </div>
        <div style={{ padding: "6px", borderBottom: `1px solid ${C.border}` }}>
          {MODELS.map(m => {
            const mColor = m.icon === "openai" ? "#34d399" : m.icon === "google" ? "#60a5fa" : "#fbbf24";
            const isActive = activeModel === m.id;
            return (
              <div key={m.id} onClick={() => setActiveModel(m.id)}
                style={{ display: "flex", alignItems: "center", gap: "9px", padding: "6px 10px", borderRadius: "6px", cursor: "pointer", marginBottom: "1px", transition: "all 0.15s", background: isActive ? mColor + "18" : "transparent", border: `1px solid ${isActive ? mColor + "55" : "transparent"}` }}>
                <div style={{ width: "7px", height: "7px", borderRadius: "50%", background: mColor, flexShrink: 0, opacity: isActive ? 1 : 0.45 }} />
                <div style={{ display: "flex", flexDirection: "column", gap: "1px", minWidth: 0 }}>
                  <span style={{ fontSize: "11px", fontWeight: isActive ? "600" : "400", color: isActive ? "#fff" : C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{m.label}</span>
                  <span style={{ fontSize: "8.5px", color: C.textDim }}>{m.note || (m.hasNegative ? "POS + NEG" : "INLINE")}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* SKU LIST */}
        <div style={{ padding: "14px 14px 10px", borderBottom: `1px solid ${C.border}`, fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em", color: C.textMuted, textTransform: "uppercase" }}>
          APSOGO SKU
        </div>
        <div style={{ overflowY: "auto", flex: 1, padding: "6px" }}>
          {SKUS.map(sku => {
            const isActive = activeSku === sku.id;
            return (
              <div key={sku.id} onClick={() => setActiveSku(sku.id)}
                style={{ display: "flex", alignItems: "center", gap: "9px", padding: "6px 8px", borderRadius: "6px", background: isActive ? C.accentDim : "transparent", border: `1px solid ${isActive ? C.accent : "transparent"}`, cursor: "pointer", marginBottom: "2px", transition: "all 0.15s" }}>
                {sku.thumb ? (
                  <img src={sku.thumb} alt="" style={{ width: "28px", height: "38px", objectFit: "contain", borderRadius: "3px", flexShrink: 0, background: "#111" }} />
                ) : (
                  <div style={{ width: "28px", height: "38px", borderRadius: "3px", background: C.border, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ fontSize: "14px", opacity: 0.4 }}>🍅</span>
                  </div>
                )}
                <div style={{ display: "flex", flexDirection: "column", gap: "1px", minWidth: 0 }}>
                  <span style={{ fontSize: "11px", fontWeight: isActive ? "600" : "400", color: isActive ? "#fff" : C.text, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sku.label}</span>
                  {sku.sub && <span style={{ fontSize: "8.5px", color: C.textDim, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{sku.sub}</span>}
                </div>
              </div>
            );
          })}
        </div>
        {activeSKU && (
          <div style={{ padding: "12px", borderTop: `1px solid ${C.border}`, fontSize: "11px" }}>
            <div style={{ color: C.textMuted, fontSize: "10px", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: "4px" }}>Container</div>
            <div style={{ color: C.text }}>{activeSKU.sub || "custom format"}</div>
          </div>
        )}

        {/* ── Footer: LORA + DATA PREP ── */}
        <div style={{ borderTop: `1px solid ${C.border}`, padding: "8px 10px", display: "flex", gap: "6px", flexShrink: 0, marginTop: "auto" }}>
          <button style={{ flex: 1, padding: "7px 6px", borderRadius: "6px", cursor: "default", fontSize: "8.5px", fontWeight: "700", letterSpacing: "0.06em", background: "#18181b", border: `1px solid ${C.border}`, color: "#52525b" }}>
            ⚙ LORA
          </button>
          <button style={{ flex: 1, padding: "7px 6px", borderRadius: "6px", cursor: "default", fontSize: "8.5px", fontWeight: "700", letterSpacing: "0.06em", background: "#18181b", border: `1px solid ${C.border}`, color: "#52525b" }}>
            📁 DATA
          </button>
        </div>
      </div>

      {/* ── MAIN ── */}
      <div style={{ flex: 1, overflowY: "auto", padding: "20px 24px 48px" }}>

        <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.12em", color: C.textMuted, textTransform: "uppercase", marginBottom: "18px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <span>IMAGE REFERENCES — {activeSKU?.label}</span>
          <span style={{ color: C.accent, letterSpacing: "0.06em" }}>{MODELS.find(m => m.id === activeModel)?.label}</span>
        </div>

        {/* ── PRODUCT REF / LABEL REF — two drop zones ── */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "4px" }}>
          <DropZone
            label="Product Ref"
            sublabel="Your product — preserves sizing & identity"
            image={productImg}
            onImage={(url) => setProductImg(url)}
            onClear={() => setProductImg(null)}
          />
          <DropZone
            label="Label Ref"
            sublabel="Label artwork — for label accuracy"
            image={labelImg}
            onImage={(url) => setLabelImg(url)}
            onClear={() => setLabelImg(null)}
          />
        </div>

        {/* STYLE selectors */}
        <div style={{ marginTop: "14px", marginBottom: "4px" }}>
          <SectionLabel sub="Select one or more styles to embed into prompt">STYLE</SectionLabel>
          <Grid cols={5} gap={6}>
            {STYLES.map(s => (
              <OnOff key={s.id} label={s.label} on={!!styleOn[s.id]} onClick={() => toggle(setStyleOn)(s.id)} />
            ))}
          </Grid>
        </div>



        <Divider />

        {/* LABEL PLACEMENT */}
        <div style={{ marginBottom: "20px" }}>
          <SectionLabel sub="how the label sits on the bottle — injected into prompt">LABEL PLACEMENT</SectionLabel>
          <div style={{ display: "flex", flexDirection: "column", gap: "14px" }}>

            {/* Wrap */}
            <div>
              <div style={{ fontSize: "10px", color: C.textDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Wrap Style</div>
              <Grid cols={3} gap={6}>
                {LABEL_WRAP.map(s => {
                  const on = labelWrap === s.id;
                  return (
                    <div key={s.id} onClick={() => setLabelWrap(on ? "" : s.id)}
                      style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", background: on?"rgba(192,57,43,0.18)":C.card, border:`1px solid ${on?C.accent:C.border}`, borderRadius:"6px", cursor:"pointer", transition:"all 0.15s", gap:"8px" }}>
                      <div style={{ display:"flex", flexDirection:"column", gap:"1px" }}>
                        <span style={{ fontSize:"12.5px", fontWeight: on?"600":"400", color: on?"#fff":C.text }}>{s.label}</span>
                        <span style={{ fontSize:"10px", color:C.textDim }}>{s.sub}</span>
                      </div>
                      <span style={{ fontSize:"9px", fontWeight:"700", letterSpacing:"0.08em", padding:"2px 6px", borderRadius:"3px", background: on?C.green:C.border, color: on?"#fff":C.textDim, flexShrink:0 }}>{on?"ON":"OFF"}</span>
                    </div>
                  );
                })}
              </Grid>
            </div>

            {/* Alignment */}
            <div>
              <div style={{ fontSize: "10px", color: C.textDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Alignment</div>
              <Grid cols={4} gap={6}>
                {LABEL_ALIGNMENT.map(s => {
                  const on = labelAlign === s.id;
                  return (
                    <div key={s.id} onClick={() => setLabelAlign(on ? "" : s.id)}
                      style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", background: on?"rgba(192,57,43,0.18)":C.card, border:`1px solid ${on?C.accent:C.border}`, borderRadius:"6px", cursor:"pointer", transition:"all 0.15s", gap:"8px" }}>
                      <div style={{ display:"flex", flexDirection:"column", gap:"1px" }}>
                        <span style={{ fontSize:"12.5px", fontWeight: on?"600":"400", color: on?"#fff":C.text }}>{s.label}</span>
                        <span style={{ fontSize:"10px", color:C.textDim }}>{s.sub}</span>
                      </div>
                      <span style={{ fontSize:"9px", fontWeight:"700", letterSpacing:"0.08em", padding:"2px 6px", borderRadius:"3px", background: on?C.green:C.border, color: on?"#fff":C.textDim, flexShrink:0 }}>{on?"ON":"OFF"}</span>
                    </div>
                  );
                })}
              </Grid>
            </div>

            {/* Condition + Finish side by side */}
            <div style={{ display:"grid", gridTemplateColumns:"1fr 1fr", gap:"16px" }}>
              <div>
                <div style={{ fontSize: "10px", color: C.textDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Condition</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                  {LABEL_CONDITION.map(s => {
                    const on = labelCondition === s.id;
                    return (
                      <div key={s.id} onClick={() => setLabelCondition(on ? "" : s.id)}
                        style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", background: on?"rgba(192,57,43,0.18)":C.card, border:`1px solid ${on?C.accent:C.border}`, borderRadius:"6px", cursor:"pointer", transition:"all 0.15s", gap:"8px" }}>
                        <div style={{ display:"flex", flexDirection:"column", gap:"1px" }}>
                          <span style={{ fontSize:"12.5px", fontWeight: on?"600":"400", color: on?"#fff":C.text }}>{s.label}</span>
                          <span style={{ fontSize:"10px", color:C.textDim }}>{s.sub}</span>
                        </div>
                        <span style={{ fontSize:"9px", fontWeight:"700", letterSpacing:"0.08em", padding:"2px 6px", borderRadius:"3px", background: on?C.green:C.border, color: on?"#fff":C.textDim, flexShrink:0 }}>{on?"ON":"OFF"}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
              <div>
                <div style={{ fontSize: "10px", color: C.textDim, letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: "6px" }}>Label Finish</div>
                <div style={{ display:"flex", flexDirection:"column", gap:"6px" }}>
                  {LABEL_FINISH.map(s => {
                    const on = labelFinish === s.id;
                    return (
                      <div key={s.id} onClick={() => setLabelFinish(on ? "" : s.id)}
                        style={{ display:"flex", alignItems:"center", justifyContent:"space-between", padding:"9px 12px", background: on?"rgba(192,57,43,0.18)":C.card, border:`1px solid ${on?C.accent:C.border}`, borderRadius:"6px", cursor:"pointer", transition:"all 0.15s", gap:"8px" }}>
                        <div style={{ display:"flex", flexDirection:"column", gap:"1px" }}>
                          <span style={{ fontSize:"12.5px", fontWeight: on?"600":"400", color: on?"#fff":C.text }}>{s.label}</span>
                          <span style={{ fontSize:"10px", color:C.textDim }}>{s.sub}</span>
                        </div>
                        <span style={{ fontSize:"9px", fontWeight:"700", letterSpacing:"0.08em", padding:"2px 6px", borderRadius:"3px", background: on?C.green:C.border, color: on?"#fff":C.textDim, flexShrink:0 }}>{on?"ON":"OFF"}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

          </div>
        </div>

        <Divider />

        {/* ASPECT RATIO */}
        <div style={{ marginBottom: "20px" }}>
          <SectionLabel>ASPECT RATIO</SectionLabel>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap", marginBottom: "10px" }}>
            {ASPECT_RATIOS.map(ar => {
              const on = !!arOn[ar.id];
              return (
                <div
                  key={ar.id}
                  onClick={() => toggle(setArOn)(ar.id)}
                  style={{
                    display: "flex", flexDirection: "column", alignItems: "center",
                    justifyContent: "center", gap: "7px", padding: "10px 8px",
                    background: on ? "rgba(192,57,43,0.18)" : C.card,
                    border: `1px solid ${on ? C.accent : C.border}`,
                    borderRadius: "7px", cursor: "pointer", transition: "all 0.15s", minWidth: "70px",
                  }}
                >
                  <div style={{ width: ar.w * 0.55 + "px", height: ar.h * 0.55 + "px", border: `1.5px solid ${on ? C.accentGlow : C.borderLight}`, borderRadius: "2px", background: on ? "rgba(192,57,43,0.25)" : "transparent", flexShrink: 0 }} />
                  <div style={{ fontSize: "11px", color: on ? "#fff" : C.textDim, fontWeight: on ? "600" : "400" }}>{ar.label}</div>
                  <div style={{ fontSize: "10px", color: on ? C.accentGlow : C.textMuted }}>{ar.ratio}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <span style={{ fontSize: "11px", color: C.textMuted, whiteSpace: "nowrap" }}>MANUAL</span>
            <input
              style={{ background: C.card, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "8px 12px", color: C.text, fontFamily: "inherit", fontSize: "12.5px", outline: "none", flex: 1 }}
              placeholder="e.g. 7:2"
              value={manualRatio}
              onChange={e => setManualRatio(e.target.value)}
            />
          </div>
        </div>

        <Divider />

        {/* AMAZON PRESETS */}
        <div style={{ marginBottom: "20px" }}>
          <SectionLabel>AMAZON PRESETS</SectionLabel>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {AMAZON_PRESETS.map(a => {
              const on = !!amazonOn[a.id];
              return (
                <div
                  key={a.id}
                  onClick={() => toggle(setAmazonOn)(a.id)}
                  style={{
                    display: "flex", alignItems: "center", justifyContent: "space-between",
                    padding: "10px 13px", flex: "1 1 140px",
                    background: on ? "rgba(192,57,43,0.18)" : C.card,
                    border: `1px solid ${on ? C.accent : C.border}`,
                    borderRadius: "6px", cursor: "pointer", transition: "all 0.15s", gap: "12px",
                  }}
                >
                  <div>
                    <div style={{ fontSize: "12.5px", fontWeight: "600", color: on ? "#fff" : C.text, marginBottom: "2px" }}>{a.label}</div>
                    <div style={{ fontSize: "10px", color: C.textDim }}>{a.dims}</div>
                  </div>
                  <span style={{ fontSize: "9px", fontWeight: "700", letterSpacing: "0.08em", padding: "2px 6px", borderRadius: "3px", background: on ? C.green : C.border, color: on ? "#fff" : C.textDim, flexShrink: 0 }}>
                    {on ? "ON" : "OFF"}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        <Divider />

        {/* PRODUCT SCALE GUIDE */}
        <div style={{ marginBottom: "20px" }}>
          <SectionLabel sub="set exact product size & position">PRODUCT SCALE GUIDE</SectionLabel>
          <Grid cols={3} gap={6}>
            {SCALE_OPTIONS.map(s => <OnOff key={s.id} label={s.label} sub={s.sub} on={!!scaleOn[s.id]} onClick={() => toggle(setScaleOn)(s.id)} />)}
          </Grid>
        </div>

        <Divider />

        {/* POSITION */}
        <div style={{ marginBottom: "20px" }}>
          <SectionLabel count={countOn(posOn)} total={POSITIONS.length}>POSITION</SectionLabel>
          <Grid cols={4} gap={6}>
            {POSITIONS.map(p => <OnOff key={p.id} label={p.label} on={!!posOn[p.id]} onClick={() => toggle(setPosOn)(p.id)} />)}
          </Grid>
        </div>

        <Divider />

        {/* SCENE */}
        <div style={{ marginBottom: "20px" }}>
          <SectionLabel count={countOn(sceneOn)} total={SCENES.length}>SCENE</SectionLabel>
          <Grid cols={4} gap={6}>
            {SCENES.map(s => <OnOff key={s.id} label={s.label} on={!!sceneOn[s.id]} onClick={() => toggle(setSceneOn)(s.id)} />)}
          </Grid>
        </div>

        <Divider />

        {/* ANGLE */}
        <div style={{ marginBottom: "20px" }}>
          <SectionLabel count={countOn(angleOn)} total={ANGLES.length}>ANGLE</SectionLabel>
          <Grid cols={4} gap={6}>
            {ANGLES.map(a => <OnOff key={a.id} label={a.label} on={!!angleOn[a.id]} onClick={() => toggle(setAngleOn)(a.id)} />)}
          </Grid>
        </div>

        <Divider />

        {/* LIGHTING */}
        <div style={{ marginBottom: "20px" }}>
          <SectionLabel count={countOn(lightOn)} total={LIGHTING.length}>LIGHTING</SectionLabel>
          <Grid cols={4} gap={6}>
            {LIGHTING.map(l => <OnOff key={l.id} label={l.label} on={!!lightOn[l.id]} onClick={() => toggle(setLightOn)(l.id)} />)}
          </Grid>
        </div>

        <Divider />

          {/* RESOLUTION */}
        <div style={{ marginBottom: "20px" }}>
          <SectionLabel>RESOLUTION</SectionLabel>
          <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
            {RESOLUTIONS.map(r => <OnOff key={r.id} label={r.label} sub={r.sub} on={!!resOn[r.id]} onClick={() => toggle(setResOn)(r.id)} />)}
          </div>
        </div>

        <Divider />

        {/* ADDITIONAL NOTES */}
        <div style={{ marginBottom: "20px" }}>
          <SectionLabel>ADDITIONAL NOTES</SectionLabel>
          <textarea
            style={{ width: "100%", background: C.card, border: `1px solid ${C.border}`, borderRadius: "6px", padding: "10px 12px", color: C.text, fontFamily: "inherit", fontSize: "12.5px", resize: "vertical", outline: "none", minHeight: "72px" }}
            value={additionalNotes}
            onChange={e => setAdditionalNotes(e.target.value)}
            placeholder="Any extra details, references, or specific requirements..."
          />
        </div>

        <Divider />



        {/* LIVE BRIEF */}
        {liveBrief && (
          <div style={{ marginBottom: "16px" }}>
            <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", color: C.textMuted, textTransform: "uppercase", marginBottom: "8px" }}>LIVE BRIEF PREVIEW</div>
            <div style={{ background: "#0e0e0e", border: `1px solid ${C.border}`, borderRadius: "8px", padding: "16px", fontSize: "12.5px", lineHeight: "1.75", color: C.accentGlow, minHeight: "60px", fontFamily: "monospace" }}>
              {liveBrief}
            </div>
          </div>
        )}

        {/* GENERATE */}
        <button
          onClick={handleGenerate}
          style={{
            width: "100%", padding: "14px", border: "none", borderRadius: "8px",
            background: generating ? "#8a4a3a" : (liveBrief ? C.accent : "#2a2a2a"),
            color: liveBrief || generating ? "#fff" : C.textMuted,
            fontSize: "14px", fontWeight: "700", letterSpacing: "0.05em",
            cursor: liveBrief || generating ? "pointer" : "not-allowed",
            transition: "all 0.2s", fontFamily: "inherit",
          }}
        >
          {generating ? (
            <span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
              <span style={{ width: "13px", height: "13px", borderRadius: "50%", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", animation: "spin 0.7s linear infinite", display: "inline-block" }} />
              GENERATING… CLICK TO STOP
            </span>
          ) : "GENERATE PROMPT"}
        </button>

        {/* OUTPUT */}
        {output && (
          <div style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "12px" }}>

            {/* Positive prompt */}
            <div>
              <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", color: C.accent, textTransform: "uppercase", marginBottom: "8px" }}>
                {FLUX_MODELS.has(activeModel) ? "POSITIVE PROMPT" : "GENERATED PROMPT"}
              </div>
              <div style={{ background: "#0e0e0e", border: `1px solid ${C.accent}`, borderRadius: "8px", padding: "16px", fontSize: "13px", lineHeight: "1.75", color: C.text }}>
                {output}
              </div>
              <button onClick={handleCopy} style={{ marginTop: "8px", padding: "7px 14px", background: "transparent", border: `1px solid ${C.accent}`, borderRadius: "5px", color: C.accent, fontSize: "11px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}>
                {copied ? "✓ COPIED" : "COPY"}
              </button>
            </div>

            {/* Negative prompt — Flux only */}
            {FLUX_MODELS.has(activeModel) && negOutput && (
              <div>
                <div style={{ fontSize: "10px", fontWeight: "700", letterSpacing: "0.1em", color: "#e67e22", textTransform: "uppercase", marginBottom: "8px" }}>
                  NEGATIVE PROMPT
                </div>
                <div style={{ background: "#0e0e0e", border: "1px solid #7a3a10", borderRadius: "8px", padding: "16px", fontSize: "13px", lineHeight: "1.75", color: "#cc8855" }}>
                  {negOutput}
                </div>
                <button onClick={handleCopyNeg} style={{ marginTop: "8px", padding: "7px 14px", background: "transparent", border: "1px solid #7a3a10", borderRadius: "5px", color: "#e67e22", fontSize: "11px", fontWeight: "600", cursor: "pointer", fontFamily: "inherit", letterSpacing: "0.04em" }}>
                  {copiedNeg ? "✓ COPIED" : "COPY"}
                </button>
              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
}
