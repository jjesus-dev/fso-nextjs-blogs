CREATE TABLE "users" (
	"id" serial PRIMARY KEY,
	"username" varchar(60) NOT NULL,
	"name" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "blogs" ADD COLUMN "user_id" integer;--> statement-breakpoint
ALTER TABLE "blogs" ADD CONSTRAINT "blogs_user_id_users_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id");