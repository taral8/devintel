export default function ConditionsList({
  conditions,
}: {
  conditions: string[];
}) {
  if (conditions.length === 0) {
    return (
      <div className="rounded-xl border border-dashed border-gray-200 py-8 text-center">
        <p className="text-sm text-gray-400">No conditions recorded.</p>
      </div>
    );
  }

  return (
    <ol className="space-y-3">
      {conditions.map((condition, i) => (
        <li
          key={i}
          className="flex gap-4 rounded-xl bg-gray-50/80 p-4 transition-colors hover:bg-gray-50"
        >
          <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-brand-100 text-xs font-bold text-brand-700">
            {i + 1}
          </span>
          <span className="text-sm leading-relaxed text-gray-600">
            {condition}
          </span>
        </li>
      ))}
    </ol>
  );
}
