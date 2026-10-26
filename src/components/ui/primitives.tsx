import Link from "next/link";
import type { ReactNode, MouseEventHandler } from "react";
export function ButtonLink({
  href,
  children,
  variant = "primary",
  onClick,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "secondary";
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) {
  return (
    <Link className={`button button--${variant}`} href={href} onClick={onClick}>
      {children}
      <span aria-hidden="true">↗</span>
    </Link>
  );
}
export function Card({
  title,
  children,
  number,
  media,
}: {
  title: string;
  children: ReactNode;
  number: string;
  media?: ReactNode;
}) {
  return (
    <article className="card">
      {media}
      <div className="card-content">
        <span className="card-number" aria-hidden="true">
          {number}
        </span>
        <h3>{title}</h3>
        <p>{children}</p>
      </div>
    </article>
  );
}
