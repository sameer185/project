/* ── TravelGo Navbar Auth Manager ──
   Reads tg_loggedIn + tg_user from localStorage and swaps
   the Login / Sign Up buttons with a user avatar dropdown.
   Include this script at the bottom of every page's <body>.
*/
(function () {
  function getUser() {
    try {
      const email = localStorage.getItem('tg_loggedIn');
      const raw   = localStorage.getItem('tg_user');
      if (!email || !raw) return null;
      const user = JSON.parse(raw);
      if (user.email === email) return user;
      return null;
    } catch (e) { return null; }
  }

  function getInitials(name) {
    return name.trim().split(/\s+/).map(w => w[0].toUpperCase()).slice(0, 2).join('');
  }

  function logout() {
    localStorage.removeItem('tg_loggedIn');
    localStorage.removeItem('tg_user');
    window.location.reload();
  }

  function injectStyles() {
    if (document.getElementById('tg-nav-auth-styles')) return;
    const style = document.createElement('style');
    style.id = 'tg-nav-auth-styles';
    style.textContent = `
      /* User avatar button */
      .tg-user-btn {
        display: flex;
        align-items: center;
        gap: 9px;
        padding: 6px 14px 6px 6px;
        background: var(--accent-light, #eff6ff);
        border: 1.5px solid rgba(29,78,216,0.2);
        border-radius: 100px;
        cursor: pointer;
        position: relative;
        font-family: 'Plus Jakarta Sans', sans-serif;
        transition: all 0.2s;
        text-decoration: none;
        margin-left: 8px;
      }
      .tg-user-btn:hover { background: #dbeafe; border-color: var(--accent, #1d4ed8); }

      .tg-avatar {
        width: 30px;
        height: 30px;
        background: linear-gradient(135deg, var(--accent, #1d4ed8), #0891b2);
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #fff;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 0.5px;
        flex-shrink: 0;
      }

      .tg-user-name {
        font-size: 13px;
        font-weight: 700;
        color: var(--accent, #1d4ed8);
        max-width: 110px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tg-chevron {
        font-size: 10px;
        color: var(--accent, #1d4ed8);
        transition: transform 0.2s;
      }
      .tg-user-btn.open .tg-chevron { transform: rotate(180deg); }

      /* Dropdown */
      .tg-dropdown {
        position: absolute;
        top: calc(100% + 10px);
        right: 0;
        background: #fff;
        border: 1.5px solid var(--border, #e2e8f0);
        border-radius: 14px;
        box-shadow: 0 16px 48px rgba(0,0,0,0.12);
        min-width: 200px;
        overflow: hidden;
        z-index: 9999;
        display: none;
        animation: tgDropIn 0.2s cubic-bezier(0.34,1.56,0.64,1) both;
      }
      .tg-dropdown.open { display: block; }
      @keyframes tgDropIn {
        from { opacity: 0; transform: translateY(-8px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0)   scale(1);    }
      }

      .tg-drop-header {
        padding: 16px 18px 12px;
        border-bottom: 1px solid var(--border, #e2e8f0);
        background: var(--bg, #f6f7fb);
      }
      .tg-drop-hello {
        font-size: 11px;
        color: var(--muted, #64748b);
        font-weight: 600;
        text-transform: uppercase;
        letter-spacing: 0.8px;
        margin-bottom: 2px;
      }
      .tg-drop-fullname {
        font-family: 'Playfair Display', serif;
        font-size: 16px;
        font-weight: 800;
        color: var(--text, #0d1117);
      }
      .tg-drop-email {
        font-size: 11px;
        color: var(--muted, #64748b);
        margin-top: 1px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }

      .tg-drop-item {
        display: flex;
        align-items: center;
        gap: 10px;
        padding: 11px 18px;
        font-size: 13px;
        font-weight: 600;
        color: var(--text2, #2d3748);
        cursor: pointer;
        text-decoration: none;
        transition: background 0.15s;
        border: none;
        background: transparent;
        width: 100%;
        font-family: 'Plus Jakarta Sans', sans-serif;
      }
      .tg-drop-item:hover { background: var(--bg, #f6f7fb); color: var(--accent, #1d4ed8); }
      .tg-drop-item.logout { color: #dc2626; }
      .tg-drop-item.logout:hover { background: #fef2f2; color: #dc2626; }
      .tg-drop-divider { height: 1px; background: var(--border, #e2e8f0); margin: 4px 0; }
    `;
    document.head.appendChild(style);
  }

  function buildUserMenu(user) {
    const initials = getInitials(user.name);
    const firstName = user.name.trim().split(/\s+/)[0]; // first name only for button

    // Create wrapper div (relative positioned for dropdown)
    const wrap = document.createElement('div');
    wrap.style.cssText = 'position:relative;display:inline-flex;align-items:center;';

    // Avatar button
    const btn = document.createElement('button');
    btn.className = 'tg-user-btn';
    btn.innerHTML = `
      <div class="tg-avatar">${initials}</div>
      <span class="tg-user-name">Hi, ${firstName}</span>
      <span class="tg-chevron">▼</span>
    `;

    // Dropdown
    const drop = document.createElement('div');
    drop.className = 'tg-dropdown';
    drop.innerHTML = `
      <div class="tg-drop-header">
        <div class="tg-drop-hello">Logged in as</div>
        <div class="tg-drop-fullname">${user.name}</div>
        <div class="tg-drop-email">${user.email}</div>
      </div>
      <a href="mybookings.html" class="tg-drop-item">🗂️ My Bookings</a>
      <a href="flight.html"    class="tg-drop-item">✈️ Book Flights</a>
      <a href="hotel.html"     class="tg-drop-item">🏨 Book Hotels</a>
      <a href="movie.html"     class="tg-drop-item">🎬 Book Movies</a>
      <div class="tg-drop-divider"></div>
      <button class="tg-drop-item logout" onclick="tgLogout()">🚪 Logout</button>
    `;

    btn.addEventListener('click', function (e) {
      e.stopPropagation();
      const isOpen = drop.classList.toggle('open');
      btn.classList.toggle('open', isOpen);
    });

    document.addEventListener('click', function () {
      drop.classList.remove('open');
      btn.classList.remove('open');
    });

    wrap.appendChild(btn);
    wrap.appendChild(drop);
    return wrap;
  }

  function applyToNav() {
    injectStyles();
    const user = getUser();
    const navLinks = document.querySelector('.nav-links');
    if (!navLinks) return;

    if (user) {
      // Remove Login and Sign Up links
      navLinks.querySelectorAll('a').forEach(a => {
        const href = a.getAttribute('href') || '';
        const text = a.textContent.trim().toLowerCase();
        if (href.includes('login') || href.includes('signup') ||
            text.includes('login') || text.includes('sign up') || text.includes('sign in')) {
          a.remove();
        }
      });
      // Append user menu
      navLinks.appendChild(buildUserMenu(user));
    }
  }

  // Expose logout globally so inline onclick works
  window.tgLogout = logout;

  // Run after DOM is ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyToNav);
  } else {
    applyToNav();
  }
})();
