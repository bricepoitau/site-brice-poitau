"use client";

import { useMemo, useState } from "react";
import PerForm from "./PerForm";
import PerKpiCards from "./PerKpiCards";
import PerChart from "./PerChart";
import PerScenarioTable from "./PerScenarioTable";
import { computeIRWithPER, DEFAULT_PER_PARAMS } from "@/lib/simulateurs/per";

export default function PerSimulator() {
  const [params, setParams] = useState(DEFAULT_PER_PARAMS);
  const result = useMemo(
    () => computeIRWithPER(params.revenuNet, params.versementPER, params.parts),
    [params]
  );

  return (
    <div className="grid grid-cols-1 gap-8 [@media(min-width:900px)]:grid-cols-[340px_1fr]">
      <PerForm params={params} onChange={setParams} />

      <div className="flex flex-col gap-6">
        <PerKpiCards avant={result.avant} apres={result.apres} gain={result.gain} />

        <PerChart
          impotAvant={result.avant.impot}
          impotApres={result.apres.impot}
          riAvant={result.avant.revenuImposable}
          riApres={result.apres.revenuImposable}
        />

        <PerScenarioTable
          revenuNet={params.revenuNet}
          versementPER={params.versementPER}
          parts={params.parts}
          report5ans={params.report5ans}
        />
      </div>
    </div>
  );
}
