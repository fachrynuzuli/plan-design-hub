import { Link } from "@tanstack/react-router";
import { Menu, LogOut } from "lucide-react";
import type { ReactNode } from "react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";

export type WorkspaceNavItem = { to: string; label: string; exact?: boolean };

type Props = {
  workspace: string;
  contextLabel: string;
  userName: string;
  nav: WorkspaceNavItem[];
  children: ReactNode;
};

function Items({ nav, onNavigate }: { nav: WorkspaceNavItem[]; onNavigate?: () => void }) {
  return (
    <nav className="flex flex-col gap-0.5">
      {nav.map((item) => (
        <Link
          key={item.to}
          to={item.to}
          onClick={onNavigate}
          activeOptions={{ exact: item.exact ?? false }}
          activeProps={{
            className: "bg-sidebar-accent text-sidebar-accent-foreground border-l-gold",
          }}
          className="border-l-2 border-l-transparent px-4 py-2.5 text-sm text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent/60 hover:text-sidebar-accent-foreground"
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}

export function WorkspaceLayout({ workspace, contextLabel, userName, nav, children }: Props) {
  return (
    <div className="flex min-h-screen bg-background">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-sidebar-border bg-sidebar py-6 lg:flex">
        <div className="px-4">
          <p className="eyebrow text-sidebar-foreground/50">{workspace}</p>
          <p className="mt-1 font-display text-lg text-sidebar-foreground">Portal CSR</p>
        </div>
        <div className="mt-8 flex-1">
          <Items nav={nav} />
        </div>
        <div className="mt-6 border-t border-sidebar-border px-4 pt-4">
          <p className="text-sm text-sidebar-foreground">{userName}</p>
          <p className="mt-0.5 font-mono text-[11px] text-sidebar-foreground/55">{contextLabel}</p>
          <Link
            to="/"
            className="mt-3 inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide text-gold-soft uppercase hover:underline"
          >
            <LogOut className="size-3" /> Keluar
          </Link>
        </div>
      </aside>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between gap-3 border-b border-border bg-background/90 px-4 backdrop-blur lg:px-8">
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline" size="icon" className="lg:hidden" aria-label="Buka menu">
                  <Menu className="size-4" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-64 bg-sidebar p-0">
                <div className="px-4 pt-10">
                  <p className="eyebrow text-sidebar-foreground/50">{workspace}</p>
                </div>
                <div className="mt-6">
                  <Items nav={nav} />
                </div>
              </SheetContent>
            </Sheet>
            <div className="min-w-0">
              <p className="truncate text-sm font-medium text-ink">{contextLabel}</p>
              <p className="eyebrow">{workspace}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden text-sm text-ink-soft sm:inline">{userName}</span>
            <span className="flex size-8 items-center justify-center rounded-full bg-deep font-mono text-xs text-panel">
              {userName
                .split(" ")
                .map((w) => w[0])
                .slice(0, 2)
                .join("")}
            </span>
          </div>
        </header>
        <main className="flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
