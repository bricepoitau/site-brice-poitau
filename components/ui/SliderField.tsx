interface SliderFieldProps {
  id: string;
  label: string;
  value: number;
  displayValue: string;
  min: number;
  max: number;
  step?: number;
  onChange: (value: number) => void;
}

export default function SliderField({ id, label, value, displayValue, min, max, step = 1, onChange }: SliderFieldProps) {
  return (
    <div>
      <label className="flex justify-between text-sm text-text-muted" htmlFor={id}>
        <span>{label}</span>
        <span className="font-semibold text-ink">{displayValue}</span>
      </label>
      <input
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-2 w-full accent-gold"
      />
    </div>
  );
}
