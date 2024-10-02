// To parse this data:
//
//   import { Convert } from "./file";
//
//   const branch = Convert.toBranch(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

export interface Branch {
  name: string;
  commit: Commit;
  protected: boolean;
}

export interface Commit {
  sha: string;
  url: string;
}
