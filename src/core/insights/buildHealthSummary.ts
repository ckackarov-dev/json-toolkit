export function buildHealthSummary(problems: string[] = []) {
  const critical = problems.filter((p) => p.includes("❌")).length;
  const warnings = problems.filter((p) => p.includes("⚠")).length;

  if (critical > 0) {
    return {
      status: "❌ Unstable",
      summary: "This response may break your frontend",
    };
  }

  if (warnings > 0) {
    return {
      status: "⚠ Needs attention",
      summary: "This response has potential issues",
    };
  }

  return {
    status: "✅ Healthy",
    summary: "Safe to use in frontend",
  };
}
