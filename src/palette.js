// Color palette used throughout the site
export var PALETTE = {
  bg: "#0F1012",
  s1: "#16181B",
  s2: "#1D1F23",
  slate: "#29313E",
  steel: "#404A5A",
  border: "#505357",
  muted: "#9DA3AE",
  subMuted: "#6B7280",
  text: "#F1F2F4",
  copper: "#A95E4B",
  copperLight: "#C97A5E",
};

// Simple classnames helper
export function cx() {
  var classes = [];
  for (var i = 0; i < arguments.length; i++) {
    var arg = arguments[i];
    if (!arg) continue;
    if (typeof arg === "string") {
      classes.push(arg);
    } else if (Array.isArray(arg)) {
      for (var j = 0; j < arg.length; j++) {
        if (arg[j]) classes.push(arg[j]);
      }
    }
  }
  return classes.join(" ");
}
