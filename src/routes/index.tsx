import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { ArrowUpRight, Search } from "lucide-react";
import { PublicLayout } from "@/components/layout/PublicLayout";
import { StatusBadge } from "@/components/StatusBadge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  companies,
  companyName,
  coverage,
  formatCompact,
  formatDate,
  formatRupiah,
  lastUpdated,
  monthlyTrend,
  news,
  publishedActivities,
  publishedTotal,
  reportingCompanies,
  reportingYears,
} from "@/data/fixtures";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Portal CSR Pelalawan — Transparansi CSR Kabupaten Pelalawan" },
      {
        name: "description",
        content:
          "Ringkasan kegiatan CSR yang telah diverifikasi dan dipublikasikan Bappeda Kabupaten Pelalawan: total kontribusi, cakupan pelaporan, dan direktori perusahaan.",
      },
      { property: "og:title", content: "Portal CSR Pelalawan" },
      {
        property: "og:description",
        content: "Data CSR resmi Kabupaten Pelalawan yang telah dipublikasikan Bappeda.",
      },
    ],
  }),
  component: PublicDashboard,
});

function Metric({
  label,
  value,
  note,
}: {
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="paper p-5">
      <p className="eyebrow">{label}</p>
      <p className="mt-3 font-mono text-2xl text-ink">{value}</p>
      <p className="mt-2 text-sm text-ink-soft">{note}</p>
    </div>
  );
}

function TrendChart() {
  const max = Math.max(...monthlyTrend.map((m) => m.value));
  return (
    <div className="paper p-6">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 className="font-display text-xl text-ink">Tren kontribusi terpublikasi</h2>
          <p className="mt-1 text-sm text-ink-soft">Nilai per bulan, tahun anggaran 2026.</p>
        </div>
        <span className="eyebrow">Rupiah</span>
      </div>

      <div className="mt-8 flex h-48 items-end gap-2" role="img" aria-label="Grafik batang tren kontribusi CSR per bulan 2026">
        {monthlyTrend.map((m) => (
          <div key={m.month} className="flex flex-1 flex-col items-center gap-2">
            <div
              className="w-full rounded-t-sm bg-forest/85 transition-colors hover:bg-gold"
              style={{ height: `${max ? Math.max((m.value / max) * 100, 2) : 2}%` }}
            />
            <span className="font-mono text-[10px] text-ink-soft">{m.month}</span>
          </div>
        ))}
      </div>

      <details className="mt-6 border-t border-border pt-4">
        <summary className="cursor-pointer text-sm text-ink-soft hover:text-ink">
          Lihat sebagai tabel
        </summary>
        <table className="mt-3 w-full text-sm">
          <thead>
            <tr className="text-left eyebrow">
              <th className="py-1">Bulan</th>
              <th className="py-1">Nilai</th>
            </tr>
          </thead>
          <tbody className="font-mono text-xs text-ink-soft">
            {monthlyTrend.map((m) => (
              <tr key={m.month} className="border-t border-border/60">
                <td className="py-1.5">{m.month}</td>
                <td className="py-1.5">{m.value === 0 ? "Belum ada data" : formatCompact(m.value)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}

function PublicDashboard() {
  const [year, setYear] = useState("2026");
  const [query, setQuery] = useState("");
  const [sector, setSector] = useState("semua");

  const sectors = useMemo(() => Array.from(new Set(companies.map((c) => c.sector))), []);

  const contributions = useMemo(() => {
    const map = new Map<string, number>();
    publishedActivities.forEach((a) => {
      map.set(a.companyId, (map.get(a.companyId) ?? 0) + (a.amount ?? 0));
    });
    return [...map.entries()].sort((a, b) => b[1] - a[1]);
  }, []);

  const directory = companies.filter((c) => {
    const matchQuery =
      query.trim() === "" ||
      c.name.toLowerCase().includes(query.toLowerCase()) ||
      c.district.toLowerCase().includes(query.toLowerCase());
    const matchSector = sector === "semua" || c.sector === sector;
    return matchQuery && matchSector;
  });

  const publishedNews = news.filter((n) => n.status === "published");

  return (
    <PublicLayout>
      <section className="border-b border-border bg-deep text-panel">
        <div className="mx-auto max-w-6xl px-5 py-20">
          <p className="eyebrow text-gold-soft">Transparansi CSR · Kabupaten Pelalawan</p>
          <h1 className="mt-5 max-w-3xl font-display text-4xl leading-[1.08] text-panel md:text-6xl">
            Apa saja kerja CSR yang sudah resmi dipublikasikan?
          </h1>
          <p className="mt-6 max-w-xl text-base text-panel/75">
            Seluruh angka di halaman ini berasal dari kegiatan yang telah melalui review dan
            dipublikasikan Bappeda. Data yang belum dilaporkan tidak dihitung sebagai nol.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <label className="eyebrow text-panel/60" htmlFor="tahun">
              Tahun pelaporan
            </label>
            <Select value={year} onValueChange={setYear}>
              <SelectTrigger id="tahun" className="w-36 border-panel/25 bg-panel/10 text-panel">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {reportingYears.map((y) => (
                  <SelectItem key={y} value={String(y)}>
                    {y}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span className="font-mono text-xs text-panel/55">
              Diperbarui {lastUpdated}
            </span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-14">
        <div className="grid gap-4 md:grid-cols-4">
          <Metric
            label="Total CSR terpublikasi"
            value={formatCompact(publishedTotal)}
            note={`Dari ${publishedActivities.length} kegiatan pada ${year}`}
          />
          <Metric
            label="Cakupan pelaporan"
            value={`${coverage}%`}
            note={`${reportingCompanies} dari ${companies.length} perusahaan terdaftar`}
          />
          <Metric
            label="Perusahaan melapor"
            value={String(reportingCompanies)}
            note="Punya minimal satu kegiatan terpublikasi"
          />
          <Metric
            label="Belum melapor"
            value={String(companies.length - reportingCompanies)}
            note="Status tidak diketahui, bukan nol"
          />
        </div>

        <div className="mt-8 grid gap-6 lg:grid-cols-[1.6fr_1fr]">
          <TrendChart />

          <div className="paper p-6">
            <h2 className="font-display text-xl text-ink">Kontributor teratas</h2>
            <p className="mt-1 text-sm text-ink-soft">Periode {year}, nilai terpublikasi.</p>
            <ol className="mt-6 space-y-4">
              {contributions.map(([id, total], i) => (
                <li key={id} className="flex items-start gap-3">
                  <span className="mt-0.5 font-mono text-xs text-gold">{String(i + 1).padStart(2, "0")}</span>
                  <div className="min-w-0 flex-1">
                    <Link
                      to="/perusahaan/$companyId"
                      params={{ companyId: id }}
                      className="block truncate text-sm text-ink hover:text-gold"
                    >
                      {companyName(id)}
                    </Link>
                    <div className="mt-1.5 h-1 w-full rounded-full bg-border">
                      <div
                        className="h-1 rounded-full bg-gold"
                        style={{ width: `${(total / (contributions[0]?.[1] ?? 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <span className="font-mono text-xs text-ink-soft">{formatCompact(total)}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      <section className="border-y border-border bg-panel/60">
        <div className="mx-auto max-w-6xl px-5 py-14">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="eyebrow">Direktori</p>
              <h2 className="mt-2 font-display text-3xl text-ink">Perusahaan terdaftar</h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative">
                <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-ink-soft" />
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Cari nama atau kecamatan"
                  aria-label="Cari perusahaan"
                  className="w-64 bg-panel pl-9"
                />
              </div>
              <Select value={sector} onValueChange={setSector}>
                <SelectTrigger className="w-52 bg-panel" aria-label="Filter sektor">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="semua">Semua sektor</SelectItem>
                  {sectors.map((s) => (
                    <SelectItem key={s} value={s}>
                      {s}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {directory.length === 0 ? (
            <p className="paper mt-8 p-10 text-center text-sm text-ink-soft">
              Tidak ada perusahaan yang cocok dengan pencarian tersebut.
            </p>
          ) : (
            <div className="mt-8 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {directory.map((c) => {
                const total = contributions.find(([id]) => id === c.id)?.[1];
                return (
                  <Link
                    key={c.id}
                    to="/perusahaan/$companyId"
                    params={{ companyId: c.id }}
                    className="paper group flex flex-col gap-3 p-5 transition-shadow hover:shadow-lift"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <span className="flex size-10 items-center justify-center rounded-sm bg-deep font-mono text-xs text-panel">
                        {c.logoInitials}
                      </span>
                      <ArrowUpRight className="size-4 text-ink-soft transition-colors group-hover:text-gold" />
                    </div>
                    <div>
                      <p className="font-display text-base leading-snug text-ink">{c.name}</p>
                      <p className="mt-1 text-sm text-ink-soft">
                        {c.sector} · {c.district}
                      </p>
                    </div>
                    <p className="mt-auto font-mono text-xs text-ink-soft">
                      {total ? formatCompact(total) : "Belum ada kegiatan terpublikasi"}
                    </p>
                  </Link>
                );
              })}
            </div>
          )}
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-16">
        <div className="grid gap-10 lg:grid-cols-[1.5fr_1fr]">
          <div>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl text-ink">Kegiatan terbaru dipublikasikan</h2>
              <Button asChild variant="outline" size="sm">
                <Link to="/kegiatan">Semua kegiatan</Link>
              </Button>
            </div>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {publishedActivities.slice(0, 5).map((a) => (
                <li key={a.id}>
                  <Link
                    to="/kegiatan/$activityId"
                    params={{ activityId: a.id }}
                    className="flex flex-wrap items-center gap-x-4 gap-y-2 py-4 transition-colors hover:bg-panel/70"
                  >
                    <span className="font-mono text-xs text-ink-soft">{formatDate(a.date)}</span>
                    <span className="min-w-0 flex-1 text-sm text-ink">{a.title}</span>
                    <span className="text-xs text-ink-soft">{companyName(a.companyId)}</span>
                    <span className="font-mono text-xs text-gold">{formatRupiah(a.amount)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <div className="flex items-end justify-between gap-4">
              <h2 className="font-display text-3xl text-ink">Berita</h2>
              <Button asChild variant="ghost" size="sm">
                <Link to="/berita">Lihat semua</Link>
              </Button>
            </div>
            <div className="mt-6 space-y-4">
              {publishedNews.slice(0, 3).map((n) => (
                <Link
                  key={n.id}
                  to="/berita/$newsId"
                  params={{ newsId: n.id }}
                  className="paper block p-5 transition-shadow hover:shadow-lift"
                >
                  <div className="flex items-center gap-2">
                    <StatusBadge status="published" label={n.tag} />
                    <span className="font-mono text-[11px] text-ink-soft">
                      {formatDate(n.publishedAt)}
                    </span>
                  </div>
                  <p className="mt-3 font-display text-base leading-snug text-ink">{n.title}</p>
                  <p className="mt-2 text-sm text-ink-soft">{n.excerpt}</p>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PublicLayout>
  );
}
