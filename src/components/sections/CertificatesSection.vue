<template>
  <section class="section" id="certificates">
    <div class="section-header">
      <p class="section-tag">Achievements</p>
      <h2 class="section-title">Certificates & Certifications</h2>
      <p class="section-description">
        Professional certifications and qualifications I've earned throughout my career.
      </p>
    </div>
    <div class="certificates-grid">
      <div class="certificate-card" v-for="(cert, index) in data.certifications" :key="cert.name">
        <div class="certificate-icon">
          🏆
        </div>
        <h3 class="certificate-title">{{ cert.name }}</h3>
        <p class="certificate-issuer" v-if="cert.issuer">{{ cert.issuer }}</p>
        <p class="certificate-date" v-if="cert.date">{{ cert.date }}</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { portfolioData } from '@/data/portfolio'

const data = portfolioData
</script>
