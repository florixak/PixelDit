import Image from "next/image";
import Role from "@/components/role";
import { Calendar } from "lucide-react";
import { formatDate } from "@/lib/utils";
import { User } from "@/sanity.types";
import LatestUserActivity from "./user-latest-activity";
import { Suspense } from "react";
import UserActions from "./user-actions";
import UserProfileStats from "./user-profile-stats";

type UserProfileContentProps = {
  user: User | null;
};

const UserProfileContent = ({ user }: UserProfileContentProps) => {
  return (
    <section className="flex flex-col w-full max-w-[70rem] mx-auto px-4 sm:px-6 py-6 sm:py-8 md:py-10 gap-12">
      <div className="flex flex-row w-full items-start justify-center sm:justify-between">
        <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
          <Image
            src={user?.imageUrl || "/avatar-default.svg"}
            alt={`${user?.username}'s avatar`}
            className="w-36 h-36 md:w-48 md:h-48 rounded-full object-cover border-4 border-background shadow-md"
            width={192}
            height={192}
            priority
            placeholder="blur"
            blurDataURL="/avatar-default.svg"
          />

          <div className="flex flex-col text-center sm:text-left">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold flex flex-wrap items-center justify-center sm:justify-start gap-2">
              {user?.fullName || user?.username || "Unknown user"}{" "}
              <Role role={user?.role} />
            </h1>

            <p className="text-muted-foreground text-base">
              @{user?.username || "unknown-user"}
            </p>

            <p
              className={`${
                user?.createdAt ? "flex" : "hidden"
              } text-muted-foreground items-center text-sm gap-1 justify-center sm:justify-start mt-1`}
              title={`Joined on ${formatDate(user?.createdAt)}`}
            >
              <Calendar className="h-4 w-4" /> Joined{" "}
              {formatDate(user?.createdAt)}
            </p>

            <p className="text-sm md:text-base text-muted-foreground mt-2">
              {user?.bio || "This user has not set a bio yet."}
            </p>
            <Suspense
              fallback={
                <div className="h-16 w-full bg-gray-200 animate-pulse rounded-md" />
              }
            >
              <UserProfileStats user={user} />
            </Suspense>
            <div className="flex sm:hidden flex-col gap-6 mt-4">
              <UserActions user={user} />
            </div>
          </div>
        </div>

        <div className="hidden sm:flex flex-col gap-6 mt-0 md:mt-8">
          <UserActions user={user} />
        </div>
      </div>

      {/* Latest Activity Section */}
      <div className="flex flex-col">
        <h2 className="text-xl sm:text-2xl font-bold mb-2">Latest Activity</h2>
        <p className="text-sm sm:text-base text-muted-foreground mb-6">
          Here are the latest posts and comments made by{" "}
          {user?.username || "Unknown user"}.
        </p>
        <LatestUserActivity clerkId={user?.clerkId} limit={8} />
      </div>
    </section>
  );
};

export default UserProfileContent;
