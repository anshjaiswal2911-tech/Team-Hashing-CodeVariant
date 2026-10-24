import { Fragment } from 'react';

// Render a small, deliberate Markdown subset as React text nodes. No raw HTML.
function inline(text: string) {
  return text.split(/(\*\*[^*]+\*\*|`[^`]+`|\*[^*\n]+\*)/g).map((part, index) => {
    if (part.startsWith('**') && part.endsWith('**')) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith('`') && part.endsWith('`')) return <code key={index}>{part.slice(1, -1)}</code>;
    if (part.startsWith('*') && part.endsWith('*')) return <em key={index}>{part.slice(1, -1)}</em>;
    return <Fragment key={index}>{part}</Fragment>;
  });
}

export function ChatMessageContent({ text }: { text: string }) {
  const lines = text.replaceAll('\r\n', '\n').split('\n');
  const blocks = [];
  for (let index = 0; index < lines.length;) {
    const line = lines[index].trim();
    if (!line) { index++; continue; }
    const key = index;
    if (line.startsWith('### ')) {
      blocks.push(<h3 key={key}>{inline(line.slice(4))}</h3>); index++; continue;
    }
    if (line.startsWith('> ')) {
      const quote = [];
      while (index < lines.length && lines[index].trim().startsWith('> ')) quote.push(lines[index++].trim().slice(2));
      blocks.push(<blockquote key={key}>{inline(quote.join(' '))}</blockquote>); continue;
    }
    const ordered = /^\d+\. /.test(line);
    if (ordered || /^[-•] /.test(line)) {
      const items = [];
      const pattern = ordered ? /^\d+\. / : /^[-•] /;
      while (index < lines.length && pattern.test(lines[index].trim())) {
        let item = lines[index++].trim().replace(pattern, '');
        while (index < lines.length && /^\s+\S/.test(lines[index]) && !pattern.test(lines[index].trim())) item += ` ${lines[index++].trim()}`;
        items.push(<li key={index}>{inline(item)}</li>);
      }
      blocks.push(ordered ? <ol key={key}>{items}</ol> : <ul key={key}>{items}</ul>); continue;
    }
    const paragraph = [line]; index++;
    while (index < lines.length && lines[index].trim() && !/^(### |> |\d+\. |[-•] )/.test(lines[index].trim())) paragraph.push(lines[index++].trim());
    blocks.push(<p key={key}>{inline(paragraph.join(' '))}</p>);
  }
  return <>{blocks}</>;
}
