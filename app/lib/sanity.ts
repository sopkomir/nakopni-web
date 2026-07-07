import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "ep9srwpt",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: process.env.NODE_ENV === "production",
});

export const writeClient = createClient({
  projectId: "ep9srwpt",
  dataset: "production",
  apiVersion: "2025-01-01",
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
});