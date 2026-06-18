import { products, addToCart } from '../store';

export default function Home({ onNavigate }) {
  const featured = [products[0], products[1]]; // first 2: gummies

  return (
    <div>
      {/* ===== Hero — clean, minimal, scientific ===== */}
      <section className="pt-[64px] bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center min-h-[85vh] py-16">
            {/* Left: text */}
            <div className="max-w-[500px]">
              <h1 className="text-hero-mobile lg:text-hero text-ritual-navy">
                Supplements<br />
                <span className="text-surface-300">that actually work.</span>
              </h1>
              <p className="text-[17px] text-surface-300 mt-6 leading-relaxed max-w-[420px]">
                Every ingredient traceable. Every formula backed by clinical science.
                No hidden fillers, no proprietary blends — just transparent nutrition.
              </p>
              <div className="flex flex-wrap gap-3 mt-8">
                <button onClick={() => onNavigate('products')} className="btn-primary">
                  Shop All
                </button>
                <button onClick={() => onNavigate('products')} className="btn-outline">
                  Our Standards →
                </button>
              </div>
            </div>
            {/* Right: product image */}
            <div className="bg-surface-50 rounded-2xl aspect-square flex items-center justify-center overflow-hidden">
              <img src={products[0].image} alt={products[0].name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
            </div>
          </div>
        </div>
      </section>

      {/* ===== Trust Bar (Ritual signature) ===== */}
      <section className="border-y border-surface-100 bg-white">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 py-8">
          <div className="flex flex-wrap justify-center gap-x-12 gap-y-3 text-[13px] font-medium text-surface-300 tracking-wide">
            <span>Traceable Ingredients</span>
            <span className="hidden sm:inline">·</span>
            <span>Third-Party Tested</span>
            <span className="hidden sm:inline">·</span>
            <span>Clinically Studied</span>
            <span className="hidden sm:inline">·</span>
            <span>Non-GMO</span>
            <span className="hidden sm:inline">·</span>
            <span>Vegan</span>
            <span className="hidden sm:inline">·</span>
            <span>Made in USA</span>
          </div>
        </div>
      </section>

      {/* ===== Bestsellers ===== */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-[32px] font-medium text-ritual-navy tracking-tight">Shop Bestsellers</h2>
            <p className="text-surface-300 text-[15px] mt-2">The essentials, perfected.</p>
          </div>
          <button onClick={() => onNavigate('products')} className="hidden sm:block text-[14px] font-medium text-ritual-navy underline underline-offset-4 decoration-surface-300 hover:decoration-ritual-navy transition-all">
            Shop All →
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {featured.map(p => (
            <div key={p.id} className="group cursor-pointer" onClick={() => onNavigate('product', p.id)}>
              <div className="bg-surface-50 rounded-2xl aspect-[4/3] overflow-hidden">
                <img src={p.image} alt={p.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
              </div>
              <div className="mt-5 flex items-start justify-between">
                <div>
                  <h3 className="text-[18px] font-medium text-ritual-navy">{p.name}</h3>
                  <p className="text-[13px] text-surface-300 mt-1">{p.nameEn}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <span className="text-[16px] font-medium text-ritual-navy">${p.price}</span>
                    {p.originalPrice > p.price && (
                      <span className="text-[14px] text-surface-300 line-through">${p.originalPrice}</span>
                    )}
                  </div>
                </div>
                <button onClick={(e) => { e.stopPropagation(); addToCart(p.id); }}
                  className="btn-outline !py-2 !px-5 text-[13px]">
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ===== Mission ===== */}
      <section className="bg-surface-50 py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10">
          <div className="max-w-[640px]">
            <h2 className="text-[32px] font-medium text-ritual-navy tracking-tight leading-tight">
              Our radical idea:<br />supplements should work.
            </h2>
            <p className="text-[15px] text-surface-300 mt-6 leading-relaxed">
              We start with the human body. We identify nutrients it needs. Then we source
              the world's purest ingredients in forms your body can actually use —
              and we show you exactly where every single one comes from.
            </p>
            <div className="flex gap-4 mt-8">
              <button className="btn-outline text-[14px]">Our Standards</button>
              <button className="btn-outline text-[14px]">Clinical Studies</button>
            </div>
          </div>
        </div>
      </section>

      {/* ===== "Clean" isn't clear enough ===== */}
      <section className="max-w-[1280px] mx-auto px-6 lg:px-10 py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="bg-ritual-cream rounded-2xl aspect-square flex items-center justify-center overflow-hidden order-2 lg:order-1">
            <img src={products[3].image} alt="Ingredients traceability"
              className="w-full h-full object-cover" />
          </div>
          <div className="max-w-[440px] order-1 lg:order-2">
            <h2 className="text-[32px] font-medium text-ritual-navy tracking-tight leading-tight">
              "Clean" isn't clear enough.<br />
              <span className="text-surface-300">We're traceable.</span>
            </h2>
            <p className="text-[15px] text-surface-300 mt-6 leading-relaxed">
              Every ingredient we use is traceable back to its source. You can see exactly
              where it comes from, what it does, and why we chose that specific form.
              No mystery blends. No "proprietary" secrets.
            </p>
            <button className="btn-outline mt-8 text-[14px]">Explore Our Ingredients</button>
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section className="bg-ritual-navy text-white py-24">
        <div className="max-w-[1280px] mx-auto px-6 lg:px-10 text-center">
          <h2 className="text-[32px] md:text-[40px] font-medium tracking-tight leading-tight">
            Find your Vitala.
          </h2>
          <p className="text-white/60 text-[15px] mt-4 max-w-[400px] mx-auto">
            Take our quick quiz or browse the collection to find the right supplements for your goals.
          </p>
          <div className="flex justify-center gap-4 mt-8">
            <button onClick={() => onNavigate('products')} className="bg-white text-ritual-navy font-medium rounded-lg px-8 py-3.5 text-[15px] hover:bg-surface-100 transition-colors active:scale-[0.98]">
              Shop All
            </button>
            <button className="border border-white/30 text-white font-medium rounded-lg px-8 py-3.5 text-[15px] hover:bg-white/10 transition-colors active:scale-[0.98]">
              Take the Quiz
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
