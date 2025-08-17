<script setup lang="ts">
import type { ToeUpValues } from "./types";
const props = defineProps<{ values: ToeUpValues }>();
const { heelStitches, legStartStitches } = props.values;
</script>

<template>
    <section class="prose">
        <p>
            Decrease the gusset stitches while working the heel flap as follows.
        </p>

        <p>
            <strong>ROW 1 (RS):</strong>
            Knit to first wrapped st, *work wrapped st together with its wrap;
            repeat to last wrapped st, work it with its wrap and first gusset st
            as <ssk />, turn — 1 gusset st decreased.
        </p>

        <p>
            <strong>ROW 2 (WS):</strong>
            <sl1-wyif /> , purl to first wrapped st, *purl wrapped st with its
            wrap; repeat to last wrapped st, work it with its wrap and first
            gusset st as <p2tog />, turn — 1 gusset st decreased.
        </p>

        <p>
            Working back and forth on center heel sts, always stopping 1 st
            before the gusset, continue to work
            <strong>{{ heelStitches }} − 2</strong> sts between the initial
            slipped st and the gusset decrease each row as follows.
        </p>

        <p>
            <strong>ROW 3 (RS):</strong> <sl1-wyib /> , knit to 1 st before
            gusset sts, <ssk /> , turn — 1 dec.
        </p>
        <p>
            <strong>ROW 4 (WS):</strong> <sl1-wyif /> , purl to 1 st before
            gusset sts, <p2tog /> , turn — 1 dec.
        </p>

        <p>
            Repeat Rows 3–4 until all but 2 gusset sts have been decreased (one
            on each side), ending with a RS row —
            <strong>{{ legStartStitches }}</strong> Leg Start Stitches remain.
            The final 2 gusset sts are decreased on the first leg round.
        </p>
    </section>
</template>
