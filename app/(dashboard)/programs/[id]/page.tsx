import { ProgramLegacyRouteRedirect } from "@/app/(dashboard)/programs/[id]/_components/program-legacy-route-redirect";

type ProgramPageProps = {
	params: Promise<{ id: string }>;
};

export async function generateStaticParams() {
	return [{ id: "placeholder" }];
}

export default async function ProgramPage({ params }: ProgramPageProps) {
	const { id } = await params;
	return <ProgramLegacyRouteRedirect programId={id} />;
}
