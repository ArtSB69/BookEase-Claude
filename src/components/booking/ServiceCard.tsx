import { Clock, ChevronRight } from "lucide-react";
import { formatThaiCurrency, formatDuration } from "@/lib/utils";
import type { Service } from "@/types";

interface ServiceCardProps {
  service: Service;
  onSelect: (service: Service) => void;
  selected?: boolean;
}

export function ServiceCard({ service, onSelect, selected }: ServiceCardProps) {
  return (
    <button
      onClick={() => onSelect(service)}
      className={`w-full text-left rounded-2xl border-2 p-4 transition-all hover:shadow-sm active:scale-[0.99] ${
        selected
          ? "border-brand-500 bg-brand-50"
          : "border-gray-100 bg-white hover:border-gray-200"
      }`}
    >
      <div className="flex items-start justify-between gap-3">
        <div className="flex-1 min-w-0">
          <p className="font-semibold text-gray-900 truncate">{service.name}</p>
          {service.description && (
            <p className="mt-0.5 text-sm text-gray-500 line-clamp-2">{service.description}</p>
          )}
          <div className="mt-2 flex items-center gap-3">
            <span className="flex items-center gap-1 text-xs text-gray-500">
              <Clock className="h-3.5 w-3.5" />
              {formatDuration(service.durationMinutes)}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end gap-2 shrink-0">
          <span className="text-lg font-bold text-gray-900">
            {formatThaiCurrency(service.price)}
          </span>
          <ChevronRight
            className={`h-4 w-4 transition-colors ${
              selected ? "text-brand-500" : "text-gray-300"
            }`}
          />
        </div>
      </div>
    </button>
  );
}
