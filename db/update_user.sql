update users
set email = $2,
    height = $3,
    weight = $4,
    gender = $5,
    age = $6,
    activity_level = $7
where user_id = $1
returning user_id, first_name, last_name, email, profile_pic, height, weight, age, activity_level, gender, rec_daily_calorie, rec_daily_protein, rec_daily_carb, rec_daily_fat, rec_daily_water