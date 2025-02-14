import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname
});

const eslintConfig = [
  ...compat.config({
    extends: [
      "plugin:@next/next/recommended",
      "next/core-web-vitals",
      "next/typescript",
      "next",
      "prettier",
      "plugin:tailwindcss/recommended"
    ],
    plugins: [
      "check-file",
      "n",
      "tailwindcss",
      "boundaries",
      "eslint-plugin-project-structure"
    ],

    settings: {
      "project-structure/independent-modules-config-path":
        "independentModules.jsonc",
      tailwindcss: {
        callees: ["cn", "cva"],
        config: "tailwind.config.ts"
      },
      "boundaries/include": ["src/**/*"],
      "boundaries/elements": [
        {
          mode: "full",
          type: "shared",
          pattern: [
            "src/components/**/*",
            "src/data/**/*",
            "src/drizzle/**/*",
            "src/hooks/**/*",
            "src/lib/**/*",
            "src/server/**/*",
            "src/assets/**/**/*",
            "src/constants/**/*",

            "src/features/**/*",
            "src/sections/**/*",
            "src/styles/**/*"
          ]
        },
        {
          mode: "full",
          type: "feature",
          capture: ["featureName"],
          pattern: ["src/features/*/**/*"]
        },
        {
          mode: "full",
          type: "app",
          capture: ["_", "fileName"],
          pattern: ["src/app/**/*"]
        },
        {
          mode: "full",
          type: "neverImport",
          pattern: ["src/*"]
        }
      ]
    },
    rules: {
      "project-structure/independent-modules": "error",
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      quotes: ["error", "double"],
      "n/no-process-env": ["error"],
      "tailwindcss/classnames-order": ["error"],
      "@typescript-eslint/no-empty-object-type": [
        "error",
        {
          allowInterfaces: "always"
        }
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!^[.*": "KEBAB_CASE"
        }
      ],
      "no-unused-vars": "off",
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          caughtErrorsIgnorePattern: "^_",
          ignoreRestSiblings: true
        }
      ],
      "boundaries/no-unknown": ["error"],
      "boundaries/no-unknown-files": ["error"],
      "boundaries/element-types": [
        "error",
        {
          default: "disallow",
          rules: [
            {
              from: ["shared"],
              allow: ["shared"]
            },
            {
              from: ["feature"],
              allow: [
                "shared",
                ["feature", { featureName: "${from.featureName}" }]
              ]
            },
            {
              from: ["app", "neverImport"],
              allow: ["shared", "feature"]
            },
            {
              from: ["app"],
              allow: [["app", { fileName: "*.css" }]]
            }
          ]
        }
      ]
    },
    ignorePatterns: [".next", "node_modules", "dist", "build"],
    overrides: [
      {
        files: ["src/types/**/*.ts"],
        rules: {
          "no-unused-vars": "off",
          "@typescript-eslint/no-unused-vars": "off"
        }
      },
      {
        files: ["*.cjs"],
        rules: {
          "@typescript-eslint/no-require-imports": "off"
        }
      }
    ]
  })
];

export default eslintConfig;
