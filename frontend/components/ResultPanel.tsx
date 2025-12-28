"use client";

import React from "react";
import type { ExtractResponse } from "@/lib/types";

type Props = {
  data: ExtractResponse;
  error: string | null;
};

export function ResultPanel({ data, error }: Props) {
  return (
    <div style={card}>
      <div style={rowBetween}>
        <div style={{ fontWeight: 700 }}>结果</div>
        <div style={{ opacity: 0.7, fontSize: 13 }}>
          {data.vocab.length} vocab · {data.grammar.length} grammar
        </div>
      </div>

      {error ? <div style={errorBox}>Error: {error}</div> : null}

      <div style={twoCols}>
        <div>
          <div style={sectionTitle}>单词</div>
          <ul style={list}>
            {data.vocab.length === 0 ? (
              <li style={empty}>暂无</li>
            ) : (
              data.vocab.map((v, i) => (
                <li key={i} style={item}>
                  <div style={{ fontWeight: 700 }}>{v.surface} {v.reading ? <span style={muted}>({v.reading})</span> : null}</div>
                  {v.meaning_zh ? <div style={muted}>{v.meaning_zh}</div> : null}
                  {v.why ? <div style={mutedSmall}>{v.why}</div> : null}
                </li>
              ))
            )}
          </ul>
        </div>

        <div>
          <div style={sectionTitle}>语法</div>
          <ul style={list}>
            {data.grammar.length === 0 ? (
              <li style={empty}>暂无</li>
            ) : (
              data.grammar.map((g, i) => (
                <li key={i} style={item}>
                  <div style={{ fontWeight: 700 }}>{g.pattern}</div>
                  {g.meaning_zh ? <div style={muted}>{g.meaning_zh}</div> : null}
                  {g.example ? <div style={example}>{g.example}</div> : null}
                  {g.note ? <div style={mutedSmall}>{g.note}</div> : null}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
    </div>
  );
}

const card: React.CSSProperties = {
  background: "#11131c",
  border: "1px solid #23263a",
  borderRadius: 16,
  padding: 14,
};

const rowBetween: React.CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: 10,
};

const twoCols: React.CSSProperties = {
  display: "grid",
  gridTemplateColumns: "1fr 1fr",
  gap: 12,
};

const sectionTitle: React.CSSProperties = { fontWeight: 700, marginBottom: 8 };

const list: React.CSSProperties = {
  listStyle: "none",
  padding: 0,
  margin: 0,
  display: "flex",
  flexDirection: "column",
  gap: 10,
};

const item: React.CSSProperties = {
  border: "1px solid #23263a",
  background: "#0d0f17",
  borderRadius: 14,
  padding: 10,
};

const empty: React.CSSProperties = { opacity: 0.6, padding: 10 };

const muted: React.CSSProperties = { opacity: 0.8, marginTop: 6, fontSize: 13 };
const mutedSmall: React.CSSProperties = { opacity: 0.65, marginTop: 6, fontSize: 12 };
const example: React.CSSProperties = { opacity: 0.85, marginTop: 6, fontStyle: "italic", fontSize: 13 };

const errorBox: React.CSSProperties = {
  border: "1px solid #5a2a2a",
  background: "#1a0f12",
  color: "#ffb5b5",
  borderRadius: 12,
  padding: 10,
  marginBottom: 10,
};
