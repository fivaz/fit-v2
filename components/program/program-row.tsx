import { Program } from "@/lib/generated/prisma/client";
import { ProgramUI } from "@/lib/program/type";

type ProgramRowProps = {
	program: ProgramUI;
};

export function ProgramRow({ program }: ProgramRowProps) {
	return <div>{program.name}</div>;
}
