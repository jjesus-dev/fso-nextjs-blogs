CREATE TABLE "readingList" (
	"id" serial PRIMARY KEY,
	"read" boolean DEFAULT false NOT NULL,
	"user_id" integer NOT NULL,
	"blog_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "readingList" ADD CONSTRAINT "readingList_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");--> statement-breakpoint
ALTER TABLE "readingList" ADD CONSTRAINT "readingList_blog_id_blogs_id_fkey" FOREIGN KEY ("blog_id") REFERENCES "blogs"("id");