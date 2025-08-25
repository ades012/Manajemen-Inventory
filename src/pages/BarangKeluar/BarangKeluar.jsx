// src/pages/BarangKeluar.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, Printer, Pencil, Trash2 } from "lucide-react";

import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/DataBarang/Table";
import TableRowBK from "../../components/BarangKeluar/TableRowBK";

export default function BarangKeluar() {
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [barangKeluar, setBarangKeluar] = useState([
    {
      no: 1,
      noTransaksi: "T-BK-2508010001",
      tglKeluar: "2025-08-01",
      namaBarang: "Laptop",
      namaPenerima: "Advin",
      bagian: "IT", 
      totalKeluar: "5 Unit",
      petugas: "Administrator",
    },
    {
      no: 2,
      noTransaksi: "T-BK-2508010002",
      tglKeluar: "2025-08-01",
      namaBarang: "Printer",
      namaPenerima: "Budi",
      bagian: "Keuangan",
      totalKeluar: "2 Unit",
      petugas: "Dewi",
    },
    {
      no: 3,
      noTransaksi: "T-BK-2508020003",
      tglKeluar: "2025-08-02",
      namaBarang: "Kursi Kantor",
      namaPenerima: "Citra",
      bagian: "HRD",
      totalKeluar: "10 Pcs",
      petugas: "Rudi",
    },
  ]);

  // Filter berdasarkan pencarian
  const filteredData = useMemo(() => {
    return barangKeluar.filter((item) =>
      Object.values(item)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [barangKeluar, search]);

  // Hapus data
  const handleDelete = (no) => {
    const confirmDelete = window.confirm("Yakin ingin menghapus data ini?");
    if (confirmDelete) {
      setBarangKeluar(barangKeluar.filter((item) => item.no !== no));
    }
  };

  return (
    <MainLayout>
      <div className="bg-white rounded-lg shadow p-4">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="font-bold text-lg">Riwayat Barang Keluar</h2>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={() => alert("Cetak data")}
              className="flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm transition-colors justify-center"
              title="Print Data"
            >
              <Printer size={18} />
              <span className="hidden sm:inline">Cetak</span>
            </button>
            <button
              onClick={() => navigate("/add-barang-keluar")}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded shadow transition-transform hover:scale-105"
            >
              <Plus size={18} />
              <span className="hidden sm:inline">Tambah</span>
            </button>
          </div>
        </div>

        {/* Search (Mobile) */}
        <div className="sm:hidden mb-4 relative">
          <input
            type="text"
            placeholder="Cari data..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full px-4 py-2 pl-10 border border-gray-300 rounded-lg shadow-sm focus:outline-none text-sm"
          />
          <svg
            className="absolute left-3 top-2.5 w-5 h-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1110.5 3a7.5 7.5 0 016.15 13.65z"
            />
          </svg>
        </div>

        {/* Card View (Mobile) */}
        <div className="sm:hidden space-y-3">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.no}
                className="border rounded-lg p-3 shadow-sm bg-gray-50 flex flex-col gap-2"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">
                    {item.namaBarang}
                  </h3>
                  <span className="text-sm text-gray-500">#{item.no}</span>
                </div>

                <p className="text-sm text-gray-600">
                  No Transaksi:{" "}
                  <span className="font-medium">{item.noTransaksi}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Tgl Keluar:{" "}
                  <span className="font-medium">{item.tglKeluar}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Penerima:{" "}
                  <span className="font-medium">{item.namaPenerima}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Bagian: {" "}
                  <span className="font-medium">{item.bagian}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Total Keluar:{" "}
                  <span className="font-medium">{item.totalKeluar}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Petugas: <span className="font-medium">{item.petugas}</span>
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => navigate(`/edit-barang-keluar/${item.no}`)}
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-sm"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item.no)}
                    className="flex items-center gap-1 px-3 py-1 bg-red-100 hover:bg-red-200 text-red-700 rounded text-sm"
                  >
                    <Trash2 size={14} /> Hapus
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center py-4 text-gray-500 italic">
              Data Kosong Tidak Tersedia
            </p>
          )}
        </div>

        {/* Table (Desktop) */}
        <div className="hidden sm:block overflow-x-auto">
          <Table
            headers={[
              "No",
              "No Transaksi",
              "Tgl Keluar",
              "Nama Barang",
              "Nama Penerima",
              "Bagian", 
              "Total Keluar",
              "Petugas",
              "Aksi",
            ]}
          >
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRowBK
                  key={item.no}
                  item={item}
                  onEdit={() => navigate(`/edit-barang-keluar/${item.no}`)}
                  onDelete={() => handleDelete(item.no)}
                  editIcon={<Pencil size={16} />}
                />
              ))
            ) : (
              <tr>
                <td
                  colSpan={9}
                  className="text-center py-4 text-gray-500 italic"
                >
                  Data Kosong Tidak Tersedia
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>
    </MainLayout>
  );
}
