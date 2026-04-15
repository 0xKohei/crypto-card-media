import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="text-white font-bold text-lg">
              Crypto<span className="text-blue-400">Card</span>ナビ
            </Link>
            <p className="mt-3 text-sm leading-relaxed">
              日本向けのクリプトカード比較・解説メディア。中立的な視点で情報を整理します。
            </p>
            <p className="mt-3 text-xs text-slate-500">
              運営：シンガポール法人
            </p>
          </div>

          {/* Cards */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">カード情報</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/cards" className="hover:text-white transition-colors">カード一覧</Link></li>
              <li><Link href="/compare" className="hover:text-white transition-colors">カード比較</Link></li>
              <li><Link href="/finder" className="hover:text-white transition-colors">条件で探す</Link></li>
              <li><Link href="/top-picks" className="hover:text-white transition-colors">ランキング</Link></li>
            </ul>
          </div>

          {/* Rankings */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">ランキング</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/top-picks/overall" className="hover:text-white transition-colors">総合おすすめ</Link></li>
              <li><Link href="/top-picks/high-cashback" className="hover:text-white transition-colors">高還元向け</Link></li>
              <li><Link href="/top-picks/japan-users" className="hover:text-white transition-colors">日本ユーザー向け</Link></li>
              <li><Link href="/top-picks/overseas" className="hover:text-white transition-colors">海外利用向け</Link></li>
              <li><Link href="/top-picks/usdt" className="hover:text-white transition-colors">USDT活用向け</Link></li>
              <li><Link href="/top-picks/withdrawal" className="hover:text-white transition-colors">出金性重視</Link></li>
            </ul>
          </div>

          {/* Articles */}
          <div>
            <h3 className="text-white text-sm font-semibold mb-4">記事・情報</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/guides" className="hover:text-white transition-colors">初心者ガイド</Link></li>
              <li><Link href="/blog" className="hover:text-white transition-colors">ブログ・解説</Link></li>
              <li><Link href="/ecosystem" className="hover:text-white transition-colors">エコシステム</Link></li>
              <li><Link href="/faq" className="hover:text-white transition-colors">よくある質問</Link></li>
              <li><Link href="/about" className="hover:text-white transition-colors">このサイトについて</Link></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-slate-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between gap-4">
            <div className="text-xs text-slate-500 leading-relaxed max-w-2xl">
              <p>
                ※ 当サイトに掲載している情報は、調査時点の参考情報です。各サービスの最新情報・正確な手数料・対応地域については、必ず公式サイトをご確認ください。
                当サイトは金融アドバイスを提供するものではありません。投資・金融サービスのご利用は各自の判断と責任において行ってください。
                一部のリンクには紹介報酬（アフィリエイト）が含まれる場合があります。
              </p>
            </div>
            <div className="flex flex-col md:items-end gap-2 text-xs text-slate-500 shrink-0">
              <div className="flex gap-4">
                <Link href="/disclaimer" className="hover:text-slate-300">免責事項</Link>
                <Link href="/privacy" className="hover:text-slate-300">プライバシーポリシー</Link>
                <Link href="/about" className="hover:text-slate-300">運営について</Link>
              </div>
              <p>© 2026 CryptoCardナビ. All rights reserved.</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
