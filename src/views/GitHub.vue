<template>
  <div class="page">
    <div class="page-eyebrow">
      06 / NETWORK
    </div>

    <h1>
      GitHub
    </h1>

    <p class="intro">
      Source code, open-source projects and development activity.
    </p>

    <div class="status-card">
      <span class="status-dot"></span>

      <div>
        <strong>GITHUB MODULE</strong>
        <p>
          Integration pending.
        </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.page {
  padding-top: 20px;
}

.page-eyebrow {
  margin-bottom: 18px;

  color: var(--accent);

  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.14em;
}

h1 {
  margin: 0;

  font-size: clamp(48px, 8vw, 100px);
  line-height: 0.95;
  letter-spacing: -0.06em;
}

.intro {
  max-width: 560px;
  margin-top: 28px;

  color: var(--text-secondary);

  font-size: 16px;
  line-height: 1.7;
}

.status-card {
  display: flex;
  align-items: flex-start;
  gap: 14px;

  max-width: 560px;
  margin-top: 64px;
  padding: 18px;

  border: 1px solid var(--line);
  background: var(--surface-solid);
}

.status-dot {
  width: 7px;
  height: 7px;
  margin-top: 5px;

  border-radius: 50%;
  background: var(--accent);
}

.status-card strong {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 0.1em;
}

.status-card p {
  margin: 6px 0 0;

  color: var(--text-muted);

  font-family: var(--font-mono);
  font-size: 10px;
}
</style>