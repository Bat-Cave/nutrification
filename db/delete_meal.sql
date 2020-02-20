delete from nutrition_history
where entry_id = $1
returning *