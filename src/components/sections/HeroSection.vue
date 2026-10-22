<template>
  <section id="top" class="hero section" aria-labelledby="hero-title">
    <div class="container">
      <div class="hero__grid">
        <div class="hero__content">
          <p class="eyebrow">{{ portfolio.profile.role }}</p>

          <h1 id="hero-title" class="hero__headline">{{ portfolio.profile.headline }}</h1>

          <p class="hero__intro">{{ portfolio.profile.intro }}</p>

          <div class="hero__actions">
            <ArrowLink href="#work" label="See selected work" />
            <a class="button button--ink" :href="portfolio.profile.resumeUrl" download>
              <Download aria-hidden="true" />
              <span>Download CV</span>
            </a>
          </div>

          <p class="hero__availability">{{ portfolio.profile.availability }}</p>
        </div>

        <figure class="hero__portrait-wrap">
          <div class="hero__portrait-frame">
            <picture class="hero__portrait">
              <source
                v-for="(srcset, format) in portrait.sources"
                :key="format"
                :srcset="srcset"
                :type="format === 'jpg' ? 'image/jpeg' : `image/${format}`"
                sizes="(max-width: 768px) 90vw, 420px"
              />
              <img
                :src="portrait.img.src"
                :width="portrait.img.w"
                :height="portrait.img.h"
                :alt="portfolio.profile.portraitAlt"
                loading="eager"
                decoding="async"
                fetchpriority="high"
              />
            </picture>
          </div>
          <figcaption class="hero__caption">
            <span>{{ portfolio.profile.location }} · {{ portfolio.profile.timezone }}</span>
          </figcaption>
        </figure>
      </div>

      <div class="hero__proof">
        <MetricStrip :metrics="portfolio.metrics" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { Download } from 'lucide-vue-next'
import ArrowLink from '@/components/ui/ArrowLink.vue'
import MetricStrip from '@/components/ui/MetricStrip.vue'
import { portfolio } from '@/data/portfolio'
import portrait from '@/assets/profile.png?w=480;960&format=avif;webp;jpg&as=picture'
</script>
