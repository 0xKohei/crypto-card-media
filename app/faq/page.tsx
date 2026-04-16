import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FAQ from "@/components/common/FAQ";
import Link from "next/link";

export const metadata: Metadata = {
  title: "よくある質問（FAQ）",
  description:
    "クリプトカードに関するよくある質問をまとめています。KYC・手数料・日本からの利用可否・安全性など。",
};

const faqItems = [
  {
    question: "クリプトカードとは何ですか？",
    answer:
      "暗号資産（仮想通貨）を日常の買い物や決済に使えるVisaまたはMastercard形式のカードです。USDTやBTCなどをチャージし、Visa/Mastercard加盟店で通常のカードと同様に決済できます。",
  },
  {
    question: "日本からクリプトカードを申し込めますか？",
    answer:
      "カードによって異なります。Bitget Wallet Cardのように公式ヘルプで日本を含む対象国が明示されているものもあれば、対応国一覧が公開されていないものもあります。各カードの公式サイト・利用規約・ヘルプセンターで最新情報をご確認ください。",
  },
  {
    question: "KYC（本人確認）は必要ですか？",
    answer:
      "多くのカードでKYCが必要です。日本のパスポートや運転免許証で対応できるケースが多いです。一部のカードはKYC不要ですが、利用上限が低く設定される傾向があります。",
  },
  {
    question: "USDT（テザー）で決済できるカードはありますか？",
    answer:
      "掲載中のカードでは、Tria・RedotPay・Tevau・Bitget Wallet CardなどがUSDTまたはUSDC系の利用に対応しています。詳細は各カードの詳細ページと公式情報をご確認ください。",
  },
  {
    question: "手数料はどのくらいかかりますか？",
    answer:
      "FX手数料（通貨変換コスト）はカードにより0.3%〜3%程度です。発行手数料・月額手数料が無料のカードも多くあります。詳細は各カードの詳細ページをご確認ください。",
  },
  {
    question: "クリプトカードは安全ですか？",
    answer:
      "信頼性は発行体、規制準拠、本人確認の運用、資産管理方式によって異なります。非カストディ型のカードでは資産の自己管理を維持できる一方、操作責任も利用者側にあります。いずれも利用前に公式の利用規約・手数料表・対応地域をご確認ください。",
  },
  {
    question: "カストディ型と非カストディ型の違いは何ですか？",
    answer:
      "カストディ型はサービス運営者が資産を管理します。使いやすい反面、運営者の破綻リスクがあります。非カストディ型（Triaなど）は自分で秘密鍵・資産を管理するため、運営者依存のリスクを低減できます。",
  },
  {
    question: "このサイトの情報は正確ですか？",
    answer:
      "調査時点の参考情報として掲載しています。手数料・対応地域・条件は各サービスにより随時変更されます。最終的な判断は必ず各公式サイトで最新情報を確認してから行ってください。当サイトは金融アドバイスを提供するものではありません。",
  },
];

export default function FaqPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "よくある質問" }]} />

      <div className="mb-10">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">よくある質問</h1>
        <p className="text-gray-600">
          クリプトカードに関するよくある質問をまとめています。
        </p>
      </div>

      <FAQ items={faqItems} title="FAQ一覧" />

      <div className="mt-10 bg-blue-50 rounded-2xl p-6 text-sm">
        <p className="font-semibold text-gray-900 mb-2">もっと詳しく知りたい方へ</p>
        <div className="space-y-2">
          <Link href="/guides/what-is-crypto-card" className="block text-blue-600 hover:underline">
            → クリプトカードとは？初心者向け解説
          </Link>
          <Link href="/guides/how-to-choose-crypto-card" className="block text-blue-600 hover:underline">
            → クリプトカードの選び方ガイド
          </Link>
          <Link href="/finder" className="block text-blue-600 hover:underline">
            → 条件でカードを絞り込む（Finder）
          </Link>
        </div>
      </div>
    </div>
  );
}
