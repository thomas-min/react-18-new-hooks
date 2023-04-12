import { Html, Head, Main, NextScript } from "next/document";
import Link from "next/link";

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body>
        <nav className="navbar bg-base-200">
          <Link className="btn btn-ghost normal-case text-xl" href="/">
            home
          </Link>
        </nav>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
