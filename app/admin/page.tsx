'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

const supabase = (supabaseUrl && supabaseAnonKey) 
  ? createClient(supabaseUrl, supabaseAnonKey) 
  : null;

export default function AdminPage() {
  const [formData, setFormData] = useState({
    name: '',
    category: 'HAUTE COUTURE',
    type: '',
    materials: '',
    description: '',
    status: 'Disponible'
  });

  const [imageFile, setImageFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      if (!supabase) return;
      const { data } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (data && data.length > 0) setProducts(data);
    } catch (e) {
      console.log("Supabase non connecté.");
    }
  };

  const handleImageUpload = async (file: File): Promise<string | null> => {
    if (!supabase) return null;
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random().toString(36).substring(2)}.${fileExt}`;
      const filePath = `items/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('products-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('products-images')
        .getPublicUrl(filePath);

      return data.publicUrl;
    } catch (err: any) {
      console.error("Erreur d'upload photo :", err.message);
      return null;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setLoading(true);

    let imageUrl = '/diva.jpg'; // photo par défaut si aucune n'est chargée

    if (imageFile) {
      setUploading(true);
      const uploadedUrl = await handleImageUpload(imageFile);
      if (uploadedUrl) {
        imageUrl = uploadedUrl;
      }
      setUploading(false);
    }

    try {
      if (!supabase) throw new Error("Supabase non disponible");

      const { error } = await supabase.from('products').insert([
        {
          name: formData.name,
          slug: formData.name.toLowerCase().replace(/\s+/g, '-'),
          reference: `LH13-${Date.now().toString().slice(-4)}`,
          category: formData.category,
          description: formData.description,
          materials: formData.materials ? formData.materials.split(',') : [],
          status: formData.status,
          images: [imageUrl]
        }
      ]);

      if (error) throw error;
      alert(`Création "${formData.name}" enregistrée dans Supabase avec sa photo !`);
      fetchProducts();
    } catch (err: any) {
      const newProd = {
        id: Date.now().toString(),
        name: formData.name,
        category: formData.category,
        status: formData.status
      };
      setProducts((prev) => [newProd, ...prev]);
      alert(`Création "${formData.name}" ajoutée en local !`);
    }

    setLoading(false);
    setImageFile(null);
    setFormData({
      name: '',
      category: 'HAUTE COUTURE',
      type: '',
      materials: '',
      description: '',
      status: 'Disponible'
    });
  };

  return (
    <main className="min-h-screen bg-[#0D0D0E] text-[#E6E4DF] p-6 sm:p-12">
      <div className="max-w-5xl mx-auto space-y-10">
        
        {/* HEADER ADMIN */}
        <div className="flex justify-between items-center border-b border-[#2A2A2D] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B91C1C]">Espace Privé</span>
            <h1 className="text-3xl font-black uppercase text-white mt-1">Panneau Admin L'h13</h1>
          </div>
          <a href="/" className="bg-[#1E1E22] hover:bg-[#2A2A2D] text-xs font-bold uppercase tracking-widest px-4 py-2 border border-[#3A3A3D] transition">
            ← Voir le Site
          </a>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          
          {/* FORMULAIRE D'AJOUT */}
          <div className="lg:col-span-2 bg-[#141416] border border-[#2A2A2D] p-8 space-y-6">
            <h2 className="text-xl font-bold uppercase text-white border-b border-[#2A2A2D] pb-4">
              Ajouter une Nouvelle Pièce
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs uppercase text-[#8E8D8A] mb-1">Nom du Modèle</label>
                <input
                  type="text"
                  placeholder="ex: Veste BLAZER L'h13"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-[#0D0D0E] border border-[#2A2A2D] p-3 text-sm text-white focus:outline-none focus:border-[#B91C1C]"
                  required
                />
              </div>

              {/* CHAMP D'UPLOAD PHOTO */}
              <div>
                <label className="block text-xs uppercase text-[#8E8D8A] mb-1">Photo du Modèle</label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                  className="w-full bg-[#0D0D0E] border border-[#2A2A2D] p-3 text-sm text-white file:mr-4 file:py-2 file:px-4 file:border-0 file:text-xs file:font-semibold file:bg-[#B91C1C] file:text-white hover:file:bg-[#991B1B] cursor-pointer"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs uppercase text-[#8E8D8A] mb-1">Catégorie</label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full bg-[#0D0D0E] border border-[#2A2A2D] p-3 text-sm text-white focus:outline-none focus:border-[#B91C1C]"
                  >
                    <option value="HAUTE COUTURE">HAUTE COUTURE</option>
                    <option value="STREET COUTURE">STREET COUTURE</option>
                    <option value="VESTES & ENSEMBLES">VESTES & ENSEMBLES</option>
                    <option value="ACCESSOIRES">ACCESSOIRES</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs uppercase text-[#8E8D8A] mb-1">Type de Vêtement</label>
                  <input
                    type="text"
                    placeholder="ex: Robe longue, Veste courte"
                    value={formData.type}
                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                    className="w-full bg-[#0D0D0E] border border-[#2A2A2D] p-3 text-sm text-white focus:outline-none focus:border-[#B91C1C]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs uppercase text-[#8E8D8A] mb-1">Matières & Textiles</label>
                <input
                  type="text"
                  placeholder="ex: Satin de soie, Pagne, Denim"
                  value={formData.materials}
                  onChange={(e) => setFormData({ ...formData, materials: e.target.value })}
                  className="w-full bg-[#0D0D0E] border border-[#2A2A2D] p-3 text-sm text-white focus:outline-none focus:border-[#B91C1C]"
                />
              </div>

              <div>
                <label className="block text-xs uppercase text-[#8E8D8A] mb-1">Description & Inspirations</label>
                <textarea
                  rows={4}
                  placeholder="Description détaillée des coupes et détails..."
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  className="w-full bg-[#0D0D0E] border border-[#2A2A2D] p-3 text-sm text-white focus:outline-none focus:border-[#B91C1C]"
                />
              </div>

              <button
                type="submit"
                disabled={loading || uploading}
                className="w-full bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold uppercase tracking-widest py-4 transition disabled:opacity-50 cursor-pointer"
              >
                {uploading ? 'Envoi de l\'image...' : loading ? 'Publication...' : 'Publier le Modèle'}
              </button>
            </form>
          </div>

          {/* LISTE DES PIÈCES ENREGISTRÉES */}
          <div className="bg-[#141416] border border-[#2A2A2D] p-6 space-y-6">
            <h2 className="text-lg font-bold uppercase text-white border-b border-[#2A2A2D] pb-3">
              Pièces Enregistrées ({products.length})
            </h2>

            <div className="space-y-3">
              {products.map((item) => (
                <div key={item.id} className="bg-[#0D0D0E] p-4 border border-[#2A2A2D] flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    {item.images && item.images[0] && (
                      <img 
                        src={item.images[0]} 
                        alt={item.name} 
                        className="w-12 h-12 object-cover border border-[#2A2A2D]"
                      />
                    )}
                    <div>
                      <h3 className="font-bold text-white text-sm">{item.name}</h3>
                      <p className="text-[10px] text-[#8E8D8A] uppercase">{item.category}</p>
                    </div>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-[#15803D] bg-[#15803D]/10 px-2 py-1">
                    {item.status || 'Disponible'}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </main>
  );
}