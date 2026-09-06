import "@testing-library/dom";
import { cleanup } from "@testing-library/react";
import { afterEach, vi } from "vitest";

process.env.DEMO_MODE = "true";
process.env.AUTH_SECRET = "test-secret-with-more-than-32-characters-long";
process.env.ADMIN_EMAIL = "admin@test.local";
process.env.ADMIN_PASSWORD = "password-for-demo-tests";

afterEach(() => {
  cleanup();
});

afterEach(() => {
  vi.unstubAllGlobals();
});
