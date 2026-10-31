import katex from "katex";
export default function Tex({ t, block = false }: { t: string; block?: boolean }) {
  const html = katex.renderToString(t, { displayMode: block, throwOnError: false, strict: false });
  return <span className={block ? "block overflow-x-auto py-1" : ""} dangerouslySetInnerHTML={{ __html: html }} />;
}
