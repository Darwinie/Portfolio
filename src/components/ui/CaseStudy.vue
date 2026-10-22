<template>
  <article :id="study.slug" class="case-study">
    <header class="case-study__header">
      <span class="case-study__number">{{ study.number }}</span>
      <h3 class="case-study__title">{{ study.title }}</h3>
      <p class="case-study__outcome">{{ study.outcome }}</p>
    </header>

    <div class="case-study__grid">
      <aside class="case-study__meta" aria-label="Project details">
        <dl>
          <div class="case-study__meta-group">
            <dt>Role</dt>
            <dd>{{ study.role }}</dd>
          </div>
          <div class="case-study__meta-group">
            <dt>Stack</dt>
            <dd>
              <ul class="tag-list">
                <li v-for="item in study.stack" :key="item">{{ item }}</li>
              </ul>
            </dd>
          </div>
          <div class="case-study__meta-group">
            <dt>Scope</dt>
            <dd>{{ study.scope }}</dd>
          </div>
        </dl>

        <ArrowLink
          v-if="study.link"
          :href="study.link.url"
          :label="study.link.label"
          :external="isExternal"
        />
        <p v-else class="case-study__note">Internal project — code available on request</p>
      </aside>

      <div class="case-study__narrative">
        <div class="case-study__section">
          <h4>Context</h4>
          <p>{{ study.context }}</p>
        </div>
        <div class="case-study__section">
          <h4>Constraint</h4>
          <p>{{ study.constraint }}</p>
        </div>
        <div class="case-study__section">
          <h4>What I built</h4>
          <p>{{ study.built }}</p>
        </div>
        <div class="case-study__section">
          <h4>Result</h4>
          <p>{{ study.result }}</p>
        </div>

        <PipelineDiagram
          v-if="study.visual.type === 'pipeline'"
          class="case-study__visual"
          :steps="study.visual.steps"
        />
        <figure v-else-if="study.visual.type === 'image'" class="case-study__visual">
          <img
            class="case-study__image"
            :src="study.visual.src"
            :alt="study.visual.alt"
            width="1600"
            height="820"
            loading="lazy"
            decoding="async"
          />
        </figure>
      </div>
    </div>
  </article>
</template>

<script setup>
import { computed } from 'vue'
import ArrowLink from './ArrowLink.vue'
import PipelineDiagram from './PipelineDiagram.vue'

const props = defineProps({
  study: {
    type: Object,
    required: true
  }
})

const isExternal = computed(() => (
  Boolean(props.study.link?.url?.startsWith('http'))
))
</script>
