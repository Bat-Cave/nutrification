select user_id, first_name, last_name, email, password, height, weight, age, activity_level, gender, rec_daily_calorie, rec_daily_protein, rec_daily_carb, rec_daily_fat, rec_daily_water from users
where user_id = $1