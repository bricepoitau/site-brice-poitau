interface IframeEmbedProps {
  src: string;
  title: string;
  height?: number;
}

export default function IframeEmbed({ src, title, height = 1400 }: IframeEmbedProps) {
  return (
    <iframe
      src={src}
      title={title}
      className="w-full rounded-[18px] border border-line"
      style={{ height, border: "none" }}
      loading="lazy"
    />
  );
}
