import { LoaderArgs, json, type LinksFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import { parse } from "cookie";
import { AppFooter } from "./components/layout/AppFooter";
import { AppHeader } from "./components/layout/AppHeader";
import { Theme } from "./components/theme/ThemeContext";
import { ThemeProvider } from "./components/theme/ThemeProvider";
import stylesheet from "./tailwind.css";
import moment from "moment-timezone";
import "moment/locale/ko";
moment.tz.setDefault('Asia/Seoul');

export const links: LinksFunction = () => [
  { rel: "preconnect", href: 'https://fonts.googleapis.com' },  
  { rel: "preconnect", href: 'https://fonts.gstatic.com' },
  { rel: "stylesheet", href: 'https://fonts.googleapis.com/css2?family=Inter:wght@400;700&family=Nanum+Gothic:wght@400;700&family=Source+Code+Pro:ital,wght@0,400;0,700;1,400;1,700&display=swap' },
  { rel: "stylesheet", href: 'https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200' },
  { rel: "stylesheet", href: stylesheet }
];

export const loader = async ({ request }: LoaderArgs) => {
  const cookies = parse(request.headers.get('Cookie') || '') || {}
  const userTheme: Theme = cookies['theme'] === 'dark' ? 'dark' : 'light';
  return json({userTheme: userTheme});
};

export default function App() {
  const { userTheme } = useLoaderData<typeof loader>();
  return (
    <ThemeProvider userTheme={userTheme}>
      <html lang="ko" className={`${userTheme} text-[16px] lg:text-[18px]`}>
        <head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width,initial-scale=1" />
          <Meta />
          <Links />
        </head>
        <body className="bg-white text-gray-900 dark:bg-neutral-900 dark:text-gray-200">
          <AppHeader />
          <Outlet />
          <AppFooter />
          <ScrollRestoration />
          <Scripts />
          <LiveReload />
        </body>
      </html>
    </ThemeProvider>
  );
}
