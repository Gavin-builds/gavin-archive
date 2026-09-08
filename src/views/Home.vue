<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const enterArchive = () => {
  router.push('/projects')
}
</script>

<template>
  <main class="home">
    <div class="home__grid"></div>

    <div class="home__content">
      <div class="home__status">
        <span class="home__dot"></span>
        SYSTEM ONLINE
      </div>

      <h1 class="home__title">
        GAVINLIN
      </h1>

      <p class="home__role">
        AI FULL-STACK ENGINEER
      </p>

      <p class="home__description">
        Building tools, products and experiments
        with code and AI.
      </p>

      <button
        class="home__enter"
        @click="enterArchive"
      >
        <span>ENTER ARCHIVE</span>
        <span>→</span>
      </button>
    </div>

    <div class="home__meta">
      <span>GAVIN ARCHIVE</span>
      <span>2026</span>
    </div>
  </main>
</template>

<style scoped>
.home {
  position: relative;
  min-height: 100vh;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background:
    radial-gradient(
      circle at 50% 40%,
      #ffffff 0,
      var(--bg) 45%,
      var(--bg-deep) 100%
    );
}

.home__grid {
  position: absolute;
  inset: 0;

  background-image:
    linear-gradient(
      rgba(28, 35, 43, 0.035) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(28, 35, 43, 0.035) 1px,
      transparent 1px
    );

  background-size: 48px 48px;

  mask-image: linear-gradient(
    to bottom,
    transparent,
    black 30%,
    black 70%,
    transparent
  );
}

.home__content {
  position: relative;
  width: min(760px, calc(100% - 48px));
}

.home__status {
  display: flex;
  align-items: center;
  gap: 10px;

  margin-bottom: 28px;

  color: var(--text-secondary);
  font-size: 12px;
  letter-spacing: 0.18em;
}

.home__dot {
  width: 7px;
  height: 7px;

  border-radius: 50%;
  background: var(--accent);
}

.home__title {
  margin: 0;

  font-size: clamp(64px, 12vw, 150px);
  line-height: 0.85;
  letter-spacing: -0.07em;
  font-weight: 800;
}

.home__role {
  margin: 28px 0 0;

  font-size: 18px;
  letter-spacing: 0.22em;
  color: var(--accent);
}

.home__description {
  max-width: 480px;

  margin: 24px 0 40px;

  font-size: 18px;
  line-height: 1.7;

  color: var(--text-secondary);
}

.home__enter {
  display: flex;
  align-items: center;
  gap: 32px;

  padding: 16px 22px;

  border: 1px solid var(--line);
  border-radius: var(--radius-sm);

  background: var(--surface);

  color: var(--text);

  cursor: pointer;

  backdrop-filter: blur(16px);

  transition:
    transform 0.2s ease,
    background 0.2s ease;
}

.home__enter:hover {
  transform: translateX(6px);
  background: var(--surface-solid);
}

.home__meta {
  position: absolute;
  left: 48px;
  right: 48px;
  bottom: 32px;

  display: flex;
  justify-content: space-between;

  color: var(--text-muted);

  font-size: 11px;
  letter-spacing: 0.16em;
}

@media (max-width: 640px) {
  .home__content {
    width: calc(100% - 40px);
  }

  .home__role {
    font-size: 13px;
  }

  .home__description {
    font-size: 16px;
  }

  .home__meta {
    left: 20px;
    right: 20px;
  }
}
</style>