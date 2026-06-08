const brandDescriptions = {
  Armani: 'Clean Italian tailoring',
  Gucci: 'Statement accessories and family edits',
  Versace: 'Polished occasion luxury',
  Burberry: 'Heritage modest outerwear',
  Prada: 'Minimal leather and beauty',
  Rolex: 'Prestige timepieces',
  Chanel: 'Elegant tweed and silk',
};

const brandCategories = [
  { label: 'All', value: 'All' },
  { label: "Men's Wear", value: "Men's Wear" },
  { label: "Ladies' Wear", value: "Ladies' Wear" },
  { label: 'Kids', value: 'Kids' },
  { label: 'Accessories', value: 'Accessories' },
  { label: 'Shoes', value: 'Shoes' },
  { label: 'Watches', value: 'Watches' },
];

export default function Brands({
  brands,
  activeBrand,
  activeCategory,
  onBrandSelect,
  onCategorySelect,
}) {
  const selectedBrand = activeBrand === 'All' ? 'Curated Brands' : activeBrand;

  const selectBrand = (brand) => {
    onBrandSelect(brand);
    setTimeout(() => document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' }), 0);
  };

  return (
    <section className="brands-section page-shell" id="brands" aria-label="Curated luxury brands">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Curated Brands</p>
          <h2>{selectedBrand}</h2>
        </div>
        <p>
          Select a luxury house to instantly reveal its exclusive edit, then refine the view with
          uncluttered department tags.
        </p>
      </div>

      <div className="brand-rail" role="list">
        {brands.map((brand) => (
          <button
            role="listitem"
            className={activeBrand === brand ? 'brand-card active' : 'brand-card'}
            key={brand}
            onClick={() => selectBrand(brand)}
          >
            <span>{brand}</span>
            <small>{brandDescriptions[brand]}</small>
          </button>
        ))}
      </div>

      {/* <div className="brand-filter-tags" aria-label="Brand category filters">
        {brandCategories.map((category) => (
          <button
            className={activeCategory === category.value ? 'filter-pill active' : 'filter-pill'}
            key={category.value}
            onClick={() => onCategorySelect(category.value)}
          >
            {category.label}
          </button>
        ))}
      </div> */}
    </section>
  );
}
