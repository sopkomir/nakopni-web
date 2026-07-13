export function getReadingTime(content: any[] = []) {
  let text = "";

  content.forEach((block) => {
    if (block._type === "block") {
      block.children?.forEach((child: any) => {
        text += child.text + " ";
      });
    }
  });

  const words = text.trim().split(/\s+/).length;

  return Math.max(1, Math.ceil(words / 200));
}