import { useState } from "react";

export default function FormPeminjamanAset({ onSubmit, onCancel }) {
  const [formData, setFormData] = useState({
    number: "",
    barang: "",
    peminjam: "",
    tanggalPinjam: "",
    tanggalKembali: "",
    jumlah: "",
    sisaStok: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleReset = () => {
    setFormData({
      number: "",
      barang: "",
      peminjam: "",
      tanggalPinjam: "",
      tanggalKembali: "",
      jumlah: "",
      sisaStok: "",
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 sm:p-8 rounded-lg shadow-md w-full max-w-2xl"
    >
      <h2 className="text-xl sm:text-2xl font-bold mb-6">
        Form Peminjaman Aset
      </h2>

      {/* Number */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">
          Number
        </label>
        <input
          type="number"
          name="number"
          value={formData.number}
          onChange={handleChange}
          placeholder="Nomor urut..."
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Barang */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">
          Barang
        </label>
        <input
          type="text"
          name="barang"
          value={formData.barang}
          onChange={handleChange}
          placeholder="Nama barang..."
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Peminjam */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">
          Peminjam
        </label>
        <input
          type="text"
          name="peminjam"
          value={formData.peminjam}
          onChange={handleChange}
          placeholder="Nama peminjam..."
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Tanggal Pinjam */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">
          Tanggal Pinjam
        </label>
        <input
          type="date"
          name="tanggalPinjam"
          value={formData.tanggalPinjam}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Tanggal Kembali */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">
          Tanggal Kembali
        </label>
        <input
          type="date"
          name="tanggalKembali"
          value={formData.tanggalKembali}
          onChange={handleChange}
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Jumlah */}
      <div className="mb-4">
        <label className="block font-medium mb-1 text-sm sm:text-base">
          Jumlah
        </label>
        <input
          type="number"
          name="jumlah"
          value={formData.jumlah}
          onChange={handleChange}
          placeholder="Jumlah barang dipinjam..."
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Sisa Stok */}
      <div className="mb-6">
        <label className="block font-medium mb-1 text-sm sm:text-base">
          Sisa Stok
        </label>
        <input
          type="number"
          name="sisaStok"
          value={formData.sisaStok}
          onChange={handleChange}
          placeholder="Sisa stok tersedia..."
          className="w-full border rounded-lg px-3 py-2 text-sm sm:text-base"
        />
      </div>

      {/* Tombol */}
      <div className="flex flex-col sm:flex-row sm:justify-between gap-2">
        <button
          type="button"
          onClick={handleReset}
          className="px-4 py-2 bg-gray-100 rounded-md hover:bg-gray-200 text-sm sm:text-base"
        >
          Reset
        </button>

        <div className="flex flex-col sm:flex-row gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 bg-gray-200 text-black rounded-md hover:bg-gray-300 text-sm sm:text-base"
          >
            Kembali
          </button>
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 text-sm sm:text-base"
          >
            Simpan
          </button>
        </div>
      </div>
    </form>
  );
}
