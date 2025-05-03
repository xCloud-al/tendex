export const stripHtml = (html: string): string => {
  const tmp = document.createElement('DIV');
  tmp.innerHTML = html;
  const text = tmp.textContent || tmp.innerText || '';
  // Remove "Project Overview" or "Program Overview" from the beginning of the text
  return text.replace(/^(Project|Program) Overview\s*/i, '');
}; 