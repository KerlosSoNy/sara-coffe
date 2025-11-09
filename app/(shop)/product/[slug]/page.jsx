import { getProductBySlug } from "@/lib/woocommerce";
import ProductPageWrapper from "@/components/product/ProductPageWrapper";

export default async function ProductPage({ params }) {
  const { slug } = await params;
  const product = await getProductBySlug(slug);

  if (!product) {
    return <div>No products found</div>;
  }

  return <ProductPageWrapper product={product} />;
}
