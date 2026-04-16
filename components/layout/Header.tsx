"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const nav = [
  { label: "カード一覧", href: "/cards" },
  { label: "比較する", href: "/compare" },
  { label: "条件で探す", href: "/finder" },
  {
    label: "ランキング",
    href: "/top-picks",
    children: [
      { label: "総合おすすめ", href: "/top-picks/overall" },
      { label: "日本ユーザー向け", href: "/top-picks/japan-users" },
      { label: "海外利用向け", href: "/top-picks/overseas" },
      { label: "USDT・ステーブルコイン", href: "/top-picks/usdt" },
      { label: "DeFiユーザー向け", href: "/top-picks/defi" },
    ],
  },
  {
    label: "ガイド",
    href: "/guides",
    children: [
      { label: "初心者ガイド", href: "/guides" },
      { label: "ブログ・解説", href: "/blog" },
    ],
  },
];

function Logo() {
  return (
    <Link href="/" className="flex items-center gap-2.5 flex-shrink-0 group">
      {/* Icon */}
      <div className="w-8 h-8 flex-shrink-0">
        <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect width="32" height="32" rx="8" fill="#1e40af"/>
          {/* Card shape */}
          <rect x="5" y="9" width="22" height="14" rx="3" fill="white" opacity="0.95"/>
          <rect x="5" y="13" width="22" height="3" fill="#1e40af" opacity="0.25"/>
          {/* Chip dot */}
          <rect x="8" y="17" width="5" height="3" rx="1" fill="#1e40af" opacity="0.4"/>
          {/* Globe arc overlay -->*/}
          <circle cx="24" cy="10" r="6" fill="#3b82f6"/>
          <circle cx="24" cy="10" r="4" fill="none" stroke="white" stroke-width="0.8"/>
          <line x1="24" y1="6" x2="24" y2="14" stroke="white" stroke-width="0.7"/>
          <line x1="20" y1="10" x2="28" y2="10" stroke="white" stroke-width="0.7"/>
          <ellipse cx="24" cy="10" rx="2.2" ry="4" fill="none" stroke="white" stroke-width="0.7"/>
        </svg>
      </div>
      {/* Wordmark */}
      <div className="leading-none">
        <div className="text-[15px] font-bold text-slate-900 tracking-tight group-hover:text-blue-700 transition-colors">
          クリプトカードナビ
        </div>
        <div className="text-[10px] font-medium text-slate-400 tracking-widest uppercase">
          Crypto Card Navi
        </div>
      </div>
    </Link>
  );
}

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm">
      {/* Affiliate bar */}
      <div className="bg-slate-900 py-1.5 px-4 text-center text-xs text-slate-400">
        ※ 一部リンクには紹介報酬が含まれます。
        <Link href="/disclaimer" className="underline ml-1 text-slate-300 hover:text-white">
          免責事項
        </Link>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-[60px]">
          <Logo />

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5">
            {nav.map((item) => (
              <div key={item.href} className="relative group">
                {item.children ? (
                  <>
                    <button className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                      {item.label}
                      <ChevronDown className="w-3 h-3 opacity-60" />
                    </button>
                    <div className="absolute top-full left-0 mt-1 w-52 bg-white rounded-xl shadow-lg border border-slate-100 py-1.5 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50">
                      {item.children.map((child) => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="block px-4 py-2 text-sm text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors"
                        >
                          {child.label}
                        </Link>
                      ))}
                    </div>
                  </>
                ) : (
                  <Link
                    href={item.href}
                    className="px-3 py-2 text-sm font-medium text-slate-600 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors block"
                  >
                    {item.label}
                  </Link>
                )}
              </div>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:flex items-center">
            <Link
              href="/top-picks/overall"
              className="px-4 py-2 text-sm font-semibold bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow-sm shadow-blue-200"
            >
              ランキングを見る
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-slate-500 hover:text-slate-900 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="メニュー"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-slate-100 px-4 py-4 space-y-1">
          {nav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2.5 text-sm font-semibold text-slate-700 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-3 mt-0.5 space-y-0.5 border-l-2 border-slate-100 pl-3">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-2 py-1.5 text-sm text-slate-500 hover:text-blue-600 transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3 pb-1">
            <Link
              href="/top-picks/overall"
              className="block w-full text-center px-4 py-3 text-sm font-bold bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
              onClick={() => setMobileOpen(false)}
            >
              ランキングを見る
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
