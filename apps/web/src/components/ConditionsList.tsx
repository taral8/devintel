export default function ConditionsList({
  conditions,
}: {
  conditions: string[];
}) {
  if (conditions.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-gray-300 py-6 text-center">
        <p className="text-sm text-gray-400">No conditions recorded.</p>
      </div>
    );
  }

  return (
    <ol className="space-y-2">
      {conditions.map((condition, i) => (
        <li
          key={i}
          className="flex gap-3 rounded-lg bg-gray-50 p-3 transition-colors hover:bg-gray-100"
        >
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-brand-100 text-2xs font-bold tabular-nums text-brand-800">
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
