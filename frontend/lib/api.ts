import type { AnalyzeResponse, Level } from "./types";

// service layer, handle operations

export async function analyze(text: string, level: Level): Promise<AnalyzeResponse> {
  // ✅ 先 mock：让 UI 和结构先稳定
  /*
  await new Promise((r) => setTimeout(r, 250)); // simulate network loading latency 
  return {
    vocab: [
      {
        surface: "準備",
        reading: "じゅんび",
        meaning_en: "准备",
        why: "高频基础词，日常/学习场景都常用，适合做核心词汇。",
      },
      {
        surface: "欠かせない",
        reading: "かかせない",
        meaning_en: "不可或缺",
        why: "常见书面/口语表达，用于强调某事的重要性。",
      },
    ],
    grammar: [
      {
        pattern: "～に加えて",
        explanation_en: "此外、再加上",
        example_from_text: "授業に加えて、アルバイトもしている。",
        notes: "多用于把两个要素并列补充，语气偏正式。",
      },
      {
        pattern: "～わけではない",
        explanation_en: "并不是说…",
        example_from_text: "嫌いなわけではないが、得意でもない。",
        // notes 可选，不写也符合后端 Optional
      },
    ],
  }; */

  // 接后端时改成：
  const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  if (!BASE_URL) {
     throw new Error("NEXT_PUBLIC_BACKEND_URL is not defined");
  }


  const resp = await fetch(BASE_URL + "/api/analyze", {
     method: "POST",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({ text, level }),
   });
   if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
   return (await resp.json()) as AnalyzeResponse;
}

