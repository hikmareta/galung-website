import { ValidationError } from "payload";

export const MIN_PASSWORD_LENGTH = 16;

export function enforcePasswordPolicy(password: unknown): void {
  if (typeof password !== "string" || password.length < MIN_PASSWORD_LENGTH) {
    throw new ValidationError({
      errors: [
        {
          path: "password",
          message: `Use a password of at least ${MIN_PASSWORD_LENGTH} characters`,
        },
      ],
    });
  }
}
