// Deprecated shim — the canonical affiliate resolver now lives in
// `./exchanges`. Re-exported so existing imports keep working; new code
// should import directly from `./exchanges`.
export { getAffiliateLink } from './exchanges';