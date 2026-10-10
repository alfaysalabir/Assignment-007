import ProductCard from "./ProductCard";

// A heading + grid of cards. Used for "দাম বেড়েছে" and "দাম কমেছে".
export default function ProductSection({ icon, iconColor, title, products }) {
  return (
    <section>
      <h2 className="flex items-center gap-2 text-xl font-bold leading-7">
        <span className={`text-sm ${iconColor}`}>{icon}</span>
        {title}
      </h2>
      <div className="mt-3 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>
    </section>
  );
}
