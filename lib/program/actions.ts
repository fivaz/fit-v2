import { Program } from "@/lib/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { getUserId } from "@/lib/utils-server";

export async function getPrograms(): Promise<Program[]> {
	const userId = await getUserId();

	return prisma.program.findMany({
		where: { userId }
	});
}
