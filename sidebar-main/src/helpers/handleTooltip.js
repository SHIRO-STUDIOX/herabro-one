export function handleTooltip() {
  if (window.__tooltipInitialized) return;
  window.__tooltipInitialized = true;

  let tooltipBox = document.querySelector(".tooltip-box");
  if (!tooltipBox) {
    tooltipBox = document.createElement("div");
    tooltipBox.className = "tooltip-box";
    document.body.appendChild(tooltipBox);
  }

  const SAFE_MARGIN = 12;

  document.addEventListener("mouseover", (e) => {
    const el = e.target.closest && e.target.closest(".pnd-tooltip");
    if (!el) return;

    const tooltipText = el.getAttribute("data-tooltip");
    if (!tooltipText) return;
    
    tooltipBox.innerHTML = tooltipText;
    tooltipBox.style.opacity = "1";
    tooltipBox.style.pointerEvents = "auto";

    const rect = el.getBoundingClientRect();

    tooltipBox.style.top = "0px";
    tooltipBox.style.left = "0px";

    const tooltipRect = tooltipBox.getBoundingClientRect();

    let top = rect.top - tooltipRect.height - 8;
    let left = rect.left + (rect.width - tooltipRect.width) / 2;

    tooltipBox.classList.remove("arrow-top", "arrow-bottom");
    tooltipBox.style.setProperty("--arrow-left", "50%");

    if (top < SAFE_MARGIN) {
      top = rect.bottom + 8;
      tooltipBox.classList.add("arrow-top");
    } else {
      tooltipBox.classList.add("arrow-bottom");
    }

    let arrowLeft = "50%";

    if (left < SAFE_MARGIN) {
      arrowLeft = `${((rect.left + rect.width / 2 - SAFE_MARGIN) / tooltipRect.width) * 100}%`;
      left = SAFE_MARGIN;
    } else if (left + tooltipRect.width > window.innerWidth - SAFE_MARGIN) {
      const overflowRight = left + tooltipRect.width - (window.innerWidth - SAFE_MARGIN);
      left -= overflowRight;
      arrowLeft = `${((rect.left + rect.width / 2 - left) / tooltipRect.width) * 100}%`;
    }

    tooltipBox.style.top = `${top}px`;
    tooltipBox.style.left = `${left}px`;
    tooltipBox.style.setProperty("--arrow-left", arrowLeft);
  });

  document.addEventListener("mouseout", (e) => {
    const el = e.target.closest && e.target.closest(".pnd-tooltip");
    if (!el) return;
    
    if (e.relatedTarget && el.contains(e.relatedTarget)) return;

    tooltipBox.style.opacity = "0";
    tooltipBox.style.pointerEvents = "none";
    tooltipBox.classList.remove("arrow-top", "arrow-bottom");
  });

  document.addEventListener("click", () => {
    tooltipBox.style.opacity = "0";
    tooltipBox.style.pointerEvents = "none";
    tooltipBox.classList.remove("arrow-top", "arrow-bottom");
  });
}
