export function PageHero({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="bg-brand-ink px-6 py-20 text-white">
      <div className="mx-auto max-w-[1240px]">
        <div className="mb-4 inline-flex items-center gap-2.5 text-xs font-extrabold uppercase tracking-[2px] text-brand-orange">
          <span className="h-0.5 w-6 bg-brand-orange" />
          {eyebrow}
        </div>
        <h1 className="font-display text-3xl leading-tight sm:text-[44px] lg:text-[52px]">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-[600px] text-[15.5px] leading-relaxed text-[#C9C5C0] lg:max-w-[680px] lg:text-[17px]">
            {description}
          </p>
        )}
      </div>
      <div className="route-rule mt-10" />
    </section>
  );
}
