<template>
  <div class="app">
    <TheNavbar />
    <HeroSection />
    <TechStackMarquee />
    <AboutSection />
    <SkillsSection />
    <ProjectsSection />
    <ExperienceSection />
    <CertificatesSection />
    <TestimonialsSection />
    <ContactSection />
    <TheFooter />
  </div>
</template>

<script setup>
import { TheNavbar, TheFooter } from '@/components/layout'
import {
  HeroSection,
  AboutSection,
  SkillsSection,
  ProjectsSection,
  ExperienceSection,
  CertificatesSection,
  TestimonialsSection,
  ContactSection
} from '@/components/sections'
import TechStackMarquee from '@/components/TechStackMarquee.vue'
</script>
