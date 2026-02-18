interface Step {
  num: number;
  title: string;
  desc: string;
  free?: boolean;
}

interface FlowStepProps {
  steps: Step[];
  freeLabel?: string;
}

export function FlowStep({ steps, freeLabel = "無料" }: FlowStepProps) {
  return (
    <div className="space-y-3">
      {steps.map((step) => (
        <div key={step.num} className="flex items-center gap-4 text-left">
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0 ${
              step.free ? "bg-link-orange text-white" : "bg-link-navy text-white"
            }`}
          >
            {step.num}
          </div>
          <div className="flex-1 bg-white rounded-lg p-3 shadow-sm border border-slate-100">
            <div className="flex items-center justify-between">
              <h3 className="font-bold text-link-dark text-sm">{step.title}</h3>
              {step.free && (
                <span className="bg-link-orange/10 text-link-orange text-xs font-bold px-2 py-0.5 rounded">
                  {freeLabel}
                </span>
              )}
            </div>
            <p className="text-link-gray text-xs mt-0.5">{step.desc}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
