import React from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { ChatMessageContent } from '../src/components/AiChatbot/ChatMessageContent';

describe('chat message rendering', () => {
  it('formats emphasis, inline code, headings and quotes without raw Markdown markers', () => {
    const html = renderToStaticMarkup(<ChatMessageContent text={'### Assessment\n\nKeep **useful work** and `config.ts`.\n\n> Review the source first.'} />);
    expect(html).toContain('<h3>Assessment</h3>');
    expect(html).toContain('<strong>useful work</strong>');
    expect(html).toContain('<code>config.ts</code>');
    expect(html).toContain('<blockquote>Review the source first.</blockquote>');
    expect(html).not.toContain('**');
  });

  it('keeps numbered steps and their continuation lines in an accessible list', () => {
    const html = renderToStaticMarkup(<ChatMessageContent text={'1. **Establish a baseline**\r\n   Run locally.\r\n2. **Verify**\r\n   Test the flow.'} />);
    expect(html).toContain('<ol>');
    expect(html.match(/<li>/g)).toHaveLength(2);
    expect(html).toContain('Run locally.');
    expect(html).toContain('Test the flow.');
  });

  it('escapes project-provided HTML instead of executing it', () => {
    const html = renderToStaticMarkup(<ChatMessageContent text={'**<img src=x onerror=alert(1)>**\n\n<script>alert(1)</script>'} />);
    expect(html).not.toContain('<img');
    expect(html).not.toContain('<script');
    expect(html).toContain('&lt;img');
    expect(html).toContain('&lt;script&gt;');
  });
});
