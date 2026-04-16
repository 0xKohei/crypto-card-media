import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";

export const metadata: Metadata = {
  title: "免責事項",
  description:
    "CryptoCardナビの免責事項・アフィリエイト開示・運営主体・情報の正確性についてご説明します。",
};

export default function DisclaimerPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "免責事項" }]} />
      <h1 className="text-3xl font-bold text-gray-900 mb-2">免責事項</h1>
      <p className="text-xs text-gray-400 mb-8">最終更新：2026年4月</p>

      <div className="space-y-8 text-sm text-gray-700 leading-relaxed">

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
            1. 運営主体について
          </h2>
          <p>
            当サイト（CryptoCardNavi）は、シンガポール法人が運営するウェブメディアです。
            コンテンツは日本語話者を主な対象として作成していますが、特定の国・地域の居住者に対してサービスを提供することを保証するものではありません。
          </p>
          <p className="mt-3">
            当サイトは日本の金融商品取引業者ではなく、金融規制当局（金融庁等）の登録・認可を受けた事業者ではありません。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
            2. 情報の正確性について
          </h2>
          <p>
            当サイトに掲載している情報は、公式サイト・公式ドキュメント・公開情報をもとに調査した参考情報です。
            各サービスの手数料・対応地域・KYC要件・機能・条件は予告なく変更される場合があります。
          </p>
          <p className="mt-3">
            <strong>最新・正確な情報については、必ず各公式サイトをご確認ください。</strong>
            当サイトの情報に基づいて生じた損害について、当サイトは一切の責任を負いません。
          </p>
          <p className="mt-3">
            情報の正確性が不明な場合は「公式情報未公開」と明記し、推測による記載を行わないよう努めています。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
            3. 金融・投資アドバイスではないことについて
          </h2>
          <p>
            当サイトは情報提供のみを目的としており、<strong>金融・法務・投資・税務アドバイスを提供するものではありません</strong>。
            当サイトのいかなるコンテンツも、金融商品・サービスの購入・利用を推奨するものと解釈しないでください。
          </p>
          <p className="mt-3">
            各サービスの利用判断および利用に伴うリスクは、利用者ご自身の責任において判断・負担してください。
            必要に応じて、資格を有する金融・法務アドバイザーにご相談ください。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
            4. アフィリエイト・広告について
          </h2>
          <p>
            当サイトの一部リンクには、アフィリエイト（紹介報酬）プログラムが含まれます。
            ユーザーがリンク経由で登録・申し込みを行った場合、当サイトに報酬が支払われることがあります。
          </p>
          <p className="mt-3">
            アフィリエイトリンクには「PR」の表記を付す場合があります。
            報酬の有無は掲載内容・ランキング・評価の編集方針に影響しないよう努めていますが、完全な客観性を保証するものではありません。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
            5. 各国の法令遵守について
          </h2>
          <p>
            当サイトが掲載するサービスの利用可否・合法性は、ご利用者の居住国・国籍によって異なります。
            <strong>各国の法律・規制・税務要件については、ユーザーご自身が確認・遵守してください。</strong>
          </p>
          <p className="mt-3">
            当サイトは、違法行為・規制回避・租税回避・マネーロンダリングなどを助長する情報は掲載しません。
            特に日本国内での暗号資産関連サービスの利用については、金融庁の最新ガイダンスをご参照ください。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
            6. 投資リスクについて
          </h2>
          <p>
            暗号資産（仮想通貨）は価格変動リスクが高く、元本が保証されるものではありません。
            クリプトカードの利用においても、チャージした資産の価値変動リスクが伴う場合があります。
            十分なリスク理解のうえ、自己責任でご利用ください。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
            7. リンク先・外部サービスについて
          </h2>
          <p>
            当サイトに掲載する外部リンク先のコンテンツ・サービス内容・安全性について、当サイトは一切の責任を負いません。
            リンク先の利用に際しては、各サービスの利用規約・プライバシーポリシーをご確認ください。
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-gray-900 mb-3 pb-2 border-b border-gray-100">
            8. 著作権について
          </h2>
          <p>
            当サイトのコンテンツ（テキスト・画像・デザイン等）の著作権は当サイト運営者に帰属します。
            無断転載・複製・再配布を禁止します。
          </p>
        </section>

      </div>
    </div>
  );
}
