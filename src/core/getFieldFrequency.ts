type FrequencyMap = Record<string, { count: number; total: number }>;

export function getFieldFrequency(data: any): FrequencyMap {
  const map: FrequencyMap = {};

  if (!Array.isArray(data)) return map;

  const total = data.length;

  data.forEach((item) => {
    if (typeof item !== "object") return;

    Object.keys(item).forEach((key) => {
      if (!map[key]) {
        map[key] = { count: 0, total };
      }
      map[key].count += 1;
    });
  });

  return map;
}

export function formatFrequency(map: FrequencyMap): string {
  return Object.entries(map)
    .map(([key, val]) => {
      return `${key} → ${val.count}/${val.total}`;
    })
    .join("\n");
}
