import React from "react";
import { Link } from "react-router-dom";

interface MarkdownLiteProps {
  message: string;
}

const MarkdownLite = ({ message }: MarkdownLiteProps) => {
  const linkRegex = /\[(.+?)\]\((.+?)\)/g;
  const parts = [];
  let lastIndex = 0;
  let match;
  linkRegex.lastIndex = 0;

  while ((match = linkRegex.exec(message)) !== null) {
    const [fullMatch, linkText, linkUrl] = match;
    const matchStart = match.index;
    const matchEnd = matchStart + fullMatch.length;

    if (lastIndex < matchStart) {
      parts.push(message.slice(lastIndex, matchStart));
    }
    parts.push(
      <Link
        to={linkUrl}
        target="_blank"
        rel="noopener noreferrer"
        key={linkUrl}
        className="break-words underline underline-offset-2 text-blue-500"
      >
        {linkText}
      </Link>,
    );
    lastIndex = matchEnd;
  }
  if (lastIndex < message?.length) {
    parts.push(message.slice(lastIndex));
  }

  return (
    <>
      {parts.map((part, index) => (
        <React.Fragment key={index}>{part}</React.Fragment>
      ))}
    </>
  );
};

export default MarkdownLite;
