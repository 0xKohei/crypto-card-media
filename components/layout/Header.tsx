"use client";

import Link from "next/link";
import { useState } from "react";
import { Menu, X, ChevronDown } from "lucide-react";

const nav = [
  {
    label: "カード一覧",
    href: "/cards",
  },
  {
    label: "比較する",
    href: "/compare",
  },
  {
    label: "条件で探す",
    href: "/finder",
  },
  {
    label: "ランキング",
    href: "/top-picks",
    children: [
      { label: "総合おすすめ", href: "/top-picks/overall" },
      { label: "高還元向け", href: "/top-picks/high-cashback" },
      { label: "日本ユーザー向け", href: "/top-picks/japan-users" },
      { label: "海外利用向け", href: "/top-picks/overseas" },
      { label: "USDT活用向け", href: "/top-picks/usdt" },
      { label: "出金性重視", href: "/top-picks/withdrawal" },
      { label: "初心者向け", href: "/top-picks/beginner" },
      { label: "DeFiユーザー向け", href: "/top-picks/defi" },
    ],
  },
  {
    label: "記事・ガイド",
    href: "/guides",
    children: [
      { label: "初心者ガイド", href: "/guides" },
      { label: "ブログ・解説", href: "/blog" },
      { label: "エコシステム", href: "/ecosystem" },
    ],
  },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      {/* Affiliate disclosure bar */}
      <div className="bg-slate-50 border-b border-gray-100 py-1 px-4 text-center text-xs text-gray-500">
        ※ 一部のリンクには紹介報酬が含まれる場合があります。詳細は
        <Link href="/disclaimer" className="underline ml-1">
          免責事項
        </Link>
        をご覧ください。
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <span className="text-xl font-bold text-slate-900">
              Crypto<span className="text-blue-600">Card</span>
              <span className="text-slate-500 font-medium text-base">ナビ</span>
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {nav.map((item) => (
              <div key={item.href} className="relative group">
                {item.children ? (
                  <button
                    className="flex items-center gap-1 px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                    onMouseEnter={() => setOpenDropdown(item.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.label}
                    <ChevronDown className="w-3 h-3" />
                  </button>
                ) : (
                  <Link
                    href={item.href}
                    className="flex items-center px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    {item.label}
                  </Link>
                )}

                {item.children && (
                  <div
                    className="absolute top-full left-0 mt-1 w-48 bg-white rounded-lg shadow-lg border border-gray-100 py-1 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all"
                    onMouseEnter={() => setOpenDropdown(item.href)}
                    onMouseLeave={() => setOpenDropdown(null)}
                  >
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-blue-50 hover:text-blue-600"
                      >
                        {child.label}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              href="/finder"
              className="px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              カードを探す
            </Link>
          </div>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-gray-600 hover:text-gray-900"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="メニューを開く"
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-100 px-4 py-4 space-y-1">
          {nav.map((item) => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block px-3 py-2 text-sm font-medium text-gray-700 hover:text-blue-600 rounded-md hover:bg-blue-50"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="ml-4 mt-1 space-y-1">
                  {item.children.map((child) => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block px-3 py-1.5 text-sm text-gray-600 hover:text-blue-600"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="pt-3">
            <Link
              href="/finder"
              className="block w-full text-center px-4 py-2 text-sm font-medium bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              onClick={() => setMobileOpen(false)}
            >
              カードを探す
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
