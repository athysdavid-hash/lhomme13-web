'use client';

import React, { useState } from 'react';

// Données des premières pièces enregistrées (DIVA & CRYSTAL) avec images
const PRODUCTS = [
  {
    id: 'diva',
    name: 'DIVA',
    category: 'HAUTE COUTURE',
    type: 'Robe longue maxi',
    materials: 'Jacquard / Coton premium, Satin',
    image: '/diva.jpg',
    colors: ['#E6E2DD', '#111111', '#B91C1C', '#1D4ED8'],
    description: 'Robe longue maxi ajustée en haut et évasée en bas avec col mandarin brodé LH13. Lignes structurées effet corset sur le buste et motifs brodés d\'inspiration naturelle.',
    whatsappMsg: 'Bonjour L\'h13, je souhaite réserver le modèle DIVA au Showroom de Brazzaville.',
    badge: 'Signature'
  },
  {
    id: 'crystal',
    name: 'CRYSTAL',
    category: 'STREET COUTURE',
    type: 'Robe longue asymétrique',
    materials: 'Soie premium, Satin de soie',
    image: '/crystal.jpg',
    colors: ['#E6E2DD', '#B91C1C', '#1D4ED8', '#15803D', '#D97706'],
    description: 'Robe longue asymétrique en satin de soie avec col mandarin brodé LH13. Fente asymétrique avec pan rouge vif et broderies fines d\'inspiration naturelle.',
    whatsappMsg: 'Bonjour L\'h13, je souhaite réserver le modèle CRYSTAL au Showroom de Brazzaville.',
    badge: 'Nouveauté'
  }
];

export default function HomePage() {
  const [selectedProduct, setSelectedProduct] = useState<typeof PRODUCTS[0] | null>(null);

  const phone = '242068514938';

  const handleWhatsApp = (msg: string) => {
    const url = `https://wa.me/${phone}?text=${encodeURIComponent(msg)}`;
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen bg-[#0D0D0E] text-[#E6E4DF] font-sans selection:bg-[#B91C1C] selection:text-white">
      {/* HEADER FIXE */}
      <header className="sticky top-0 z-40 bg-[#0D0D0E]/90 backdrop-blur-md border-b border-[#2A2A2D]">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="text-2xl font-black tracking-tighter text-white">L'h13</span>
            <span className="text-xs uppercase tracking-widest text-[#8E8D8A] border-l border-[#3A3A3D] pl-3 hidden sm:inline">
              L'homme13 • Street Couture
            </span>
          </div>

          <nav className="hidden md:flex gap-8 text-xs font-semibold uppercase tracking-widest text-[#A2A09B]">
            <a href="#hero" className="hover:text-white transition">Accueil</a>
            <a href="#collection" className="hover:text-white transition">Collections</a>
            <a href="#showroom" className="hover:text-white transition">Showroom</a>
            <a href="/admin" className="text-[#B91C1C] hover:text-white transition font-bold">Admin</a>
          </nav>

          <button
            onClick={() => handleWhatsApp('Bonjour L\'h13, je souhaite prendre rendez-vous au showroom de Brazzaville.')}
            className="bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs uppercase font-bold tracking-wider px-5 py-2.5 rounded-none transition"
          >
            Rendez-vous
          </button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section id="hero" className="relative min-h-[85vh] flex items-center justify-center border-b border-[#2A2A2D] px-6 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-t from-[#0D0D0E] via-transparent to-transparent z-10" />
        
        <div className="relative z-20 text-center max-w-4xl mx-auto space-y-6">
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#B91C1C]">
            Maison de Couture • Brazzaville
          </p>
          <h1 className="text-5xl sm:text-7xl font-black uppercase tracking-tight text-white leading-none">
            L'ÉLÉGANCE DANS <br /> L'ORIGINALITÉ
          </h1>
          <p className="text-sm sm:text-base text-[#A2A09B] max-w-2xl mx-auto font-light leading-relaxed">
            Fusion audacieuse du tailoring haut de gamme, du pagne, du denim et des coupes architecturales. La marque officielle du vestiaire Street Couture congolais.
          </p>
          <div className="pt-4 flex justify-center gap-4">
            <a
              href="#collection"
              className="bg-white text-black font-bold uppercase text-xs tracking-widest px-8 py-4 hover:bg-[#E6E4DF] transition"
            >
              Découvrir la Collection
            </a>
          </div>
        </div>
      </section>

      {/* SECTION COLLECTION */}
      <section id="collection" className="max-w-7xl mx-auto px-6 py-24 space-y-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-[#2A2A2D] pb-6">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-[#B91C1C]">Catalogue Officiel</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white mt-1">
              Les Créations Éblouissantes
            </h2>
          </div>
          <p className="text-xs text-[#8E8D8A] uppercase tracking-wider">
            2 Pièces Maîtresses Disponibles
          </p>
        </div>

        {/* GRILLE PRODUITS AVEC IMAGES */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
          {PRODUCTS.map((product) => (
            <div
              key={product.id}
              className="group bg-[#141416] border border-[#2A2A2D] flex flex-col justify-between hover:border-[#B91C1C] transition duration-300 overflow-hidden"
            >
              {/* IMAGE DU PRODUIT */}
              <div className="relative h-96 w-full bg-[#0D0D0E] overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover object-top group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-4 left-4">
                  <span className="bg-[#1E1E22]/90 backdrop-blur-md border border-[#3A3A3D] text-xs font-bold tracking-widest uppercase text-[#B91C1C] px-3 py-1">
                    {product.badge}
                  </span>
                </div>
              </div>

              {/* DÉTAILS TEXTE */}
              <div className="p-8 space-y-6 flex-1 flex flex-col justify-between">
                <div className="space-y-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-3xl font-black tracking-tight text-white uppercase">{product.name}</h3>
                      <p className="text-xs uppercase tracking-wider text-[#A2A09B] mt-1">{product.type}</p>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-[#8E8D8A]">
                      {product.category}
                    </span>
                  </div>

                  <p className="text-xs text-[#A2A09B] leading-relaxed font-light">
                    {product.description}
                  </p>
                </div>

                <div className="space-y-2 pt-4 border-t border-[#2A2A2D]">
                  <p className="text-[10px] uppercase tracking-widest text-[#8E8D8A]">Matières : <span className="text-white font-medium">{product.materials}</span></p>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] uppercase tracking-widest text-[#8E8D8A]">Palette :</span>
                    <div className="flex gap-1.5">
                      {product.colors.map((c, i) => (
                        <span key={i} className="w-3 h-3 rounded-full border border-[#3A3A3D]" style={{ backgroundColor: c }} />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="pt-4 flex flex-col sm:flex-row gap-3">
                  <button
                    onClick={() => setSelectedProduct(product)}
                    className="flex-1 bg-[#1E1E22] hover:bg-[#2A2A2D] text-white text-xs uppercase font-bold tracking-widest py-3 transition border border-[#3A3A3D]"
                  >
                    Voir Fiche Détaillée
                  </button>
                  <button
                    onClick={() => handleWhatsApp(product.whatsappMsg)}
                    className="flex-1 bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs uppercase font-bold tracking-widest py-3 transition"
                  >
                    Commander (WhatsApp)
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* MODALE FICHE DÉTAILLÉE AVEC IMAGE */}
      {selectedProduct && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-[#141416] border border-[#3A3A3D] max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 sm:p-8 space-y-6 relative">
            <button
              onClick={() => setSelectedProduct(null)}
              className="absolute top-4 right-4 text-[#8E8D8A] hover:text-white text-xl font-bold z-10 bg-[#0D0D0E] w-8 h-8 rounded-full flex items-center justify-center border border-[#3A3A3D]"
            >
              ✕
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-start">
              <div className="bg-[#0D0D0E] border border-[#2A2A2D] overflow-hidden">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-full h-auto object-cover"
                />
              </div>

              <div className="space-y-4">
                <span className="text-xs font-bold uppercase tracking-widest text-[#B91C1C]">
                  {selectedProduct.category}
                </span>
                <h3 className="text-4xl font-black uppercase text-white">{selectedProduct.name}</h3>

                <p className="text-xs text-[#A2A09B] leading-relaxed">
                  {selectedProduct.description}
                </p>

                <div className="bg-[#0D0D0E] p-4 border border-[#2A2A2D] space-y-2">
                  <p className="text-xs text-[#8E8D8A] uppercase tracking-wider">
                    <strong className="text-white">Matières :</strong> {selectedProduct.materials}
                  </p>
                  <p className="text-xs text-[#8E8D8A] uppercase tracking-wider">
                    <strong className="text-white">Tailles sur mesure :</strong> S / M / L / XL / XXL / Sur-Mesure
                  </p>
                  <p className="text-xs text-[#8E8D8A] uppercase tracking-wider">
                    <strong className="text-white">Retrait :</strong> Atelier-Showroom Brazzaville (+242 06 851 49 38)
                  </p>
                </div>

                <button
                  onClick={() => {
                    handleWhatsApp(selectedProduct.whatsappMsg);
                    setSelectedProduct(null);
                  }}
                  className="w-full bg-[#B91C1C] hover:bg-[#991B1B] text-white text-xs uppercase font-bold tracking-widest py-4 transition"
                >
                  Réserver via WhatsApp Direct
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* SECTION SHOWROOM BRAZZAVILLE */}
      <section id="showroom" className="border-t border-[#2A2A2D] bg-[#111113] py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <span className="text-xs font-bold uppercase tracking-widest text-[#B91C1C]">Point de Vente Physiques</span>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white">Atelier-Showroom L'h13</h2>
            <p className="text-sm text-[#A2A09B] leading-relaxed font-light">
              Venez essayer vos pièces, réaliser vos mesures personnalisées ou découvrir les capsules en avant-première au cœur de Brazzaville.
            </p>

            <div className="space-y-3 text-xs text-[#E6E4DF] pt-2">
              <p>📍 <strong className="text-white">Adresse :</strong> Avenue Amilcar Cabral, Centre-Ville, Brazzaville</p>
              <p>🕒 <strong className="text-white">Horaires :</strong> Lundi – Samedi : 09h00 – 19h00</p>
              <p>📱 <strong className="text-white">WhatsApp / Téléphone :</strong> +242 06 851 49 38</p>
            </div>
          </div>

          <div className="bg-[#18181B] border border-[#2A2A2D] p-8 text-center space-y-4">
            <h3 className="text-xl font-bold uppercase text-white">Création Sur-Mesure</h3>
            <p className="text-xs text-[#8E8D8A]">
              Vous avez un événement particulier ou une commande spécifique à personnaliser ? Contactez directement la maison L'homme13.
            </p>
            <button
              onClick={() => handleWhatsApp('Bonjour L\'h13, je souhaite une création sur-mesure.')}
              className="w-full bg-white text-black font-bold uppercase text-xs tracking-widest py-3 hover:bg-[#E6E4DF] transition"
            >
              Discuter d'un Projet Sur-Mesure
            </button>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-[#2A2A2D] py-10 px-6 text-center text-xs text-[#8E8D8A]">
        <p>© 2026 L'homme13 (L'h13) • Haute Couture & Streetwear Brazzaville. Tous droits réservés.</p>
      </footer>
    </main>
  );
}