function getYouTubeEmbedUrl(url: URL): string | null {
  if (url.hostname === "youtu.be") {
    return `https://www.youtube.com/embed${url.pathname}`;
  }
  if (url.hostname.endsWith("youtube.com")) {
    if (url.pathname === "/watch") {
      const id = url.searchParams.get("v");
      return id ? `https://www.youtube.com/embed/${id}` : null;
    }
    if (url.pathname.startsWith("/embed/")) return url.toString();
    if (url.pathname.startsWith("/shorts/")) {
      return `https://www.youtube.com/embed/${url.pathname.replace("/shorts/", "")}`;
    }
  }
  return null;
}

function getVimeoEmbedUrl(url: URL): string | null {
  if (!url.hostname.endsWith("vimeo.com")) return null;
  if (url.hostname === "player.vimeo.com") return url.toString();
  const id = url.pathname.split("/").filter(Boolean)[0];
  return id ? `https://player.vimeo.com/video/${id}` : null;
}

function isDirectVideoFile(url: URL) {
  return /\.(mp4|webm|ogg|mov)$/i.test(url.pathname);
}

export default function VideoEmbed({ url }: { url: string }) {
  let parsed: URL;
  try {
    parsed = new URL(url);
  } catch {
    return null;
  }

  const youtubeEmbed = getYouTubeEmbedUrl(parsed);
  const vimeoEmbed = getVimeoEmbedUrl(parsed);
  const embedUrl = youtubeEmbed ?? vimeoEmbed;

  if (embedUrl) {
    return (
      <div className="relative aspect-video w-full overflow-hidden rounded-2xl">
        <iframe
          src={embedUrl}
          title="Package video"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    );
  }

  if (isDirectVideoFile(parsed)) {
    return (
      <video controls className="w-full rounded-2xl" preload="metadata">
        <source src={url} />
      </video>
    );
  }

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="text-brand-700 text-sm font-medium underline underline-offset-2"
    >
      Watch video
    </a>
  );
}
