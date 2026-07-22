import SocialIcon from "./SocialIcon";

const WHATSAPP_URL =
  "https://wa.me/918452989850?text=Can%20you%20help%20me%20choose%20the%20right%20package%3F";

export default function WhatsAppFloatingButton() {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg shadow-black/20 transition hover:scale-105 hover:bg-[#20bd5a]"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366]/50" />
      <SocialIcon kind="whatsapp" className="relative h-7 w-7" />
    </a>
  );
}
