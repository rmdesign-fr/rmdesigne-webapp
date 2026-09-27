import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getAllReviews,
  createReview,
  approveReview,
  deleteReview,
} from "../../services/reviewService";
import {
  HiCheck,
  HiX,
  HiTrash,
  HiPlus,
  HiPencil,
  HiPhotograph,
} from "react-icons/hi";
import Button from "../ui/Button";
import Modal from "../ui/Modal";
import StarRating from "../ui/StarRating";
import api from "../../services/api";

export default function ReviewManager() {
  const queryClient = useQueryClient();
  const [modalOpen, setModalOpen] = useState(false);
  const [editingReview, setEditingReview] = useState(null);
  const [form, setForm] = useState({
    name: "",
    service: "",
    text: "",
    rating: 5,
  });
  const [selectedImages, setSelectedImages] = useState([]);

  const { data: reviews, isLoading } = useQuery({
    queryKey: ["admin-reviews"],
    queryFn: getAllReviews,
  });

  const approveMut = useMutation({
    mutationFn: ({ id, approved }) => approveReview(id, approved),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] }),
  });

  const deleteMut = useMutation({
    mutationFn: (id) => deleteReview(id),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] }),
  });

  const createMut = useMutation({
    mutationFn: async (data) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("service", data.service);
      formData.append("text", data.text);
      formData.append("rating", data.rating);
      formData.append("approved", true);

      selectedImages.forEach((file) => {
        formData.append("images", file);
      });

      const response = await api.post("/api/reviews", formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      setModalOpen(false);
      setForm({ name: "", service: "", text: "", rating: 5 });
      setSelectedImages([]);
    },
  });

  const updateMut = useMutation({
    mutationFn: async ({ id, data }) => {
      const formData = new FormData();
      formData.append("name", data.name);
      formData.append("service", data.service);
      formData.append("text", data.text);
      formData.append("rating", data.rating);

      selectedImages.forEach((file) => {
        formData.append("images", file);
      });

      const response = await api.put(`/api/reviews/${id}`, formData);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["admin-reviews"] });
      setEditingReview(null);
      setForm({ name: "", service: "", text: "", rating: 5 });
      setSelectedImages([]);
    },
  });

  const handleEdit = (review) => {
    setEditingReview(review);
    setForm({
      name: review.name,
      service: review.service,
      text: review.text,
      rating: review.rating,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingReview) {
      updateMut.mutate({ id: editingReview.id, data: form });
    } else {
      createMut.mutate(form);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files || []);
    setSelectedImages((prev) => [...prev, ...files]);
  };

  const removeSelectedImage = (index) => {
    setSelectedImages((prev) => prev.filter((_, i) => i !== index));
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="font-display text-3xl tracking-wider">
          Gestion des avis
        </h1>
        <Button
          onClick={() => {
            setModalOpen(true);
            setEditingReview(null);
            setForm({ name: "", service: "", text: "", rating: 5 });
            setSelectedImages([]);
          }}
        >
          <HiPlus className="inline mr-2" /> Ajouter un avis
        </Button>
      </div>

      <div className="space-y-4">
        {reviews?.map((r) => (
          <div key={r.id} className="glass-card p-5 rounded-xl">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-2">
                  <span className="font-bold">{r.name}</span>
                  <span className="text-rm-muted text-xs font-mono">
                    {r.service}
                  </span>
                  <span
                    className={`px-2 py-0.5 rounded-full text-xs font-bold ${r.approved ? "bg-rm-success/20 text-rm-success" : "bg-yellow-500/20 text-yellow-500"}`}
                  >
                    {r.approved ? "Approuvé" : "En attente"}
                  </span>
                </div>
                <p className="text-rm-muted text-sm mb-2">"{r.text}"</p>
                <StarRating rating={r.rating} size="text-sm" />
                {Array.isArray(r.images) && r.images.length > 0 && (
                  <div className="flex gap-2 mt-3">
                    {r.images.map((img, idx) => (
                      <img
                        key={idx}
                        src={img}
                        alt=""
                        className="w-16 h-16 object-cover rounded"
                      />
                    ))}
                  </div>
                )}
              </div>
              <div className="flex gap-2 ml-4">
                <button
                  onClick={() => {
                    handleEdit(r);
                    setModalOpen(true);
                  }}
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                  title="Modifier"
                >
                  <HiPencil className="text-lg" />
                </button>
                {!r.approved && (
                  <button
                    onClick={() =>
                      approveMut.mutate({ id: r.id, approved: true })
                    }
                    className="text-rm-success hover:text-green-400 transition-colors"
                    title="Approuver"
                  >
                    <HiCheck className="text-lg" />
                  </button>
                )}
                {r.approved && (
                  <button
                    onClick={() =>
                      approveMut.mutate({ id: r.id, approved: false })
                    }
                    className="text-yellow-500 hover:text-yellow-400 transition-colors"
                    title="Retirer"
                  >
                    <HiX className="text-lg" />
                  </button>
                )}
                <button
                  onClick={() => deleteMut.mutate(r.id)}
                  className="text-rm-danger hover:text-red-400 transition-colors"
                  title="Supprimer"
                >
                  <HiTrash className="text-lg" />
                </button>
              </div>
            </div>
          </div>
        ))}
        {isLoading && (
          <p className="text-rm-muted text-center py-8">Chargement...</p>
        )}
        {!isLoading && (!reviews || reviews.length === 0) && (
          <p className="text-rm-muted text-center py-8">Aucun avis</p>
        )}
      </div>

      {/* Add/Edit Review Modal */}
      <Modal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          setEditingReview(null);
          setSelectedImages([]);
        }}
        title={editingReview ? "Modifier l'avis" : "Ajouter un avis"}
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nom du client"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            required
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
          />
          <input
            type="text"
            placeholder="Service (ex: peinture complète)"
            value={form.service}
            onChange={(e) => setForm({ ...form, service: e.target.value })}
            required
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors"
          />
          <textarea
            placeholder="Texte de l'avis"
            rows={3}
            value={form.text}
            onChange={(e) => setForm({ ...form, text: e.target.value })}
            required
            className="w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 text-white placeholder-rm-muted focus:outline-none focus:border-rm-pink transition-colors resize-none"
          />
          <div>
            <label className="text-sm text-rm-muted mb-2 block">Note</label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((n) => (
                <button
                  key={n}
                  type="button"
                  onClick={() => setForm({ ...form, rating: n })}
                  className={`w-10 h-10 rounded-lg border ${form.rating >= n ? "bg-yellow-400 border-yellow-400 text-black" : "border-white/20 text-rm-muted"} font-bold transition-colors`}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>

          {/* Image Upload */}
          <div>
            <label className="text-sm text-rm-muted mb-2 block">
              Images (optionnel)
            </label>
            <label className="cursor-pointer flex items-center justify-center gap-2 w-full bg-rm-dark border border-white/10 rounded-lg px-4 py-3 hover:border-rm-pink transition-colors">
              <HiPhotograph className="text-xl" />
              <span>Ajouter des images</span>
              <input
                type="file"
                accept="image/*"
                multiple
                className="hidden"
                onChange={handleImageChange}
              />
            </label>
            {selectedImages.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {selectedImages.map((file, idx) => (
                  <div key={idx} className="relative">
                    <img
                      src={URL.createObjectURL(file)}
                      alt=""
                      className="w-20 h-20 object-cover rounded"
                    />
                    <button
                      type="button"
                      onClick={() => removeSelectedImage(idx)}
                      className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
                    >
                      ×
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <Button
            type="submit"
            fullWidth
            disabled={createMut.isPending || updateMut.isPending}
          >
            {editingReview ? "Mettre à jour" : "Ajouter l'avis"}
          </Button>
        </form>
      </Modal>
    </div>
  );
}
