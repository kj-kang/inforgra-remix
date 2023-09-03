export const escapeHtml = (text: string) => {
  return text
    .replaceAll('&amp;', '&')
    .replaceAll('&quot;', '"')
    .replaceAll('&lt;', '<')
    .replaceAll('&gt;', '>')
    .replaceAll('&#39;', '\'')
}


export const textToHash = (text: string) => {
  return text
    .toLowerCase()
    .replace(/<\?[^>]+(>|$)/g, '') // remove html
    .replace(/=&gt;|&lt;|<code>|<\/code>|&#39;/g, '')
    .replace(/[!@#$%^&*()=_+[\]{}`~;:'"|,.<>/?\s]+/g, '-')
    .replace(
      /([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2011-\u26FF]|\uD83E[\uDD10-\uDDFF])\uFE0F?/g,
      '',
    )
    .replace(/-+/g, '')
    .replace(/^-|-$/g, '')
}
