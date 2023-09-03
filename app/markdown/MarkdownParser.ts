export type Markdown = {
  title: string;
  description: string|null;
  tags: Tag[],
  image: string | null;
  date: Date | null;
  content: string|null;
  published: boolean;
}

export type Tag = {
  name: string;
}

enum StateKind {
  Init,
  Header,
  Content,
}

type State = {
  state: StateKind;
  markdown: Markdown;
}

const reducer = (state: State, line: string, index: number) => {
  if (state.state === StateKind.Init) {
    if (index === 0 && line === '---') {
      return { ...state, state: StateKind.Header };
    } else {
      return {
	state: StateKind.Content,
	markdown: {
	  ...state.markdown,
	  content: state.markdown.content === null
	    ? line
	    : state.markdown.content.concat(line)
	}
      }
    }
  } else if (state.state === StateKind.Header) {
    if (line === '---') {
      return { ...state, state: StateKind.Content };
    } else if (line.length > 1) {
      const [ key, ...valueSplitted ] = line.split(':');
      const value = valueSplitted.join(':').trim();
      if (key === 'title') {
	return { ...state, markdown: { ...state.markdown, title: value}};
      } else if (key === 'description') {
	return { ...state, markdown: { ...state.markdown, description: value}};
      } else if (key === 'image') {
	return { ...state, markdown: { ...state.markdown, image: value.length > 0 ? value : null }};
      } else if (key === 'tags') {
	return { ...state, markdown: { ...state.markdown, tags: value.split(',').map((v) => ({ name: v.trim() })) }};
      } else if (key === 'date') {
	if (value.length === 0) {
	  return { ...state, markdown: { ...state.markdown, date: null }};
	} else {
	  return { ...state, markdown: { ...state.markdown, date: new Date(value) }};
	}
      } else if (key === 'published') {
	return { ...state, markdown: { ...state.markdown, published: value.toLowerCase() === 'true' }};
      } else {
	return state;
      }
    } else {
      return state;
    }
  } else {
    return {
      ...state,
      markdown: {
	...state.markdown,
	content: state.markdown.content === null
	  ? line
	  : state.markdown.content.concat(line)
      }
    };
  }
}

export const parseMarkdown = (text: string) => {
  const initialState: State = {
    state: StateKind.Init,
    markdown: {
      title: '',
      description: null,
      image: null,
      tags: [],
      date: null,
      content: null,
      published: false,
    }};
  const { markdown } = text
    .split(/(\r?\n)/)
    .reduce(reducer, initialState);
  return markdown;
}
