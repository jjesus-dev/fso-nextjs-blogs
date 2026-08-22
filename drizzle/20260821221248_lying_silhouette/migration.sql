CREATE TABLE "blogs" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "blogs_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"title" varchar(255) NOT NULL,
	"author" varchar(100) NOT NULL,
	"url" varchar(500) NOT NULL UNIQUE,
	"likes" integer DEFAULT 0 NOT NULL
);
