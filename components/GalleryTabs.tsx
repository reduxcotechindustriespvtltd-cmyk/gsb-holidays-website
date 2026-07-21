"use client";

import { useState } from "react";
import { Video } from "lucide-react";
import Gallery from "./Gallery";
import VideoEmbed from "./VideoEmbed";

type Tab = "images" | "videos";

export default function GalleryTabs({
  images,
  videos,
}: {
  images: string[];
  videos: string[];
}) {
  const [tab, setTab] = useState<Tab>("images");

  return (
    <div>
      <div className="mx-auto flex w-fit gap-2 rounded-full border border-brand-900/15 bg-white/70 p-1">
        {(
          [
            { key: "images", label: "Images" },
            { key: "videos", label: "Videos" },
          ] as const
        ).map((t) => (
          <button
            key={t.key}
            type="button"
            onClick={() => setTab(t.key)}
            className={`rounded-full px-6 py-2 text-sm font-semibold transition ${
              tab === t.key
                ? "bg-brand-950 text-white"
                : "text-brand-900/70 hover:text-brand-950"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      {tab === "images" ? (
        <Gallery images={images} showHeading={false} showCta={false} />
      ) : (
        <section className="relative mx-auto max-w-6xl px-6 py-14 sm:py-20 lg:py-24">
          {videos.length === 0 ? (
            <div className="mx-auto flex max-w-md flex-col items-center gap-3 py-10 sm:py-16 text-center">
              <Video className="h-8 w-8 text-brand-900/40" />
              <p className="text-sm text-brand-900/60">
                Videos are coming soon — check back for a look around GSB Holidays.
              </p>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2">
              {videos.map((url) => (
                <VideoEmbed key={url} url={url} />
              ))}
            </div>
          )}
        </section>
      )}
    </div>
  );
}
