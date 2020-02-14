insert into nutrition_history
(user_id, meal_name, entry_date, entry_time, you_ate, biotin, folate_folic_acid, niacin, pantothenic_acid, riboflavin, thiamin, vitamin_a, vitamin_b6, vitamin_b12, vitamin_c, vitamin_d, vitamin_e, vitamin_k,calcium, chloride, chromium, copper, iodine, iron, magnesium, mangenese, molybdenum, phosphorus, potassium, selenium, sodium, zinc, protein, fiber, water, carbohydrates, sugar, fat, calories, alcohol,caffeine)
values
($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20, $21, $22, $23, $24, $25, $26, $27, $28, $29, $30, $31, $32, $33, $34, $35, $36, $37, $38, $39, $40, $41)
returning entry_id;