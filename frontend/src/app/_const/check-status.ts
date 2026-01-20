export type CheckStatus = "ok" | "missing" | "damaged";

export interface CheckStatusOption {
  value: CheckStatus;
  label: string;
}

export const CHECK_STATUS_OPTIONS: ReadonlyArray<CheckStatusOption> = [
  { value: "ok", label: "OK" },
  { value: "missing", label: "Fehlt" },
  { value: "damaged", label: "Beschädigt" },
] as const;
