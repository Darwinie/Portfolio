<template>
  <section id="work" class="section" aria-labelledby="work-title">
    <div class="container">
      <SectionHeading
        id="work-title"
        eyebrow="Selected work / 01-03"
        title="Selected work"
      />

      <div class="work__list">
        <CaseStudy
          v-for="study in portfolio.caseStudies"
          :key="study.slug"
          :study="study"
        />
      </div>

      <h3 class="work__additional-heading">Additional work</h3>
      <ul class="work__additional">
        <li
          v-for="item in portfolio.additionalWork"
          :key="item.title"
          class="work__additional-item"
        >
          <h4>{{ item.title }}</h4>
          <p>{{ item.description }}</p>
          <ul class="tag-list">
            <li v-for="technology in item.stack" :key="technology">{{ technology }}</li>
          </ul>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup>
import CaseStudy from '@/components/ui/CaseStudy.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { portfolio } from '@/data/portfolio'
</script>
