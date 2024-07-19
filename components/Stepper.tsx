"use client";

import { StepperProps } from "@/types";
import CheckIcon from "./vectors/CheckIcon";

export default function Stepper({
	steps,
	currentStep,
	complete,
}: StepperProps) {
	return (
		<div className="flex items-center justify-between">
			{steps.map((step, i) => (
				<div
					key={i}
					className={`step-item ${currentStep === i + 1 && "active"} ${
						(i + 1 < currentStep || complete) && "complete"
					} `}
				>
					<div className="flex flex-col">
						<div className="step m-2">
							<CheckIcon />
						</div>
						<p className="text-sm text-slate-300">Step {i + 1}</p>
					</div>
				</div>
			))}
		</div>
	);
}
