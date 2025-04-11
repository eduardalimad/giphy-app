export interface GifImage {
  url: string;
  width: string;
  height: string;
  size: string;
  frames?: string;
  mp4?: string;
  mp4_size?: string;
  webp?: string;
  webp_size?: string;
}

export interface Card {
  alt_text: string;
  analytics: {
    onload: unknown;
    onclick: unknown;
    onsent: unknown;
  };
  analytics_response_payload: string;
  bitly_gif_url: string;
  bitly_url: string;
  content_url: string;
  embed_url: string;
  id: string;
  images: {
    original: GifImage;

  };
  import_datetime: string;
  is_sticker: number;
  rating: string;
  slug: string;
  source: string;
  source_post_url: string;
  source_tld: string;
  title: string;
  trending_datetime: string;
  type: string;
  url: string;
}
export interface SubCategoryItem {
  gif: {
    type: string;
    id: string;
    images: {
      preview_gif: {
        url: string;
      };
      downsized_medium: {
        url: string;
      };
    };
  };
  name: string;
  name_encoded: string;
}

export interface GifImageSubCategory {
  type: string;
  id: string;
  images: {
    downsized_medium: {
      url: string;
    };
    preview_gif?: {
      url: string;
    };
  };
}


