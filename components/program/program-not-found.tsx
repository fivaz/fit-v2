import Link from "next/link";

import { ArrowLeftIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/lib/consts";

export function ProgramNotFound() {
	return (
		<div className="flex h-screen flex-col items-center justify-center gap-4">
			<p className="text-muted-foreground">Program not found</p>
			<Button asChild>
				<Link href={ROUTES.PROGRAMS}>
					<ArrowLeftIcon />
					Go Back
				</Link>
			</Button>
		</div>
	);
}
