<template>
  <section id="about" class="section" aria-labelledby="about-title">
    <div class="container">
      <SectionHeading id="about-title" eyebrow="About" title="About" />

      <div class="about__grid">
        <div class="about__currently">
          <h3 class="about__currently-heading">Currently</h3>
          <dl>
            <div v-for="item in portfolio.about.currently" :key="item.label">
              <dt>{{ item.label }}</dt>
              <dd>{{ item.value }}</dd>
            </div>
          </dl>
        </div>

        <div class="about__bio">
          <p v-for="paragraph in portfolio.about.bio" :key="paragraph">
            {{ paragraph }}
          </p>
        </div>
      </div>

      <div class="about__block">
        <h3 class="about__block-heading">How I work</h3>
        <ol class="how-i-work">
          <li
            v-for="step in portfolio.about.howIWork"
            :key="step.number"
            class="how-i-work__item"
          >
            <span class="how-i-work__number">{{ step.number }}</span>
            <h4>{{ step.title }}</h4>
            <p>{{ step.description }}</p>
          </li>
        </ol>
      </div>

      <div class="about__block">
        <h3 class="about__block-heading">Toolbox</h3>
        <div class="toolbox">
          <div
            v-for="group in portfolio.about.toolbox"
            :key="group.group"
            class="toolbox__group"
          >
            <h4 class="toolbox__label">{{ group.group }}</h4>
            <ul class="toolbox__items">
              <li v-for="item in group.items" :key="item">{{ item }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { portfolio } from '@/data/portfolio'
</script>
