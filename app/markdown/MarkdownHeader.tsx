import { useMarkdownContext } from "./MarkdownContext";

export const MarkdownHeader = () => {
  const { header } = useMarkdownContext();
  return (
    <>
      <h1>{header.title}</h1>
      <span>{header.date}</span>
      <div>
	{
	  header.tags.map((tag, index) => (
	    <div key={index}>{tag}</div>
	  ))
	}
      </div>
    </>
  )
}
