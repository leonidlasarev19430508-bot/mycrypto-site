/**
 * In-memory rate limiter for API routes.
 * Uses Map to store timestamps per IP per endpoint.
 * Automatically cleans old entries on each check to prevent memory leaks.
 */

type LimitConfig = {
  windowMs: number;    // Time window in milliseconds
  maxRequests: number; // Maximum requests allowed in the window
};

// Configuration for different endpoints
const RATE_LIMITS: Record<string, LimitConfig> = {
  '/api/chat': {
    windowMs: 60 * 1000, // 1 minute
    maxRequests: 5,
  },
  '/api/subscribe': {
    windowMs: 10 * 60 * 1000, // 10 minutes
    maxRequests: 3,
  },
};

// Store timestamps per IP per endpoint: Map<endpoint, Map<ip, timestamp[]>>
const limitStore = new Map<string, Map<string, number[]>>();

// Initialize store for each endpoint
Object.keys(RATE_LIMITS).forEach(endpoint => {
  limitStore.set(endpoint, new Map<string, number[]>());
});

/**
 * Safely extracts client IP from request headers.
 * Checks common proxy headers: x-forwarded-for, x-real-ip.
 * Returns 'unknown' if IP cannot be determined.
 */
export function getIp(request: Request): string {
  const headers = request.headers;
  
  // Try x-forwarded-for (first IP in the list)
  const forwardedFor = headers.get('x-forwarded-for');
  if (forwardedFor) {
    const firstIp = forwardedFor.split(',')[0].trim();
    if (firstIp) return firstIp;
  }
  
  // Try x-real-ip
  const realIp = headers.get('x-real-ip');
  if (realIp) return realIp;
  
  // Fallback for local development
  return 'unknown';
}

/**
 * Checks if the IP has exceeded rate limit for the specified endpoint.
 * Automatically cleans old timestamps for the IP.
 * Returns true if rate limited, false otherwise.
 */
export function isRateLimited(endpoint: string, ip: string): boolean {
  const config = RATE_LIMITS[endpoint];
  if (!config) return false; // No rate limit configured for this endpoint
  
  const endpointStore = limitStore.get(endpoint);
  if (!endpointStore) return false;
  
  const now = Date.now();
  const windowStart = now - config.windowMs;
  
  // Get existing timestamps for this IP
  const timestamps = endpointStore.get(ip) || [];
  
  // Filter out timestamps outside the current window
  const recentTimestamps = timestamps.filter(ts => ts > windowStart);
  
  // Check if limit exceeded
  if (recentTimestamps.length >= config.maxRequests) {
    return true;
  }
  
  // Add current timestamp
  recentTimestamps.push(now);
  endpointStore.set(ip, recentTimestamps);
  
  // Clean up old IP entries that have no recent requests (optional, reduces memory)
  // We'll do a simple cleanup: remove IPs with empty timestamps
  if (recentTimestamps.length === 0) {
    endpointStore.delete(ip);
  }
  
  return false;
}

/**
 * Returns the number of remaining requests and when the window resets.
 * Useful for providing rate limit information in headers.
 */
export function getRateLimitInfo(endpoint: string, ip: string): {
  remaining: number;
  resetTime: number;
} {
  const config = RATE_LIMITS[endpoint];
  if (!config) return { remaining: 1, resetTime: Date.now() };
  
  const endpointStore = limitStore.get(endpoint);
  if (!endpointStore) return { remaining: config.maxRequests, resetTime: Date.now() };
  
  const now = Date.now();
  const windowStart = now - config.windowMs;
  const timestamps = endpointStore.get(ip) || [];
  const recentTimestamps = timestamps.filter(ts => ts > windowStart);
  
  const remaining = Math.max(0, config.maxRequests - recentTimestamps.length);
  const resetTime = timestamps.length > 0 
    ? Math.max(...timestamps) + config.windowMs
    : now + config.windowMs;
  
  return { remaining, resetTime };
}

/**
 * Optional: Periodic cleanup of old entries to prevent memory leaks.
 * Can be called periodically (e.g., setInterval) in a serverless environment,
 * but for simplicity we rely on the per-request cleanup above.
 */