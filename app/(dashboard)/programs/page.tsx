import * as React from "react";

import NewProgramDrawer from "@/components/new-program-drawer";

export default function Programs() {
	return (
		<div className="p-4">
			<div className="mb-4 flex items-center justify-between">
				<h1 className="text-2xl font-semibold">Programs</h1>
				<NewProgramDrawer />
			</div>

			{/* TODO: server-rendered list of programs goes here */}
		</div>
	);
}
