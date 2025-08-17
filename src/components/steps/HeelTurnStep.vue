<script setup lang="ts">
import type { ToeUpValues } from "./types";
const props = defineProps<{ values: ToeUpValues }>();
const { heelStitches, sockStitches, heelBaseStitches } = props.values;
</script>

<template>
    <section class="prose">
        <p>
            Work short-rows on <strong>{{ heelStitches }}</strong> Heel Stitches
            (half of the initial <strong>{{ sockStitches }}</strong> Sock
            Stitches).
        </p>

        <p>
            <strong>HEEL TURN ROW 1 (RS):</strong> Knit to 1 st before second
            marker, wrap next st, turn.
        </p>
        <p>
            <strong>HEEL TURN ROW 2 (WS):</strong> Purl to 1 st before marker,
            wrap next st, turn.
        </p>
        <p>
            <strong>HEEL TURN ROW 3 (RS):</strong> Knit to 1 st before last
            wrapped st, wrap next st, turn.
        </p>
        <p>
            <strong>HEEL TURN ROW 4 (WS):</strong> Purl to 1 st before last
            wrapped st, wrap next st, turn.
        </p>

        <p>
            Repeat Rows 3–4 until <strong>{{ heelBaseStitches }}</strong> Heel
            Base Stitches remain unwrapped in the center (end with a WS row).
            Remove heel markers.
        </p>

        <p>
            See <short-rows-knit /> and <short-rows-purl /> for wrapping/hiding
            wraps.
        </p>
    </section>
</template>
