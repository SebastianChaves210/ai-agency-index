import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, type ServiceSlug } from "@/data/listings";
import { agenciesForService, getService } from "@/lib/directory";
import { CategoryPage } from "@/components/category-page";

export function generateStaticParams() {
  return SERVICES.map((s) => ({ slug: s.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) return {};
  const count = agenciesForService(slug as ServiceSlug).length;
  return {
    title: `${service.name} Agencies (${count} vetted)`,
    description: service.blurb,
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = getService(slug);
  if (!service) notFound();

  const agencies = agenciesForService(slug as ServiceSlug);
  const others = SERVICES.filter((s) => s.slug !== slug);

  return (
    <CategoryPage
      kicker="Service"
      title={service.name}
      blurb={service.blurb}
      agencies={agencies}
      otherHeading="Other services"
      otherLinks={others.map((s) => ({
        href: `/services/${s.slug}`,
        label: s.name,
      }))}
    />
  );
}
