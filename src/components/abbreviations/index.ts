import { type App, defineComponent, h } from "vue";
import InlineButton from "./InlineButton.vue";

type ContentFn = () => any;

function makeAbbrev(tag: string, label: string, content?: ContentFn) {
  return defineComponent({
    name: tag.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase()),
    setup() {
      return () =>
        h(
          InlineButton,
          { abbreviation: label },
          content ? { default: content } : undefined,
        );
    },
  });
}

/** Parametric: <knit count="2" />, <purl count="3" /> */
const Knit = defineComponent({
  name: "KnitAbbrev",
  props: { count: { type: [Number, String], default: 1 } },
  setup(props) {
    return () =>
      h(
        InlineButton,
        { abbreviation: `K${props.count}` },
        {
          default: () =>
            h("div", [
              h("p", [
                "Knit ",
                h("b", String(props.count)),
                " stitch" + (Number(props.count) === 1 ? "" : "es"),
                ". Insert right needle knitwise (front to back), wrap yarn counter-clockwise, draw loop through.",
              ]),
              h(
                "p",
                "Tip: keep the right leg of each stitch forward to avoid twisting.",
              ),
            ]),
        },
      );
  },
});

const Purl = defineComponent({
  name: "PurlAbbrev",
  props: { count: { type: [Number, String], default: 1 } },
  setup(props) {
    return () =>
      h(
        InlineButton,
        { abbreviation: `P${props.count}` },
        {
          default: () =>
            h("div", [
              h("p", [
                "Purl ",
                h("b", String(props.count)),
                " stitch" + (Number(props.count) === 1 ? "" : "es"),
                ". With yarn in front, insert right needle purlwise (back to front), wrap clockwise, draw loop through.",
              ]),
            ]),
        },
      );
  },
});

/** Core decreases / increases */
const K1 = makeAbbrev("k1", "K1", () => h("p", "Knit 1 stitch."));
const P1 = makeAbbrev("p1", "P1", () => h("p", "Purl 1 stitch."));
const K2 = makeAbbrev("k2", "K2", () => h("p", "Knit 2 stitches."));

const K2Tog = makeAbbrev("k2tog", "K2tog", () =>
  h("div", [
    h(
      "p",
      "Knit two stitches together (right-leaning dec): insert right needle knitwise through next two sts as one; knit them together (−1).",
    ),
  ]),
);

const P2Tog = makeAbbrev("p2tog", "P2tog", () =>
  h("div", [
    h(
      "p",
      "Purl two stitches together (right-leaning dec on WS): insert right needle purlwise through next two sts as one; purl together (−1).",
    ),
  ]),
);

const Ssk = makeAbbrev("ssk", "SSK", () =>
  h("div", [
    h(
      "p",
      "Slip 1 knitwise, slip 1 knitwise; insert left needle into fronts of both slipped sts and knit together. Left-leaning decrease (−1).",
    ),
    h(
      "p",
      "Neat edge: keep the two slipped sts untwisted and snug before knitting together.",
    ),
  ]),
);

/** Raised make-one increases (from the bar between stitches) */
const M1 = makeAbbrev("m1", "M1", () =>
  h("div", [
    h(
      "p",
      "Make-1 (neutral if direction unspecified): lift the bar between sts and work it twisted to avoid a hole.",
    ),
    h("p", "Prefer a direction? Use M1L or M1R below."),
  ]),
);

const M1R = makeAbbrev("m1r", "M1R", () =>
  h("div", [
    h(
      "p",
      "Make-1 Right: with left needle lift the bar from back→front; knit through the front loop (twisted). Right-leaning (+1).",
    ),
    h("img", {
      src: "/abbr/m1r-fig1.png",
      alt: "M1R Figure",
      style: "max-width:100%;margin-top:.5rem;",
    }),
  ]),
);

const M1L = makeAbbrev("m1l", "M1L", () =>
  h("div", [
    h(
      "p",
      "Make-1 Left: with left needle lift the bar from front→back; knit through the back loop (twisted). Left-leaning (+1).",
    ),
    h("img", {
      src: "/abbr/m1l-fig1.png",
      alt: "M1L Figure",
      style: "max-width:100%;margin-top:.5rem;",
    }),
  ]),
);

/** Lifted increases (LLI / RLI) — from the purl bump below */
const LLI = makeAbbrev("lli", "LLI", () =>
  h("div", [
    h(
      "p",
      "Left Lifted Increase: insert left needle into the back of the stitch one row below the last stitch worked (the purl bump), lift it onto left needle, knit this lifted stitch. (See Fig 1–2).",
    ),
    h("img", {
      src: "/abbr/lli-1.png",
      alt: "LLI Figure 1",
      style: "max-width:100%;margin:.5rem 0;",
    }),
    h("img", {
      src: "/abbr/lli-2.png",
      alt: "LLI Figure 2",
      style: "max-width:100%;",
    }),
  ]),
);

const RLI = makeAbbrev("rli", "RLI", () =>
  h("div", [
    h(
      "p",
      "Right Lifted Increase: insert right needle tip into the back of the stitch one row below the first stitch on the left needle (purl bump), knit this lifted stitch, then knit the first stitch on the left needle. (See Fig 1–2).",
    ),
    h("img", {
      src: "/abbr/rli-1.png",
      alt: "RLI Figure 1",
      style: "max-width:100%;margin:.5rem 0;",
    }),
    h("img", {
      src: "/abbr/rli-2.png",
      alt: "RLI Figure 2",
      style: "max-width:100%;",
    }),
  ]),
);

/** Pick-up stitches */
const PickUpKnit = makeAbbrev("pick-up-knit", "Pick up & knit", () =>
  h("div", [
    h(
      "p",
      "Right side facing, work right→left: *insert needle tip under edge stitch (far→near side), wrap yarn, pull through a loop; repeat from *.",
    ),
    h("img", {
      src: "/abbr/pick-knit-1.png",
      alt: "Pick up & knit Fig 1",
      style: "max-width:100%;margin:.5rem 0;",
    }),
    h("img", {
      src: "/abbr/pick-knit-2.png",
      alt: "Pick up & knit Fig 2",
      style: "max-width:100%;",
    }),
  ]),
);

const PickUpPurl = makeAbbrev("pick-up-purl", "Pick up & purl", () =>
  h("div", [
    h(
      "p",
      "Wrong side facing, work right→left: *insert needle under edge stitch (far→near), wrap yarn, pull through a loop; repeat from *.",
    ),
    h("img", {
      src: "/abbr/pick-purl-1.png",
      alt: "Pick up & purl Fig 1",
      style: "max-width:100%;margin:.5rem 0;",
    }),
    h("img", {
      src: "/abbr/pick-purl-2.png",
      alt: "Pick up & purl Fig 2",
      style: "max-width:100%;",
    }),
  ]),
);

/** Short-rows: wrap & turn */
const SRKnit = makeAbbrev("short-rows-knit", "Short-rows (knit side)", () =>
  h("div", [
    h(
      "p",
      "Work to turning point, slip next stitch purlwise (Fig 1), bring yarn to front, slip the same stitch back to left needle (Fig 2), turn work; bring yarn into position to knit—1 stitch wrapped.",
    ),
    h("img", {
      src: "/abbr/sr-knit-1.png",
      alt: "Short rows knit Fig 1",
      style: "max-width:100%;margin:.5rem 0;",
    }),
    h("img", {
      src: "/abbr/sr-knit-2.png",
      alt: "Short rows knit Fig 2",
      style: "max-width:100%;",
    }),
    h(
      "p",
      "To hide wrap later on RS: pick up the wrap from front if wrapped stitch is a knit (from back if it’s a purl), place on needle, work together with the stitch as one (Fig 3).",
    ),
    h("img", {
      src: "/abbr/sr-knit-3.png",
      alt: "Short rows knit Fig 3",
      style: "max-width:100%;margin-top:.5rem;",
    }),
  ]),
);

const SRPurl = makeAbbrev("short-rows-purl", "Short-rows (purl side)", () =>
  h("div", [
    h(
      "p",
      "Work to turning point, slip next stitch purlwise to right needle, bring yarn to back of work (Fig 1), return stitch to left needle, bring yarn to front between needles (Fig 2), turn work—1 stitch wrapped.",
    ),
    h("img", {
      src: "/abbr/sr-purl-1.png",
      alt: "Short rows purl Fig 1",
      style: "max-width:100%;margin:.5rem 0;",
    }),
    h("img", {
      src: "/abbr/sr-purl-2.png",
      alt: "Short rows purl Fig 2",
      style: "max-width:100%;",
    }),
    h(
      "p",
      "To hide wrap later on WS: pick up the wrap from the back of the RS row, place it on the left needle (Fig 3), then purl it together with the wrapped stitch.",
    ),
    h("img", {
      src: "/abbr/sr-purl-3.png",
      alt: "Short rows purl Fig 3",
      style: "max-width:100%;margin-top:.5rem;",
    }),
  ]),
);

/** Stretchy bind-offs (non-abbrev helpers) */
const JSSBO = makeAbbrev("jssbo", "JSSBO", () =>
  h("div", [
    h(
      "p",
      "Jeny’s Surprisingly Stretchy Bind-Off: before each stitch, work a yarnover that “collars” the just-worked stitch, then bind off the next stitch.",
    ),
    h(
      "p",
      "For a knit stitch next: work a reverse YO (yarn up from back, over right needle toward you), knit the stitch, pass the YO over to collar it (Fig 1–2).",
    ),
    h(
      "p",
      "For a purl stitch next: work a regular YO (yarn up from front, over right needle away from you), purl the stitch, pass the YO over to collar it (Fig 3–4).",
    ),
    h("img", {
      src: "/abbr/jssbo-1.png",
      alt: "JSSBO Fig 1",
      style: "max-width:100%;margin:.5rem 0;",
    }),
    h("img", {
      src: "/abbr/jssbo-2.png",
      alt: "JSSBO Fig 2",
      style: "max-width:100%;",
    }),
    h("img", {
      src: "/abbr/jssbo-3.png",
      alt: "JSSBO Fig 3",
      style: "max-width:100%;margin:.5rem 0;",
    }),
    h("img", {
      src: "/abbr/jssbo-4.png",
      alt: "JSSBO Fig 4",
      style: "max-width:100%;",
    }),
  ]),
);

const RussianLaceBO = makeAbbrev("russian-lace-bo", "Russian Lace BO", () =>
  h("div", [
    h(
      "p",
      "Russian Lace Bind-Off (a.k.a. decrease bind-off): produces a tidy chain and very stretchy edge—great for toe-up cuffs.",
    ),
    h(
      "p",
      "Work: K1, K1 (2 sts on right needle), *insert left needle into fronts of these 2 sts (as for SSK; Fig 1), knit them together through back loops, K1 (Fig 2); repeat from * across.",
    ),
    h("img", {
      src: "/abbr/rus-bo-1.png",
      alt: "Russian BO Fig 1",
      style: "max-width:100%;margin:.5rem 0;",
    }),
    h("img", {
      src: "/abbr/rus-bo-2.png",
      alt: "Russian BO Fig 2",
      style: "max-width:100%;",
    }),
  ]),
);

/** Slips */
const Sl1Wyib = makeAbbrev("sl1-wyib", "Sl1 wyib", () =>
  h("div", [
    h("p", "Slip 1 stitch purlwise with yarn in back (running along WS)."),
  ]),
);
const Sl1Wyif = makeAbbrev("sl1-wyif", "Sl1 wyif", () =>
  h("div", [
    h("p", "Slip 1 stitch purlwise with yarn in front (running along RS)."),
  ]),
);

export function registerAbbreviationComponents(app: App) {
  app.component("k1", K1);
  app.component("p1", P1);
  app.component("k2", K2);
  app.component("k2tog", K2Tog);
  app.component("p2tog", P2Tog);
  app.component("ssk", Ssk);
  app.component("m1", M1);
  app.component("m1r", M1R);
  app.component("m1l", M1L);
  app.component("lli", LLI);
  app.component("rli", RLI);
  app.component("pick-up-knit", PickUpKnit);
  app.component("pick-up-purl", PickUpPurl);
  app.component("short-rows-knit", SRKnit);
  app.component("short-rows-purl", SRPurl);
  app.component("jssbo", JSSBO);
  app.component("russian-lace-bo", RussianLaceBO);
  app.component("sl1-wyib", Sl1Wyib);
  app.component("sl1-wyif", Sl1Wyif);

  // parametric sugar
  app.component("knit", Knit);
  app.component("purl", Purl);
}

export type AbbrevRegistry = ReturnType<typeof registerAbbreviationComponents>;
