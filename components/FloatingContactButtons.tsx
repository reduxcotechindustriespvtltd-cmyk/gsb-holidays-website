import Image from "next/image";
import { Phone } from "lucide-react";
import { SITE } from "@/lib/data";

const WHATSAPP_URL =
  "https://wa.me/918452989850?text=Can%20you%20help%20me%20choose%20the%20right%20package%3F";

export default function FloatingContactButtons() {
  const telHref = `tel:${SITE.phone.replace(/\s+/g, "")}`;

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-center gap-3">
      <a
        href={telHref}
        aria-label={`Call us at ${SITE.phone}`}
        className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-950 text-white shadow-lg shadow-black/20 transition hover:scale-105 hover:bg-brand-800"
      >
        <Phone className="h-5 w-5" />
      </a>
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/20 transition hover:scale-105"
      >
        <Image src="/whatsapp-icon.png" alt="" width={512} height={512} className="h-14 w-14" />
      </a>
    </div>
  );
}
