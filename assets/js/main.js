// 太空歌剧主题交互脚本

document.addEventListener('DOMContentLoaded', () => {
  // 导航栏滚动效果
  const nav = document.querySelector('.nav');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 100) {
      nav.style.background = 'rgba(3, 4, 8, 0.9)';
    } else {
      nav.style.background = 'linear-gradient(to bottom, var(--void-black) 0%, transparent 100%)';
    }

    lastScroll = currentScroll;
  });

  // 卡片入场动画
  const cards = document.querySelectorAll('.post-card');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  };

  const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        cardObserver.unobserve(entry.target);
      }
    });
  }, observerOptions);

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s cubic-bezier(0.23, 1, 0.32, 1), transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)';
    cardObserver.observe(card);
  });

  // 鼠标跟随光效（可选，性能友好版本）
  const isTouchDevice = window.matchMedia('(pointer: coarse)').matches;

  if (!isTouchDevice) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth;
      const y = e.clientY / window.innerHeight;

      document.body.style.setProperty('--mouse-x', x);
      document.body.style.setProperty('--mouse-y', y);
    });
  }
});
