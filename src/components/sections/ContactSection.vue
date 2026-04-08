<template>
  <section class="section" id="contact">
    <div class="section-header">
      <p class="section-tag">Get In Touch</p>
      <h2 class="section-title">Contact Me</h2>
      <p class="section-description">
        Have a project in mind or want to collaborate? Feel free to reach out!
      </p>
    </div>
    <div class="contact-grid">
      <div class="contact-info">
        <h3>{{ data.contact.title }}</h3>
        <p>{{ data.contact.description }}</p>
        <div class="contact-methods">
          <div class="contact-method" v-for="method in data.contact.methods" :key="method.label">
            <div class="contact-icon">{{ method.icon }}</div>
            <div>
              <p class="contact-label">{{ method.label }}</p>
              <p class="contact-value">{{ method.value }}</p>
            </div>
          </div>
        </div>
      </div>
      <form class="contact-form" @submit.prevent="handleSubmit">
        <div class="form-group">
          <label class="form-label" for="name">Your Name</label>
          <input 
            type="text" 
            id="name" 
            class="form-input" 
            v-model="formData.name"
            placeholder="John Doe"
            required
          >
        </div>
        <div class="form-group">
          <label class="form-label" for="email">Your Email</label>
          <input 
            type="email" 
            id="email" 
            class="form-input" 
            v-model="formData.email"
            placeholder="john@example.com"
            required
          >
        </div>
        <div class="form-group">
          <label class="form-label" for="subject">Subject</label>
          <input 
            type="text" 
            id="subject" 
            class="form-input" 
            v-model="formData.subject"
            placeholder="Project Inquiry"
            required
          >
        </div>
        <div class="form-group">
          <label class="form-label" for="message">Your Message</label>
          <textarea 
            id="message" 
            class="form-textarea" 
            v-model="formData.message"
            placeholder="Tell me about your project..."
            required
          ></textarea>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">
          Send Message
        </button>
      </form>
    </div>
  </section>
</template>

<script setup>
import { portfolioData } from '@/data/portfolio'
import { useContactForm } from '@/composables'

const data = portfolioData
const { formData, submit: handleSubmit } = useContactForm()
</script>
