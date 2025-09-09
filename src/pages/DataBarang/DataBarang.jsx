// src/pages/DataBarang.jsx
import { useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import Table from "../../components/DataBarang/Table";
import TableRowDB from "../../components/DataBarang/TableRowDB";
import { Printer, Plus, Pencil, Trash2 } from "lucide-react";
import "../../index.css";

export default function DataBarang() {
  const navigate = useNavigate();

  // State
  const [search, setSearch] = useState("");
  const [dataBarang, setDataBarang] = useState([
    { Number: 1, NamaBarang: "Laptop", JenisBarang: "Elektronik", Stok: 98, Satuan: "Unit" },
    { Number: 2, NamaBarang: "Projector", JenisBarang: "Elektronik", Stok: 12, Satuan: "Unit" },
    { Number: 3, NamaBarang: "Office Chair", JenisBarang: "Furniture", Stok: 21, Satuan: "Pcs" },
    { Number: 4, NamaBarang: "Desk", JenisBarang: "Furniture", Stok: 23, Satuan: "Pcs" },
    { Number: 5, NamaBarang: "Printer", JenisBarang: "Elektronik", Stok: 13, Satuan: "Unit" },
    { Number: 6, NamaBarang: "Whiteboard", JenisBarang: "Perlengkapan Kantor", Stok: 15, Satuan: "Pcs" },
    { Number: 7, NamaBarang: "Mouse Wireless", JenisBarang: "Aksesoris", Stok: 50, Satuan: "Pcs" },
  ]);

  const headers = ["No", "Nama Barang", "Jenis Barang", "Stok", "Satuan", "Aksi"];

  // Filter pencarian
  const filteredData = useMemo(() => {
    return dataBarang.filter((barang) =>
      Object.values(barang)
        .join(" ")
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [dataBarang, search]);

  // Handlers
  const handleTambah = () => navigate("/add-data-barang");
  const handlePrint = () => window.print();
  const handleEdit = (item) => navigate(`/edit-data-barang/${item.Number}`);
  const handleDelete = (item) => {
    if (window.confirm(`Yakin ingin menghapus ${item.NamaBarang}?`)) {
      setDataBarang((prev) => prev.filter((barang) => barang.Number !== item.Number));
    }
  };

  return (
    <MainLayout>
      <div className="bg-white p-3 sm:p-6 rounded-lg shadow">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4 gap-3">
          <h2 className="font-bold text-lg sm:text-xl">Daftar Data Barang</h2>
          <div className="flex items-center gap-2 flex-wrap">
            {/* Tombol Cetak */}
            <button
              onClick={handlePrint}
              className="flex items-center gap-2 px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-gray-700 shadow-sm transition-colors justify-center"
            >
              <Printer size={18} />
              <span className="hidden sm:inline">Cetak</span>
            </button>

            {/* Tombol Tambah */}
            <button
              onClick={handleTambah}
              className="flex items-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-3 sm:px-4 py-2 rounded shadow transition-transform hover:scale-105"
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

        {/* Card Mobile */}
        <div className="space-y-3 sm:hidden">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
              <div
                key={item.Number}
                className="border rounded-lg p-3 shadow-sm flex flex-col gap-2 bg-gray-50"
              >
                <div className="flex justify-between items-center">
                  <h3 className="font-semibold text-gray-800">{item.NamaBarang}</h3>
                  <span className="text-sm text-gray-500">#{item.Number}</span>
                </div>

                <p className="text-sm text-gray-600">
                  Jenis: <span className="font-medium">{item.JenisBarang}</span>
                </p>
                <p className="text-sm text-gray-600">
                  Stok: <span className="font-medium">{item.Stok}</span> {item.Satuan}
                </p>

                <div className="flex gap-2 mt-2">
                  <button
                    onClick={() => handleEdit(item)}
                    className="flex items-center gap-1 px-3 py-1 bg-yellow-100 hover:bg-yellow-200 text-yellow-700 rounded text-sm"
                  >
                    <Pencil size={14} /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(item)}
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

        {/* Tabel Desktop */}
        <div id="printArea" className="hidden sm:block overflow-x-auto">
          <Table headers={headers} search={search} setSearch={setSearch}>
            {filteredData.length > 0 ? (
              filteredData.map((item) => (
                <TableRowDB
                  key={item.Number}
                  item={item}
                  onEdit={() => handleEdit(item)}
                  onDelete={() => handleDelete(item)}
                />
              ))
            ) : (
              <tr>
                <td colSpan={headers.length} className="text-center py-4 text-gray-500 italic">
                  Data Kosong Tidak Tersedia
                </td>
              </tr>
            )}
          </Table>
        </div>
      </div>

      {/* Print CSS */}
      <style>
        {`
          @media print {
            body * {
              visibility: hidden;
            }
            #printArea, #printArea * {
              visibility: visible;
            }
            #printArea {
              position: absolute;
              left: 0;
              top: 0;
              width: 100%;
            }
          }
        `}
      </style>
    </MainLayout>
  );
}
