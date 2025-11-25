import { getPayload } from 'payload';
import config from '../src/payload.config';

const sql = `
CREATE TABLE IF NOT EXISTS "page_headers_hero_images" (
  "_order" integer NOT NULL,
  "_parent_id" integer NOT NULL,
  "id" varchar PRIMARY KEY NOT NULL,
  "image_id" integer NOT NULL,
  "alt" varchar NOT NULL,
  CONSTRAINT "page_headers_hero_images_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action,
  CONSTRAINT "page_headers_hero_images_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."page_headers"("id") ON DELETE cascade ON UPDATE no action
);

CREATE INDEX IF NOT EXISTS "page_headers_hero_images_order_idx" ON "page_headers_hero_images" USING btree ("_order");
CREATE INDEX IF NOT EXISTS "page_headers_hero_images_parent_id_idx" ON "page_headers_hero_images" USING btree ("_parent_id");
CREATE INDEX IF NOT EXISTS "page_headers_hero_images_image_idx" ON "page_headers_hero_images" USING btree ("image_id");
`;

async function createTable() {
  const payload = await getPayload({ config });

  try {
    // @ts-ignore - accessing internal db
    await payload.db.execute({ sql });
    console.log('✅ Table page_headers_hero_images created successfully');
  } catch (error) {
    console.error('❌ Error creating table:', error);
    process.exit(1);
  }

  process.exit(0);
}

createTable();
