export function handleize(string) {
  string = string.toLowerCase();

  var toReplace = ['"', "'", "\\", "(", ")", "[", "]"];

  // For the old browsers
  for (var i = 0; i < toReplace.length; ++i) {
    string = string.replace(toReplace[i], "");
  }

  string = string.replace(/\W+/g, "-");

  if (string.charAt(string.length - 1) == "-") {
    string = string.replace(/-+\z/, "");
  }

  if (string.charAt(0) == "-") {
    string = string.replace(/\A-+/, "");
  }

  return string;
}
