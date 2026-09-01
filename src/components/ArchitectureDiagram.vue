<script setup lang="ts">
import { useI18n } from '../i18n'

const { t } = useI18n()
</script>

<template>
  <figure class="diagram">
    <svg viewBox="0 0 560 320" fill="none" role="img" :aria-label="t.product.diagramAria">
      <g stroke="rgba(255,255,255,0.16)" stroke-width="1">
        <line x1="280" y1="48" x2="280" y2="92" />
        <line x1="100" y1="124" x2="460" y2="124" />
        <line x1="100" y1="124" x2="100" y2="196" />
        <line x1="280" y1="124" x2="280" y2="196" />
        <line x1="460" y1="124" x2="460" y2="196" />
        <line x1="100" y1="196" x2="460" y2="196" />
        <line x1="280" y1="196" x2="280" y2="248" />
      </g>
      <rect x="196" y="8" width="168" height="40" rx="2" fill="#111" stroke="rgba(255,255,255,0.22)" />
      <text x="280" y="33" text-anchor="middle" fill="#f4f4f2" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" letter-spacing="1.6">{{ t.product.agent }}</text>

      <rect x="46" y="104" width="108" height="40" rx="2" fill="#111" stroke="rgba(255,255,255,0.12)" />
      <text x="100" y="129" text-anchor="middle" fill="#8c8c88" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" letter-spacing="1.4">{{ t.product.tools }}</text>

      <rect x="226" y="104" width="108" height="40" rx="2" fill="#111" stroke="rgba(255,255,255,0.12)" />
      <text x="280" y="129" text-anchor="middle" fill="#8c8c88" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" letter-spacing="1.4">{{ t.product.policy }}</text>

      <rect x="406" y="104" width="108" height="40" rx="2" fill="#111" stroke="rgba(255,255,255,0.12)" />
      <text x="460" y="129" text-anchor="middle" fill="#8c8c88" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" letter-spacing="1.4">{{ t.product.identity }}</text>

      <rect x="196" y="248" width="168" height="40" rx="2" fill="#111" stroke="rgba(255,255,255,0.22)" />
      <text x="280" y="273" text-anchor="middle" fill="#f4f4f2" font-family="IBM Plex Mono, ui-monospace, monospace" font-size="12" letter-spacing="1.6">{{ t.product.business }}</text>
    </svg>
  </figure>
</template>

<style scoped>
.diagram {
  max-width: 560px;
  margin: 0 auto;
}

.diagram svg {
  width: 100%;
  height: auto;
  display: block;
}
</style>
