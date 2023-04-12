import Link from "next/link";

export default function Home() {
  return (
    <div className="p-4">
      <div>
        <Link
          className="btn btn-link normal-case text-xl"
          href={"automaticBatching"}
        >
          Automatic Batching
        </Link>
      </div>
      <div>
        <Link className="btn btn-link normal-case text-xl" href={"useId"}>
          useId
        </Link>
        <Link
          className="btn btn-link normal-case text-xl"
          href={"useExternalStore"}
        >
          useExternalStore
        </Link>
      </div>
      <div>
        <Link
          className="btn btn-link normal-case text-xl"
          href={"useDeferredValue"}
        >
          useDeferredValue
        </Link>
        <Link
          className="btn btn-link normal-case text-xl"
          href={"useTransition"}
        >
          useTransition
        </Link>
      </div>
    </div>
  );
}
