(function () {
  let submenuId = 0;
  const submenuSelector = ".wp-block-navigation-item.bioscope-submenu";

  function initializeSubmenu(item) {
    if (item.dataset.bioscopeSubmenuReady === "true") {
      return;
    }

    const submenu = Array.from(item.children).find(function (child) {
      return child.matches(".wp-block-navigation__submenu-container");
    });

    if (!submenu) {
      return;
    }

    item.classList.toggle(
      "has-current-submenu",
      Boolean(submenu.querySelector('a[aria-current="page"]')),
    );

    const nativeToggle = item.querySelector(
      ":scope > .wp-block-navigation-submenu__toggle",
    );
    if (nativeToggle) {
      return;
    }

    const link = Array.from(item.children).find(function (child) {
      return child.matches(".wp-block-navigation-item__content[href]");
    });

    if (!link) {
      return;
    }

    const toggle = document.createElement("button");
    const label = link.textContent.trim();
    const href = link.getAttribute("href");
    const noDestination = !href || href.trim() === "#";
    toggle.type = "button";
    toggle.className = "bioscope-submenu-toggle";
    toggle.textContent = "+";
    toggle.setAttribute("aria-label", "Toggle " + label + " submenu");
    toggle.setAttribute("aria-expanded", "false");
    if (!submenu.id) {
      do {
        submenuId += 1;
        submenu.id = "bioscope-submenu-" + submenuId;
      } while (document.getElementById(submenu.id) !== submenu);
    }
    toggle.setAttribute("aria-controls", submenu.id);
    item.dataset.bioscopeSubmenuReady = "true";
    item.classList.add("bioscope-custom-submenu");
    item.insertBefore(toggle, submenu);

    function setExpanded(expanded) {
      item.classList.toggle("is-submenu-open", expanded);
      toggle.setAttribute("aria-expanded", expanded ? "true" : "false");
      toggle.textContent = expanded ? "−" : "+";
    }

    toggle.addEventListener("click", function (event) {
      event.preventDefault();
      event.stopPropagation();
      setExpanded(toggle.getAttribute("aria-expanded") !== "true");
    });

    if (noDestination) {
      link.addEventListener("click", function (event) {
        event.preventDefault();
        setExpanded(!item.classList.contains("is-submenu-open"));
      });
    }
  }

  function initializeSubmenus(root) {
    if (root.matches && root.matches(submenuSelector)) {
      initializeSubmenu(root);
    }

    if (root.querySelectorAll) {
      root.querySelectorAll(submenuSelector).forEach(initializeSubmenu);
    }
  }

  function start() {
    initializeSubmenus(document);

    document.addEventListener(
      "click",
      function (event) {
        const target = event.target;
        document
          .querySelectorAll(
            ".wp-block-navigation-item.bioscope-custom-submenu.is-submenu-open",
          )
          .forEach(function (item) {
            if (target instanceof Node && item.contains(target)) {
              return;
            }

            item.classList.remove("is-submenu-open");
            const toggle = item.querySelector(
              ":scope > .bioscope-submenu-toggle",
            );
            if (toggle) {
              toggle.setAttribute("aria-expanded", "false");
              toggle.textContent = "+";
            }
          });
      },
      true,
    );

    const observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) {
            initializeSubmenus(node);
          }
        });
      });
    });
    observer.observe(document.body, { childList: true, subtree: true });
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start, { once: true });
  } else {
    start();
  }
})();
