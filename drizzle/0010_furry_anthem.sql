-- Drop the foreign key constraint
ALTER TABLE "metadata_descendant_stat_stat_detail"
DROP CONSTRAINT "metadata_descendant_stat_stat_detail_metadata_descendant_stat_i";

-- Alter the column type to integer
ALTER TABLE "metadata_descendant_stat_stat_detail"
ALTER COLUMN "metadata_descendant_stat_id" TYPE integer;

-- Re-add the foreign key constraint with compatible data types
ALTER TABLE "metadata_descendant_stat_stat_detail" ADD CONSTRAINT "metadata_descendant_stat_stat_detail_metadata_descendant_stat_i" FOREIGN KEY ("metadata_descendant_stat_id") REFERENCES "metadata_descendant_stat" ("id");