export const countAll = (text: string): number => {
  return text.length;
};

export const countWithoutSpaces = (text: string): number => {
  return text.replace(/[\s\u3000]/g, '').length;
};

export const countLines = (text: string): number => {
  if (text === '') return 0;
  return text.split('\n').length;
};

export const countParagraphs = (text: string): number => {
  if (text.trim() === '') return 0;
  return text.split(/\n\s*\n/).filter((p) => p.trim().length > 0).length;
};

export const getManuscriptPages = (text: string): number => {
  if (text === '') return 0;
  const pages = text.length / 400;
  return Number(pages.toFixed(1));
};

/**
 * X (Twitter) 用のカウントロジック
 * 日本語（全角）: 2文字分
 * 英数字（半角）: 1文字分
 * URL: 一律 23文字分
 */
export const countX = (text: string): number => {
  if (text === "") return 0;

  // URLの抽出（簡易的な正規表現）
  const urlRegex = /https?:\/\/[\w/:%#\$&\?\(\)~\.=\+\-]+/g;
  const urls = text.match(urlRegex) || [];
  
  // URL部分を除去したテキスト
  let textWithoutUrls = text.replace(urlRegex, "");
  
  // URL分のカウント（各URL一律23文字分）
  const urlCount = urls.length * 23;

  // 残りのテキストのカウント（全角2, 半角1）
  let charCount = 0;
  for (let i = 0; i < textWithoutUrls.length; i++) {
    const code = textWithoutUrls.charCodeAt(i);
    // 半角文字の判定（ASCII, 半角カナなど）
    if ((code >= 0x0 && code < 0x81) || (code === 0xf8f0) || (code >= 0xff61 && code <= 0xff9f)) {
      charCount += 1;
    } else {
      charCount += 2;
    }
  }

  return charCount + urlCount;
};

export type SNSData = {
  current: number;
  limit: number;
  remaining: number;
  isOver: boolean;
};

export const countForSNS = (text: string, limit: number, platform?: string): SNSData => {
  let current = text.length;

  if (platform === "X (Twitter)") {
    current = countX(text);
  }

  const remaining = limit - current;
  return {
    current,
    limit,
    remaining,
    isOver: remaining < 0,
  };
};

export type SEOCheckResult = {
  current: number;
  min: number;
  max: number;
  status: 'too_short' | 'optimal' | 'too_long' | 'empty';
};

export const checkSEOTitle = (text: string): SEOCheckResult => {
  const current = text.length;
  const min = 30;
  const max = 35;
  let status: SEOCheckResult['status'] = 'empty';
  
  if (current === 0) status = 'empty';
  else if (current < min) status = 'too_short';
  else if (current > max) status = 'too_long';
  else status = 'optimal';

  return { current, min, max, status };
};

export const checkSEODescription = (text: string): SEOCheckResult => {
  const current = text.length;
  // 推奨 110〜130文字
  const min = 110;
  const max = 130;
  let status: SEOCheckResult['status'] = 'empty';
  
  if (current === 0) status = 'empty';
  else if (current < min) status = 'too_short';
  else if (current > max) status = 'too_long';
  else status = 'optimal';

  return { current, min, max, status };
};
