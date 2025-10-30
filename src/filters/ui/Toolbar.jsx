import React from "react";

export default function Toolbar({
  showReset,
  onResetAll,
  showCount = false, // موجود فقط للمستقبل، افتراضياً false
  count = 0,
}) {
  return (
    <div className="plpf-toolbar">
      <div className="plpf-toolbar-spacer" />
      {showReset && (
        <button className="plpf-resetall" onClick={onResetAll}>
          إعادة ضبط الكل
        </button>
      )}
    </div>
  );
}
