<template>
  <div class="app">
    <a class="skip-link" href="#main">Skip to content</a>
    <SiteHeader />

    <main id="main">
      <HeroSection />
      <WorkSection data-reveal />
      <AboutSection data-reveal />
      <ExperienceSection data-reveal />
      <CertificationsSection data-reveal />
      <TicketTriageSection data-reveal />
      <PortfolioAssistantSection data-reveal />
      <ContactSection data-reveal />
    </main>

    <AssistantLauncher />
    <SiteFooter />
  </div>
</template>

<script setup>
import { AssistantLauncher, SiteFooter, SiteHeader } from '@/components/layout'
import {
  AboutSection,
  CertificationsSection,
  ContactSection,
  ExperienceSection,
  HeroSection,
  PortfolioAssistantSection,
  TicketTriageSection,
  WorkSection
} from '@/components/sections'
import { useReveal } from '@/composables/useReveal'

useReveal()
</script>
