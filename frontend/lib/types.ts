// define structure of response 

export type Level = "N5" | "N4" | "N3" | "N2" | "N1";

export type VocabItem = {
  surface: string;
  reading?: string;
  meaning_zh?: string;
  why?: string;
};

export type GrammarItem = {
  pattern: string;
  meaning_zh?: string;
  example?: string;
  note?: string;
};
// todo:Change

export type ExtractResponse = {
  vocab: VocabItem[];
  grammar: GrammarItem[];
};
