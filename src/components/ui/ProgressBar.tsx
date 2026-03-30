import { useI18n } from '../../i18n';

interface Props {
  value: number; // 0..1
  className?: string;
  showLabel?: boolean;
}

export default function ProgressBar({ value, className = '', showLabel = false }: Props) {
  const { language } = useI18n();
  const pct = Math.round(value * 100);
  const label = language === 'en' ? 'Progress' : language === 'kg' ? 'Прогресс' : 'Прогресс';
  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between text-xs text-slate-400 mb-1">
          <span>{label}</span>
          <span>{pct}%</span>
        </div>
      )}
      <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-r from-primary to-primary-light rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
