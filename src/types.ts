import { type Request } from "express";
import { type SimpsonStructure } from "./database/models/types.js";

export interface RequestId
  extends Request<
    Record<string, unknown>,
    Record<string, unknown>,
    Omit<SimpsonStructure, "_id">
  > {}
