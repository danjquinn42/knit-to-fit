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
                ". Insert right needle from front to back, wrap working yarn counter-clockwise, draw loop through.",
              ]),
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
                ". Insert right needle from back to front, wrap yarn clockwise in front, draw loop through.",
              ]),
            ]),
        },
      );
  },
});

const K1 = makeAbbrev("k1", "K1", () => h("p", "Knit 1 stitch."));
const P1 = makeAbbrev("p1", "P1", () => h("p", "Purl 1 stitch."));
const K2 = makeAbbrev("k2", "K2", () => h("p", "Knit 2 stitches."));
const K2Tog = makeAbbrev("k2tog", "K2tog", () =>
  h("div", [
    h(
      "p",
      "Knit two stitches together: insert right needle knitwise through the next two stitches as one, knit them together. Decreases 1.",
    ),
  ]),
);
const P2Tog = makeAbbrev("p2tog", "P2tog", () =>
  h("div", [
    h(
      "p",
      "Purl two stitches together: insert right needle purlwise through two stitches as one, purl them together. Decreases 1.",
    ),
  ]),
);
const Ssk = makeAbbrev("ssk", "SSK", () =>
  h("div", [
    h(
      "p",
      "Slip 1 knitwise, slip 1 knitwise, insert left needle into fronts of both slipped sts, knit together. Left-leaning decrease (−1).",
    ),
  ]),
);
const M1 = makeAbbrev("m1", "M1", () =>
  h("div", [
    h(
      "p",
      "Make 1: lift the strand between stitches from back to front and knit through the front loop. Increases 1 (neutral).",
    ),
  ]),
);
const M1R = makeAbbrev("m1r", "M1R", () =>
  h("div", [
    h(
      "p",
      "Make 1 Right: lift bar from back to front, knit through front loop. Right-leaning increase (+1).",
    ),
  ]),
);
const M1L = makeAbbrev("m1l", "M1L", () =>
  h("div", [
    h(
      "p",
      "Make 1 Left: lift bar from front to back, knit through back loop. Left-leaning increase (+1).",
    ),
  ]),
);
const Sl1Wyib = makeAbbrev("sl1-wyib", "Sl1 wyib", () =>
  h("div", [h("p", "Slip 1 stitch purlwise with yarn in back.")]),
);
const Sl1Wyif = makeAbbrev("sl1-wyif", "Sl1 wyif", () =>
  h("div", [h("p", "Slip 1 stitch purlwise with yarn in front.")]),
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
  app.component("sl1-wyib", Sl1Wyib);
  app.component("sl1-wyif", Sl1Wyif);

  // parametric
  app.component("knit", Knit);
  app.component("purl", Purl);
}

export type AbbrevRegistry = ReturnType<typeof registerAbbreviationComponents>;
