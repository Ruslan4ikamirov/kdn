import type { RangePairParams } from "../types/RangePairParams";

const isRangeOk = (from?: string, to?: string) => {
  if (!from || !to) return true;
  return from <= to;
};

export function validateRangePair(params: RangePairParams) {
  const { from, to, hasAny, fromLabel, toLabel } = params;

  if (!hasAny) return { from: true as const, to: true as const };

  if (!from) return { from: `Укажите дату «${fromLabel}»`, to: true as const };
  if (!to) return { from: true as const, to: `Укажите дату «${toLabel}»` };

  if (!isRangeOk(from, to)) {
    return { from: true as const, to: `Дата «${toLabel}» должна быть не раньше «${fromLabel}»` };
  }

  return { from: true as const, to: true as const };
}