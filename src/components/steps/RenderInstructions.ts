import { defineComponent, type VNodeChild } from "vue";

export default defineComponent({
  name: "RenderInstructions",
  props: {
    render: { type: Function as () => () => VNodeChild, required: true },
  },
  setup(props) {
    return () => props.render();
  },
});
