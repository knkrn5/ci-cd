import crypto from "node:crypto";

process.loadEnvFile(".env");

const WEBHOOK_SECRET = process.env.GITHUB_WEBHOOK_SECRET;

if (!WEBHOOK_SECRET) {
  throw new Error("GITHUB_WEBHOOK_SECRET is missing");
}

export function createHmacSign(data: Buffer): string {
  return (
    "sha256=" +
    crypto.createHmac("sha256", WEBHOOK_SECRET!).update(data).digest("hex")
  );
}

export function verifySign(
  signature: string | undefined,
  data: Buffer,
): boolean {
  if (!signature) {
    return false;
  }

  const expectedSign = createHmacSign(data);

  const expected = Buffer.from(expectedSign, "utf8");
  const received = Buffer.from(signature, "utf8");

  if (expected.length !== received.length) {
    return false;
  }

  return crypto.timingSafeEqual(expected, received);
}
