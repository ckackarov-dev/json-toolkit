type SmartFix = {
  message: string;
  confidence: "low" | "medium" | "high";
};

export function generateSmartFixes(advanced: {
  numeric: any[];
  shape: any[];
  deep: any[];
}): SmartFix[] {
  const fixes: SmartFix[] = [];

  // 🔴 NUMERIC STRING → HIGH CONFIDENCE
  advanced.numeric.forEach((issue) => {
    fixes.push({
      message: `${issue.path} → convert to number`,
      confidence: "high",
    });
  });

  // 🔴 SHAPE → MEDIUM (don't over-suggest)
  advanced.shape.forEach((issue) => {
    if (issue.type === "critical") {
      fixes.push({
        message: `${issue.path} → unify object structure`,
        confidence: "medium",
      });
    }
  });

  // 🔴 DEEP OPTIONAL → LOW (just awareness)
  advanced.deep.forEach((issue) => {
    fixes.push({
      message: `${issue.path} → add null guards`,
      confidence: "low",
    });
  });

  return fixes;
}

export function getHighConfidenceFixes(fixes: SmartFix[]): SmartFix[] {
  return fixes.filter((f) => f.confidence === "high");
}
