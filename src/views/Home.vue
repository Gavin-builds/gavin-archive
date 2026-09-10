<script setup lang="ts">
import { useRouter } from "vue-router";

const router = useRouter();

const enterArchive = () => {
  router.push("/projects");
};
</script>

<template>
  <main class="home">
    <div class="home__grid"></div>

    <div class="home__content">
      <div class="home__status">
        <span class="home__dot"></span>
        SYSTEM ONLINE
      </div>

      <h1 class="home__title">GAVINLIN</h1>

      <p class="home__role">AI FULL-STACK ENGINEER</p>

      <p class="home__description">
        Building tools, products and experiments with code and AI.
      </p>

      <button class="home__enter" @click="enterArchive">
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
      circle at 50% 42%,
      rgba(0, 229, 255, 0.07),
      transparent 34%
    ),
    radial-gradient(
      circle at 70% 65%,
      rgba(255, 43, 214, 0.05),
      transparent 28%
    ),
    var(--bg);
}

.home__grid {
  position: absolute;
  inset: 0;

  background-image:
    linear-gradient(
      rgba(0, 229, 255, 0.025) 1px,
      transparent 1px
    ),
    linear-gradient(
      90deg,
      rgba(0, 229, 255, 0.025) 1px,
      transparent 1px
    );

  background-size: 48px 48px;

  mask-image:
    linear-gradient(
      to bottom,
      transparent,
      black 25%,
      black 75%,
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

  color: var(--text);

  font-family: var(--font-sans);

  font-size: clamp(72px, 12vw, 156px);

  font-weight: 800;

  line-height: 0.86;

  letter-spacing: -0.075em;

  text-shadow: 0 0 40px rgba(0, 229, 255, 0.08);
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
  display: inline-flex;

  align-items: center;
  gap: 12px;

  padding: 14px 20px;

  border: 1px solid var(--accent);

  background: var(--accent-soft);

  color: var(--accent);

  font-family: var(--font-mono);

  font-size: 12px;
  font-weight: 700;

  letter-spacing: 0.12em;

  cursor: pointer;

  box-shadow:
    inset 0 0 20px rgba(0, 229, 255, 0.035),
    0 0 16px rgba(0, 229, 255, 0.08);

  transition:
    background var(--transition-fast),
    box-shadow var(--transition-fast),
    color var(--transition-fast);
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
