// gauge in stitches per inch
// xGauge is number of stitches accross per inch
// yGauge is number of rows per inch (vertically)
// footCirc is Circumference of the foot in inches

type Gauge = {
  x: number;
  y: number;
};

type ToeUpValues = {
  sockStitches: number;
  castOnStitches: number;
  heelAndGussetLength: number;
  gussetStitchesPerSide: number;
  stitchCountBeforeHeelTurn: number;
  heelStitches: number;
  heelBaseStitches: number;
  legStartStitches: number;
};

// Sock Stitches
const calcSockStitches = (xGauge: number, footCirc: number) => {
  const exact = xGauge * footCirc * 0.9;
  // round to the nearest even number;
  return Math.round(exact / 2) * 2;
};

// Cast-On Stitches
const calcCastOnStitches = (
  sockStitches: number,
  narrowFoot: boolean = false,
) => {
  const oneThird = Math.round(sockStitches / 3);
  const increase = Math.round(sockStitches - oneThird);

  const quarterIncrease = increase * 0.25;

  const difference = narrowFoot
    ? Math.ceil(quarterIncrease) * 4
    : Math.floor(quarterIncrease) * 4;

  return sockStitches - difference;
};

// Gusset Stitches Per Side
const caclGussetStitchesPerSide = (sockStitches: number) => {
  return Math.ceil(sockStitches * 0.2);
};

// totalStitchesAfterIncrease
const calcStitchesAfterIncrease = (
  sockStitches: number,
  gussetStitchesPerSide: number,
) => {
  return sockStitches + gussetStitchesPerSide * 2;
};

// Stitch Count Before Heel turn
export const calcStitchCountBeforeHeelTurn = calcStitchesAfterIncrease;

// Heel Stitches
const calcHeelStitches = (sockStitches: number) => {
  return sockStitches / 2;
};

// Heel Base Stitches
const calcHeelBaseStitches = (heelStitches: number) => {
  const oneThird = Math.round(heelStitches / 3);
  if (heelStitches % 2 === oneThird % 2) {
    return oneThird;
  }
  return oneThird + 1;
};

// Heel/Gusset Length (in inches)
const calcHeelAndGussetLength = (
  gussetStitchesPerSide: number,
  heelStitches: number,
  heelBaseStitches: number,
  yGauge: number,
) => {
  const roundsInGusset = gussetStitchesPerSide * 2;
  const rowsInHeel = heelStitches - heelBaseStitches;
  const exactLength = (roundsInGusset + rowsInHeel) / yGauge;
  return Math.floor(exactLength * 4) / 4;
};
// Leg Start Stitches
const calcLegStartStitches = (sockStitches: number) => {
  return sockStitches + 2;
};

const getToeUpValues = (
  gauge: Gauge,
  finishedSockCircumference: number,
  isNarrowFoot: boolean = false,
): ToeUpValues => {
  const sockStitches = calcSockStitches(gauge.x, finishedSockCircumference);
  const castOnStitches = calcCastOnStitches(sockStitches, isNarrowFoot);
  const gussetStitchesPerSide = caclGussetStitchesPerSide(sockStitches);
  const stitchCountBeforeHeelTurn = calcStitchCountBeforeHeelTurn(
    sockStitches,
    gussetStitchesPerSide,
  );
  const heelStitches = calcHeelStitches(sockStitches);
  const heelBaseStitches = calcHeelBaseStitches(heelStitches);
  const legStartStitches = calcLegStartStitches(sockStitches);

  const heelAndGussetLength = calcHeelAndGussetLength(
    gussetStitchesPerSide,
    heelStitches,
    heelBaseStitches,
    gauge.y,
  );
  return {
    sockStitches,
    castOnStitches,
    heelAndGussetLength,
    gussetStitchesPerSide,
    stitchCountBeforeHeelTurn,
    heelStitches,
    heelBaseStitches,
    legStartStitches,
  };
};

export { getToeUpValues, type Gauge, type ToeUpValues };
