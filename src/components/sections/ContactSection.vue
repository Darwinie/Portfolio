<template>
  <section id="contact" class="section contact" aria-labelledby="contact-title">
    <div class="container">
      <SectionHeading id="contact-title" eyebrow="Contact" title="Contact" />

      <div class="contact__grid">
        <div>
          <h3 class="contact__headline">Have a process that needs to disappear?</h3>
          <a class="contact__email" :href="`mailto:${portfolio.profile.email}`">
            {{ portfolio.profile.email }}
          </a>

          <div class="contact__actions">
            <button class="button button--ghost" type="button" @click="copy(portfolio.profile.email)">
              <Check v-if="copied" aria-hidden="true" />
              <Copy v-else aria-hidden="true" />
              <span>{{ copied ? 'Copied' : 'Copy email' }}</span>
            </button>
          </div>

          <p class="contact__status" role="status" aria-live="polite">
            {{ copied ? 'Copied to clipboard' : '' }}
          </p>
        </div>

        <div class="contact__details">
          <p class="contact__meta">
            {{ portfolio.profile.location }} · {{ portfolio.profile.timezone }}
          </p>

          <div class="contact__social">
            <ArrowLink
              :href="portfolio.profile.links[0].url"
              :label="portfolio.profile.links[0].label"
              external
            />
            <ArrowLink
              :href="portfolio.profile.links[1].url"
              :label="portfolio.profile.links[1].label"
              external
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { Check, Copy } from 'lucide-vue-next'
import ArrowLink from '@/components/ui/ArrowLink.vue'
import SectionHeading from '@/components/ui/SectionHeading.vue'
import { useClipboard } from '@/composables/useClipboard'
import { portfolio } from '@/data/portfolio'

const { copied, copy } = useClipboard()
</script>
