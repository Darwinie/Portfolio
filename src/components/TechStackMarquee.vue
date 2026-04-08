<template>
  <div class="tech-marquee">
    <div class="marquee-track">
      <div class="marquee-content">
        <span class="tech-item" v-for="tech in technologies" :key="tech">{{ tech }}</span>
      </div>
      <div class="marquee-content">
        <span class="tech-item" v-for="tech in technologies" :key="tech + '-clone'">{{ tech }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const technologies = [
  'C#', '.NET', 'Vue.js', 'Python', 'PowerShell', 'PHP', 
  'SQL Server', 'MongoDB', 'Azure', 'Docker', 'ASP.NET Core',
  'Entity Framework', 'REST API', 'Git', 'HTML5', 'CSS3'
]
</script>
