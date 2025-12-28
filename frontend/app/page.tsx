"use client";

import React, { useState } from "react";
import { InputPanel } from "@/components/InputPanel";
import { ResultPanel } from "@/components/ResultPanel";
import { extract } from "@/lib/api";
import type { ExtractResponse, Level } from "@/lib/types";

export default function Page() {
  const [level, setLevel] = useState<Level>("N3");

  const [draftText, setDraftText] = useState("");
  const [lockedText, setLockedText] = useState<string | null>(null);

  const [data, setData] = useState<ExtractResponse>({ vocab: [], grammar: [] });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function onConfirm() {
    const text = draftText.trim();
    if (!text) return;

    setLockedText(text);
    setLoading(true);
    setError(null);

    try {
      const res = await extract(text, level);
      setData(res);
    } catch (e: any) {
      setError(e?.message ?? "Unknown error");
      setData({ vocab: [], grammar: [] });
    } finally {
      setLoading(false);
    }
  }

  function onClear() {
    setDraftText("");
    setLockedText(null);
    setData({ vocab: [], grammar: [] });
    setError(null);
  }

  return (
    <main style={page}>
      <div style={grid}>
        <InputPanel
          level={level}
          setLevel={setLevel}
          draftText={draftText}
          setDraftText={setDraftText}
          lockedText={lockedText}
          loading={loading}
          onConfirm={onConfirm}
          onClear={onClear}
        />
        <ResultPanel data={data} error={error} />
      </div>
    </main>
  );
}

const page: React.CSSProperties = {
  minHeight: "100vh",
  padding: 20,
  background: "#0b0c10",
  color: "#e8e8ea",
  fontFamily: "ui-sans-serif, system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial",
};

const grid: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 14,
};
