import axios from "axios";
import jwt, { Jwt, JwtPayload } from "jsonwebtoken";
import { JwksClient } from "jwks-rsa";
import { logger } from "../index.js";

export default class SecurityService {
  private constructor() {}

  private static instance: SecurityService;
  public static getInstance(): SecurityService {
    if (this.instance == null) {
      this.instance = new SecurityService();
    }
    return this.instance;
  }

  public async validateTokenOffline(
    token: string,
    correlationId: string
  ): Promise<[string] | null> {
    const jwksUri = process.env.AUTH_SERVICE_JWKS || "";

    const client = new JwksClient({
      jwksUri,
      cache: true,
      cacheMaxEntries: 5,
      cacheMaxAge: 600000, //10 min
    });
    try {
      const decodedToken = jwt.decode(token, {
        complete: true,
      });
      const roles: [string] = (decodedToken?.payload as JwtPayload)
        ?.realm_access?.roles;
      const subj = (decodedToken?.payload as JwtPayload).name;
      logger.info(
        `X-CorrelationId:${correlationId} Fetched roles: ${roles} for User: ${subj}`
      );
      let key = await client.getSigningKey(decodedToken?.header.kid);
      jwt.verify(token, key.getPublicKey());
      return roles;
    } catch (e) {
      logger.error(
        `X-CorrelationId:${correlationId} Error while validating token ${e}`
      );
      return null;
    }
  }
}
