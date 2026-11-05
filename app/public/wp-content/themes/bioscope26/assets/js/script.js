document.addEventListener("DOMContentLoaded", function () {
  var selectField = document.querySelector('select[name="client-role"]');
  var otherWrap = document.querySelector(".other-role-wrap");

  if (selectField && otherWrap) {
    function toggleOtherField() {
      if (selectField.value === "Other") {
        otherWrap.style.display = "block";
      } else {
        otherWrap.style.display = "none";
      }
    }

    toggleOtherField();

    selectField.addEventListener("change", toggleOtherField);
  }
});
