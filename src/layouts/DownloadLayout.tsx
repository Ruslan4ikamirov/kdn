import Header from "../components/Header";
import Footer from "../components/Footer";
import { useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import type {Filters} from "../types/Filters"
import { validateRangePair } from "../utils/dateRangeValidation";

const defaultValues: Filters = {
  decisionFrom: "",
  decisionTo: "",
  incidentFrom: "",
  incidentTo: "",
};

const DownloadLayout = () => {
  const {
    register,
    handleSubmit,
    reset,
    control,
    trigger,
    setError,
    clearErrors,
    formState: { errors, touchedFields, isSubmitted },
  } = useForm<Filters>({
    defaultValues,
    mode: "onChange",
  });

  const decisionFrom = useWatch({ control, name: "decisionFrom" });
  const decisionTo = useWatch({ control, name: "decisionTo" });
  const incidentFrom = useWatch({ control, name: "incidentFrom" });
  const incidentTo = useWatch({ control, name: "incidentTo" });

  const hasDecisionAny = !!decisionFrom || !!decisionTo;
  const hasIncidentAny = !!incidentFrom || !!incidentTo;
  const allEmpty = !decisionFrom && !decisionTo && !incidentFrom && !incidentTo;
  const filledDecision = !!decisionFrom && !!decisionTo;
  const filledIncident = !!incidentFrom && !!incidentTo;

  useEffect(() => {
    void trigger(["decisionFrom", "decisionTo"]);
  }, [decisionFrom, decisionTo, trigger]);

  useEffect(() => {
    void trigger(["incidentFrom", "incidentTo"]);
  }, [incidentFrom, incidentTo, trigger]);

  useEffect(() => {
    if (filledDecision || filledIncident) {
      clearErrors("root.dateRange");
    }
    if (!allEmpty) {
      clearErrors(["decisionFrom", "decisionTo", "incidentFrom", "incidentTo"]);
    }
  }, [filledDecision, filledIncident, allEmpty, clearErrors]);

  const onSubmit = (data: Filters) => {
    if (allEmpty) {
      setError("root.dateRange", {
        type: "manual",
        message: "Заполните хотя бы один диапазон дат (оба поля «С» и «ПО»).",
      });
      setError("decisionFrom", { type: "manual" });
      setError("decisionTo", { type: "manual" });
      setError("incidentFrom", { type: "manual" });
      setError("incidentTo", { type: "manual" });
      return;
    }

    clearErrors("root.dateRange");
    console.log("export", data);
  };

  const isManual = (e: unknown) => (e as any)?.type === "manual";

  const decisionFromInvalid =
    !!errors.decisionFrom &&
    (isManual(errors.decisionFrom) || touchedFields.decisionFrom || isSubmitted);

  const decisionToInvalid =
    !!errors.decisionTo &&
    (isManual(errors.decisionTo) || touchedFields.decisionTo || isSubmitted);

  const incidentFromInvalid =
    !!errors.incidentFrom &&
    (isManual(errors.incidentFrom) || touchedFields.incidentFrom || isSubmitted);

  const incidentToInvalid =
    !!errors.incidentTo &&
    (isManual(errors.incidentTo) || touchedFields.incidentTo || isSubmitted);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 flex items-center justify-center">
        <form
          className="flex flex-col items-center gap-10 shadow-2xl px-10 py-8 rounded-2xl mb-15"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex justify-center gap-32">
            <div className="flex flex-col gap-5 items-center">
              <p className="text-accent text-2xl font-normal">Дата принятия решения</p>

              <div className="flex items-center gap-2">
                <span className="text-accent text-lg font-semibold w-10">С:</span>
                <input
                  type="date"
                  className={`date-input ${decisionFromInvalid ? "border-red-500!" : ""}`}
                  {...register("decisionFrom", {
                    validate: (from) =>
                      validateRangePair({
                        from,
                        to: decisionTo,
                        hasAny: hasDecisionAny,
                        fromLabel: "С",
                        toLabel: "ПО",
                      }).from,
                  })}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-accent text-lg font-semibold w-10">ПО:</span>
                <input
                  type="date"
                  className={`date-input ${decisionToInvalid ? "border-red-500!" : ""}`}
                  {...register("decisionTo", {
                    validate: (to) =>
                      validateRangePair({
                        from: decisionFrom,
                        to,
                        hasAny: hasDecisionAny,
                        fromLabel: "С",
                        toLabel: "ПО",
                      }).to,
                  })}
                />
              </div>

              {errors.decisionFrom?.message && (touchedFields.decisionFrom || isSubmitted) && (
                <p className="text-red-600 text-sm">{errors.decisionFrom.message}</p>
              )}
              {errors.decisionTo?.message && (touchedFields.decisionTo || isSubmitted) && (
                <p className="text-red-600 text-sm">{errors.decisionTo.message}</p>
              )}
            </div>

            <div className="flex flex-col gap-5 items-center">
              <p className="text-accent text-2xl font-normal">Дата направления материалов</p>

              <div className="flex items-center gap-2">
                <span className="text-accent text-lg font-semibold w-10">С:</span>
                <input
                  type="date"
                  className={`date-input ${incidentFromInvalid ? "border-red-500!" : ""}`}
                  {...register("incidentFrom", {
                    validate: (from) =>
                      validateRangePair({
                        from,
                        to: incidentTo,
                        hasAny: hasIncidentAny,
                        fromLabel: "С",
                        toLabel: "ПО",
                      }).from,
                  })}
                />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-accent text-lg font-semibold w-10">ПО:</span>
                <input
                  type="date"
                  className={`date-input ${incidentToInvalid ? "border-red-500!" : ""}`}
                  {...register("incidentTo", {
                    validate: (to) =>
                      validateRangePair({
                        from: incidentFrom,
                        to,
                        hasAny: hasIncidentAny,
                        fromLabel: "С",
                        toLabel: "ПО",
                      }).to,
                  })}
                />
              </div>

              {errors.incidentFrom?.message && (touchedFields.incidentFrom || isSubmitted) && (
                <p className="text-red-600 text-sm">{errors.incidentFrom.message}</p>
              )}
              {errors.incidentTo?.message && (touchedFields.incidentTo || isSubmitted) && (
                <p className="text-red-600 text-sm">{errors.incidentTo.message}</p>
              )}
            </div>
          </div>

          {errors.root?.dateRange?.message && (
            <p className="text-red-600 text-sm">{errors.root.dateRange.message}</p>
          )}

          <div className="flex items-center gap-5">
            <button
              type="button"
              className="button"
              onClick={() => {
                reset(defaultValues);
                clearErrors();
              }}
            >
              СБРОС
            </button>

            <button className="button">
              ВЫГРУЗКА
              <img 
                src="/download.svg" 
                alt="Download" 
                width={20} 
              />
            </button>
          </div>
        </form>
      </main>

      <Footer />
    </div>
  );
};

export default DownloadLayout;
