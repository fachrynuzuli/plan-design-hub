# Portal CSR Pelalawan — Active Plan

Authoritative product scope: `docs/PELALAWAN_CSR_PORTAL_PRD.md` (PRD v1.0, 18 Aug 2026).

## Current phase

**Phase 1 — Visual foundation and shells** (frontend only, fixture-driven, no backend).

- Shared design tokens: cream `#EEECDF`, deep green `#132318`, panel `#F8F6EC`,
  ink `#1C2620` / `#4B5A50`, gold `#AD7C2E`, soft gold `#D9B872`, green `#3E6B4F`,
  border `#D8D3BF`. Fraunces (display), IBM Plex Sans (UI), IBM Plex Mono (angka).
- Four surfaces with distinct density:
  - Public portal: `/`, `/perusahaan`, `/perusahaan/$id`, `/kegiatan`, `/kegiatan/$id`, `/berita`, `/berita/$id`, `/mou`, `/masuk`
  - Company workspace: `/app` (+ kegiatan, dokumen, profil, akun)
  - Bappeda workspace: `/bappeda` (+ review, dokumen, perusahaan, berita, mou, tindak-lanjut)
  - Superadmin console: `/superadmin` (+ pengguna, perusahaan, penugasan, audit)
- Status vocabulary is exactly: draft, submitted (diajukan), revision requested
  (perlu revisi), approved (disetujui), published (dipublikasikan).
- Only published fixtures appear on public pages.
- All counts derived from fixture arrays; missing ≠ zero.

## Next phases (per PRD)

2. Core CSR loop (submit → review → revisi → approve → publish) with browser state.
3. Content and documents (dokumen, profil proposal, berita, MoU).
4. UX acceptance (loading/empty/error/unauthorized states, a11y, mobile).
5+. Backend gate — Lovable Cloud auth, data, storage. Not started.
