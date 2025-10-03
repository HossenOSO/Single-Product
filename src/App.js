/* import ProductPage from "./components/ProductPage.jsx"; */
import { mockProduct, mockReviews } from "./data/productMock.js";
import Flash from "./flash/FlashShelf.jsx";

export default function App() {
  return (
    <div dir="rtl">
      {/* <ProductPage product={mockProduct} initialReviews={mockReviews} /> */}
      <Flash />
    </div>
  );
}
