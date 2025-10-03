import ProductPage from "./components/ProductPage.jsx";
import { mockProduct, mockReviews } from "./data/productMock.js";

export default function App() {
  return (
    <div dir="rtl">
      <ProductPage product={mockProduct} initialReviews={mockReviews} />
    </div>
  );
}
