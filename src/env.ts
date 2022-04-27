import { Env } from "@humanwhocodes/env";
const env = new Env();
const jwtSecret = env.require("JWT_SECRET");

const port = parseInt(env.require("PORT"));
const databaseUrl = env.require("DATABASE_URL");
const supabaseUrl = env.require("SUPABASE_URL");
const supabaseServiceRoleKey = env.require("SUPABASE_SERVICE_ROLE_KEY");
const issuer = env.require("ISSUER");
const stage = env.require("STAGE");
const recordsMaxLength = 1000;

const supabaseMaxRows = parseInt(env.require("SUPABASE_MAX_ROWS"), 10);
if (isNaN(supabaseMaxRows)) {
  throw new Error(
    "Environment variable 'SUPBASE_MAX_ROWS' could not be parsed to int"
  );
}

export {
  databaseUrl,
  issuer,
  jwtSecret,
  port,
  stage,
  supabaseMaxRows,
  supabaseServiceRoleKey,
  supabaseUrl,
  recordsMaxLength,
};
