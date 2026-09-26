document.addEventListener("DOMContentLoaded", function () {
  let isCollapse = localStorage.getItem("is_sidebar_collapse") === "true";
  let screenWidth = window.innerWidth;
  if (screenWidth < 768) {
    isCollapse = true;
  }
  const sidebar = document.querySelector(".sidebar");
  const sidebarHeader = document.querySelector(".sidebar-header");
  const pageWrapper = document.querySelector(".page-wrapper-container");
  const navBar = document.querySelector(".nav-bar");
  const footer = document.querySelector(".pnd-footer");
  const menuBtn = document.querySelector(".menu");

  function collapseExpandMenu(isCollapsed) {
    if (sidebar) {
      sidebar.classList.toggle("collapsed", isCollapsed);
    }
    sidebarHeader.classList.toggle("collapsed", isCollapsed);
    pageWrapper.classList.toggle("collapsed", isCollapsed);
    navBar.classList.toggle("collapsed", isCollapsed);
    if (footer) {
      footer.classList.toggle("collapsed", isCollapsed);
    }
  }

  collapseExpandMenu(isCollapse);

  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      isCollapse = !isCollapse;
      localStorage.setItem("is_sidebar_collapse", isCollapse);
      collapseExpandMenu(isCollapse);
    });
  }

  const items = document.querySelectorAll(".item-levels");

  items.forEach((item) => {
    item.addEventListener("mouseenter", () => {
      const container = item.querySelector(".sidebar-text");
      const scrollText = item.querySelector(".scroll-text");

      if (!scrollText) return;

      const itemWidth = container.offsetWidth;
      const childWidth = scrollText.offsetWidth;

      if (itemWidth < childWidth + 2) {
        const distance = childWidth - itemWidth;
        const duration = Math.max(0.150, distance / 140); // 140px per second, min 0.150s
        scrollText.style.setProperty("--scroll-distance", `${distance}px`);
        scrollText.style.setProperty("--scroll-duration", `${duration}s`);

        scrollText.classList.add("scrollable");
        setTimeout(() => scrollText.classList.add("scrolling"), 0);
      }
    });

    item.addEventListener("mouseleave", () => {
      const scrollText = item.querySelector(".scroll-text");
      scrollText?.classList.remove("scrolling");
      setTimeout(() => scrollText?.classList.remove("scrollable"), 200);
    });
  });
});
