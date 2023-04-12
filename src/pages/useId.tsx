import { useId } from "react";

// useId is a new hook for generating unique IDs on both the client and server, while avoiding hydration mismatches.
// It is primarily useful for component libraries integrating with accessibility APIs that require unique IDs.

export default function Form() {
  const id = useId();

  return (
    <div className="p-4">
      <form className="form-control">
        <label className="label" htmlFor={id + "-firstName"}>
          First Name
        </label>
        <input
          className="input input-primary"
          id={id + "-firstName"}
          type="text"
        />
        <label className="label" htmlFor={id + "-lastName"}>
          Last Name
        </label>
        <input
          className="input input-secondary"
          id={id + "-lastName"}
          type="text"
        />
      </form>
    </div>
  );
}
