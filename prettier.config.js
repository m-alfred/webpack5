/* eslint-disable max-len */
// 规范项目代码书写
module.exports = {
  // 使用单引号
  singleQuote: true,
  // 结尾分号
  semi: true,
  // Specify the number of spaces per indentation-level.
  tabWidth: 2,
  // Print trailing commas wherever possible when multi-line. (A single-line array, for example, never gets trailing commas.)
  trailingComma: 'all',
  // Specify the line length that the printer will wrap on.
  // printWidth: 100,
  // Use single quotes instead of double quotes in JSX.
  jsxSingleQuote: true,
  // Print spaces between brackets in object literals.
  bracketSpacing: true,
  // Include parentheses around a sole arrow function parameter.
  /**
   * Valid options:
      "avoid" - Omit parens when possible. Example: x => x
      "always" - Always include parens. Example: (x) => x
   */
  arrowParens: 'avoid',
  // Format only a segment of a file.
  rangeStart: 0,
  rangeEnd: Infinity,
  // Prettier can restrict itself to only format files that contain a special comment, called a pragma, at the top of the file. This is very useful when gradually transitioning large, unformatted codebases to prettier.
  requirePragma: false,
  // Prettier can insert a special @format marker at the top of files specifying that the file has been formatted with prettier. This works well when used in tandem with the --require-pragma option. If there is already a docblock at the top of the file then this option will add a newline to it with the @format marker.
  insertPragma: false,
  proseWrap: 'never',
  // Specify the global whitespace sensitivity for HTML files
  htmlWhitespaceSensitivity: 'css',
  // For historical reasons, there exist two commonly used flavors of line endings in text files. That is \n (or LF for Line Feed) and \r\n (or CRLF for Carriage Return + Line Feed).
  endOfLine: 'auto',
};
