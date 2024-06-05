<template>
  <svg
    aria-hidden="true"
    class="svg-icon"
    :fill="props.color"
    :width="width"
    :height="height"
  >
    <use :xlink:href="symbolId" />
  </svg>
</template>

<script setup name="svg-icon">
//  import { computed } from 'vue'
const props = defineProps({
  prefix: {
    type: String,
    default: "icon",
  },
  name: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "1em",
  },
  width: {
    type: String,
  },
  height: {
    type: String,
  },
  color: {
    type: String,
    default: "currentColor",
  },
});
const symbolId = computed(() => `#${props.prefix}-${props.name}`);
const width = computed(() => (props.width ? props.width : props.size));
const height = computed(() => (props.height ? props.height : props.size));
</script>

<style scope>
.svg-icon {
  fill: currentColor;
  outline: none;
  font-size: 14px;
}
</style>
