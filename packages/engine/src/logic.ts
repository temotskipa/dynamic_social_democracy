import type { GameState } from "@dsd/contracts";

export class LogicInterpreter {
  static interpolate(text: string, state: GameState): string {
    if (!text) {
      return "";
    }

    return text.replace(/\[\+(.*?)\+\]/g, (_, code) => {
      try {
        const func = new Function("state", `with(state.flags) { return ${code}; }`);
        return String(func(state));
      } catch {
        return "[ERROR]";
      }
    });
  }

  static parseConditionalText(text: string, state: GameState): string {
    if (!text) {
      return "";
    }

    return text.replace(/\[\?\s*if\s*(.*?)\s*:\s*(.*?)\s*\?\]/gs, (_, condition, content) => {
      try {
        let jsLogic = condition
          .replace(/\band\b/g, "&&")
          .replace(/\bor\b/g, "||")
          .replace(/\bnot\b/g, "!");

        jsLogic = jsLogic.replace(/([^!<>=])=([^=])/g, "$1==$2");

        const func = new Function("state", `with(state.flags) { return (${jsLogic}); }`);
        return func(state) ? this.parseConditionalText(content, state) : "";
      } catch {
        return "";
      }
    });
  }

  static processText(text: string, state: GameState): string {
    return this.interpolate(this.parseConditionalText(text, state), state);
  }
}
