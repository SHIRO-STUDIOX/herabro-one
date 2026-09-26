<template>
  <div class="pnd-d-flex pnd-flex-column pnd-text-justify">
    <div
      class="faq-question pnd-d-flex"
      :class="{ expand: expand }"
      @click="localExpand = !localExpand"
    >
      <IconSvg class="svg" name="question.svg"></IconSvg>
      <span class="pnd-flex-grow-1">{{ question }}</span>
      <IconSvg class="svg" :name="expand ? 'minus.svg' : 'plus.svg'"></IconSvg>
    </div>
    <div class="faq-answer" :class="{ expand: expand }">
      <div class="faq-answer-inner pnd-d-flex">
        <IconSvg class="svg" name="check.svg"></IconSvg>
        <div class="pnd-d-flex pnd-flex-column">
          <span class="faq-answer-text" v-html="answer"></span>
          <div class="faq-answer-badge pnd-row" style="gap: 9px">
            <Badge
              v-for="tag in tags ?? []"
              :key="tag.id"
              :color="tag.color"
              :text="tag.title"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { defineProps, defineEmits, computed, ref } from "vue";
import IconSvg from "../IconSvg.vue";
import Badge from "../Badge.vue";
const emit = defineEmits(["update:expand"]);

const props = defineProps({
  question: String,
  answer: String,
  relatedId: Number,
  tags: Array,
  expand: {
    type: Boolean,
    default: false,
  },
});

const localExpand = computed({
  get() {
    return props.expand;
  },
  set(value) {
    emit("toggle");
  },
});
</script>
