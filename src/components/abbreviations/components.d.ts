import type { DefineComponent } from "vue";

declare module "vue" {
  export interface GlobalComponents {
    k1: DefineComponent<{}, {}, any>;
    p1: DefineComponent<{}, {}, any>;
    k2: DefineComponent<{}, {}, any>;
    k2tog: DefineComponent<{}, {}, any>;
    p2tog: DefineComponent<{}, {}, any>;
    ssk: DefineComponent<{}, {}, any>;
    m1: DefineComponent<{}, {}, any>;
    m1r: DefineComponent<{}, {}, any>;
    m1l: DefineComponent<{}, {}, any>;
    "sl1-wyib": DefineComponent<{}, {}, any>;
    "sl1-wyif": DefineComponent<{}, {}, any>;
    knit: DefineComponent<{ count?: number | string }, {}, any>;
    purl: DefineComponent<{ count?: number | string }, {}, any>;
  }
}
export {};
