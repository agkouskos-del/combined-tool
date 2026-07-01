import { useState } from "react";
import DemonApp from "@demon";
import ApsogoApp from "@apsogo";

const T = {
  bg: "#0a0a0a",
  surface: "#111111",
  border: "#252525",
  text: "#f0f0f0",
  textFaint: "#555555",
  divider: "#1e1e1e",
};

export default function App() {
  const [activeTab, setActiveTab] = useState("demon");

  return (
    <div style={{ minHeight: "100vh", background: T.bg, color: T.text, fontFamily: "'Inter', system-ui, sans-serif" }}>
      {/* Tab bar */}
      <div style={{
        display: "flex",
        borderBottom: `1px solid ${T.border}`,
        background: T.surface,
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}>
        {[
          { id: "demon",  label: "😈 Demon Labz — Image Gen" },
          { id: "apsogo", label: "🍅 APS - Tomato Products" },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            style={{
              padding: "11px 20px",
              fontSize: "11px",
              fontWeight: "700",
              letterSpacing: "0.05em",
              background: "transparent",
              border: "none",
              borderBottom: `2px solid ${activeTab === tab.id ? "#ef4444" : "transparent"}`,
              color: activeTab === tab.id ? T.text : T.textFaint,
              cursor: "pointer",
              transition: "all 0.12s",
              fontFamily: "inherit",
            }}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* App content */}
      <div style={{ display: activeTab === "demon" ? "block" : "none" }}>
        <DemonApp />
      </div>
      <div style={{ display: activeTab === "apsogo" ? "block" : "none" }}>
        <ApsogoApp />
      </div>
    </div>
  );
}
