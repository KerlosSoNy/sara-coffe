import ProductCard from "./ProductCard";

export default function ProductList({ products }) {
  return (
    <>
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </>
  );
}
