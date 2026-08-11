import { useRouterState } from "@tanstack/react-router";
import { content, type Content, type Lang } from "./content";

/** Search param shared by every route: ?lang=en switches the site to English. */
export const validateLangSearch = (search: Record<string, unknown>) => ({
  lang: search["lang"] === "en" ? ("en" as const) : undefined,
});

export type LangSearch = { lang: "en" | undefined };

export function useLang(): {
  lang: Lang;
  t: Content;
  /** Pass to <Link search={...}> so the language survives navigation. */
  search: LangSearch;
  pathname: string;
} {
  const location = useRouterState({ select: (s) => s.location });
  const raw = (location.search as { lang?: string } | undefined)?.lang;
  const lang: Lang = raw === "en" ? "en" : "fr";

  return {
    lang,
    t: content[lang],
    search: { lang: lang === "en" ? ("en" as const) : undefined },
    pathname: location.pathname,
  };
}
