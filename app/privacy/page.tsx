import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "プライバシーポリシー",
};

export default function PrivacyPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "プライバシーポリシー" }]} />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">プライバシーポリシー</h1>

      <div className="space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">収集する情報</h2>
          <p>
            当サイトでは、Google Analytics等のアクセス解析ツールを使用してサイト利用状況を収集することがあります。
            収集されるデータは匿名化されており、個人を特定するものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">Cookieについて</h2>
          <p>
            当サイトはCookieを使用してサイトの利便性向上・アクセス解析・広告配信を行う場合があります。
            ブラウザの設定によりCookieを無効にすることができますが、一部機能が制限される場合があります。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">第三者サービス</h2>
          <p>
            当サイトはGoogle Analytics、アフィリエイトプログラム等の第三者サービスを使用しています。
            これらのサービスは独自のプライバシーポリシーに基づいてデータを処理します。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">お問い合わせ</h2>
          <p>プライバシーに関するお問い合わせは、サイト内のお問い合わせページよりご連絡ください。</p>
        </section>

        <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">最終更新：2026年4月</p>
      </div>
    </div>
  );
}
