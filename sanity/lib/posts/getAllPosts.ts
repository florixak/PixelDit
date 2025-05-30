import { groq } from "next-sanity";
import { client } from "../client";

const getAllPosts = async () => {
  return client.fetch(
    groq`*[_type == "post"] {
      _id,
      title,
      "slug": slug.current,
      excerpt,
      publishedAt,
      postType,
      "imageUrl": image.asset->url,
      "author": author->{_id, username, "imageUrl": imageUrl},
      "topic": topic->{_id, title, "slug": slug.current},
      upvotes,
      downvotes,
      tags
    } | order(publishedAt desc)`
  );
};

export default getAllPosts;
