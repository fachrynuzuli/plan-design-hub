// Fixture data untuk fase frontend-first. Semua angka diturunkan dari array ini.

export type ActivityStatus =
  | "draft"
  | "submitted"
  | "revision_requested"
  | "approved"
  | "published";

export const STATUS_LABEL: Record<ActivityStatus, string> = {
  draft: "Draf",
  submitted: "Diajukan",
  revision_requested: "Perlu revisi",
  approved: "Disetujui",
  published: "Dipublikasikan",
};

export const STATUS_NEXT_ACTION: Record<ActivityStatus, string> = {
  draft: "Lengkapi lalu ajukan ke Bappeda",
  submitted: "Menunggu review Bappeda",
  revision_requested: "Perbaiki sesuai catatan lalu ajukan ulang",
  approved: "Menunggu publikasi oleh Bappeda",
  published: "Tampil di portal publik",
};

export type Company = {
  id: string;
  name: string;
  sector: string;
  district: string;
  contactComplete: boolean;
  profileComplete: number; // 0-100
  logoInitials: string;
};

export type Activity = {
  id: string;
  companyId: string;
  title: string;
  category: string;
  date: string; // ISO
  district: string;
  village: string;
  fundingType: "Tunai" | "Barang" | "Jasa" | "Campuran";
  amount: number | null; // null = tidak dilaporkan (bukan nol)
  status: ActivityStatus;
  summary: string;
  evidenceCount: number;
  feedback?: string;
  updatedAt: string;
};

export type NewsArticle = {
  id: string;
  title: string;
  excerpt: string;
  body: string;
  status: "draft" | "ready" | "published" | "archived";
  publishedAt: string;
  author: string;
  tag: string;
};

export type Mou = {
  id: string;
  title: string;
  companyId: string;
  parties: string;
  start: string;
  end: string;
  status: "draft" | "approved" | "published" | "archived";
};

export type CompanyDocument = {
  id: string;
  companyId: string;
  name: string;
  description: string;
  type: "Bukti CSR" | "Laporan tahunan" | "Dokumen legal" | "Dokumen MoU";
  status: ActivityStatus;
  size: string;
  updatedAt: string;
  relatedActivityIds: string[];
};

export type ProfileProposal = {
  id: string;
  companyId: string;
  field: string;
  current: string;
  proposed: string;
  status: ActivityStatus;
  submittedAt: string;
};

export type PortalUser = {
  id: string;
  name: string;
  username: string;
  role: "Company admin" | "Bappeda admin" | "Superadmin";
  companyId?: string;
  active: boolean;
  lastSeen: string;
};

export type AuditEvent = {
  id: string;
  actor: string;
  action: string;
  target: string;
  at: string;
};

export const companies: Company[] = [
  { id: "c-rapp", name: "PT Riau Andalan Pulp & Paper", sector: "Kehutanan & Pulp", district: "Pangkalan Kerinci", contactComplete: true, profileComplete: 100, logoInitials: "RA" },
  { id: "c-asian", name: "PT Asian Agri", sector: "Perkebunan Sawit", district: "Ukui", contactComplete: true, profileComplete: 92, logoInitials: "AA" },
  { id: "c-sari", name: "PT Sari Lembah Subur", sector: "Perkebunan Sawit", district: "Pangkalan Lesung", contactComplete: false, profileComplete: 64, logoInitials: "SL" },
  { id: "c-adei", name: "PT Adei Plantation", sector: "Perkebunan Sawit", district: "Pelalawan", contactComplete: true, profileComplete: 78, logoInitials: "AP" },
  { id: "c-mekar", name: "PT Mekarsari Alam Lestari", sector: "Agribisnis", district: "Bunut", contactComplete: false, profileComplete: 41, logoInitials: "ML" },
  { id: "c-pertamina", name: "PT Pertamina Hulu Rokan Zona 4", sector: "Migas", district: "Langgam", contactComplete: true, profileComplete: 88, logoInitials: "PH" },
  { id: "c-bri", name: "Bank Riau Kepri Syariah", sector: "Jasa Keuangan", district: "Pangkalan Kerinci", contactComplete: true, profileComplete: 96, logoInitials: "BR" },
  { id: "c-gandaerah", name: "PT Gandaerah Hendana", sector: "Perkebunan Sawit", district: "Ukui", contactComplete: true, profileComplete: 70, logoInitials: "GH" },
];

export const activities: Activity[] = [
  { id: "a-001", companyId: "c-rapp", title: "Beasiswa Pendidikan Anak Pelalawan 2026", category: "Pendidikan", date: "2026-03-12", district: "Pangkalan Kerinci", village: "Kerinci Kota", fundingType: "Tunai", amount: 1850000000, status: "published", summary: "Program beasiswa untuk 420 pelajar SMA dan mahasiswa asal Kabupaten Pelalawan.", evidenceCount: 6, updatedAt: "2026-07-02" },
  { id: "a-002", companyId: "c-asian", title: "Revitalisasi Posyandu Desa Ukui Dua", category: "Kesehatan", date: "2026-04-05", district: "Ukui", village: "Ukui Dua", fundingType: "Campuran", amount: 640000000, status: "published", summary: "Renovasi bangunan posyandu, penambahan alat timbang, dan pelatihan kader.", evidenceCount: 8, updatedAt: "2026-06-21" },
  { id: "a-003", companyId: "c-pertamina", title: "Pipanisasi Air Bersih Langgam", category: "Infrastruktur", date: "2026-02-18", district: "Langgam", village: "Segati", fundingType: "Barang", amount: 1230000000, status: "published", summary: "Pembangunan jaringan air bersih untuk 310 kepala keluarga.", evidenceCount: 11, updatedAt: "2026-05-30" },
  { id: "a-004", companyId: "c-bri", title: "Pelatihan UMKM Naik Kelas", category: "Ekonomi", date: "2026-05-22", district: "Pangkalan Kerinci", village: "Pangkalan Kerinci Barat", fundingType: "Jasa", amount: 275000000, status: "published", summary: "Pendampingan pembukuan dan pemasaran digital untuk 120 UMKM binaan.", evidenceCount: 5, updatedAt: "2026-07-11" },
  { id: "a-005", companyId: "c-adei", title: "Penanaman Mangrove Kuala Kampar", category: "Lingkungan", date: "2026-06-08", district: "Kuala Kampar", village: "Teluk Dalam", fundingType: "Campuran", amount: 410000000, status: "published", summary: "Penanaman 12.000 bibit mangrove bersama kelompok nelayan.", evidenceCount: 9, updatedAt: "2026-07-19" },
  { id: "a-006", companyId: "c-rapp", title: "Bantuan Alat Sekolah Dasar Bunut", category: "Pendidikan", date: "2026-07-01", district: "Bunut", village: "Pintas Tuo", fundingType: "Barang", amount: 96000000, status: "approved", summary: "Distribusi paket alat tulis dan meja belajar ke 6 sekolah dasar.", evidenceCount: 4, updatedAt: "2026-08-04" },
  { id: "a-007", companyId: "c-rapp", title: "Program Air Bersih Desa Sering", category: "Infrastruktur", date: "2026-07-14", district: "Pelalawan", village: "Sering", fundingType: "Tunai", amount: 520000000, status: "submitted", summary: "Pembangunan sumur bor komunal dan tandon air desa.", evidenceCount: 3, updatedAt: "2026-08-12" },
  { id: "a-008", companyId: "c-rapp", title: "Pelatihan Keterampilan Pemuda Kerinci", category: "Ekonomi", date: "2026-07-28", district: "Pangkalan Kerinci", village: "Mekar Jaya", fundingType: "Jasa", amount: 180000000, status: "revision_requested", summary: "Pelatihan las dan otomotif untuk 60 pemuda.", evidenceCount: 2, feedback: "Mohon lampirkan daftar hadir peserta dan rincian penggunaan dana. Tanggal kegiatan pada dokumen berbeda dengan isian formulir.", updatedAt: "2026-08-15" },
  { id: "a-009", companyId: "c-rapp", title: "Santunan Anak Yatim Ramadan", category: "Sosial", date: "2026-08-10", district: "Pangkalan Kerinci", village: "Kerinci Timur", fundingType: "Tunai", amount: null, status: "draft", summary: "", evidenceCount: 0, updatedAt: "2026-08-16" },
  { id: "a-010", companyId: "c-gandaerah", title: "Perbaikan Jalan Poros Desa Trimulya", category: "Infrastruktur", date: "2026-06-30", district: "Ukui", village: "Trimulya Jaya", fundingType: "Campuran", amount: 780000000, status: "submitted", summary: "Pengerasan jalan sepanjang 2,4 km.", evidenceCount: 7, updatedAt: "2026-08-11" },
  { id: "a-011", companyId: "c-sari", title: "Klinik Kesehatan Keliling", category: "Kesehatan", date: "2026-05-14", district: "Pangkalan Lesung", village: "Genduang", fundingType: "Jasa", amount: 310000000, status: "submitted", summary: "Layanan kesehatan gratis keliling 8 desa.", evidenceCount: 6, updatedAt: "2026-08-09" },
  { id: "a-012", companyId: "c-asian", title: "Bank Sampah Desa Bagan Limau", category: "Lingkungan", date: "2026-04-27", district: "Ukui", village: "Bagan Limau", fundingType: "Barang", amount: 145000000, status: "approved", summary: "Pengadaan mesin pencacah dan pelatihan pengelola bank sampah.", evidenceCount: 5, updatedAt: "2026-08-06" },
];

export const documents: CompanyDocument[] = [
  { id: "d-001", companyId: "c-rapp", name: "Laporan CSR Semester I 2026.pdf", description: "Rekapitulasi seluruh program CSR semester pertama.", type: "Laporan tahunan", status: "published", size: "4,2 MB", updatedAt: "2026-07-20", relatedActivityIds: ["a-001", "a-006"] },
  { id: "d-002", companyId: "c-rapp", name: "Berita Acara Serah Terima Alat Sekolah.pdf", description: "BAST distribusi alat sekolah ke 6 SD di Bunut.", type: "Bukti CSR", status: "submitted", size: "1,1 MB", updatedAt: "2026-08-13", relatedActivityIds: ["a-006"] },
  { id: "d-003", companyId: "c-rapp", name: "Dokumentasi Pelatihan Pemuda.zip", description: "Foto kegiatan dan daftar hadir.", type: "Bukti CSR", status: "revision_requested", size: "18,7 MB", updatedAt: "2026-08-15", relatedActivityIds: ["a-008"] },
  { id: "d-004", companyId: "c-asian", name: "Profil Program CSR 2026.pdf", description: "Ringkasan arah program CSR perusahaan.", type: "Laporan tahunan", status: "published", size: "2,8 MB", updatedAt: "2026-06-25", relatedActivityIds: [] },
  { id: "d-005", companyId: "c-bri", name: "Akta Perubahan Terakhir.pdf", description: "Dokumen legal untuk verifikasi profil.", type: "Dokumen legal", status: "approved", size: "900 KB", updatedAt: "2026-08-02", relatedActivityIds: [] },
  { id: "d-006", companyId: "c-sari", name: "Laporan Klinik Keliling Mei.xlsx", description: "Rekap kunjungan pasien per desa.", type: "Bukti CSR", status: "draft", size: "320 KB", updatedAt: "2026-08-14", relatedActivityIds: ["a-011"] },
];

export const profileProposals: ProfileProposal[] = [
  { id: "p-001", companyId: "c-sari", field: "Narahubung CSR", current: "Belum diisi", proposed: "Dedi Kurniawan · 0812-7788-1122", status: "submitted", submittedAt: "2026-08-12" },
  { id: "p-002", companyId: "c-adei", field: "Alamat kantor", current: "Jl. Lintas Timur KM 12, Pelalawan", proposed: "Jl. Lintas Timur KM 14,5, Desa Batang Nilo Kecil, Pelalawan", status: "submitted", submittedAt: "2026-08-10" },
  { id: "p-003", companyId: "c-mekar", field: "Sektor usaha", current: "Agribisnis", proposed: "Agribisnis & Pengolahan Pangan", status: "revision_requested", submittedAt: "2026-08-05" },
];

export const news: NewsArticle[] = [
  { id: "n-001", title: "Bappeda Luncurkan Portal CSR Terpadu Kabupaten Pelalawan", excerpt: "Portal ini menjadi rujukan resmi publikasi kegiatan CSR yang telah diverifikasi Bappeda.", body: "Pemerintah Kabupaten Pelalawan melalui Bappeda meluncurkan portal CSR terpadu sebagai kanal resmi publikasi kegiatan tanggung jawab sosial perusahaan. Seluruh kegiatan yang tampil di portal telah melalui proses review dan publikasi oleh Bappeda.", status: "published", publishedAt: "2026-08-01", author: "Humas Bappeda", tag: "Pengumuman" },
  { id: "n-002", title: "12.000 Bibit Mangrove Ditanam di Kuala Kampar", excerpt: "Program lingkungan bersama kelompok nelayan menargetkan pemulihan garis pantai.", body: "Kegiatan penanaman mangrove dilaksanakan bersama kelompok nelayan Teluk Dalam. Program ini tercatat sebagai kegiatan CSR yang telah dipublikasikan pada portal.", status: "published", publishedAt: "2026-07-22", author: "Humas Bappeda", tag: "Lingkungan" },
  { id: "n-003", title: "Pelaporan CSR Triwulan III Dibuka", excerpt: "Perusahaan dapat mulai mengajukan kegiatan periode Juli–September.", body: "Bappeda mengimbau seluruh perusahaan terdaftar untuk mengajukan laporan kegiatan CSR triwulan III melalui workspace perusahaan.", status: "published", publishedAt: "2026-07-05", author: "Bidang Ekonomi", tag: "Pengumuman" },
  { id: "n-004", title: "Rencana Forum CSR Pelalawan 2026", excerpt: "Draf pengumuman forum tahunan, menunggu konfirmasi jadwal.", body: "Draf.", status: "draft", publishedAt: "2026-08-14", author: "Humas Bappeda", tag: "Agenda" },
  { id: "n-005", title: "Penandatanganan MoU Air Bersih Langgam", excerpt: "Siap dipublikasikan setelah verifikasi dokumen.", body: "Draf siap publikasi.", status: "ready", publishedAt: "2026-08-16", author: "Bidang Ekonomi", tag: "MoU" },
];

export const mous: Mou[] = [
  { id: "m-001", title: "MoU Program Air Bersih Langgam", companyId: "c-pertamina", parties: "Pemkab Pelalawan · PT Pertamina Hulu Rokan Zona 4", start: "2026-01-15", end: "2026-12-31", status: "published" },
  { id: "m-002", title: "MoU Beasiswa Pendidikan Daerah", companyId: "c-rapp", parties: "Pemkab Pelalawan · PT Riau Andalan Pulp & Paper", start: "2025-09-01", end: "2026-08-31", status: "published" },
  { id: "m-003", title: "MoU Pengembangan UMKM Binaan", companyId: "c-bri", parties: "Pemkab Pelalawan · Bank Riau Kepri Syariah", start: "2026-03-01", end: "2027-02-28", status: "published" },
  { id: "m-004", title: "MoU Rehabilitasi Mangrove Kuala Kampar", companyId: "c-adei", parties: "Pemkab Pelalawan · PT Adei Plantation", start: "2026-06-01", end: "2026-09-30", status: "approved" },
];

export const users: PortalUser[] = [
  { id: "u-001", name: "Fachry Nuzuli", username: "superadmin", role: "Superadmin", active: true, lastSeen: "2026-08-18" },
  { id: "u-002", name: "Rina Marlina", username: "bappeda.rina", role: "Bappeda admin", active: true, lastSeen: "2026-08-18" },
  { id: "u-003", name: "Agus Saputra", username: "bappeda.agus", role: "Bappeda admin", active: true, lastSeen: "2026-08-17" },
  { id: "u-004", name: "Dwi Hartanto", username: "rapp.csr", role: "Company admin", companyId: "c-rapp", active: true, lastSeen: "2026-08-16" },
  { id: "u-005", name: "Sari Widodo", username: "asianagri.csr", role: "Company admin", companyId: "c-asian", active: true, lastSeen: "2026-08-15" },
  { id: "u-006", name: "Dedi Kurniawan", username: "sarilembah.csr", role: "Company admin", active: false, lastSeen: "2026-08-02" },
  { id: "u-007", name: "Novi Ramadhani", username: "bri.csr", role: "Company admin", companyId: "c-bri", active: true, lastSeen: "2026-08-14" },
];

export const auditEvents: AuditEvent[] = [
  { id: "e-001", actor: "Rina Marlina", action: "Mempublikasikan kegiatan", target: "Penanaman Mangrove Kuala Kampar", at: "2026-08-17 14:22" },
  { id: "e-002", actor: "Rina Marlina", action: "Meminta revisi", target: "Pelatihan Keterampilan Pemuda Kerinci", at: "2026-08-15 09:41" },
  { id: "e-003", actor: "Fachry Nuzuli", action: "Membuat pengguna", target: "bri.csr", at: "2026-08-14 16:05" },
  { id: "e-004", actor: "Dwi Hartanto", action: "Mengajukan kegiatan", target: "Program Air Bersih Desa Sering", at: "2026-08-12 10:18" },
  { id: "e-005", actor: "Agus Saputra", action: "Menyetujui dokumen", target: "Akta Perubahan Terakhir.pdf", at: "2026-08-02 11:30" },
  { id: "e-006", actor: "Fachry Nuzuli", action: "Mengarsipkan perusahaan", target: "PT Contoh Nusantara", at: "2026-07-29 08:52" },
];

export const reportingYears = [2026, 2025, 2024];

export const monthlyTrend = [
  { month: "Jan", value: 320000000 },
  { month: "Feb", value: 1230000000 },
  { month: "Mar", value: 1850000000 },
  { month: "Apr", value: 785000000 },
  { month: "Mei", value: 585000000 },
  { month: "Jun", value: 410000000 },
  { month: "Jul", value: 275000000 },
  { month: "Agu", value: 0 },
];

// ---------- helpers ----------

export const CURRENT_COMPANY_ID = "c-rapp";
export const CURRENT_COMPANY_USER = users.find((u) => u.id === "u-004")!;

export const publishedActivities = activities.filter((a) => a.status === "published");

export function companyById(id: string) {
  return companies.find((c) => c.id === id);
}

export function companyName(id: string) {
  return companyById(id)?.name ?? "Perusahaan tidak dikenal";
}

export function activitiesOf(companyId: string) {
  return activities.filter((a) => a.companyId === companyId);
}

export function countByStatus(list: { status: ActivityStatus }[], status: ActivityStatus) {
  return list.filter((i) => i.status === status).length;
}

export function formatRupiah(value: number | null): string {
  if (value === null) return "Tidak dilaporkan";
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatCompact(value: number): string {
  if (value >= 1_000_000_000) return `Rp ${(value / 1_000_000_000).toFixed(2)} M`;
  if (value >= 1_000_000) return `Rp ${(value / 1_000_000).toFixed(1)} jt`;
  return `Rp ${value.toLocaleString("id-ID")}`;
}

export function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export const publishedTotal = publishedActivities.reduce((sum, a) => sum + (a.amount ?? 0), 0);
export const reportingCompanies = new Set(publishedActivities.map((a) => a.companyId)).size;
export const coverage = Math.round((reportingCompanies / companies.length) * 100);
export const lastUpdated = "18 Agustus 2026, 07.30 WIB";
