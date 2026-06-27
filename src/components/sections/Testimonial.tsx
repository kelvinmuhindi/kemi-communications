import { testimonial } from "@/lib/content";

export function Testimonial() {
  return (
    <section id="testimonials" className="bg-brand-paper-warm px-6 py-[90px]">
      <div className="mx-auto max-w-[760px] text-center lg:max-w-[860px]">
        <div className="font-display text-6xl leading-none text-brand-orange">
          &ldquo;
        </div>
        <p className="mt-2.5 font-display text-2xl leading-tight text-brand-ink sm:text-[28px] lg:text-[32px]">
          {testimonial.quote}
        </p>
        <p className="mt-6.5 text-[13.5px] font-semibold text-brand-steel lg:text-[15px]">
          {testimonial.author}
        </p>
      </div>
    </section>
  );
}
