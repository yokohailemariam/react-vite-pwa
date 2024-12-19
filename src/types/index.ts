export interface ApiResponse {
  id: string;
  slug: string;
  alternative_slugs: Alternativeslugs;
  created_at: string;
  updated_at: string;
  promoted_at: null | string;
  width: number;
  height: number;
  color: string;
  blur_hash: string;
  description: null | string;
  alt_description: string;
  breadcrumbs: unknown[];
  urls: Urls;
  links: Links;
  likes: number;
  liked_by_user: boolean;
  current_user_collections: unknown[];
  sponsorship: Sponsorship | null;
  topic_submissions: Topicsubmissions;
  asset_type: string;
  user: User;
}
interface User {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: null | string;
  twitter_username: null | string;
  portfolio_url: null | string;
  bio: null | string;
  location: null | string;
  links: Links2;
  profile_image: Profileimage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social2;
}
interface Social2 {
  instagram_username: string;
  portfolio_url: null | string;
  twitter_username: null | string;
  paypal_email: null;
}
interface Topicsubmissions {
  film?: Film;
  health?: Film;
  "3d-renders"?: Film;
  wallpapers?: Film;
  night?: Film;
}
interface Film {
  status: string;
  approved_on: string;
}
interface Sponsorship {
  impression_urls: string[];
  tagline: string;
  tagline_url: string;
  sponsor: Sponsor;
}
interface Sponsor {
  id: string;
  updated_at: string;
  username: string;
  name: string;
  first_name: string;
  last_name: string;
  twitter_username: string;
  portfolio_url: string;
  bio: string;
  location: null;
  links: Links2;
  profile_image: Profileimage;
  instagram_username: string;
  total_collections: number;
  total_likes: number;
  total_photos: number;
  total_promoted_photos: number;
  total_illustrations: number;
  total_promoted_illustrations: number;
  accepted_tos: boolean;
  for_hire: boolean;
  social: Social;
}
interface Social {
  instagram_username: string;
  portfolio_url: string;
  twitter_username: string;
  paypal_email: null;
}
interface Profileimage {
  small: string;
  medium: string;
  large: string;
}
interface Links2 {
  self: string;
  html: string;
  photos: string;
  likes: string;
  portfolio: string;
  following: string;
  followers: string;
}
interface Links {
  self: string;
  html: string;
  download: string;
  download_location: string;
}
interface Urls {
  raw: string;
  full: string;
  regular: string;
  small: string;
  thumb: string;
  small_s3: string;
}
interface Alternativeslugs {
  en: string;
  es: string;
  ja: string;
  fr: string;
  it: string;
  ko: string;
  de: string;
  pt: string;
}
