import type { NextFunction, Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import { env } from "../config/env.js";

type RequestUser = {
  id: string;
  email?: string;
};

export type AuthenticatedRequest = Request & {
  user?: RequestUser;
};

const supabase = env.SUPABASE_URL && env.SUPABASE_SERVICE_ROLE_KEY
  ? createClient(env.SUPABASE_URL, env.SUPABASE_SERVICE_ROLE_KEY, {
      auth: { persistSession: false }
    })
  : null;

export async function attachUserIfPresent(
  request: AuthenticatedRequest,
  _response: Response,
  next: NextFunction
) {
  const authorization = request.header("authorization");
  const token = authorization?.startsWith("Bearer ")
    ? authorization.slice("Bearer ".length)
    : undefined;

  if (!token || !supabase) {
    next();
    return;
  }

  const { data, error } = await supabase.auth.getUser(token);

  if (!error && data.user) {
    request.user = {
      id: data.user.id,
      email: data.user.email ?? undefined
    };
  }

  next();
}
