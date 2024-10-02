// To parse this data:
//
//   import { Convert, Community } from "./file";
//
//   const community = Convert.toCommunity(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Community {
  health_percentage: number;
  description: string;
  documentation: null;
  files: Files;
  updated_at: null;
}

export interface Files {
  code_of_conduct: null;
  code_of_conduct_file: null;
  contributing: null;
  issue_template: null;
  pull_request_template: null;
  license: null;
  readme: Readme;
}

export interface Readme {
  url: string;
  html_url: string;
}
