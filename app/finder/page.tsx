import type { Metadata } from "next";
import Breadcrumb from "@/components/layout/Breadcrumb";
import FinderClient from "./FinderClient";
import { cards } from "@/data/cards";

export const metadata: Metadata = {
  title: "クリプトカード検索・条件で絞り込む",
  description:
    "地域・KYC要件・Apple Pay・USDT対応・カストディタイプなど複数条件でクリプトカードを絞り込んで探せます。",
};

export default function FinderPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Breadcrumb items={[{ label: "条件で探す（Finder）" }]} />

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-3">
          条件でカードを絞り込む
        </h1>
        <p className="text-gray-600">
          地域・KYC・Apple Pay・USDT対応など、あなたの条件に合ったカードをすぐに見つけられます。
        </p>
      </div>

      <FinderClient initialCards={cards} />
    </div>
  );
}
