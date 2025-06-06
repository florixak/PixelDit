import { groq } from "next-sanity";
import { client } from "../client";
import { User } from "@/sanity.types";

const getUserById = async (userId: string): Promise<User> => {
  return client.fetch(
    groq`*[_type == "user" && _id == $userId][0] {
      _id,
      _createdAt,
      username,
      fullName,
      email,
      clerkId,
      imageUrl,
      role,
      "favoriteTopics": favoriteTopics[]-> {
        _id,
        title,
        "slug": slug.current,
        description
      },
      "postCount": count(*[_type == "post" && references(^._id)]),
      "commentCount": count(*[_type == "comment" && references(^._id)]),
      "upvotedPosts": *[_type == "vote" && user._ref == ^._id && value > 0].post._ref,
      "downvotedPosts": *[_type == "vote" && user._ref == ^._id && value < 0].post._ref,
      isReported
    }`,
    { userId }
  );
};

export default getUserById;
