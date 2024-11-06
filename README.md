# chrome-monospace-repro

An attempt at creating a repro case for some spurious image diffs we're seeing
in Chrome on linux in Happo

## What we're seeing

We use Playwright to take screenshots in Chrome for Happo, a screenshot testing
service. We're seeing inconsistently produced screenshots for elements with
monospace text, when a previous element has been larger than the viewport

Given this html:
```html
<pre>Hello world</pre>
```
If we take a screenshot directly of this element, it looks like this:
![d11fcc1bfd92edcb41fa9009eb86f509.png](d11fcc1bfd92edcb41fa9009eb86f509.png)

If we first render an element that is taller than the viewport, then take a
screenshot of that, then render the first example again, we see a different
screenshot for the first example (font is different):
![a61a4d99837e8dbe60dc1811c3806977.png](a61a4d99837e8dbe60dc1811c3806977.png)

## How to run

```bash
npm install
node repro.js
```
The output from this command is a list of two filenames. If the filenames are
the same, we're all good. If you see different filenames, we've reproduced the
issue.

This is what I'm seeing when running locally:
```
⨠ node repro.js
d11fcc1bfd92edcb41fa9009eb86f509.png
a61a4d99837e8dbe60dc1811c3806977.png
```
