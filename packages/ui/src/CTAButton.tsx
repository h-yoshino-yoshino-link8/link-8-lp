"use client";

interface CTAButtonProps {
  text: string;
  href?: string;
  onClick?: () => void;
  variant?: "primary" | "secondary" | "phone";
  pulse?: boolean;
  className?: string;
}

export function CTAButton({
  text,
  href,
  onClick,
  variant = "primary",
  pulse = false,
  className = "",
}: CTAButtonProps) {
  const base = "block font-bold text-center rounded-full transition-colors";
  const variants = {
    primary: "bg-link-orange hover:bg-accent-600 text-white text-lg py-4 px-8",
    secondary: "bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white py-3 px-8 border border-white/20",
    phone: "bg-link-navy hover:bg-primary-600 text-white py-3 px-8",
  };

  const classes = `${base} ${variants[variant]} ${pulse ? "cta-pulse" : ""} ${className}`;

  if (href) {
    return (
      <a href={href} onClick={onClick} className={classes}>
        {text}
      </a>
    );
  }

  return (
    <button onClick={onClick} className={classes}>
      {text}
    </button>
  );
}
