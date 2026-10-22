<template>
  <footer class="site-footer">
    <div class="container site-footer__inner">
      <div>
        <p class="site-footer__wordmark">Darwin Lubugan</p>
        <p class="site-footer__location">{{ portfolio.profile.location }} · {{ portfolio.profile.timezone }}</p>
      </div>

      <div>
        <div class="site-footer__links">
          <a :href="portfolio.profile.links[0].url" target="_blank" rel="noreferrer">GitHub</a>
          <a :href="portfolio.profile.links[1].url" target="_blank" rel="noreferrer">LinkedIn</a>
          <a :href="`mailto:${portfolio.profile.email}`">Email</a>
          <a :href="portfolio.profile.resumeUrl" download>Resume</a>
        </div>
        <p class="site-footer__built">Built with Vue 3 + Vite</p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { portfolio } from '@/data/portfolio'
</script>
