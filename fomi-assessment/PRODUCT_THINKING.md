# Product Thinking Document — "Studio" (Image Generation Workspace Redesign)

## 1. What problem were you trying to solve? What type of user did you design for?

Every AI image tool I looked at (Krea, Higgsfield, OpenArt, Magnific) treats generation as a
**single flat action**: type a prompt, get a grid of results, pick one, maybe edit it, repeat.
That model works for someone making one image. It breaks down for a professional who is
**iterating on the same piece for hours** — relighting a shot, swapping wardrobe, trying three
crops — because every tweak either overwrites the last result or gets buried in an
undifferentiated history strip with no relationship between versions.

I designed for the person the brief explicitly asks for: a professional creator who has already
signed in, is returning to an existing project, and spends several hours a day inside the tool.
For that person, the unit of work isn't "a generation," it's "a project with a history of
decisions." The core problem I solved for is: **how do you let someone branch, compare, and
recover past states of one piece of work without losing the thread** — the same problem Figma
solved for design and git solved for code, applied to AI generation.

## 2. What are the three most important UX decisions you made? Why?

**a) A version tree instead of a flat history grid.**
Every reference product shows history as a horizontal strip of thumbnails with no structure. I
replaced it with a branching tree (`v1 → v2 → v3`) so a creator can see *what changed* between
versions and jump back without losing the current state. This mirrors how creative work actually
progresses — not linearly, but by trying a direction, keeping it or abandoning it, and branching
again.

**b) A persistent AI co-pilot rail instead of a one-shot prompt box.**
In the reference products, the prompt box is the *only* way to talk to the model, and it starts
from zero every time. I moved AI interaction to a standing conversation on the right rail that
already has context on the active layer and proactively flags problems (e.g., a clipped crop)
instead of waiting to be asked. For someone spending hours in the tool, a co-pilot that
accumulates context over a session is more valuable than a stateless prompt field.

**c) The canvas is full-bleed and the chrome recedes.**
Toolbars, layer lists, and the co-pilot are collapsible and low-contrast against a near-black
background so the generated image — the actual product of the work — is always the visually
dominant element. The floating tool dock only appears at the bottom, near where the eye and hand
already are, rather than living permanently in a sidebar. This follows directly from the brief's
own principle: "the workspace is the hero, not the homepage."

## 3. Which features did you intentionally leave out? Why?

- **A social/community feed.** Fomi's brief explicitly says design for professionals, not
  beginners, and for a returning user mid-project — not a marketing surface. A feed pulls
  attention away from the work.
- **Model picker as a primary control.** Reference tools surface 5–10 model names up front. I
  treat the model as an advanced/secondary setting because a professional mid-project cares
  about the *result* (relight, extend, upscale) more than which checkpoint produced it. Model
  choice still exists, just demoted.
- **Prompt-only editing.** I didn't build a large freeform "describe your entire edit in one
  paragraph" box for every action. Direct manipulation tools (Inpaint, Relight, Extend) are
  faster for the 80% case; the co-pilot is reserved for judgment calls and multi-step requests.
- **Real-time multiplayer cursors.** Valuable eventually, but out of scope for a first version —
  it adds real engineering complexity without being core to the individual-creator problem this
  redesign targets.

## 4. Which existing products inspired your thinking? What did you like? What would you improve?

- **Figma** — the layer panel and the idea that a file has structure, not just a stack of
  exports. I borrowed the "canvas as hero, panels recede" layout directly.
- **Cursor** — the always-present, context-aware chat rail that acts on the file rather than
  requiring you to paste context in every time. I'd improve Cursor's equivalent by making
  suggestions more proactive (as I did here) rather than purely reactive to a typed question.
- **Krea / Higgsfield** — clean, fast prompt-to-result loops and confident use of a dark canvas.
  What I'd improve: their history is still a flat strip with no relationship between generations,
  and the AI chat (where present) doesn't carry project context between actions.

## 5. If you had another month, what would you improve?

- Make the version tree actually diff-able — hovering an edge shows *what* changed (a heatmap of
  the pixels touched), not just a thumbnail.
- Multiplayer presence and comments on specific canvas regions, for agency/team use.
- A real "co-pilot memory" that learns a project's visual language (lighting, wardrobe, framing
  conventions already established) and applies it by default to new branches.
- Keyboard-first navigation for every tool in the dock, with a command palette (`⌘K`).

## 6. What single feature or workflow differentiates this workspace from existing AI creative platforms?

**The version tree paired with a context-aware co-pilot that always knows which branch it's
talking about.** Competitors treat "undo history" and "chat with the AI" as two unrelated
features bolted onto a generation grid. Here they're the same system: every co-pilot action
creates a new branch instead of overwriting the current one, so experimentation is free and
recoverable — which is the actual behavior a professional iterating for hours a day needs, and
the thing I'd want if I were the one at the keyboard for eight hours.
