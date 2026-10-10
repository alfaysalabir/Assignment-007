import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";

// one MongoDB connection, reused between hot reloads
const globalForMongo = globalThis;
const client =
  globalForMongo._mongoClient || new MongoClient(process.env.MONGODB_URI);
if (process.env.NODE_ENV !== "production") {
  globalForMongo._mongoClient = client;
}
const db = client.db(process.env.MONGODB_DB || "bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db),
  emailAndPassword: {
    enabled: true,
    minPasswordLength: 8,
    // after sign up we send the user to the login page (README rule)
    autoSignIn: false,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
    github: {
      clientId: process.env.GITHUB_CLIENT_ID || "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET || "",
    },
  },
});
