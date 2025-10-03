import { useRef } from "react";
import Gallery from "./Gallery.jsx";
import BuyBox from "./BuyBox.jsx";
import Reviews from "./Reviews.jsx";

import Section from "./Section.jsx";
import SimilarSection from "./SimilarSection.jsx";
import QASection from "./QASection.jsx";
import PopularSection from "./PopularSection.jsx";
import RecommendedSection from "./RecommendedSection.jsx";
import OtherSellers from "./OtherSellers.jsx";

import { mockProduct, mockReviews } from "../data/productMock.js";

export default function ProductPage() {
  const sectionsRef = useRef(null);

  const reviewCount = Number(mockReviews?.meta?.total ?? 0);
  const qaCount = Number(mockProduct?.qaCount ?? 0);

  function goToReviews() {
    const el = document.getElementById("sec-reviews");
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 80;
    window.scrollTo({ top, behavior: "smooth" });
  }

  return (
    <main className="page" dir="rtl">
      <header className="head">
        <nav className="breadcrumb">
          <a href="#">الرئيسية</a> /{" "}
          <a href="#">{mockProduct.category?.name || "التصنيف"}</a> /{" "}
          <span>{mockProduct.brand}</span>
        </nav>
      </header>

      {/* الشبكة العلوية 3 أعمدة */}
      <section className="grid grid-3">
        {/* عمود المعرض — متحرك مع الصفحة */}
        <aside className="gallery-col">
          <div className=".gallery-stick">
            <Gallery images={mockProduct.images} />
          </div>{" "}
        </aside>

        {/* عمود الشراء — ثابت عبر CSS لديك */}
        <section>
          <BuyBox
            product={mockProduct}
            reviewCount={reviewCount}
            qaCount={qaCount}
            onNavigate={goToReviews}
          />
        </section>

        {/* العمود الجانبي — ثابت */}
        <aside className="side">
          <div className="info-card">
            <div className="info-row">
              <div className="info-label">الفئة</div>
              <a href={mockProduct.category?.url} className="info-link">
                {mockProduct.category?.name}
              </a>
            </div>
            <div className="info-row">
              <div className="info-label">العلامة التجارية</div>
              <a href={mockProduct.brandUrl} className="info-link">
                {mockProduct.brand}
              </a>
            </div>
          </div>

          <div className="seller-card v2">
            <a
              href={mockProduct.seller.storeUrl}
              className="seller-head"
              title="الذهاب إلى المتجر"
            >
              <img
                className="seller-logo"
                src={mockProduct.seller.logo}
                alt={`شعار ${mockProduct.seller.name}`}
                onError={(e) => {
                  e.currentTarget.style.visibility = "hidden";
                }}
              />
              <div className="seller-names">
                <div className="seller-name">{mockProduct.seller.name}</div>
                <div className="seller-followers">
                  {mockProduct.seller.followers} متابع
                </div>
              </div>
              <span className="score-badge" title="تقييم المتجر">
                {mockProduct.seller.score.toFixed(1)}
              </span>
            </a>

            {mockProduct.seller.successful && (
              <div className="seller-subrow">
                <span className="seller-tag">بائع ناجح</span>
              </div>
            )}

            <ul className="seller-list">
              <li>
                <span className="li-ico">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M12 12a5 5 0 100-10 5 5 0 000 10zm-9 9c0-4 4-7 9-7s9 3 9 7"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                تابع المتجر
              </li>
              <li
                onClick={() => {
                  const el = document.getElementById("sec-qa");
                  if (!el) return;
                  const top =
                    el.getBoundingClientRect().top + window.scrollY - 80;
                  window.scrollTo({ top, behavior: "smooth" });
                }}
                role="button"
                tabIndex={0}
              >
                <span className="li-ico">
                  <svg viewBox="0 0 24 24" width="18" height="18">
                    <path
                      d="M21 15a4 4 0 01-4 4H7l-4 3V7a4 4 0 014-4h10a4 4 0 014 4v8z"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
                أسئلة البائع ({qaCount})<span className="chev">›</span>
              </li>
            </ul>

            <a href={mockProduct.seller.storeUrl} className="btn-pill">
              اذهب إلى المتجر <span className="chev">›</span>
            </a>
          </div>
          <div className="collection-card">
            <span className="col-ico">
              <svg viewBox="0 0 24 24" width="18" height="18">
                <path
                  d="M6 2h12a2 2 0 012 2v18l-8-4-8 4V4a2 2 0 012-2z"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                />
              </svg>
            </span>
            أضف إلى مجموعة
            <span className="plus">+</span>
          </div>
          <OtherSellers sellers={mockProduct.otherSellers || []} />
        </aside>
      </section>

      {/* الأقسام السفلية */}
      <div ref={sectionsRef} className="flow">
        <SimilarSection items={mockProduct.similar} />

        <Section
          id="sec-reviews"
          title={`التقييمات والتعليقات (${reviewCount})`}
        >
          <Reviews seed={mockReviews} />
        </Section>

        <QASection qa={mockProduct.qa || []} count={mockProduct.qaCount || 0} />

        <Section title="معلومات المنتج">
          <ul className="kv">
            <li>
              <span>الماركة</span>
              <strong>{mockProduct.brand}</strong>
            </li>
            <li>
              <span>الفئة</span>
              <strong>{mockProduct.category?.name}</strong>
            </li>
            <li>
              <span>رمز المنتج</span>
              <strong>{mockProduct.id}</strong>
            </li>
          </ul>
        </Section>

        <Section title="خصائص المنتج">
          <ul className="list-dot">
            {mockProduct.specs.map((s, i) => (
              <li key={i}>{s}</li>
            ))}
          </ul>
        </Section>

        <Section title="وصف المنتج">
          <p className="desc">{mockProduct.description}</p>
        </Section>

        <Section title="مجموعات قد تهمك">
          <ul className="chips">
            {mockProduct.collections.map((t, i) => (
              <li key={i}>
                <a href={t.url || "#"}>{t.name}</a>
              </li>
            ))}
          </ul>
        </Section>

        <PopularSection items={mockProduct.popular} />
        <RecommendedSection items={mockProduct.recommended} />
      </div>
    </main>
  );
}
