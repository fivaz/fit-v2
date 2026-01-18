import { createEntityStore } from "@/hooks/optimistic/create-entity-store";
import { createEntityMutations } from "@/hooks/optimistic/use-entity-mutations";
import { BodyMetricsUI } from "@/lib/body-metrics/type";
import { ProgramUI } from "@/lib/program/type";

export const [BodyMetricsProvider, useBodyMetricsStore] = createEntityStore<BodyMetricsUI>();

export const useBodyMetricsMutations = createEntityMutations(useBodyMetricsStore);
