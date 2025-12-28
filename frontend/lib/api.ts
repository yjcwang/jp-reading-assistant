import type { ExtractResponse, Level } from "./types";

export async function extract(text: string, level: Level): Promise<ExtractResponse> {
  // ✅ 先 mock：让 UI 和结构先稳定
  await new Promise((r) => setTimeout(r, 250));
  return {
    vocab: [
      { surface: "準備", reading: "じゅんび", meaning_zh: "准备" },
      { surface: "欠かせない", reading: "かかせない", meaning_zh: "不可或缺" },
    ],
    grammar: [
      { pattern: "～に加えて", meaning_zh: "此外、再加上", example: "授業に加えて、アルバイトもしている。" },
      { pattern: "～わけではない", meaning_zh: "并不是说…", example: "嫌いなわけではないが、得意でもない。" },
    ],
  };

  // 🔌 接后端时改成：
  // const resp = await fetch(process.env.NEXT_PUBLIC_BACKEND_URL + "/extract", {
  //   method: "POST",
  //   headers: { "Content-Type": "application/json" },
  //   body: JSON.stringify({ text, level }),
  // });
  // if (!resp.ok) throw new Error(`HTTP ${resp.status}`);
  // return (await resp.json()) as ExtractResponse;
}

