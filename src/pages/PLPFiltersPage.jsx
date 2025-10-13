import React from "react";
import PLPFilters from "../components/plp/PLPFilters.jsx";
import plpDemoItems from "../data/plpDemoItems.js";

export default function PLPFiltersPage() {
  return (
    <div className="page pad" dir="rtl">
      <PLPFilters
        title="منتجات رجالية"
        items={plpDemoItems}
        withGrid={true}
        pageSize={24}
        onChange={() => {}}
      />
    </div>
  );
}
