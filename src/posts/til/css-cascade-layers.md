---
title: CSS cascade layers let you control specificity intentionally
date: 2026-03-29
tags:
  - til
  - css
---

Lorem ipsum dolor sit amet, consectetur adipiscing elit. `@layer` declarations let you define a priority order for groups of styles, independent of selector specificity.

```css
@layer reset, tokens, base, components, utilities;
```

Styles in later layers win over earlier ones regardless of specificity.
