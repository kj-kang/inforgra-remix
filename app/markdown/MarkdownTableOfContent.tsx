'use client'
import React from "react";
import { useMarkdownContext } from "./MarkdownContext";

const MarkdownTableOfContent = () => {

  const [activeId, setActiveId] = React.useState<string>('');

  const [headings, setHeadings] = React.useState<Record<string, IntersectionObserverEntry>>({});

  const { tableOfContent } = useMarkdownContext();

  const callback: IntersectionObserverCallback = (intersections: IntersectionObserverEntry[]) => {
    setHeadings(
      intersections.reduce((map, element) => {
        if (element.target.id.length > 0) {
          map[element.target.id] = element;
        }
        return map
      }, headings));

    const visibles: IntersectionObserverEntry[] = [];
    Object.keys(headings).forEach((key) => {
      if (headings[key].isIntersecting) {
        visibles.push(headings[key]);
      }
    })

    visibles.sort((x, y) => x.boundingClientRect.top < y.boundingClientRect.top ? 1 : 0);
    if (visibles.length > 0) {
      setActiveId(visibles[0].target.id);
    }
  }

  React.useEffect(() => {
    const observer = new IntersectionObserver(callback, { rootMargin: '-40px 0px 0px 0px' });
    const headings = Array.from(document.querySelectorAll('h2, h3'));
    headings.map((element) => observer.observe(element));
    return () => observer.disconnect();
  }, [])

  if (tableOfContent.length == 0) {
    return (<></>);
  }

  return (
    <nav className="pt-10 w-[240px]">
      <ul>
        <li key="toc-title" className="mb-2">
          <span className="text-gray-400 text-sm font-bold">
            ON THIS PAGE
          </span>
        </li>
        {
          tableOfContent.map((item, index) => (
            <React.Fragment key={`toc-wrapper-${index}`}>
              <li key={`toc-${index}`} className={`pl-2 border-l-2 ${activeId === item.hash ? 'border-blue-400' : 'border-gray-200'}`}>
                <a href={`#${item.hash}`} className={`text-sm ${activeId === item.hash ? 'text-blue-400 font-bold' : 'text-gray-900 dark:text-gray-200'}`} onClick={() => setActiveId(item.hash)}>
                  {item.text}
                </a>
              </li>
              {
                item.children.map((subItem, subIndex) => (
                  <li key={`toc-${index}-${subIndex}`} className={`pl-2 border-l-2 ${activeId === subItem.hash ? 'border-blue-400' : 'border-gray-200'}`}>
                    <a href={`#${subItem.hash}`} className={`text-sm ml-2 ${activeId === subItem.hash ? 'text-blue-400 font-bold' : 'text-gray-900 dark:text-gray-200'}`} onClick={() => setActiveId(subItem.hash)}>{subItem.text}</a>
                  </li>
                ))
              }
            </React.Fragment>
          ))
        }
      </ul>
    </nav>
  )
}

export default MarkdownTableOfContent;
