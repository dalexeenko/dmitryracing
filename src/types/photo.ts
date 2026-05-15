import type { Album } from "@/types/album";

export type Photo = {
  id: string;
  src: string;
  thumb: string;
  blurDataURL: string;
  width: number;
  height: number;
  album: Album;
  /** Average RGB from thumbnail stats — pipeline / `npm run enrich-photos` */
  dominantColor?: string;
};
