import { Routes, Route } from "react-router-dom";
import ProductPage from "./components/ProductPage.jsx";
import ReviewsPage from "./pages/ReviewsPage.jsx";
import QAPage from "./pages/QAPage.jsx";
import FlashHub from "./flash/FlashHub.jsx";
import FlashShelf from "./flash/FlashShelf.jsx";
export default function App() {
  return (
    <>
      <FlashHub />
      <FlashShelf />
      <Routes>
        <Route path="/" element={<ProductPage />} />
        <Route path="/product/:id/reviews" element={<ReviewsPage />} />
        <Route path="/product/:id/qa" element={<QAPage />} />
      </Routes>
    </>
  );
}
