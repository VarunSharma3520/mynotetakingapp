declare module "tinykeys" {
  type KeyBindingHandler = (event: KeyboardEvent) => void;
  type KeyBindings = Record<string, KeyBindingHandler>;

  export default function tinykeys(
    target: Window | HTMLElement,
    keyBindings: KeyBindings
  ): () => void;
}
