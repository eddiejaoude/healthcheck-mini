// To parse this data:
//
//   import { Convert, Release } from "./file";
//
//   const release = Convert.toRelease(json);
//
// These functions will throw an error if the JSON doesn't
// match the expected interface, even if the JSON is valid.

import { User } from "./user";

export interface Release {
  url: string;
  assets_url: string;
  upload_url: string;
  html_url: string;
  id: number;
  author: User;
  node_id: string;
  tag_name: string;
  target_commitish: string;
  name: string;
  draft: boolean;
  prerelease: boolean;
  created_at: Date;
  published_at: Date;
  assets: string[];
  tarball_url: string;
  zipball_url: string;
  body: string;
}
