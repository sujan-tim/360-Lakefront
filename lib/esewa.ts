import crypto from "crypto";

export type EsewaEnv = "uat" | "prod";

function getEsewaEnv(): EsewaEnv {
  const env = (process.env.ESEWA_ENV ?? "uat").toLowerCase();
  return env === "prod" ? "prod" : "uat";
}

export function getEsewaFormUrl() {
  // Official endpoints from eSewa docs.
  // UAT (test): rc-epay.esewa.com.np
  // Prod: epay.esewa.com.np
  const env = getEsewaEnv();
  return env === "prod"
    ? "https://epay.esewa.com.np/api/epay/main/v2/form"
    : "https://rc-epay.esewa.com.np/api/epay/main/v2/form";
}

export function getEsewaStatusUrlBase() {
  // Official endpoints from eSewa docs.
  // UAT (test): rc.esewa.com.np
  // Prod: esewa.com.np
  const env = getEsewaEnv();
  return env === "prod" ? "https://esewa.com.np" : "https://rc.esewa.com.np";
}

export function getEsewaProductCode() {
  return process.env.ESEWA_PRODUCT_CODE ?? "EPAYTEST";
}

export function getEsewaSecretKey() {
  // This is the UAT secret key shown in eSewa docs; override with your real key for production.
  const key = process.env.ESEWA_SECRET_KEY?.trim();
  return key ? key : "8gBm/:&EnhH.1/q";
}

export function buildSignatureMessage(fields: Record<string, string>, signedFieldNames: string) {
  const names = signedFieldNames
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);
  return names.map((name) => `${name}=${fields[name] ?? ""}`).join(",");
}

export function signEsewaMessage(message: string, secretKey = getEsewaSecretKey()) {
  return crypto.createHmac("sha256", secretKey).update(message).digest("base64");
}
