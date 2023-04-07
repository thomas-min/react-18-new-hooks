import { ReactNode, memo, useState, useTransition } from "react";

// useTransition and startTransition let you mark some state updates as not urgent.
// Other state updates are considered urgent by default.
// React will allow urgent state updates (for example, updating a text input) to interrupt non-urgent state updates (for example, rendering a list of search results).

export default function TabContainer() {
  const [tab, setTab] = useState<"about" | "posts" | "contact">("about");

  return (
    <>
      <TabButton isActive={tab === "about"} onClick={() => setTab("about")}>
        About
      </TabButton>
      <TabButton isActive={tab === "posts"} onClick={() => setTab("posts")}>
        Posts (slow)
      </TabButton>
      <TabButton isActive={tab === "contact"} onClick={() => setTab("contact")}>
        Contact
      </TabButton>
      <hr />
      {tab === "about" && <AboutTab />}
      {tab === "posts" && <PostsTab />}
      {tab === "contact" && <ContactTab />}
    </>
  );
}

export function TabButton({
  children,
  isActive,
  onClick,
}: {
  children: ReactNode;
  isActive: boolean;
  onClick: () => void;
}) {
  const [isPending, startTransition] = useTransition();
  if (isActive) {
    return <b>{children}</b>;
  }
  if (isPending) {
    return <b style={{ color: "yellow" }}>{children}</b>;
  }
  return (
    <button
      onClick={() => {
        startTransition(() => {
          onClick();
        });
      }}
    >
      {children}
    </button>
  );
}

export function AboutTab() {
  return <p>Welcome to my profile!</p>;
}

const PostsTab = memo(function PostsTab() {
  // Log once. The actual slowdown is inside SlowPost.
  console.log("[ARTIFICIALLY SLOW] Rendering 500 <SlowPost />");

  let items = [];
  for (let i = 0; i < 500; i++) {
    items.push(<SlowPost key={i} index={i} />);
  }
  return <ul className="items">{items}</ul>;
});

function SlowPost({ index }: { index: number }) {
  let startTime = performance.now();
  while (performance.now() - startTime < 1) {
    // Do nothing for 1 ms per item to emulate extremely slow code
  }

  return <li className="item">Post #{index + 1}</li>;
}

export function ContactTab() {
  return (
    <>
      <p>You can find me online here:</p>
      <ul>
        <li>admin@mysite.com</li>
        <li>+123456789</li>
      </ul>
    </>
  );
}
