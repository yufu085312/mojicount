export type JapaneseAnalysisResult = {
  hiragana: number;
  katakana: number;
  kanji: number;
  alphabet: number;
  number: number;
  symbol: number;
};

export const analyzeJapanese = (text: string): JapaneseAnalysisResult => {
  const result: JapaneseAnalysisResult = {
    hiragana: 0,
    katakana: 0,
    kanji: 0,
    alphabet: 0,
    number: 0,
    symbol: 0,
  };

  if (!text) return result;

  // 改行や空白を除外したテキストで判定する
  const cleanText = text.replace(/[\s\u3000\n]/g, '');

  for (const char of cleanText) {
    if (/[ぁ-ん]/.test(char)) {
      result.hiragana++;
    } else if (/[ァ-ンヴー]/.test(char)) {
      result.katakana++;
    } else if (/[一-龯々〆]/.test(char)) {
      result.kanji++;
    } else if (/[a-zA-Zａ-ｚＡ-Ｚ]/.test(char)) {
      result.alphabet++;
    } else if (/[0-9０-９]/.test(char)) {
      result.number++;
    } else {
      result.symbol++;
    }
  }

  return result;
};
