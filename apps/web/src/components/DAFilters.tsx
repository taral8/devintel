"use client";

interface DAFiltersProps {
  council: string;
  zoning: string;
  outcome: string;
  onCouncilChange: (v: string) => void;
  onZoningChange: (v: string) => void;
  onOutcomeChange: (v: string) => void;
}

const COUNCILS = ["", "Parramatta", "Blacktown", "Hornsby"];
const ZONINGS = ["", "R2", "R3", "R4", "B1", "B2", "B4", "IN1", "RE1"];
const OUTCOMES = ["", "Approved", "Refused", "Deferred", "Under Assessment"];

function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  options: string[];
  placeholder: string;
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label className="text-xs font-semibold uppercase tracking-wider text-gray-500">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="select"
        >
          <option value="">{placeholder}</option>
          {options.filter(Boolean).map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  );
}

export default function DAFilters({
  council,
  zoning,
  outcome,
  onCouncilChange,
  onZoningChange,
  onOutcomeChange,
}: DAFiltersProps) {
  const hasFilters = council || zoning || outcome;

  return (
    <div className="card">
      <div className="flex items-center gap-2 mb-4">
        <svg className="h-4 w-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
        </svg>
        <span className="text-sm font-semibold text-gray-700">Filters</span>
        {hasFilters && (
          <button
            onClick={() => {
              onCouncilChange("");
              onZoningChange("");
              onOutcomeChange("");
            }}
            className="ml-auto text-xs font-medium text-brand-700 hover:text-brand-900 transition-colors"
          >
            Clear all
          </button>
        )}
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <SelectField
          label="Council"
          value={council}
          onChange={onCouncilChange}
          options={COUNCILS}
          placeholder="All Councils"
        />
        <SelectField
          label="Zoning"
          value={zoning}
          onChange={onZoningChange}
          options={ZONINGS}
          placeholder="All Zones"
        />
        <SelectField
          label="Outcome"
          value={outcome}
          onChange={onOutcomeChange}
          options={OUTCOMES}
          placeholder="All Outcomes"
        />
      </div>
    </div>
  );
}
