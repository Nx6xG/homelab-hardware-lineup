/**
 * motion.ts — Refined motion system
 *
 * Principles:
 * - Calm, purposeful. No flash. No bounce.
 * - Easing: expo-out (cubic-bezier(0.16, 1, 0.3, 1))
 * - Reveal: 16px translateY → 0, 500ms
 * - Parallax: max 8px only on hero media, disabled if reduced-motion
 * - Scrollspy: IntersectionObserver highlights active TOC link
 */

const EASING_EXPO = 'cubic-bezier(0.16, 1, 0.3, 1)';

const prefersReducedMotion = (): boolean =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

// ─── Reveal sections ───────────────────────────────────────────────────
function revealSections(): void {
  const elements = document.querySelectorAll<HTMLElement>('.reveal, .reveal-fast');
  if (!elements.length) return;

  if (prefersReducedMotion()) {
    elements.forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
      el.classList.add('is-visible');
    });
    return;
  }

  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        (e.target as HTMLElement).classList.add('is-visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.06, rootMargin: '0px 0px -32px 0px' }
  );

  elements.forEach(el => io.observe(el));
}

// ─── Stagger children ──────────────────────────────────────────────────
function staggerChildren(): void {
  const grids = document.querySelectorAll<HTMLElement>('.stagger-children');
  if (!grids.length) return;

  if (prefersReducedMotion()) {
    grids.forEach(g => g.classList.add('is-visible'));
    return;
  }

  const io = new IntersectionObserver(
    entries => entries.forEach(e => {
      if (e.isIntersecting) {
        (e.target as HTMLElement).classList.add('is-visible');
        io.unobserve(e.target);
      }
    }),
    { threshold: 0.04, rootMargin: '0px 0px -16px 0px' }
  );

  grids.forEach(g => io.observe(g));
}

// ─── Counter animations ────────────────────────────────────────────────
function animateCounters(): void {
  const counters = document.querySelectorAll<HTMLElement>('[data-counter]');
  if (!counters.length) return;

  if (prefersReducedMotion()) {
    counters.forEach(el => { el.textContent = el.dataset.counter ?? '0'; });
    return;
  }

  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target as HTMLElement;
      const target = parseInt(el.dataset.counter ?? '0', 10);
      const duration = 1200;
      const t0 = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - t0) / duration, 1);
        const eased = p === 1 ? 1 : 1 - Math.pow(2, -10 * p);
        el.textContent = Math.round(eased * target).toString();
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      io.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => io.observe(el));
}

// ─── Scrollspy — highlight active TOC link ─────────────────────────────
function scrollspy(): void {
  const sections = document.querySelectorAll<HTMLElement>('section[id]');
  const links    = document.querySelectorAll<HTMLAnchorElement>('[data-toc-link]');
  if (!sections.length || !links.length) return;

  const setActive = (id: string) => {
    links.forEach(l => {
      const isActive = l.getAttribute('href') === `#${id}`;
      l.classList.toggle('text-ink-1', isActive);
      l.classList.toggle('text-accent', isActive);
      l.classList.toggle('text-ink-3', !isActive);
      // Move the indicator dot
      const dot = l.querySelector<HTMLElement>('[data-toc-dot]');
      if (dot) {
        dot.style.background = isActive ? 'var(--color-accent)' : '';
        dot.style.opacity = isActive ? '1' : '';
      }
    });
  };

  const io = new IntersectionObserver(
    entries => {
      entries.forEach(e => {
        if (e.isIntersecting) setActive(e.target.id);
      });
    },
    { threshold: 0, rootMargin: '-80px 0px -55% 0px' }
  );

  sections.forEach(s => io.observe(s));
}

// ─── Hero media — subtle parallax (max 8px) ────────────────────────────
function heroParallax(): void {
  const el = document.querySelector<HTMLElement>('[data-parallax]');
  if (!el || prefersReducedMotion()) return;

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    requestAnimationFrame(() => {
      const y = window.scrollY;
      // Clamp to 8px max shift
      const shift = Math.min(y * 0.05, 8);
      el.style.transform = `translateY(${shift}px)`;
      ticking = false;
    });
    ticking = true;
  }, { passive: true });
}

// ─── Smooth scroll for anchor links ───────────────────────────────────
function smoothScroll(): void {
  document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const id = a.getAttribute('href')?.slice(1);
      if (!id) return;
      const target = document.getElementById(id);
      if (!target) return;
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      history.pushState(null, '', `#${id}`);
    });
  });
}

// ─── Filter chips (lineup page) ────────────────────────────────────────
function initFilters(): void {
  const btns  = document.querySelectorAll<HTMLButtonElement>('[data-filter]');
  const cards = document.querySelectorAll<HTMLElement>('[data-device-type]');
  if (!btns.length) return;

  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      const filter = btn.dataset.filter ?? 'all';

      btns.forEach(b => {
        const active = b === btn;
        b.classList.toggle('bg-accent/15',    active);
        b.classList.toggle('text-accent',      active);
        b.classList.toggle('border-accent/20', active);
        b.classList.toggle('chip',             !active);
      });

      cards.forEach(card => {
        const visible =
          filter === 'all' ||
          card.dataset.deviceType === filter ||
          (card.dataset.tags ?? '').includes(filter) ||
          card.dataset.status === filter;

        if (prefersReducedMotion()) {
          card.style.display = visible ? '' : 'none';
          return;
        }

        if (visible) {
          card.style.display = '';
          card.animate(
            [{ opacity: '0', transform: 'scale(0.97)' }, { opacity: '1', transform: 'scale(1)' }],
            { duration: 220, easing: EASING_EXPO, fill: 'forwards' }
          );
        } else {
          card.animate(
            [{ opacity: '1' }, { opacity: '0' }],
            { duration: 140, easing: 'ease', fill: 'forwards' }
          ).finished.then(() => { card.style.display = 'none'; });
        }
      });
    });
  });
}

// ─── 3D Tilt on cards with [data-tilt] ─────────────────────────────────
function tiltCards(): void {
  const cards = document.querySelectorAll<HTMLElement>('[data-tilt]');
  if (!cards.length || prefersReducedMotion()) return;

  cards.forEach(card => {
    const STRENGTH = 7; // max degrees
    const LIFT     = 6; // px

    // Use pointer events so mouse tilt works on desktop; skip on touch/pen
    card.addEventListener('pointermove', (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width  - 0.5;
      const y = (e.clientY - rect.top)  / rect.height - 0.5;
      card.style.transform =
        `perspective(900px) rotateY(${x * STRENGTH * 2}deg) rotateX(${-y * STRENGTH}deg) translateZ(${LIFT}px)`;
      card.style.transition = 'transform 80ms linear';
    });

    card.addEventListener('pointerleave', () => {
      card.style.transition = 'transform 500ms cubic-bezier(0.16,1,0.3,1), box-shadow 500ms ease';
      card.style.transform  = '';
    });

    card.addEventListener('pointerenter', (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;
      card.style.transition = 'transform 80ms linear';
    });
  });
}

// ─── Public init ───────────────────────────────────────────────────────
export function initMotion(): void {
  revealSections();
  staggerChildren();
  animateCounters();
  scrollspy();
  heroParallax();
  smoothScroll();
  initFilters();
  tiltCards();
}
