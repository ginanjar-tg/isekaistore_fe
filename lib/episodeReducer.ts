import type {
  DialoguePath,
  EpisodeState,
  PortalChoice,
  Scene,
} from "./episode";

export const INITIAL_EPISODE_STATE: EpisodeState = {
  scene: "intro",
  dialoguePath: null,
  portalChoice: null,
  selectedItemId: null,
  inspectedItemIds: [],
  audioEnabled: true,
};

export type EpisodeAction =
  | { type: "begin" }
  | { type: "choosePortal"; choice: PortalChoice }
  | { type: "continuePortal" }
  | { type: "chooseDialogue"; path: DialoguePath }
  | { type: "continueCounter" }
  | { type: "inspectItem"; itemId: number }
  | { type: "selectItem"; itemId: number }
  | { type: "toReveal" }
  | { type: "toDiscovery" }
  | { type: "toggleAudio" }
  | { type: "reset" };

const sceneIf = (condition: boolean, scene: Scene, current: Scene): Scene =>
  condition ? scene : current;

export function episodeReducer(
  state: EpisodeState,
  action: EpisodeAction,
): EpisodeState {
  switch (action.type) {
    case "begin":
      return { ...state, scene: "portal" };
    case "choosePortal":
      return { ...state, portalChoice: action.choice };
    case "continuePortal":
      return {
        ...state,
        scene: sceneIf(Boolean(state.portalChoice), "counter", state.scene),
      };
    case "chooseDialogue":
      return { ...state, dialoguePath: action.path };
    case "continueCounter":
      return {
        ...state,
        scene: sceneIf(Boolean(state.dialoguePath), "discovery", state.scene),
      };
    case "inspectItem":
      return state.inspectedItemIds.includes(action.itemId)
        ? state
        : {
            ...state,
            inspectedItemIds: [...state.inspectedItemIds, action.itemId],
          };
    case "selectItem":
      return { ...state, selectedItemId: action.itemId };
    case "toReveal":
      return {
        ...state,
        scene: sceneIf(Boolean(state.selectedItemId), "reveal", state.scene),
      };
    case "toDiscovery":
      return { ...state, scene: "discovery" };
    case "toggleAudio":
      return { ...state, audioEnabled: !state.audioEnabled };
    case "reset":
      return INITIAL_EPISODE_STATE;
  }
}
