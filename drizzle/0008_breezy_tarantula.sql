/* 
Unfortunately in current drizzle-kit version we can't automatically get name for primary key.
We are working on making it available!

Meanwhile you can:
1. Check pk name in your database, by running
SELECT constraint_name FROM information_schema.table_constraints
WHERE table_schema = 'public'
AND table_name = 'metadata_external_component_base_stat'
AND constraint_type = 'PRIMARY KEY';
2. Uncomment code below and paste pk name manually

Hope to release this update as soon as possible
 */
-- DROP CONSTRAINT first before altering the column
ALTER TABLE "metadata_external_component_base_stat"
DROP CONSTRAINT "metadata_external_component_base_stat_pkey";

-- Then alter the column
ALTER TABLE "metadata_external_component_base_stat"
ALTER COLUMN "stat_id"
DROP NOT NULL;

-- Finally, add the new primary key column
ALTER TABLE "metadata_external_component_base_stat"
ADD COLUMN "id" serial PRIMARY KEY NOT NULL;