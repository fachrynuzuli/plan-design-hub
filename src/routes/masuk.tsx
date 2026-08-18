import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const Route = createFileRoute("/masuk")({
  head: () => ({
    meta: [
      { title: "Masuk — Portal CSR Pelalawan" },
      {
        name: "description",
        content:
          "Masuk ke workspace perusahaan, Bappeda, atau konsol superadmin Portal CSR Pelalawan. Pendaftaran mandiri tidak tersedia.",
      },
      { property: "og:title", content: "Masuk — Portal CSR Pelalawan" },
      { property: "og:description", content: "Akses workspace resmi Portal CSR Pelalawan." },
    ],
  }),
  component: Masuk,
});

function Masuk() {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      <div className="hidden flex-col justify-between bg-deep p-12 text-panel lg:flex">
        <Link to="/" className="eyebrow text-gold-soft">
          ← Kembali ke portal publik
        </Link>
        <div>
          <h1 className="max-w-md font-display text-4xl leading-tight">
            Satu alur kerja, kepemilikan yang jelas.
          </h1>
          <p className="mt-5 max-w-sm text-sm text-panel/70">
            Perusahaan melaporkan. Bappeda meninjau dan mempublikasikan. Publik melihat hasil yang
            sudah resmi.
          </p>
        </div>
        <p className="font-mono text-xs text-panel/50">Bappeda Kabupaten Pelalawan</p>
      </div>

      <div className="flex items-center justify-center px-5 py-16">
        <div className="w-full max-w-sm">
          <p className="eyebrow">Portal CSR Pelalawan</p>
          <h2 className="mt-3 font-display text-3xl text-ink">Masuk ke workspace</h2>
          <p className="mt-2 text-sm text-ink-soft">
            Akun dibuat oleh superadmin. Pendaftaran mandiri tidak tersedia.
          </p>

          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault();
            }}
          >
            <div className="space-y-1.5">
              <Label htmlFor="username">Nama pengguna</Label>
              <Input id="username" autoComplete="username" placeholder="contoh: rapp.csr" />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="password">Kata sandi</Label>
              <Input id="password" type="password" autoComplete="current-password" />
            </div>
            <Button type="submit" className="w-full">
              Masuk
            </Button>
          </form>

          <div className="mt-10 border-t border-border pt-6">
            <p className="eyebrow">Pratinjau workspace (fase frontend)</p>
            <div className="mt-3 grid gap-2">
              <Button asChild variant="outline" size="sm">
                <Link to="/app">Workspace perusahaan</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/bappeda">Workspace Bappeda</Link>
              </Button>
              <Button asChild variant="outline" size="sm">
                <Link to="/superadmin">Konsol superadmin</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
