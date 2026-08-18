import { Link } from "@tanstack/react-router";
import { Menu } from "lucide-react";
import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { lastUpdated } from "@/data/fixtures";

const nav = [
  { to: "/", label: "Ringkasan" },
  { to: "/perusahaan", label: "Perusahaan" },
  { to: "/kegiatan", label: "Kegiatan CSR" },
  { to: "/berita", label: "Berita" },
  { to: "/mou", label: "MoU" },
];

function NavLinks({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <>
      {nav.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.to === "/" }}
          activeProps={{ className: "text-ink after:scale-x-100" }}
          className="relative py-1 text-sm text-ink-soft transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:scale-x-0 after:bg-gold after:transition-transform hover:text-ink hover:after:scale-x-100"
        >
          {item.label}
        </Link>
      ))}
    </>
  );
}

export function PublicLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-5">
          <Link to="/" className="flex items-center gap-3">
            <span className="flex size-9 items-center justify-center rounded-sm bg-deep font-display text-sm text-panel">
              CSR
            </span>
            <span className="leading-tight">
              <span className="block font-display text-base text-ink">Portal CSR Pelalawan</span>
              <span className="eyebrow block">Bappeda Kabupaten Pelalawan</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            <NavLinks />
          </nav>

          <div className="flex items-center gap-2">
            <Button asChild size="sm" className="hidden md:inline-flex">
              <Link to="/masuk">Masuk</Link>
            </Button>
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="md:hidden" aria-label="Buka menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-72 bg-panel">
                <div className="mt-10 flex flex-col gap-5 px-5">
                  <NavLinks />
                  <Button asChild size="sm" className="mt-2">
                    <Link to="/masuk">Masuk</Link>
                  </Button>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>

      <main>{children}</main>

      <footer className="mt-24 border-t border-border bg-deep text-panel">
        <div className="mx-auto grid max-w-6xl gap-8 px-5 py-14 md:grid-cols-3">
          <div>
            <h2 className="font-display text-xl">Portal CSR Pelalawan</h2>
            <p className="mt-3 max-w-xs text-sm text-panel/70">
              Kanal resmi publikasi kegiatan tanggung jawab sosial perusahaan yang telah
              diverifikasi dan dipublikasikan oleh Bappeda Kabupaten Pelalawan.
            </p>
          </div>
          <div>
            <p className="eyebrow text-panel/60">Jelajahi</p>
            <ul className="mt-4 space-y-2 text-sm text-panel/80">
              {nav.map((item) => (
                <li key={item.to}>
                  <Link to={item.to} className="hover:text-gold-soft">
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow text-panel/60">Sumber data</p>
            <p className="mt-4 text-sm text-panel/80">
              Data bersumber dari laporan perusahaan yang telah disetujui dan dipublikasikan
              Bappeda.
            </p>
            <p className="mt-3 font-mono text-xs text-gold-soft">
              Terakhir diperbarui {lastUpdated}
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
