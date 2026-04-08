<template>
  <section class="section" id="testimonials">
    <div class="section-header">
      <p class="section-tag">What Others Say</p>
      <h2 class="section-title">Testimonials</h2>
      <p class="section-description">
        Feedback from colleagues and managers I've had the pleasure to work with.
      </p>
    </div>
    <div class="testimonials-grid">
      <div class="testimonial-card" v-for="testimonial in data.testimonials" :key="testimonial.author">
        <div class="testimonial-quote">
          <span class="quote-icon">"</span>
          <p>{{ testimonial.quote }}</p>
        </div>
        <div class="testimonial-author">
          <div class="author-avatar">{{ testimonial.initials }}</div>
          <div class="author-info">
            <strong>{{ testimonial.author }}</strong>
            <span>{{ testimonial.role }}</span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { portfolioData } from '@/data/portfolio'

const data = portfolioData
</script>
