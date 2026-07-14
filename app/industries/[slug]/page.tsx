import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { INDUSTRIES, type IndustrySlug } from "@/data/listings";
import { agenciesForIndustry, getIndustry } from "@/lib/directory";
import { CategoryPage } from "@/components/category-page";

export function generateStaticParams() {
  return INDUSTRIES.map((i) => ({ slug: i.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) return {};
  const count = agenciesForIndustry(slug as IndustrySlug).length;
  return {
    title: `AI Agencies for ${industry.name} (${count} vetted)`,
    description: industry.blurb,
  };
}

export default async function IndustryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const industry = getIndustry(slug);
  if (!industry) notFound();

  const agencies = agenciesForIndustry(slug as IndustrySlug);
  const others = INDUSTRIES.filter((i) => i.slug !== slug);

  return (
    <CategoryPage
      kicker="Industry"
      title={industry.name}
      blurb={industry.blurb}
      agencies={agencies}
      otherHeading="Other industries"
      otherLinks={others.map((i) => ({
        href: `/industries/${i.slug}`,
        label: i.name,
      }))}
    />
  );
}
