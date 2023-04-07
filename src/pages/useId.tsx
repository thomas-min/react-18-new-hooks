import { useId } from "react";

// useId is a new hook for generating unique IDs on both the client and server, while avoiding hydration mismatches.
// It is primarily useful for component libraries integrating with accessibility APIs that require unique IDs.

export default function Form() {
  const id = useId();

  return (
    <form>
      <label htmlFor={id + "-firstName"}>First Name:</label>
      <input id={id + "-firstName"} type="text" />
      <hr />
      <label htmlFor={id + "-lastName"}>Last Name:</label>
      <input id={id + "-lastName"} type="text" />
    </form>
  );
}
