(function () {
  function initializeServiceCheckboxes(form) {
    form
      .querySelectorAll(
        ".all-service-wrapper .wpcf7-list-item, .services-grid-group .wpcf7-list-item",
      )
      .forEach(function (item) {
        if (item.querySelector("label")) {
          return;
        }

        const checkbox = item.querySelector("input[type='checkbox']");
        if (!checkbox) {
          return;
        }

        const label = document.createElement("label");
        while (item.firstChild) {
          label.appendChild(item.firstChild);
        }
        item.appendChild(label);
      });

    const allServicesCheckbox = form.querySelector(
      ".all-services-check input[type='checkbox']",
    );
    const subServiceCheckboxes = Array.from(
      form.querySelectorAll(
        ".services-grid-group input[type='checkbox']",
      ),
    );

    if (!allServicesCheckbox && subServiceCheckboxes.length === 0) {
      return;
    }

    const serviceCheckboxes = [allServicesCheckbox, ...subServiceCheckboxes].filter(
      Boolean,
    );
    const servicesGroup = form.querySelector(".services-grid-group");
    let validationMessage = form.querySelector(".services-validation-message");

    if (servicesGroup && !validationMessage) {
      validationMessage = document.createElement("p");
      validationMessage.className = "services-validation-message";
      validationMessage.setAttribute("role", "alert");
      validationMessage.textContent = "Please select at least one service.";
      validationMessage.hidden = true;
      servicesGroup.insertAdjacentElement("afterend", validationMessage);
    }

    function updateBoxStates() {
      serviceCheckboxes.forEach(function (checkbox) {
        const label = checkbox.closest("label");
        if (label) {
          label.classList.toggle("is-checked", checkbox.checked);
        }
      });
    }

    form.addEventListener("change", function (event) {
      const checkbox = event.target;

      if (checkbox === allServicesCheckbox) {
        subServiceCheckboxes.forEach(function (subServiceCheckbox) {
          subServiceCheckbox.checked = allServicesCheckbox.checked;
        });
      } else if (
        subServiceCheckboxes.includes(checkbox) &&
        allServicesCheckbox
      ) {
        allServicesCheckbox.checked =
          subServiceCheckboxes.length > 0 &&
          subServiceCheckboxes.every(function (subServiceCheckbox) {
            return subServiceCheckbox.checked;
          });
      }

      updateBoxStates();

      if (
        serviceCheckboxes.includes(checkbox) &&
        serviceCheckboxes.some(function (serviceCheckbox) {
          return serviceCheckbox.checked;
        }) &&
        validationMessage
      ) {
        validationMessage.hidden = true;
      }
    });

    form.addEventListener(
      "submit",
      function (event) {
        const hasSelection = serviceCheckboxes.some(function (checkbox) {
          return checkbox.checked;
        });

        if (hasSelection) {
          return;
        }

        event.preventDefault();
        event.stopImmediatePropagation();

        if (validationMessage) {
          validationMessage.hidden = false;
        }

        serviceCheckboxes[0].focus();
      },
      true,
    );

    updateBoxStates();
  }

  function initializeForms() {
    document
      .querySelectorAll(".bioscope-contact-form")
      .forEach(initializeServiceCheckboxes);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initializeForms, {
      once: true,
    });
  } else {
    initializeForms();
  }
})();
