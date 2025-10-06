import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import Gallery from "./Gallery.jsx";
import BuyBox from "./BuyBox.jsx";
import Section from "./Section.jsx";
import SimilarSection from "./SimilarSection.jsx";
import Reviews from "./Reviews.jsx";
import QASection from "./QASection.jsx";
import PopularSection from "./PopularSection.jsx";
import RecommendedSection from "./RecommendedSection.jsx";
import SideColumn from "./SideColumn.jsx";
import InfoSection from "./InfoSection.jsx";
import SpecsSection from "./SpecsSection.jsx";
import DescriptionSection from "./DescriptionSection.jsx";
import CollectionsSection from "./CollectionsSection.jsx";

import AddReviewModal from "./AddReviewModal.jsx";
import AddQAModal from "./AddQAModal.jsx";
import ThreadModal from "./ThreadModal.jsx";

import { mockProduct, mockReviews } from "../data/productMock.js";

export default function ProductPage() {
  const navigate = useNavigate();

  const product = mockProduct;
  const productId = product?.id;

  const reviewCount = Number(mockReviews?.meta?.total ?? 0);
  const qaCount = Number(
    product?.qaCount ?? (Array.isArray(product?.qa) ? product.qa.length : 0)
  );

  const [openAddReview, setOpenAddReview] = useState(false);
  const [openAsk, setOpenAsk] = useState(false);
  const [openThread, setOpenThread] = useState(null);

  return (
    <main className="page" dir="rtl">
      <header className="head">
        <nav className="breadcrumb">
          <Link to="/">الرئيسية</Link> /{" "}
          <Link to={product.category?.url || "/c"}>
            {product.category?.name || "التصنيف"}
          </Link>{" "}
          / <span>{product.brand}</span>
        </nav>
      </header>

      <section className="grid grid-3">
        <aside className="gallery-col">
          <Gallery images={product.images} />
        </aside>

        <section>
          <BuyBox product={product} reviewCount={reviewCount} qaCount={qaCount} />
        </section>

        <SideColumn product={product} qaCount={qaCount} />
      </section>

      <div className="flow">
        <SimilarSection items={product.similar} />

        <Section id="sec-reviews" title={`التقييمات والتعليقات (${reviewCount})`}>
          <Reviews
            productId={productId}
            reviews={Array.isArray(mockReviews?.data) ? mockReviews.data : []}
            onViewAll={() => navigate(`/product/${productId}/reviews`)}
            onAddClick={() => setOpenAddReview(true)}
          />
        </Section>

        <Section id="sec-qa" title={`الأسئلة والأجوبة (${qaCount})`}>
          <QASection
            seed={product}
            productId={productId}
            onViewAll={() => navigate(`/product/${productId}/qa`)}
            onAskClick={() => setOpenAsk(true)}
            onOpenThread={(thread) => setOpenThread(thread)}
          />
        </Section>

        <InfoSection
          brand={product.brand}
          category={product.category?.name}
          id={product.id}
        />
        <SpecsSection specs={product.specs} />
        <DescriptionSection description={product.description} />
        <CollectionsSection collections={product.collections} />

        <PopularSection items={product.popular} />
        <RecommendedSection items={product.recommended} />
      </div>

      {/* مودالات */}
      <AddReviewModal
        open={openAddReview}
        onClose={() => setOpenAddReview(false)}
        onSubmit={() => setOpenAddReview(false)}
      />

      <AddQAModal
        open={openAsk}
        onClose={() => setOpenAsk(false)}
        onSubmit={() => setOpenAsk(false)}
      />

      <ThreadModal
        open={!!openThread}
        item={openThread}
        onClose={() => setOpenThread(null)}
        onFollowUp={() => {}}
      />
    </main>
  );
}
