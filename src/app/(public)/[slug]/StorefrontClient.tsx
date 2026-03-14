"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Merchant, Service } from "@/types";
import { ServiceCard } from "@/components/booking/ServiceCard";
import { Button } from "@/components/ui/button";
import { CalendarPlus } from "lucide-react";

interface Props {
  merchant: Merchant & { services: Service[] };
  categories: string[];
}

export function StorefrontClient({ merchant, categories }: Props) {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  const filteredServices = selectedCategory
    ? merchant.services.filter((s) => (s.category ?? "บริการ") === selectedCategory)
    : merchant.services;

  const handleSelectService = (service: Service) => {
    setSelectedService(service.id === selectedService?.id ? null : service);
  };

  const handleBook = () => {
    if (selectedService) {
      router.push(`/${merchant.slug}/book?serviceId=${selectedService.id}`);
    } else {
      router.push(`/${merchant.slug}/book`);
    }
  };

  return (
    <div className="space-y-5">
      {/* Category filter */}
      {categories.length > 1 && (
        <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-1">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
              selectedCategory === null
                ? "bg-brand-600 text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
            }`}
          >
            ทั้งหมด
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat === selectedCategory ? null : cat)}
              className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? "bg-brand-600 text-white"
                  : "bg-white border border-gray-200 text-gray-600 hover:border-gray-300"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Services list */}
      <div className="space-y-3">
        <h2 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">
          บริการ ({filteredServices.length})
        </h2>
        {filteredServices.map((service) => (
          <ServiceCard
            key={service.id}
            service={service}
            onSelect={handleSelectService}
            selected={selectedService?.id === service.id}
          />
        ))}
      </div>

      {/* Selected service quick book */}
      {selectedService && (
        <div className="fixed bottom-20 left-0 right-0 z-20 px-4">
          <div className="mx-auto max-w-xl">
            <div className="rounded-2xl bg-brand-600 p-4 shadow-xl flex items-center justify-between gap-4">
              <div className="text-white min-w-0">
                <p className="text-sm font-medium truncate">{selectedService.name}</p>
                <p className="text-xs text-brand-200">{selectedService.durationMinutes} นาที</p>
              </div>
              <Button
                onClick={handleBook}
                className="bg-white text-brand-700 hover:bg-brand-50 shrink-0"
                size="sm"
              >
                <CalendarPlus className="h-4 w-4" />
                จองเลย
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
