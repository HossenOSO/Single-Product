import React from 'react';
import ProductGrid from './ui/ProductGrid';
import Toolbar from './ui/Toolbar';
import '../styles/plpf.css';

export default function PLPFilters({
  title = 'المنتجات',
  items = [],
  total,
  onResetAll,
  onSort,
  renderFiltersSide,
  showHeaderCount = true,
  hasMore = false,
  onLoadMore,           // تُستدعى عند اقتراب القاع
}) {
  const computedTotal = typeof total === 'number' ? total : items.length;
  const sentinelRef = React.useRef(null);

  React.useEffect(() => {
    if (!onLoadMore) return;
    const el = sentinelRef.current;
    if (!el) return;

    const obs = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e.isIntersecting) onLoadMore();
    }, { root: null, rootMargin: '600px 0px', threshold: 0 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [onLoadMore]);

  return (
    <div className="plpf">
      <div className="plpf-layout">
        <aside className="plpf-side">
          {typeof renderFiltersSide === 'function' ? renderFiltersSide() : null}
        </aside>

        <main className="plpf-main">
          <div className="plpf-header">
            <h2 className="plpf-title">
              {title} {showHeaderCount ? `(${computedTotal})` : ''}
            </h2>
            <Toolbar
              showCount={showHeaderCount}
              count={computedTotal}
              onResetAll={onResetAll}
              onSort={onSort}
              showReset={false}   // زر إعادة الضبط صار في العمود الجانبي
            />
          </div>

          <ProductGrid items={items} />

          {/* سنترِل لاستدعاء المزيد */}
          {hasMore && (
            <div
              ref={sentinelRef}
              aria-hidden="true"
              style={{ height: 1, width: '100%' }}
            />
          )}
        </main>
      </div>
    </div>
  );
}
