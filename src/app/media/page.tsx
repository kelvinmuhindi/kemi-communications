import { Newspaper } from "lucide-react";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { PageHero } from "@/components/sections/PageHero";
import { CtaBand } from "@/components/sections/CtaBand";
import { Eyebrow } from "@/components/ui/Eyebrow";
import { mediaItems } from "@/lib/content";

export const metadata = {
  title: "Media | Kemi Communication Ltd",
  description:
    "News, announcements and updates from Kemi Communication Ltd.",
};

export default function MediaPage() {
  return (
    <>
      <Header />
      <main>
        <PageHero
          eyebrow="Media"
          title="News & updates from Kemi Communication"
          description="Announcements, company news and stories from the road."
        />

        <section id="news" className="px-6 py-[90px]">
          <div className="mx-auto max-w-[1240px]">
            <Eyebrow>News &amp; Announcements</Eyebrow>
            <h2 className="mb-10 font-display text-2xl leading-tight text-brand-ink sm:text-[28px] lg:text-[34px]">
              Latest from the company
            </h2>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {mediaItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-lg border border-brand-line p-7 transition-colors hover:border-brand-orange"
                >
                  <div className="mb-4 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-brand-orange-deep">
                    <Newspaper size={14} />
                    {item.category}
                  </div>
                  <h3 className="mb-2 text-[17px] font-semibold text-brand-ink lg:text-xl">
                    {item.title}
                  </h3>
                  <p className="mb-3 text-sm leading-relaxed text-brand-steel lg:text-[15px]">
                    {item.excerpt}
                  </p>
                  <span className="text-xs font-semibold text-brand-steel">
                    {item.date}
                  </span>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="blog" className="bg-brand-paper-warm px-6 py-[90px]">
          <div className="mx-auto max-w-[1240px] text-center">
            <Eyebrow>Blog</Eyebrow>
            <h2 className="mb-3 font-display text-2xl leading-tight text-brand-ink sm:text-[28px] lg:text-[34px]">
              Our blog is launching soon
            </h2>
            <p className="mx-auto max-w-[480px] text-[15px] leading-relaxed text-brand-steel lg:max-w-[540px] lg:text-base">
              We&apos;ll be sharing travel tips, route guides and industry
              updates relevant to freight and logistics in East Africa.
              Check back soon.
            </p>
          </div>
        </section>

        <CtaBand />
      </main>
      <Footer />
    </>
  );
}
