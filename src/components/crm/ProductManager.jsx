import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getProductsAdmin,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../services/productService";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import { HiPencil, HiTrash, HiPlus } from "react-icons/hi";

export default function ProductManager() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    category: "accessoires",
    stock: "",
    isActive: true,
    surCommande: false,
    displayOnly: false,
  });
  const [files, setFiles] = useState(null);

  const { data: products, isLoading } = useQuery({
    queryKey: ["admin-products-all"],
    queryFn: () => getProductsAdmin(),
  });

  const createMut = useMutation({
    mutationFn: (fd) => createProduct(fd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products-all"] });
      closeModal();
    },
  });

  const updateMut = useMutation({
    mutationFn: ({ id, fd }) => updateProduct(id, fd),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-products-all"] });
      closeModal();
    },
  });

  const deleteMut = useMutation({
    mutationFn: (id) => deleteProduct(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-products-all"] }),
  });

  const closeModal = () => {
    setModalOpen(false);
    setEditing(null);
    setForm({
      name: "",
      description: "",
      price: "",
      category: "accessoires",
      stock: "",
      isActive: true,
      surCommande: false,
      displayOnly: false,
    });
    setFiles(null);
  };

  const openEdit = (p) => {
    setEditing(p);
    setForm({
      name: p.name,
      description: p.description,
      price: p.price,
      category: p.category,
      stock: p.stock,
      isActive: p.isActive,
      surCommande: p.surCommande || false,
      displayOnly: p.displayOnly || false,
    });
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const fd = new FormData();
    Object.entries(form).forEach(([k, v]) => fd.append(k, v));
    if (files) Array.from(files).forEach((f) => fd.append("images", f));
    if (editing) {
      if (editing.images)
        editing.images.forEach((img) => fd.append("existingImages", img));
      updateMut.mutate({ id: editing.id, fd });
    } else {
      createMut.mutate(fd);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl tracking-wider">
          Gestion des produits
        </h1>
        <Button onClick={() => setModalOpen(true)}>
          <HiPlus className="inline mr-2" /> Ajouter un produit
        </Button>
      </div>

      <div className="glass-card rounded-xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-white/10 text-rm-muted text-left">
                <th className="p-4 font-medium">Image</th>
                <th className="p-4 font-medium">Nom</th>
                <th className="p-4 font-medium">Prix</th>
                <th className="p-4 font-medium">Stock</th>
                <th className="p-4 font-medium">Catégorie</th>
                <th className="p-4 font-medium">Statut</th>
                <th className="p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products?.map((p) => (
                <tr
                  key={p.id}
                  className="border-b border-white/5 hover:bg-white/5"
                >
                  <td className="p-4">
                    <img
                      src={p.images?.[0] || "https://via.placeholder.com/40"}
                      alt=""
                      className="w-10 h-10 rounded-lg object-cover"
                    />
                  </td>
                  <td className="p-4 font-medium">{p.name}</td>
                  <td className="p-4 font-mono text-rm-pink">
                    {p.price?.toFixed(2)} €
                  </td>
                  <td className="p-4 font-mono">{p.stock}</td>
                  <td className="p-4 capitalize">{p.category}</td>
                  <td className="p-4">
                    <div className="flex flex-col gap-1">
                      <span
                        className={`px-2 py-1 rounded-full text-xs font-bold ${p.isActive ? "bg-rm-success/20 text-rm-success" : "bg-rm-danger/20 text-rm-danger"}`}
                      >
                        {p.isActive ? "Actif" : "Inactif"}
                      </span>
                      {p.surCommande && (
                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-blue-500/20 text-blue-400">
                          Sur commande
                        </span>
                      )}
                      {!p.surCommande && p.stock <= 0 && (
                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-yellow-500/20 text-yellow-400">
                          Rupture
                        </span>
                      )}
                      {p.displayOnly && (
                        <span className="px-2 py-1 rounded-full text-xs font-bold bg-purple-500/20 text-purple-400">
                          Vitrine
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex gap-2">
                      <button
                        onClick={() => openEdit(p)}
                        className="text-rm-light-blue hover:text-white transition-colors"
                      >
                        <HiPencil />
                      </button>
                      <button
                        onClick={() => deleteMut.mutate(p.id)}
                        className="text-rm-danger hover:text-red-400 transition-colors"
                      >
                        <HiTrash />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {isLoading && (
            <p className="text-rm-muted text-center py-8">Chargement...</p>
          )}
          {!isLoading && (!products || products.length === 0) && (
            <p className="text-rm-muted text-center py-8">Aucun produit</p>
          )}
        </div>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        title={editing ? "Modifier le produit" : "Ajouter un produit"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom du produit"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
          />
          <textarea
            placeholder="Description"
            rows={3}
            value={form.description}
            onChange={(e) => setForm({ ...form, description: e.target.value })}
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors resize-none"
          />
          <div className="grid grid-cols-2 gap-4">
            <input
              type="number"
              step="0.01"
              placeholder="Prix (€)"
              value={form.price}
              onChange={(e) => setForm({ ...form, price: e.target.value })}
              required
              className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
            />
            <input
              type="number"
              placeholder="Stock"
              value={form.stock}
              onChange={(e) => setForm({ ...form, stock: e.target.value })}
              className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
            />
          </div>
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-rm-pink transition-colors"
          >
            <option value="vetements">Vêtements</option>
            <option value="accessoires">Accessoires</option>
            <option value="stickers">Stickers</option>
            <option value="lifestyle">Lifestyle</option>
          </select>
          <input
            type="file"
            accept="image/*"
            multiple
            onChange={(e) => setFiles(e.target.files)}
            className="w-full text-rm-muted text-sm file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-rm-pink file:text-white file:font-semibold file:cursor-pointer"
          />
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.isActive}
              onChange={(e) => setForm({ ...form, isActive: e.target.checked })}
              className="w-4 h-4 accent-rm-pink"
            />
            <span className="text-sm text-white">
              Produit actif (visible dans la boutique)
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.surCommande}
              onChange={(e) =>
                setForm({ ...form, surCommande: e.target.checked })
              }
              className="w-4 h-4 accent-rm-pink"
            />
            <span className="text-sm text-white">
              Sur commande (afficher sans pouvoir acheter)
            </span>
          </label>
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={form.displayOnly}
              onChange={(e) =>
                setForm({ ...form, displayOnly: e.target.checked })
              }
              className="w-4 h-4 accent-rm-pink"
            />
            <span className="text-sm text-white">
              Mode vitrine (afficher sans bouton d'achat)
            </span>
          </label>
          <Button
            type="submit"
            fullWidth
            disabled={createMut.isPending || updateMut.isPending}
          >
            {editing ? "Mettre à jour" : "Créer le produit"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
