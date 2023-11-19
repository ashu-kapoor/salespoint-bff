import { GraphQLError } from "graphql";
import _ from "lodash";

import { SecurityRolesEnum } from "./SecurityRolesEnum.js";

export default class SecurityUtils {
  public static validateRole(
    roleToValidate: [string] | undefined,
    roleRequired: SecurityRolesEnum[]
  ) {
    if (
      roleToValidate == undefined ||
      !roleRequired.some((r) => roleToValidate.includes(r))
    ) {
      throw new GraphQLError("User Doesn't have necessary priviledges");
    } else {
      console.log(`User logged in with role ${roleToValidate}`);
    }
  }
}
