/// <reference path="../node_modules/preact/src/jsx.d.ts" />
/// <reference path="../node_modules/preact/src/index.d.ts" />

import { HTMLAttributes } from "preact/compat";

declare namespace preact {
  interface HTMLAttributes {
    MyAttr?: string;
  }
}

declare module "react" {
  interface HTMLAttributes {
    MyAttr?: string;
  }
}

declare namespace React {
  interface HTMLAttributes {
    MyAttr?: string;
  }
}

declare namespace JSX {
  interface HTMLAttributes {
    MyAttr?: string;
  }
}

declare module 'preact/compat' {
  interface HTMLAttributes<T> {
    MyAttr?: string;
  } 
}