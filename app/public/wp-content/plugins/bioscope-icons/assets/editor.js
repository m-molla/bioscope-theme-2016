(function (wp) {
  const { registerBlockType } = wp.blocks;
  const { createElement: el, useEffect, useMemo, useState } = wp.element;
  const { InspectorControls, useBlockProps } = wp.blockEditor;
  const {
    PanelBody,
    TextControl,
    RangeControl,
    SelectControl,
    ColorPalette,
    Button,
    Notice,
  } = wp.components;
  const { __ } = wp.i18n;
  const { useSelect } = wp.data;

  function glyph(unicode) {
    try {
      return String.fromCodePoint(parseInt(unicode || "f005", 16));
    } catch (e) {
      return "★";
    }
  }

  registerBlockType("bioscope/icon", {
    edit: function (props) {
      const a = props.attributes;
      const set = props.setAttributes;
      const [icons, setIcons] = useState([]);
      const [search, setSearch] = useState("");
      const [loading, setLoading] = useState(true);
      // Prefer the theme.json palette over any generic/default color list.
      // WordPress versions expose it through slightly different settings shapes.
      const themeColors = useSelect(function (select) {
        const editor = select("core/block-editor");
        const settings =
          editor && editor.getSettings ? editor.getSettings() || {} : {};
        const features =
          settings.__experimentalFeatures || settings.features || {};
        const colorSettings = features.color || settings.color || {};
        const palette = colorSettings.palette;

        if (Array.isArray(palette)) return palette;
        if (palette && Array.isArray(palette.theme)) return palette.theme;
        if (palette && Array.isArray(palette.custom)) return palette.custom;
        if (Array.isArray(settings.colors)) return settings.colors;
        return [];
      }, []);
      useEffect(function () {
        let active = true;
        fetch(
          (window.BioscopeIconsData && window.BioscopeIconsData.iconsUrl) || "",
        )
          .then(function (r) {
            if (!r.ok) throw new Error("Icon list unavailable");
            return r.json();
          })
          .then(function (data) {
            if (active) {
              setIcons(data);
              setLoading(false);
            }
          })
          .catch(function () {
            if (active) setLoading(false);
          });
        return function () {
          active = false;
        };
      }, []);

      const filtered = useMemo(
        function () {
          const q = search.trim().toLowerCase();
          return icons
            .filter(function (icon) {
              return (
                icon.styles.indexOf(a.iconStyle) !== -1 &&
                (!q ||
                  icon.name.includes(q) ||
                  icon.label.toLowerCase().includes(q) ||
                  (icon.search || []).some(function (term) {
                    return term.toLowerCase().includes(q);
                  }))
              );
            })
            .slice(0, 100);
        },
        [icons, search, a.iconStyle],
      );

      const icon = icons.find(function (item) {
        return (
          item.name === a.iconName && item.styles.indexOf(a.iconStyle) !== -1
        );
      });
      const currentUnicode = icon ? icon.unicode : a.unicode;
      const hasFixedDimensions = a.width > 0 || a.height > 0;
      const previewStyle = {
        fontSize: a.size + "px",
        color: a.color || undefined,
        backgroundColor: a.backgroundColor || undefined,
        padding: a.padding + "px",
        width: a.width > 0 ? a.width + "px" : undefined,
        height: a.height > 0 ? a.height + "px" : undefined,
        boxSizing: hasFixedDimensions ? "border-box" : undefined,
      };
      const wrapperStyle = {
        display: "flex",
        alignItems: "center",
        justifyContent:
          a.align === "center"
            ? "center"
            : a.align === "right"
              ? "flex-end"
              : "flex-start",
        minHeight: "auto",
        width: "auto",
      };
      const blockProps = useBlockProps({
        className:
          "bioscope-icon-block bioscope-icon-" +
          a.iconStyle +
          " bioscope-icon-shape-" +
          a.shape,
        style: wrapperStyle,
      });

      function choose(item) {
        set({ iconName: item.name, unicode: item.unicode });
      }
      return el(
        wp.element.Fragment,
        {},
        el(
          InspectorControls,
          {},
          el(
            PanelBody,
            { title: __("Choose icon", "bioscope-icons"), initialOpen: true },
            el(SelectControl, {
              label: __("Icon family", "bioscope-icons"),
              value: a.iconStyle,
              options: [
                { label: "Solid", value: "solid" },
                { label: "Regular", value: "regular" },
                { label: "Brands", value: "brands" },
              ],
              onChange: function (value) {
                set({ iconStyle: value });
              },
            }),
            el(
              "div",
              { className: "bioscope-icons-picker" },
              el(TextControl, {
                label: __("Search icons", "bioscope-icons"),
                value: search,
                onChange: setSearch,
                placeholder: "e.g. house, arrow, facebook",
              }),
              loading
                ? el("p", {}, __("Loading icons…", "bioscope-icons"))
                : el(
                    "div",
                    { className: "bioscope-icons-grid" },
                    filtered.map(function (item) {
                      return el(
                        Button,
                        {
                          key: item.name,
                          className:
                            "bioscope-icon-picker-button " +
                            (item.name === a.iconName ? "is-selected" : ""),
                          isPressed: item.name === a.iconName,
                          label: item.label,
                          title: item.label + " (" + item.name + ")",
                          onClick: function () {
                            choose(item);
                          },
                        },
                        el(
                          "span",
                          {
                            className:
                              "bioscope-icon-glyph bioscope-icon-" +
                              a.iconStyle,
                            "aria-hidden": "true",
                          },
                          glyph(item.unicode),
                        ),
                      );
                    }),
                  ),
              !loading && filtered.length === 0
                ? el(
                    "p",
                    { className: "bioscope-icons-hint" },
                    __("No icons found. Try another search.", "bioscope-icons"),
                  )
                : null,
              !loading && filtered.length >= 100
                ? el(
                    "p",
                    { className: "bioscope-icons-hint" },
                    __(
                      "Showing first 100 matches. Refine your search to find more.",
                      "bioscope-icons",
                    ),
                  )
                : null,
            ),
          ),
          el(
            PanelBody,
            { title: __("Icon styling", "bioscope-icons"), initialOpen: true },
            el(RangeControl, {
              label: __("Icon size (px)", "bioscope-icons"),
              value: a.size,
              min: 8,
              max: 240,
              onChange: function (v) {
                set({ size: v });
              },
            }),
            el(RangeControl, {
              label: __("Fixed width (px)", "bioscope-icons"),
              help: __("Set to 0 for automatic width.", "bioscope-icons"),
              value: a.width,
              min: 0,
              max: 500,
              onChange: function (v) {
                set({ width: v });
              },
            }),
            el(RangeControl, {
              label: __("Fixed height (px)", "bioscope-icons"),
              help: __("Set to 0 for automatic height.", "bioscope-icons"),
              value: a.height,
              min: 0,
              max: 500,
              onChange: function (v) {
                set({ height: v });
              },
            }),
            el(
              "p",
              { className: "components-base-control__label" },
              __("Icon color", "bioscope-icons"),
            ),
            el(ColorPalette, {
              colors: themeColors,
              value: a.color || undefined,
              clearable: true,
              onChange: function (v) {
                set({ color: v || "" });
              },
            }),
            el(
              "p",
              {
                className: "components-base-control__label",
                style: { marginTop: "16px" },
              },
              __("Background color", "bioscope-icons"),
            ),
            el(ColorPalette, {
              colors: themeColors,
              value: a.backgroundColor || undefined,
              clearable: true,
              onChange: function (v) {
                set({ backgroundColor: v || "" });
              },
            }),
            el(RangeControl, {
              label: __("Background padding (px)", "bioscope-icons"),
              value: a.padding,
              min: 0,
              max: 80,
              onChange: function (v) {
                set({ padding: v });
              },
            }),
            el(SelectControl, {
              label: __("Background shape", "bioscope-icons"),
              value: a.shape,
              options: [
                { label: "None", value: "none" },
                { label: "Square", value: "square" },
                { label: "Rounded", value: "rounded" },
                { label: "Circle", value: "circle" },
              ],
              onChange: function (v) {
                set({ shape: v });
              },
            }),
            el(SelectControl, {
              label: __("Alignment", "bioscope-icons"),
              value: a.align,
              options: [
                { label: "Left", value: "left" },
                { label: "Center", value: "center" },
                { label: "Right", value: "right" },
              ],
              onChange: function (v) {
                set({ align: v });
              },
            }),
            el(TextControl, {
              label: __("Accessible label (optional)", "bioscope-icons"),
              help: __(
                "Leave blank for a decorative icon. Add a short label if the icon conveys meaning.",
                "bioscope-icons",
              ),
              value: a.label,
              onChange: function (v) {
                set({ label: v });
              },
            }),
          ),
        ),
        el(
          "div",
          blockProps,
          el(
            "span",
            {
              className: "bioscope-icon-glyph",
              style: previewStyle,
              title: a.label || a.iconName,
              "aria-hidden": a.label ? undefined : "true",
            },
            glyph(currentUnicode),
          ),
        ),
      );
    },
    save: function () {
      return null;
    },
  });
})(window.wp);
