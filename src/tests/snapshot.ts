import fs from "fs";
import path from "path";

const SNAPSHOT_DIR = path.join(__dirname, "snapshots");

function ensureDir() {
  if (!fs.existsSync(SNAPSHOT_DIR)) {
    fs.mkdirSync(SNAPSHOT_DIR, { recursive: true });
  }
}

function normalize(str: string) {
  return str.replace(/\s+/g, " ").trim();
}

export function matchSnapshot(name: string, content: string) {
  ensureDir();

  const filePath = path.join(SNAPSHOT_DIR, `${name}.snap`);

  const normalized = normalize(content);

  // 🆕 FIRST RUN → create snapshot
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, normalized);
    console.log(`🆕 Snapshot created: ${name}`);
    return;
  }

  const existing = fs.readFileSync(filePath, "utf-8");

  if (existing === normalized) {
    console.log(`✅ ${name} passed`);
  } else {
    console.log(`❌ ${name} failed`);

    console.log("\n--- EXPECTED ---\n");
    console.log(existing);

    console.log("\n--- RECEIVED ---\n");
    console.log(normalized);
  }
}
