import Image from "next/image";

const WHATSAPP_URL =
  "https://wa.me/918452989850?text=Can%20you%20help%20me%20choose%20the%20right%20package%3F";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full shadow-lg shadow-black/20 transition hover:scale-105"
    >
      <Image
        src="/whatsapp-icon.png"
        alt=""
        width={512}
        height={512}
        className="h-14 w-14"
      />
    </a>
  );
}
