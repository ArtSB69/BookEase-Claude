"use client";

import { cn } from "@/lib/utils";

interface TimeSlotPickerProps {
  slots: string[];
  selected: string;
  onSelect: (time: string) => void;
  bookedSlots?: string[];
}

export function TimeSlotPicker({ slots, selected, onSelect, bookedSlots = [] }: TimeSlotPickerProps) {
  if (slots.length === 0) {
    return (
      <p className="text-center text-sm text-gray-500 py-6">
        ไม่มีเวลาว่างในวันนี้
      </p>
    );
  }

  return (
    <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map((slot) => {
        const isBooked = bookedSlots.includes(slot);
        const isSelected = selected === slot;

        return (
          <button
            key={slot}
            onClick={() => !isBooked && onSelect(slot)}
            disabled={isBooked}
            className={cn(
              "rounded-xl border-2 py-2.5 text-sm font-medium transition-all",
              isBooked && "border-gray-100 bg-gray-50 text-gray-300 cursor-not-allowed",
              !isBooked && !isSelected && "border-gray-200 bg-white text-gray-700 hover:border-brand-300 hover:text-brand-600",
              isSelected && "border-brand-500 bg-brand-500 text-white shadow-sm"
            )}
          >
            {slot}
          </button>
        );
      })}
    </div>
  );
}
