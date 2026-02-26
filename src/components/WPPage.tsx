import React from "react";

type WPPageProps = {
  html: string;
  title?: string;
  showTitle?: boolean;
  maxW?: string;
};

export default function WPPage({
  html,
  title,
  showTitle = !!title,
  maxW = "max-w-4xl",
}: WPPageProps) {
  return (
    <main className={`mx-auto ${maxW} px-4 sm:px-6 lg:px-8 py-10`}>
      {showTitle && title ? (
        <h1 className="text-3xl md:text-4xl font-semibold tracking-tight text-gray-900">
          {title}
        </h1>
      ) : null}
      <article
        className="prose prose-slate lg:prose-lg mt-6 max-w-none"
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </main>
  );
}