import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "免責事項",
  description: "CryptoCardナビの免責事項・アフィリエイト開示・情報の正確性についてご説明します。",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "免責事項" }]} />
      <h1 className="text-3xl font-bold text-gray-900 mb-8">免責事項</h1>

      <div className="prose prose-gray max-w-none space-y-6 text-sm text-gray-700 leading-relaxed">
        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">情報の正確性について</h2>
          <p>
            当サイトに掲載している情報は、調査時点の参考情報です。各サービスの手数料・対応地域・KYC要件・機能は、
            予告なく変更される場合があります。最新・正確な情報については、必ず各公式サイトをご確認ください。
          </p>
          <p className="mt-3">
            当サイトは情報提供のみを目的としており、金融・法務・投資アドバイスを提供するものではありません。
            各サービスの利用判断は、利用者ご自身の責任において行ってください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">アフィリエイト・広告について</h2>
          <p>
            当サイトの一部リンクには、アフィリエイト（紹介報酬）プログラムが含まれます。
            ユーザーがリンク経由で登録・申し込みを行った場合、当サイトに報酬が支払われることがあります。
          </p>
          <p className="mt-3">
            当該リンクには「PR」「sponsored」などの表記を付す場合があります。
            報酬の有無がランキング・評価に影響しないよう努めていますが、完全な客観性を保証するものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">投資・金融リスクについて</h2>
          <p>
            暗号資産（仮想通貨）は価格変動リスクが大きく、元本が保証されるものではありません。
            クリプトカードの利用においても、チャージした資産の価値変動リスクが伴う場合があります。
            投資・金融サービスの利用は十分なリスク理解のうえ、自己責任で行ってください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">法令遵守について</h2>
          <p>
            当サイトは、違法行為・規制回避・脱税・マネーロンダリングなどを助長する情報は掲載しません。
            各サービスの利用に際しては、日本の法律および各国の規制を遵守してください。
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-gray-900 mb-3">リンク先について</h2>
          <p>
            当サイトに掲載する外部リンク先のコンテンツ・サービス内容について、当サイトは一切の責任を負いません。
            リンク先の利用に際しては、各サービスの利用規約・プライバシーポリシーをご確認ください。
          </p>
        </section>

        <p className="text-xs text-gray-500 border-t border-gray-200 pt-4">
          最終更新：2026年4月
        </p>
      </div>
    </div>
  );
}
