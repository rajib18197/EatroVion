import { useEffect, useState } from "react";

const steps = [
  {
    label: "Select campaign settings",
    description: `For each ad campaign that you create, you can control how much
              you're willing to spend on clicks and conversions, which networks
              and geographical locations you want your ads to show on, and more.`,
  },
  {
    label: "Create an ad group",
    description:
      "An ad group contains one or more ads which target a shared set of keywords.",
  },
  {
    label: "Create an ad",
    description: `Try out different ad text to see what brings in the most customers,
              and learn how to enhance your ads using features like ad extensions.
              If you run into any problems with your ads, find out how to tell if
              they're running and how to resolve approval issues.`,
  },
];

export default function Steps() {
  const [stepNumber, setStepNumber] = useState(1);
  const [allDone, setAllDone] = useState(false);

  useEffect(() => {
    if (stepNumber === steps.length + 1) {
      setAllDone(true);
    }
  }, [stepNumber]);

  function handleInc() {
    setStepNumber((num) => num + 1);
  }

  function handleDec() {
    setStepNumber((num) => num - 1);
  }

  return (
    <section className="stepper">
      {steps.map((step, i) => (
        <Step
          key={step.label}
          step={step}
          num={i + 1}
          isActive={stepNumber >= i + 1}
          onInc={handleInc}
          onDec={handleDec}
          stepNumber={stepNumber}
          length={steps.length}
        />
      ))}
      {allDone && (
        <button
          onClick={() => {
            setStepNumber(1);
            setAllDone(false);
          }}
        >
          reset
        </button>
      )}
    </section>
  );
}

function Step({ step, num, isActive, onInc, onDec, stepNumber, length }) {
  const isOpen = num === stepNumber;

  return (
    <>
      <div
        className={`step${isActive ? " active" : ""}${
          isOpen ? " openDesc" : ""
        }`}
      >
        <div className="step__number">{num}</div>
        <div className="step__details">
          <h4 className="step__title">{step.label}</h4>
          <p className="step__description">{step.description}</p>
          <div className="controllers">
            <button className="btn" onClick={onInc}>
              {length === stepNumber ? "Finish" : "Continue"}
            </button>
            <button className="btn" onClick={onDec} disabled={stepNumber === 1}>
              back
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
