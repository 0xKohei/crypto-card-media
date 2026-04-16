import type { Metadata } from "next";
import { getCards } from "@/lib/get-cards";
import Breadcrumb from "@/components/layout/Breadcrumb";
import CardsClient from "./CardsClient";

export const revalidate = 60;

export const metadata: Metadata = {
  title: "クリプトカード一覧・比較表",
  description:
    "Tria・Kast・RedotPay・Tevau・Bitget Wallet Card・Jupiter Globalの6枚を一覧で比較。FX手数料・還元率・KYC・対応地域で絞り込めます。",
};

export default async function CardsPage() {
  const cards = await getCards();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "カード一覧" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">クリプトカード一覧</h1>
        <p className="text-gray-600">
          {cards.length}枚のカードを掲載中。手数料・還元率・KYC・対応地域でフィルタリングできます。
          <span className="text-xs text-gray-400 ml-2">※掲載情報は参考値です。詳細は各公式サイトをご確認ください。</span>
        </p>
      </div>

      <CardsClient initialCards={cards} />
    </div>
  );
}
