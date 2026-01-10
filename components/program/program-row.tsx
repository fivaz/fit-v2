import { Program } from "@/lib/generated/prisma/client";

type ProgramRowProps = {
	program: Program;
};

export function ProgramRow({ program }: ProgramRowProps) {
	return <div>{program.name}</div>;
}
