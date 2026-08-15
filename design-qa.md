# Header Design QA

**Comparison Target**

- Source visual truth: `https://ababnews.com/`, with captures at `/private/tmp/abab-header-desktop.png` and `/private/tmp/abab-header-mobile.png`.
- Implementation: `http://localhost:4173/zh-Hans`, with captures at `/private/tmp/magotalk-header-desktop.png` and `/private/tmp/magotalk-header-mobile-final.png`.
- Scope: the global header only. Page content below the header intentionally remains MagoTalk's existing product UI.
- State: light theme, homepage, header at the top of the page; menu, search, and scrolled sticky states were also tested.

**Viewport and Normalization**

- Desktop CSS viewport: `1440 x 900`, device pixel ratio `1`.
- Desktop source pixels: `1201 x 895`; implementation pixels: `1201 x 716`. The in-app browser surface clipped the available page height differently, so the focused header comparison used equal `1201 x 100` top crops. Width and header scale were matched.
- Mobile CSS viewport: `390 x 844`, device pixel ratio `1`.
- Mobile source pixels: `382 x 827`; implementation pixels: `382 x 827`. Captures were compared at equal pixel dimensions without resampling.

**Full-view Comparison Evidence**

- Desktop: both headers use the same two-tier composition, `118px` total height, centered brand, right-side utilities, centered category navigation, and a lightweight sticky surface.
- Mobile: both headers use a `98px` two-tier composition with menu control, centered brand, right-side utility controls, compact second-row navigation, and an active underline.
- MagoTalk's warm cream, orange, teal, and its existing wordmark are intentionally retained instead of copying ABAB's brand assets or palette.

**Focused Region Comparison Evidence**

- Focused desktop header crops: `/private/tmp/abab-header-desktop-focus.png` and `/private/tmp/magotalk-header-desktop-focus.png`.
- The focused comparison confirmed matching brand centering, two-row baseline, link density, active underline placement, utility alignment, translucent background, and low-elevation shadow.
- Mobile screenshots were already tightly framed enough for typography, spacing, icon alignment, and the active state to be read without an additional crop.

**Required Fidelity Surfaces**

- Fonts and typography: MagoTalk retains Geist and the supplied MagoTalk wordmark. Navigation size, weight, line height, and active hierarchy match the reference's compact treatment.
- Spacing and layout rhythm: desktop header height is `118px`; mobile header height is `98px`; the content container is capped at `1400px`; row heights, centered tracks, utility spacing, and underline offsets match the reference structure.
- Colors and visual tokens: the reference's translucent sticky treatment is retained while colors are mapped to MagoTalk's existing cream, orange, and teal brand tokens. Contrast remains sufficient in active and inactive states.
- Image quality and asset fidelity: the existing vector MagoTalk logo is rendered through `next/image`; no placeholder, CSS-drawn, or recreated brand asset is used.
- Copy and content: existing localized MagoTalk routes and labels are preserved. A localized main-navigation label was added for accessibility.

**Findings**

- No actionable P0, P1, or P2 mismatch remains within the requested header scope.

**Open Questions**

- None blocking. The homepage filter utility is intentionally hidden from the header so the mobile right edge matches the reference's search-only treatment.

**Interaction and Accessibility Checks**

- Mobile menu opens, closes from its close control and backdrop, closes on Escape, and prevents background scroll while open.
- Search opens in the correct position below the `98px` mobile header and receives input focus.
- Search and language controls remain functional; the filter control is intentionally hidden.
- Active links expose `aria-current="page"`; both navigation rows have localized accessible labels.
- Sticky position, `12px` backdrop blur, and stronger scrolled shadow were verified at runtime.
- Browser console contained no header errors. The only warning was an unrelated existing homepage LCP suggestion for an episode cover.

**Comparison History**

- Pass 1: the mobile filter and search glyphs read smaller than the reference utility icon. Fix: increased both to `18px` and removed reduced opacity.
- Pass 2: refreshed implementation evidence confirmed clear utility icons while preserving brand centering and the `98px` header height. No P0/P1/P2 issue remained.
- Pass 3: user requested removal of the visible filter icon. Fix: hid the filter control while preserving the search control and header alignment.
- Pass 4: user requested the search icon immediately after Contact. Fix: consolidated the responsive navigation into one semantic nav and mounted the search action directly after the final link on desktop and mobile.

**Implementation Checklist**

- [x] Two-tier sticky header
- [x] Responsive desktop/mobile layout
- [x] Centered MagoTalk wordmark
- [x] Active route underline
- [x] Scroll elevation state
- [x] Functional mobile menu
- [x] Functional search and locale controls
- [x] Header filter control hidden as requested
- [x] Search action positioned immediately after Contact
- [x] Localized navigation accessibility label
- [x] Desktop and mobile visual verification

**Follow-up Polish**

- No remaining header-specific polish item is required for this change.

final result: passed
