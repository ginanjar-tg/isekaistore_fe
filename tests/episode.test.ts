import { describe, expect, it } from "vitest";
import {
  episodeReducer,
  INITIAL_EPISODE_STATE,
} from "@/lib/episodeReducer";

describe("episodeReducer", () => {
  it("moves from the intro to the portal", () => {
    expect(episodeReducer(INITIAL_EPISODE_STATE, { type: "begin" }).scene).toBe(
      "portal",
    );
  });

  it("keeps the portal reaction visible until the visitor continues", () => {
    const chosen = episodeReducer(INITIAL_EPISODE_STATE, {
      type: "choosePortal",
      choice: "kick",
    });
    expect(chosen.portalChoice).toBe("kick");
    expect(chosen.scene).toBe("intro");

    const portal = { ...chosen, scene: "portal" as const };
    expect(episodeReducer(portal, { type: "continuePortal" }).scene).toBe(
      "counter",
    );
  });

  it("stores the dialogue path and advances after a choice", () => {
    const state = { ...INITIAL_EPISODE_STATE, scene: "counter" as const };
    const chosen = episodeReducer(state, {
      type: "chooseDialogue",
      path: "responsible",
    });
    expect(chosen.dialoguePath).toBe("responsible");
    expect(
      episodeReducer(chosen, { type: "continueCounter" }).scene,
    ).toBe("discovery");
  });

  it("records an inspected item once", () => {
    const once = episodeReducer(INITIAL_EPISODE_STATE, {
      type: "inspectItem",
      itemId: 4,
    });
    const twice = episodeReducer(once, { type: "inspectItem", itemId: 4 });
    expect(twice.inspectedItemIds).toEqual([4]);
  });

  it("requires a selected item before revealing a loadout", () => {
    const discovery = { ...INITIAL_EPISODE_STATE, scene: "discovery" as const };
    expect(episodeReducer(discovery, { type: "toReveal" }).scene).toBe(
      "discovery",
    );

    const selected = episodeReducer(discovery, {
      type: "selectItem",
      itemId: 2,
    });
    expect(episodeReducer(selected, { type: "toReveal" }).scene).toBe("reveal");
  });

  it("toggles audio and resets the entire episode", () => {
    const changed = episodeReducer(INITIAL_EPISODE_STATE, {
      type: "toggleAudio",
    });
    expect(changed.audioEnabled).toBe(false);
    expect(episodeReducer(changed, { type: "reset" })).toEqual(
      INITIAL_EPISODE_STATE,
    );
  });
});
