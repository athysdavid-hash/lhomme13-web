'use client';

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';

// Initialisation directe et sécurisée
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

  const [products, setProducts] = useState<any[]>([
    { id: '1', name: 'DIVA', category: 'HAUTE COUTURE', status: 'Disponible' },
    { id: '2', name: 'CRYSTAL', category: 'STREET COUTURE', status: 'Disponible' }
  ]);
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
      console.log("Supabase non connecté, affichage local.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name) return;
    setLoading(true);

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
          images: ['/diva.jpg']
        }
      ]);

      if (error) throw error;
      alert(`Création "${formData.name}" enregistrée dans Supabase avec succès !`);
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
                disabled={loading}
                className="w-full bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs font-bold uppercase tracking-widest py-4 transition disabled:opacity-50 cursor-pointer"
              >
                {loading ? 'Publication...' : 'Publier le Modèle'}
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
                <div key={item.id} className="bg-[#0D0D0E] p-4 border border-[#2A2A2D] flex justify-between items-center">
                  <div>
                    <h3 className="font-bold text-white text-sm">{item.name}</h3>
                    <p className="text-[10px] text-[#8E8D8A] uppercase">{item.category}</p>
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