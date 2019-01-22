import React from 'react';
export default function viewerHeader({ children, i }) {
  return <li data-i={i}>{children}</li>;
}
