"use client";

import { Check } from "lucide-react";

interface PasswordStrength {
  hasNumber: boolean;
  hasUpperCase: boolean;
  hasLowerCase: boolean;
  hasSpecialChar: boolean;
  isLongEnough: boolean;
}

interface PasswordStrengthIndicatorProps {
  passwordStrength: PasswordStrength;
}

export function PasswordStrengthIndicator({
  passwordStrength,
}: PasswordStrengthIndicatorProps) {
  const criteriaTranslations = {
    hasLowerCase: "Lettres minuscules (a-z)",
    hasNumber: "Chiffres (0-9)",
    hasSpecialChar: "Caractères spéciaux (par exemple @, #, $, %)",
    hasUpperCase: "Lettres majuscules (A-Z)",
    isLongEnough: "Au moins 8 caractères",
  };

  return (
    <div className="mt-2 space-y-2">
      <p className="text-sm font-medium text-gray-700">
        Votre mot de passe doit contenir :
      </p>
      <ul className="space-y-1">
        {Object.entries(passwordStrength).map(([key, value]) => (
          <li
            key={key}
            className={`flex items-center text-sm ${
              value ? "text-green-600" : "text-gray-500"
            }`}
          >
            {value ? (
              <Check className="mr-2 h-4 w-4" />
            ) : (
              <div className="mr-2 h-4 w-4 rounded-full border border-gray-300" />
            )}
            {criteriaTranslations[key as keyof typeof criteriaTranslations]}
          </li>
        ))}
      </ul>
    </div>
  );
}
