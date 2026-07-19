import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return { name: "Creator Forge", short_name: "Creator Forge", description: "Diseño, desarrollo web y productos digitales.", start_url: "/", display: "standalone", background_color: "#0b0b0b", theme_color: "#ff6a00", icons: [{ src: "/favicon.svg", sizes: "any", type: "image/svg+xml" }] };
}
