// src/components/plp/filters/PriceRange.jsx
import React, { useEffect, useMemo, useState } from "react";

export default function PriceRange({
  min = 0,
  max = 1000000,
  value = {},
  onChange,
  currency = "TL",
  currencyPosition = "suffix", // "suffix": 0 TL | "prefix": TL 0
  presets,                      // [{from,to,label?,disabled?}]
}) {
  const MIN = Number.isFinite(+min) ? +min : 0;
  const MAX = Number.isFinite(+max) ? +max : MIN + 1;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const groupName = useMemo(() => "prg-" + Math.random().toString(36).slice(2, 8), []);

  const [from, setFrom] = useState(Number.isFinite(value.min) ? +value.min : MIN);
  const [to,   setTo]   = useState(Number.isFinite(value.max) ? +value.max : MAX);
  const [fromTxt, setFromTxt] = useState(fmt(Number.isFinite(value.min) ? +value.min : MIN));
  const [toTxt,   setToTxt]   = useState(fmt(Number.isFinite(value.max) ? +value.max : MAX));

  useEffect(() => {
    const a = Number.isFinite(value.min) ? +value.min : MIN;
    const b = Number.isFinite(value.max) ? +value.max : MAX;
    setFrom(a); setTo(b);
    setFromTxt(fmt(a)); setToTxt(fmt(b));
  }, [value.min, value.max, MIN, MAX]);

  const parseNum = (s) => {
    if (s === "") return NaN;
    const n = +String(s).replace(/[^\d]/g, "");
    return Number.isFinite(n) ? n : NaN;
  };

  const apply = () => {
    let a = parseNum(fromTxt);
    let b = parseNum(toTxt);
    a = Number.isNaN(a) ? MIN : clamp(a, MIN, MAX);
    b = Number.isNaN(b) ? MAX : clamp(b, MIN, MAX);
    if (a > b) [a, b] = [b, a];
    setFrom(a); setTo(b);
    setFromTxt(fmt(a)); setToTxt(fmt(b));
    onChange?.({ min: a <= MIN ? undefined : a, max: b >= MAX ? undefined : b });
  };

  const onMinChange = (s) => setFromTxt(s);
  const onMaxChange = (s) => setToTxt(s);
  const onMinBlur   = () => apply();
  const onMaxBlur   = () => apply();
  const onKeyDown   = (e) => { if (e.key === "Enter") apply(); };

  const autoPresets = useMemo(() => ([
    { from: 0,    to: 150 },
    { from: 150,  to: 300 },
    { from: 300,  to: 700 },
    { from: 700,  to: 1750 },
    { from: 1750, to: 6000 },
    { from: 6000, to: 1000000 },
  ]), []);

  const list = useMemo(() => {
    const src = Array.isArray(presets) && presets.length ? presets : autoPresets;
    return src.map((r, i) => {
      const disabled = !!r.disabled || (r.to < MIN || r.from > MAX);
      return { id: `pr-${i}`, from: +r.from, to: +r.to, disabled };
    });
  }, [presets, autoPresets, MIN, MAX]);

  const isChecked = (p) => from === p.from && to === p.to;
  const choose = (p) => {
    setFrom(p.from); setTo(p.to);
    setFromTxt(fmt(p.from)); setToTxt(fmt(p.to));
    onChange?.({
      min: p.from <= MIN ? undefined : p.from,
      max: p.to   >= MAX ? undefined : p.to,
    });
  };

  return (
    <div className="prp" dir="rtl">
      <div className="prp-top">
        <label className="prp-pill">
          {currencyPosition === "prefix" && <span className="prp-cur">{currency}</span>}
          <input
            dir="ltr"
            inputMode="numeric"
            className="prp-inp"
            placeholder={fmt(MIN)}
            value={fromTxt}
            onChange={(e) => onMinChange(e.target.value)}
            onBlur={onMinBlur}
            onKeyDown={onKeyDown}
            aria-label="السعر الأدنى"
          />
          {currencyPosition === "suffix" && <span className="prp-cur">{currency}</span>}
        </label>

        <span className="prp-sep">–</span>

        <label className="prp-pill">
          {currencyPosition === "prefix" && <span className="prp-cur">{currency}</span>}
          <input
            dir="ltr"
            inputMode="numeric"
            className="prp-inp"
            placeholder={fmt(MAX)}
            value={toTxt}
            onChange={(e) => onMaxChange(e.target.value)}
            onBlur={onMaxBlur}
            onKeyDown={onKeyDown}
            aria-label="السعر الأقصى"
          />
          {currencyPosition === "suffix" && <span className="prp-cur">{currency}</span>}
        </label>

        <button type="button" className="prp-apply" onClick={apply} aria-label="تطبيق">
          <svg viewBox="0 0 24 24" className="prp-ico" aria-hidden="true">
            <path d="M20 6L9 17l-5-5" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>

      <div className="prp-presets" role="group" aria-label="نطاقات السعر">
        {list.map((p) => (
          <label key={p.id} className={`prp-radio ${p.disabled ? "is-disabled" : ""}`}>
            <input
              type="radio"
              name={groupName}       
              disabled={p.disabled}
              checked={isChecked(p)}
              onChange={() => choose(p)}
            />
            <span className="prp-lbl" dir="ltr">
              <Amount value={p.from} currency={currency} pos={currencyPosition} />
              <span className="prp-dash">–</span>
              <Amount value={p.to} currency={currency} pos={currencyPosition} />
            </span>
          </label>
        ))}
      </div>
    </div>
  );
}

function Amount({ value, currency, pos }) {
  const txt = pos === "prefix" ? `${currency}\u00A0${fmt(value)}` : `${fmt(value)}\u00A0${currency}`;
  return <bdi className="prp-amt" dir="ltr">{txt}</bdi>;
}
function fmt(n){ const x = Math.round(+n || 0); return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","); }
