import type { CityOption } from "../types/location";

const isNonEmptyString = (value: string | undefined): value is string =>
  Boolean(value?.trim());

const uniqueParts = (parts: Array<string | undefined>) =>
  parts
    .filter(isNonEmptyString)
    .filter((part, index, values) => values.indexOf(part) === index);

export const formatLocationLabel = (
  location: Pick<CityOption, "name" | "admin1" | "country">,
) => uniqueParts([location.name, location.admin1, location.country]).join(", ");

export const formatLocationMeta = (
  location: Pick<CityOption, "admin1" | "country">,
) => uniqueParts([location.admin1, location.country]).join(", ");
