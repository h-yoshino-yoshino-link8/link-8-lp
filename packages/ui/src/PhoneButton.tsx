"use client";

interface PhoneButtonProps {
  phone: string;
  phoneHref: string;
  onClick?: () => void;
  dark?: boolean;
}

export function PhoneButton({ phone, phoneHref, onClick, dark = true }: PhoneButtonProps) {
  return (
    <a
      href={phoneHref}
      onClick={onClick}
      className={`block font-bold py-3 px-8 rounded-full border transition-colors ${
        dark
          ? "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border-white/20"
          : "bg-link-navy/5 hover:bg-link-navy/10 text-link-navy border-link-navy/20"
      }`}
    >
      {phone}
    </a>
  );
}
