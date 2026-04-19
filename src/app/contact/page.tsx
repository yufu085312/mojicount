"use client";

import { useState } from "react";
import { BackButton } from "@/components/BackButton";

export default function ContactPage() {
  const [state, setState] = useState<{
    submitting: boolean;
    succeeded: boolean;
    error: string | null;
  }>({
    submitting: false,
    succeeded: false,
    error: null,
  });

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState({ submitting: true, succeeded: false, error: null });

    const form = e.currentTarget;
    const data = new FormData(form);

    try {
      const response = await fetch("https://formspree.io/f/meerlzwa", {
        method: "POST",
        body: data,
        headers: {
          Accept: "application/json",
        },
      });

      if (response.ok) {
        setState({ submitting: false, succeeded: true, error: null });
        form.reset();
      } else {
        const result = await response.json();
        setState({
          submitting: false,
          succeeded: false,
          error: result.error || "送信中にエラーが発生しました。",
        });
      }
    } catch (err) {
      setState({
        submitting: false,
        succeeded: false,
        error: "ネットワークエラーが発生しました。時間をおいて再度お試しください。",
      });
    }
  };

  if (state.succeeded) {
    return (
      <div className="max-w-xl mx-auto text-center py-16 space-y-6">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400 rounded-full mb-4">
          <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
          </svg>
        </div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">お問い合わせありがとうございます</h1>
        <p className="text-slate-600 dark:text-slate-400">
          メッセージは正常に送信されました。内容を確認後、必要に応じてご連絡させていただきます。
        </p>
        <div className="pt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 transition-colors"
          >
            トップページに戻る
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto py-8">
      <BackButton />
      <div className="space-y-4 mb-8 text-center">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">お問い合わせ</h1>
        <p className="text-slate-600 dark:text-slate-400">
          MojiCountをご利用いただきありがとうございます。ご要望、バグ報告、その他お問い合わせは以下のフォームよりお送りください。
        </p>
      </div>

      <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-sm border border-slate-200 dark:border-slate-800 p-6 sm:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              お名前 (任意)
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="山田 太郎"
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              メールアドレス <span className="text-red-500">*</span>
            </label>
            <input
              required
              type="email"
              name="email"
              id="email"
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white"
              placeholder="example@mail.com"
            />
          </div>

          <div>
            <label htmlFor="message" className="block text-sm font-medium text-slate-700 dark:text-slate-300 mb-1">
              お問い合わせ内容 <span className="text-red-500">*</span>
            </label>
            <textarea
              required
              name="message"
              id="message"
              rows={6}
              className="w-full px-4 py-2 bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all dark:text-white resize-none"
              placeholder="お問い合わせ内容を入力してください..."
            ></textarea>
          </div>

          {state.error && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 rounded-lg text-sm">
              {state.error}
            </div>
          )}

          <button
            type="submit"
            disabled={state.submitting}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-bold text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          >
            {state.submitting ? "送信中..." : "送信する"}
          </button>
        </form>
      </div>
      
      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-xl border border-blue-100 dark:border-blue-900/30">
        <p className="text-xs text-blue-800 dark:text-blue-300 text-center leading-relaxed">
          ※本フォームはFormspreeを利用しています。入力されたメールアドレスは返信目的以外には使用いたしません。<br />
          プライバシーの詳細は<a href="/privacy" className="underline font-bold">プライバシーポリシー</a>をご確認ください。
        </p>
      </div>
    </div>
  );
}
