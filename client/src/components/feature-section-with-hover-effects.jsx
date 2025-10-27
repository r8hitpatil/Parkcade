import { cn } from "@/lib/utils";
import {
  IconAdjustmentsBolt,
  IconCloud,
  IconCurrencyDollar,
  IconEaseInOut,
  IconHeart,
  IconHelp,
  IconRouteAltLeft,
  IconTerminal2,
} from "@tabler/icons-react";

export function FeaturesSectionWithHoverEffects() {
  const features = [
    {
      title: "Real-Time Parking Availability",
      description:
        "Instantly view up-to-date information on available parking spots near your destination, helping you save time and avoid unnecessary driving.",
      icon: <IconCloud />,
    },
    {
      title: "Seamless Booking Experience",
      description:
        "Reserve your parking spot in advance with just a few taps. Enjoy peace of mind knowing your space is guaranteed when you arrive.",
      icon: <IconAdjustmentsBolt />,
    },
    {
      title: "Transparent & Affordable Pricing",
      description:
        "Access competitive rates with no hidden fees. Choose from hourly or daily plans and pay securely through the app.",
      icon: <IconCurrencyDollar />,
    },
    {
      title: "Reliable Service, Anytime",
      description:
        "Parkcade ensures you have access to parking 24/7, with a robust platform designed for maximum uptime and reliability.",
      icon: <IconCloud />,
    },
    {
      title: "Multi-City Coverage",
      description:
        "Find and book parking in multiple cities, whether you’re at home or traveling. Parkcade grows with your journey.",
      icon: <IconRouteAltLeft />,
    },
    {
      title: "24/7 Customer Support",
      description:
        "Our dedicated support team is always available to assist you with any parking issues or questions, day or night.",
      icon: <IconHelp />,
    },
    {
      title: "Easy Cancellations & Refunds",
      description:
        "Change of plans? Cancel your booking anytime with a simple tap and receive instant refunds, hassle-free.",
      icon: <IconEaseInOut />,
    },
    {
      title: "Secure & Trusted Platform",
      description:
        "Your data and payments are protected with industry-leading security, so you can park with confidence every time.",
      icon: <IconHeart />,
    },
  ];
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4  relative z-10 py-10 max-w-7xl mx-auto">
      {features.map((feature, index) => (
        <Feature key={feature.title} {...feature} index={index} />
      ))}
    </div>
  );
}

const Feature = ({
  title,
  description,
  icon,
  index
}) => {
  return (
    <div
      className={cn(
        "flex flex-col lg:border-r  py-10 relative group/feature dark:border-neutral-800",
        (index === 0 || index === 4) && "lg:border-l dark:border-neutral-800",
        index < 4 && "lg:border-b dark:border-neutral-800"
      )}>
      {index < 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-t from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      {index >= 4 && (
        <div
          className="opacity-0 group-hover/feature:opacity-100 transition duration-200 absolute inset-0 h-full w-full bg-gradient-to-b from-neutral-100 dark:from-neutral-800 to-transparent pointer-events-none" />
      )}
      <div
        className="mb-4 relative z-10 px-10 text-neutral-600 dark:text-neutral-400">
        {icon}
      </div>
      <div className="text-lg font-bold mb-2 relative z-10 px-10">
        <div
          className="absolute left-0 inset-y-0 h-6 group-hover/feature:h-8 w-1 rounded-tr-full rounded-br-full bg-neutral-300 group-hover/feature:bg-blue-500 dark:bg-neutral-700 dark:group-hover/feature:bg-blue-900 transition-all duration-200 origin-center"/>
        <span
          className="group-hover/feature:translate-x-2 transition duration-200 inline-block text-neutral-800 dark:text-neutral-100 font-oddlini">
          {title}
        </span>
      </div>
      <p
        className="text-sm text-neutral-600 dark:text-neutral-300 max-w-xs relative z-10 px-10 font-oddlini-light tracking-wider">
        {description}
      </p>
    </div>
  );
};
