import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Link from "next/link";
import { Shield, RefreshCw, Globe, AlertTriangle } from "lucide-react";

export const metadata: Metadata = {
  title: "このサイトについて・運営方針",
  description:
    "CryptoCardナビの運営方針、情報掲載基準、アフィリエイト開示、免責事項についてご説明します。",
};

export default function AboutPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "このサイトについて" }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">このサイトについて</h1>
        <p className="text-gray-600">
          CryptoCardナビは、日本人ユーザー向けのクリプトカード比較・解説メディアです。
        </p>
      </div>

      <div className="space-y-8">
        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Globe className="w-5 h-5 text-blue-500" />
            <h2 className="text-lg font-bold text-gray-900">サイトの目的</h2>
          </div>
          <p className="text-gray-700 text-sm leading-relaxed">
            世界には数十種類のクリプトカードが存在しますが、日本語での体系的な比較情報は不足しています。
            当サイトは、日本人ユーザーが手数料・還元率・KYC要件・対応地域などを整理・比較し、
            自分に合ったカードを選択できるよう支援することを目的としています。
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <Shield className="w-5 h-5 text-emerald-500" />
            <h2 className="text-lg font-bold text-gray-900">情報掲載基準</h2>
          </div>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              各サービスの公式サイト・公式ドキュメントを主な情報源としています
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              掲載情報には「参考情報」「要確認」などの注記を明示し、断定的な表現を避けています
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              スコアリングは独自の評価基準に基づき、基準の透明性を重視しています
            </li>
            <li className="flex items-start gap-2">
              <span className="text-blue-500 mt-0.5">•</span>
              違法行為・規制回避・脱税を助長する情報は掲載しません
            </li>
          </ul>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <RefreshCw className="w-5 h-5 text-violet-500" />
            <h2 className="text-lg font-bold text-gray-900">情報更新ポリシー</h2>
          </div>
          <p className="text-sm text-gray-700 leading-relaxed">
            各カードの情報は定期的にレビューし、公式情報の変更を反映するよう努めています。
            ただし、リアルタイムでの更新は保証できません。
            手数料・対応地域・条件が変更されている可能性があるため、
            最終的な判断は必ず各公式サイトで最新情報をご確認ください。
          </p>
        </section>

        <section className="bg-amber-50 border border-amber-200 rounded-2xl p-6">
          <div className="flex items-center gap-3 mb-4">
            <AlertTriangle className="w-5 h-5 text-amber-600" />
            <h2 className="text-lg font-bold text-gray-900">アフィリエイト・広告開示</h2>
          </div>
          <p className="text-sm text-amber-900 leading-relaxed">
            当サイトの一部リンクには、紹介報酬（アフィリエイト）が含まれる場合があります。
            これはサイトの運営・更新コストに充てられます。
            報酬の有無がランキングや評価に影響しないよう努めていますが、
            完全な中立性を保証するものではありません。
            詳細は<Link href="/disclaimer" className="underline">免責事項</Link>をご覧ください。
          </p>
        </section>

        <section className="bg-white border border-gray-200 rounded-2xl p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">運営情報</h2>
          <div className="space-y-2 text-sm text-gray-700">
            <p>運営形態：シンガポール法人による運営</p>
            <p>対象ユーザー：日本人ユーザー</p>
            <p>お問い合わせ：各ページのフッターよりご連絡ください</p>
          </div>
        </section>
      </div>
    </div>
  );
}
