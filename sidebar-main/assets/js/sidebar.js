document.addEventListener("DOMContentLoaded", function () {
  let sidebarLeaveTimeout;
  let isCollapse = localStorage.getItem('is_sidebar_collapse') === 'true';

  const sidebar = document.querySelector('.sidebar');
  const sidebarHeader = document.querySelector('.sidebar-header');
  const pageWrapper = document.querySelector('.page-wrapper-container');
  const navBar = document.querySelector('.nav-bar');
  const footer = document.querySelector('.ui-footer');
  const menuBtn = document.querySelector('.menu');

  function collapseExpandMenu(isCollapsed) {
    sidebar.classList.toggle('collapsed', isCollapsed);
    sidebarHeader.classList.toggle('collapsed', isCollapsed);
    pageWrapper.classList.toggle('collapsed', isCollapsed);
    navBar.classList.toggle('collapsed', isCollapsed);
    if(footer) {
      footer.classList.toggle('collapsed', isCollapsed);
    }
  }

  function collapseSubMenus() {
    document.querySelectorAll('.submenu-level-1').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.toggle-icon-level-1').forEach(el => {
      el.classList.remove('rotate-180');
    });
    document.querySelectorAll('.submenu-level-2').forEach(el => {
      el.style.display = 'none';
    });
    document.querySelectorAll('.toggle-icon-level-2').forEach(el => {
      el.classList.remove('rotate-180');
    });
  }

  collapseExpandMenu(isCollapse);

  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      isCollapse = !isCollapse;
      localStorage.setItem('is_sidebar_collapse', isCollapse);
      collapseExpandMenu(isCollapse);
      if (isCollapse) {
        collapseSubMenus();
      }
    });
  }

  document.querySelectorAll('.item-level-3').forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('locked')) return;
      document.querySelectorAll('.item-level-3').forEach(i => i.classList.remove('active'));
      el.classList.add('active');
    });
  });

  if (sidebar) {
    sidebar.addEventListener('mouseenter', () => {
      clearTimeout(sidebarLeaveTimeout);
      sidebar.classList.remove('collapsed');
      sidebarHeader.classList.remove('collapsed');
      pageWrapper.classList.remove('collapsed');
      navBar.classList.remove('collapsed');
      if(footer) {
        footer.classList.remove('collapsed');
      }
    });

    sidebar.addEventListener('mouseleave', () => {
      if (!isCollapse) return;

      sidebarLeaveTimeout = setTimeout(() => {
        const tooltip = document.querySelector('.tooltip.show');
        if (tooltip && tooltip.matches(':hover')) return;

        sidebar.classList.add('collapsed');
        sidebarHeader.classList.add('collapsed');
        pageWrapper.classList.add('collapsed');
        navBar.classList.add('collapsed');
        if(footer) {
          footer.classList.add('collapsed');
        }
        collapseSubMenus();
      }, 150);
    });
  }

  document.querySelectorAll('.item-level-1').forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('locked')) {
        return;
      }
      const submenu = el.nextElementSibling;
      const icon = el.querySelector('.toggle-icon-level-1');
     
      document.querySelectorAll('.item-level-1').forEach(i => i.classList.remove('active'));
      el.classList.toggle('active');
      icon.classList.toggle('rotate-180');
      submenu.style.display = submenu.style.display == 'none'? 'block' : 'none';

      document.querySelectorAll('.submenu-level-1').forEach(el => {
        if (el !== submenu) el.style.display = 'none';
      });
      document.querySelectorAll('.toggle-icon-level-1').forEach(el => {
        if (el !== icon) {
          el.classList.remove('rotate-180');
        }
      });
    });
  });

  document.querySelectorAll('.item-level-2').forEach(el => {
    el.addEventListener('click', () => {
      if (el.classList.contains('locked')) {
        return;
      }
      const submenu = el.nextElementSibling;
      const icon = el.querySelector('.toggle-icon-level-2');
     
      document.querySelectorAll('.item-level-2').forEach(i => i.classList.remove('active'));
      el.classList.toggle('active');
      icon.classList.toggle('rotate-180');
      submenu.style.display = submenu.style.display == 'none'? 'block' : 'none';

      document.querySelectorAll('.submenu-level-2').forEach(el => {
        if (el !== submenu) el.style.display = 'none';
      });
      document.querySelectorAll('.toggle-icon-level-2').forEach(el => {
        if (el !== icon) {
          el.classList.remove('rotate-180');
        }
      });
    });
  });
});
